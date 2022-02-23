import {handle, adaptEvent, forwardCustom, forwardWithPrevent, returnsTrue} from '@enact/core/handle';
import kind from '@enact/core/kind';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import Changeable from '@enact/ui/Changeable';
import Layout, {Cell} from '@enact/ui/Layout';
import Repeater from '@enact/ui/Repeater';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {Fragment} from 'react';

import Button from '../Button';
import Icon from '../Icon';
import $L from '../internal/$L';
import Tooltip from '../TooltipDecorator/Tooltip';

import Keypad from './Keypad';
import {DEFAULT_LENGTH, SEPARATE_DIGITS_LIMIT, convertToPasswordFormat} from './util';

import componentCss from './Input.module.less';

const getSeparated = (prefer, max) => (prefer === 'separated' || (prefer === 'auto' && max <= SEPARATE_DIGITS_LIMIT));

const normalizeValue = (value, maxLength) => ((value != null) ? value.toString().replace(/\D/g, '').substring(0, maxLength) : '');

const normalizeValueProp = ({value, maxLength}) => normalizeValue(value, maxLength);

const NumberCell = kind({
	name: 'NumberCell',

	propTypes: /** @lends sandstone/Input.NumberCell.prototype */ {
		active: PropTypes.bool,
		children: PropTypes.string,
		disabled: PropTypes.bool,
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
		className: ({active, password, styler}) => styler.append({active, password})
	},

	render: ({children, password, passwordIcon, ...rest}) => {
		delete rest.active;

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
		disabled: PropTypes.bool,
		invalid: PropTypes.bool,
		invalidMessage: PropTypes.string,
		maxLength: PropTypes.number,
		minLength: PropTypes.number,
		noSubmitButton: PropTypes.bool,
		numberInputField: PropTypes.string,
		onBeforeChange: PropTypes.func,
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
					returnsTrue(({value}, {announce, type}) => {
						announce(type === 'password' ? $L('hidden') : String(value).substr(-1));
					}),
					// In case onAdd was run in the short period between the last onComplete and this invocation, just bail out
					({value: updatedValue}, {maxLength, value}) => (normalizeValue(updatedValue, maxLength) !== normalizeValue(value, maxLength)),
					adaptEvent(({value}) => ({type: 'onBeforeChange', value}), forwardWithPrevent('onBeforeChange')),
					forwardCustom('onChange', (ev) => (ev)),
					// Check the length of the new value and return true (pass/proceed) if it is at or above max-length
					({value: updatedValue}, {maxLength, minLength, numberInputField}) => {
						const
							updatedLength = normalizeValue(updatedValue, maxLength).length,
							autoSubmit = getSeparated(numberInputField, maxLength) && minLength === maxLength;
						return autoSubmit && updatedLength >= maxLength;
					},
					forwardCustom('onComplete', (ev) => (ev))
				)
			)
		),
		onRemove: handle(
			returnsTrue((ev, {announce}) => announce($L('backspace'))),
			adaptEvent(
				(ev, {maxLength, value}) => ({value: normalizeValue(value, maxLength).toString().slice(0, -1)}),
				handle(
					adaptEvent(({value}) => ({type: 'onBeforeChange', value}), forwardWithPrevent('onBeforeChange')),
					forwardCustom('onChange', (ev) => (ev))
				)
			)
		),
		onSubmit: handle(
			adaptEvent(
				(ev, {maxLength, value}) => ({value: normalizeValue(value, maxLength)}),
				forwardCustom('onComplete', (ev) => (ev))
			)
		)
	},

	computed: {
		className: ({maxLength, numberInputField, type, styler}) => {
			const numberFieldStyle = getSeparated(numberInputField, maxLength) ? 'separated' : 'joined';
			return styler.append(type, numberFieldStyle);
		},
		// Normalize the value, also prune out any non-digit characters
		value: normalizeValueProp,
		invalidTooltip: ({css, invalid, invalidMessage = $L('Please enter a valid value.')}) => {
			if (invalid && invalidMessage) {
				return (
					<Tooltip css={css} marquee relative type="transparent">
						{invalidMessage}
					</Tooltip>
				);
			}
		},
		submitButton: ({css, disabled, invalid, maxLength, minLength, noSubmitButton, onSubmit, value, numberInputField}) => {
			const isDisabled = disabled || invalid || (normalizeValue(value, maxLength).toString().length < minLength);

			if (!noSubmitButton && (minLength !== maxLength || !getSeparated(numberInputField, maxLength))) {
				return <Button className={css.submitButton} disabled={isDisabled} onClick={onSubmit}>{$L('Submit')}</Button>;
			} else {
				return null;
			}
		},
		style: ({maxLength, style}) => {
			return {
				...style,
				'--input-max-number-length': maxLength
			};
		}
	},

	render: ({css, disabled, invalidTooltip, maxLength, numberInputField, onAdd, onRemove, showKeypad, submitButton, type, value, ...rest}) => {
		const password = (type === 'password');
		delete rest.announce;
		delete rest.invalid;
		delete rest.invalidMessage;
		delete rest.minLength;
		delete rest.noSubmitButton;
		delete rest.onBeforeChange;
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
					inline
				>
					{items.map((_, index) => ({
						active: index === value.length,
						children: values[index],
						component: NumberCell,
						disabled,
						key: `key-${index}`,
						password,
						shrink: true
					}))}
				</Repeater>
			);
		} else {
			field = (
				<div {...rest} disabled={disabled}>
					{password ? convertToPasswordFormat(value) : value}
				</div>
			);
		}

		return (
			<Fragment>
				<div className={css.fieldWrapper}>
					{field}
					{invalidTooltip}
				</div>
				<br />
				{showKeypad ? <Keypad aria-label=" " disabled={disabled} onAdd={onAdd} onRemove={onRemove} /> : null}
				{submitButton}
			</Fragment>
		);
	}
});

const NumberFieldDecorator = compose(
	Changeable,
	I18nContextDecorator({rtlProp: 'rtl'})
);

const NumberField = NumberFieldDecorator(NumberFieldBase);

export default NumberField;
