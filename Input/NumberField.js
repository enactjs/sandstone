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
import {convertToPasswordFormat} from './util';

import componentCss from './Input.module.less';

const DEFAULT_LENGTH = 4;
const SEPARATE_DIGITS_LIMIT = 6;

const getMinLength = (length, minLength) => (length || minLength || 0);
const getMaxLength = (length, maxLength) => (length || maxLength || DEFAULT_LENGTH);
const getSeparated = (prefer, max) => (prefer === 'separated' || (prefer === 'auto' && max <= SEPARATE_DIGITS_LIMIT));

const normalizeValue = (value, length) => ((value != null) ? value.toString().replace(/\D/g, '').substring(0, length) : '');
const normalizeValueProp = ({value, length, maxLength}) => normalizeValue(value, getMaxLength(length, maxLength));

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
		css: PropTypes.object,
		invalid: PropTypes.bool,
		invalidMessage: PropTypes.string,
		length: PropTypes.number,
		maxLength: PropTypes.number,
		minLength: PropTypes.number,
		numericInputKind: PropTypes.string,
		onComplete: PropTypes.func,
		rtl: PropTypes.bool,
		showKeypad: PropTypes.bool,
		type: PropTypes.oneOf(['number', 'password']),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	},

	defaultProps: {
		numericInputKind: 'auto',
		type: 'number'
	},

	styles: {
		css: componentCss,
		className: 'numberField'
	},

	handlers: {
		onAdd: handle(
			adaptEvent(
				({key}, {length, maxLength, value}) => ({value: normalizeValue(`${value}${key}`, getMaxLength(length, maxLength))}),
				handle(
					// In case onAdd was run in the short period between the last onComplete and this invocation, just bail out
					({value: updatedValue}, {value, length, maxLength}) => (normalizeValue(updatedValue, getMaxLength(length, maxLength)) !== normalizeValue(value, getMaxLength(length, maxLength))),
					forward('onChange'),
					// Check the length of the new value and return true (pass/proceed) if it is at or above max-length
					({value: updatedValue}, {length, maxLength, minLength}) => {
						const
							min = getMinLength(length, minLength),
							max = getMaxLength(length, maxLength),
							updatedLength = normalizeValue(updatedValue, max).length,
							autoSubmit = min === max;
						return autoSubmit && updatedLength >= max;
					},
					forward('onComplete'),
				)
			),
		),
		onRemove: handle(
			adaptEvent(
				(ev, {value, length, maxLength}) => ({value: normalizeValue(value, getMaxLength(length, maxLength)).toString().slice(0, -1)}),
				forward('onChange')
			)
		),
		onSubmit: handle(
			adaptEvent(
				(ev, {length, maxLength, value}) => ({value: normalizeValue(value, getMaxLength(length, maxLength))}),
				forward('onComplete')
			),
		)
	},

	computed: {
		className: ({length, maxLength, minLength, numericInputKind, type, styler}) => {
			const min = getMinLength(length, minLength);
			const max = getMaxLength(length, maxLength);
			const numberFieldStyle = getSeparated(numericInputKind, max) ? 'separated' : 'joined';
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
		submitButton: ({css, invalid, length, maxLength, minLength, onSubmit, value}) => {
			const max = getMaxLength(length, maxLength),
				min = getMinLength(length, minLength),
				disabled = invalid || (normalizeValue(value, max).toString().length < min);

			if (min !== max) {
				return <Button className={css.submitButton} disabled={disabled} onClick={onSubmit}>{$L('Submit')}</Button>;
			} else {
				return null;
			}
		}
	},

	render: ({css, invalidTooltip, length, maxLength, numericInputKind, onAdd, onRemove, showKeypad, submitButton, type, value, ...rest}) => {
		const password = (type === 'password');
		delete rest.invalid;
		delete rest.invalidMessage;
		delete rest.minLength;
		delete rest.onComplete;
		delete rest.onSubmit;
		delete rest.rtl;

		const
			max = getMaxLength(length, maxLength),
			separated = getSeparated(numericInputKind, max);

		let field;
		if (separated) {
			const values = value.split('');
			const items = new Array(max).fill('');
			field = (
				<Repeater
					aria-label={!password ? values.join(' ') : null}
					aria-live="polite"
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
				{showKeypad ? <Keypad onAdd={onAdd} onRemove={onRemove} /> : null}
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
