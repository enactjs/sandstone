import kind from '@enact/core/kind';
import {handle, adaptEvent, forward} from '@enact/core/handle';
import PropTypes from 'prop-types';
import React from 'react';
import compose from 'ramda/src/compose';
import Changeable from '@enact/ui/Changeable';
import Repeater from '@enact/ui/Repeater';
import Layout, {Cell} from '@enact/ui/Layout';

import Icon from '../Icon';

import Keypad from './Keypad';
import {convertToPasswordFormat} from './util';

import componentCss from './Input.module.less';

const SEPARATE_DIGITS_LIMIT = 6;

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
		length: PropTypes.number,
		onComplete: PropTypes.func,
		showKeypad: PropTypes.bool,
		type: PropTypes.oneOf(['number', 'password']),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	},

	defaultProps: {
		length: 4,
		type: 'number'
	},

	styles: {
		css: componentCss,
		className: 'numberField',
		publicClassNames: ['numberField', 'combined', 'separated', 'numberCell', 'keypad']
	},

	handlers: {
		onAdd: handle(
			adaptEvent(
				({key}, {length, value}) => ({
					value: (value.length >= length ? value : `${value}${key}`)
				}),
				handle(
					// In case onAdd was run in the short period between the last onComplete and this invocation, just bail out
					({value: updatedValue}, {value}) => (updatedValue !== value),
					forward('onChange'),
					// Check the length of the new value and return true (pass/proceed) if it is at or above max-length
					({value: updatedValue}, {length}) => (updatedValue.length >= length),
					forward('onComplete'),
				)
			),
		),
		onRemove: handle(
			adaptEvent(
				(ev, {value}) => ({value: value.toString().slice(0, -1)}),
				forward('onChange')
			)
		)
	},

	computed: {
		className: ({length, type, styler}) => styler.append(type, (length <= SEPARATE_DIGITS_LIMIT ? 'separated' : 'combined')),
		// Normalize the value, also prune out any non-digit characters
		value: ({value}) => ((value != null) ? value.toString().replace(/\D/g, '') : '')
	},

	render: ({css, length, showKeypad, onAdd, onRemove, type, value, ...rest}) => {
		const password = (type === 'password');
		delete rest.onComplete;

		let field;
		if (length <= SEPARATE_DIGITS_LIMIT) {
			const values = value.split('');
			const items = new Array(length).fill('');
			field = (
				<Repeater
					component={Layout}
					aria-label={!password ? values.join(' ') : null}
					aria-live="polite"
					{...rest}
					childComponent={Cell}
					itemProps={{password, shrink: true, component: NumberCell}}
					inline
				>
					{items.map((_, index) => ({children: values[index], key: ('cell' + index)}))}
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
				{showKeypad ? <Keypad onAdd={onAdd} onRemove={onRemove} className={css.keypad} /> : null}
			</React.Fragment>
		);
	}
});

const NumberFieldDecorator = compose(
	Changeable
);

const NumberField = NumberFieldDecorator(NumberFieldBase);

export default NumberField;
