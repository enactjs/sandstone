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

import Icon from '../Icon';
import $L from '../internal/$L';

import Keypad from './Keypad';
import {convertToPasswordFormat} from './util';

import componentCss from './Input.module.less';

const normalizeValue = (value, length) => ((value != null) ? value.toString().replace(/\D/g, '').substring(0, length) : '');
const normalizeValueProp = ({value, length}) => normalizeValue(value, length);

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
		onComplete: PropTypes.func,
		rtl: PropTypes.bool,
		separateDigitsLimit: PropTypes.number,
		showKeypad: PropTypes.bool,
		type: PropTypes.oneOf(['number', 'password']),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	},

	defaultProps: {
		length: 4,
		separateDigitsLimit: 6,
		type: 'number'
	},

	styles: {
		css: componentCss,
		className: 'numberField'
	},

	handlers: {
		onAdd: handle(
			adaptEvent(
				({key}, {length, value}) => ({value: normalizeValue(`${value}${key}`, length)}),
				handle(
					// In case onAdd was run in the short period between the last onComplete and this invocation, just bail out
					({value: updatedValue}, {value, length}) => (normalizeValue(updatedValue, length) !== normalizeValue(value, length)),
					forward('onChange'),
					// Check the length of the new value and return true (pass/proceed) if it is at or above max-length
					({value: updatedValue}, {length}) => (normalizeValue(updatedValue, length).length >= length),
					forward('onComplete'),
				)
			),
		),
		onRemove: handle(
			adaptEvent(
				(ev, {value, length}) => ({value: normalizeValue(value, length).toString().slice(0, -1)}),
				forward('onChange')
			)
		)
	},

	computed: {
		className: ({length, type, separateDigitsLimit, styler}) => {
			let numberFieldStyle = 'separated';
			if (length > separateDigitsLimit) numberFieldStyle = 'combined';
			return styler.append(type, numberFieldStyle);
		},
		// Normalize the value, also prune out any non-digit characters
		value: normalizeValueProp,
		invalidTooltip: ({css, invalid, invalidMessage = $L('Please enter a valid value.'), rtl}) => {
			if (invalid && invalidMessage) {
				const direction = rtl ? 'left' : 'right';
				return (
					<Tooltip arrowAnchor="middle" className={css.invalidTooltip} direction={direction}>
						{invalidMessage}
					</Tooltip>
				);
			}
		}
	},

	render: ({length, showKeypad, onAdd, onRemove, type, value, separateDigitsLimit, invalidTooltip, ...rest}) => {
		const password = (type === 'password');
		delete rest.onComplete;
		delete rest.invalid;
		delete rest.invalidMessage;
		delete rest.rtl;

		let field;
		if (length <= separateDigitsLimit) {
			const values = value.split('');
			const items = new Array(length).fill('');
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
				{field}
				{invalidTooltip}
				<br />
				{showKeypad ? <Keypad onAdd={onAdd} onRemove={onRemove} /> : null}
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
