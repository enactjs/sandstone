import kind from '@enact/core/kind';
import {handle, adaptEvent, forward} from '@enact/core/handle';
import PropTypes from 'prop-types';
import React from 'react';
import compose from 'ramda/src/compose';
import Changeable from '@enact/ui/Changeable';
import Repeater from '@enact/ui/Repeater';
import Layout, {Cell} from '@enact/ui/Layout';
import Tooltip from '../TooltipDecorator/Tooltip';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';

import Button from '../Button';
import Icon from '../Icon';
import $L from '../internal/$L';

import Keypad from './Keypad';
import {DEFAULT_LENGTH, SEPARATE_DIGITS_LIMIT, convertToPasswordFormat} from './util';

import componentCss from './Input.module.less';

const getSeparated = (prefer, max) => (prefer === 'separated' || (prefer === 'auto' && max <= SEPARATE_DIGITS_LIMIT));

const normalizeValue = (value, maxLength) => ((value != null) ? value.toString().replace(/\D/g, '').substring(0, maxLength) : '');
const normalizeValueProp = ({value, maxLength}) => normalizeValue(value, maxLength);

const NumberCell = kind({
	name: 'NumberCell',

	propTypes: /** @lends sandstone/Input.NumberCell.prototype */ {
		children: PropTypes.string,
		password: PropTypes.bool,
		passwordIcon: PropTypes.string
	},

	defaultProps: {
		password: false,
		passwordIcon: 'circle'
	},

	styles: {
		css: componentCss,
		className: 'numberCell'
	},

	computed: {
		className: ({password, styler}) => styler.append({password})
	},

	render: ({children, password, passwordIcon, ...rest}) => {
		return (
			<Icon
				size="large"
				{...rest}
			>
				{(password && children) ? passwordIcon : children}
			</Icon>
		);
	}
});

const NumberFieldBase = kind({
	name: 'NumberField',

	propTypes: {
		announce: PropTypes.func,
		css: PropTypes.object,
		invalid: PropTypes.bool,
		invalidMessage: PropTypes.string,
		maxLength: PropTypes.number,
		minLength: PropTypes.number,
		numberInputField: PropTypes.string,
		onComplete: PropTypes.func,
		rtl: PropTypes.bool,
		showKeypad: PropTypes.bool,
		type: PropTypes.oneOf(['number', 'password']),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	},

	defaultProps: {
		maxLength: DEFAULT_LENGTH,
		minLength: 0,
		numberInputField: 'auto',
		type: 'number'
	},

	styles: {
		css: componentCss,
		className: 'numberField'
	},

	handlers: {
		onAdd: handle(
			adaptEvent(
				({key}, {maxLength, value}) => ({value: normalizeValue(`${value}${key}`, maxLength)}),
				handle(
					({value}, {announce, type}) => {
						const password = (type === 'password');
						const string = value.toString();
						announce(password ? $L('hidden') : string.charAt(string.length - 1));
						return true;
					},
					// In case onAdd was run in the short period between the last onComplete and this invocation, just bail out
					({value: updatedValue}, {maxLength, value}) => (normalizeValue(updatedValue, maxLength) !== normalizeValue(value, maxLength)),
					forward('onChange'),
					// Check the length of the new value and return true (pass/proceed) if it is at or above max-length
					({value: updatedValue}, {maxLength, minLength}) => {
						const
							updatedLength = normalizeValue(updatedValue, maxLength).length,
							autoSubmit = minLength === maxLength;
						return autoSubmit && updatedLength >= maxLength;
					},
					forward('onComplete'),
				)
			),
		),
		onRemove: handle(
			adaptEvent(
				(ev, {maxLength, value}) => ({value: normalizeValue(value, maxLength).toString().slice(0, -1)}),
				handle(
					(_, {announce, type}) => {
						announce($L('Back Space'));
						return true;
					},
					forward('onChange')
				)
			)
		),
		onSubmit: handle(
			adaptEvent(
				(ev, {maxLength, value}) => ({value: normalizeValue(value, maxLength)}),
				forward('onComplete')
			),
		)
	},

	computed: {
		className: ({maxLength, numberInputField, type, styler}) => {
			const numberFieldStyle = getSeparated(numberInputField, maxLength) ? 'separated' : 'joined';
			return styler.append(type, numberFieldStyle);
		},
		// Normalize the value, also prune out any non-digit characters
		value: normalizeValueProp,
		invalidTooltip: ({css, invalid, invalidMessage = $L('Please enter a valid value.'), rtl}) => {
			if (invalid && invalidMessage) {
				const direction = rtl ? 'left' : 'right';
				return (
					<Tooltip relative arrowAnchor="middle" className={css.invalidTooltip} direction={direction}>
						{invalidMessage}
					</Tooltip>
				);
			}
		},
		submitButton: ({css, invalid, maxLength, minLength, onSubmit, value}) => {
			const disabled = invalid || (normalizeValue(value, maxLength).toString().length < minLength);

			if (minLength !== maxLength) {
				return <Button className={css.submitButton} disabled={disabled} onClick={onSubmit}>{$L('Submit')}</Button>;
			} else {
				return null;
			}
		}
	},

	render: ({css, invalidTooltip, maxLength, numberInputField, onAdd, onRemove, showKeypad, submitButton, type, value, ...rest}) => {
		const password = (type === 'password');
		delete rest.announce;
		delete rest.invalid;
		delete rest.invalidMessage;
		delete rest.minLength;
		delete rest.onComplete;
		delete rest.onSubmit;
		delete rest.rtl;

		const separated = getSeparated(numberInputField, maxLength);

		let field;
		if (separated) {
			const values = value.split('');
			const items = new Array(maxLength).fill('');
			field = (
				<Repeater
					{...rest}
					component={Layout}
					childComponent={Cell}
					itemProps={{password, shrink: true, component: NumberCell}}
					inline
				>
					{items.map((_, index) => (values[index]))}
				</Repeater>
			);
		} else {
			field = (
				<div {...rest}>
					{password ? convertToPasswordFormat(value) : value}
				</div>
			);
		}

		return (
			<React.Fragment>
				<div className={css.fieldWrapper}>
					{field}
					{invalidTooltip}
				</div>
				<br />
				{showKeypad ? <Keypad aria-label=" " onAdd={onAdd} onRemove={onRemove} /> : null}
				{submitButton}
			</React.Fragment>
		);
	}
});

const NumberFieldDecorator = compose(
	Changeable,
	I18nContextDecorator({rtlProp: 'rtl'}),
);

const NumberField = NumberFieldDecorator(NumberFieldBase);

export default NumberField;
