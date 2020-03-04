import kind from '@enact/core/kind';
import {handle, adaptEvent, forward} from '@enact/core/handle';
import PropTypes from 'prop-types';
import React from 'react';
import compose from 'ramda/src/compose';
import Changeable from '@enact/ui/Changeable';
import Layout, {Cell} from '@enact/ui/Layout';

// import Skinnable from '../Skinnable';
import Icon from '../Icon';

import Keypad from './Keypad';
import {convertToPasswordFormat} from './util';

import componentCss from './Input.module.less';

const NUMBER_LENGTH_LIMIT = 6;


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

	propTypes: /** @lends sandstone/Input.NumberField.prototype */ {
		css: PropTypes.obj,
		length: PropTypes.number,
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
					// handle.log('onAdd'),
					forward('onChange'),

					// DEV NOTE: Probably move these to its own Decorator
					({value: updatedValue}, {length}) => (updatedValue.length >= length),
					(ev, props) => {
						setTimeout(() => {
							forward('onClose', ev, props);
							forward('onComplete', ev, props);
						}, 250);
						return true;
					}
				)
			),
		),
		onRemove: handle(
			adaptEvent(
				(ev, {value}) => ({value: value.toString().slice(0, -1)}),
				forward('onChange')
			)
		),
		onChange: handle(
			handle.log('onChange'),
			adaptEvent(
				ev => ({value: ev.target.dataset.value}),
				forward('onChange')
			)
		)
	},

	computed: {
		className: ({length, type, styler}) => styler.append(type, (length <= NUMBER_LENGTH_LIMIT ? 'separated' : 'combined'))
	},

	render: ({css, length, showKeypad, onAdd, onRemove, type, value, ...rest}) => {
		const password = (type === 'password');

		let field;
		if (length <= NUMBER_LENGTH_LIMIT) {
			const values = (value != null) ? value.toString().split('') : [];
			const items = new Array(length).fill('');
			field = (
				<Layout inline aria-label={!password ? values.join(' ') : null} aria-live="polite" {...rest} dataset={value}>
					{items.map((_, index) => (
						<Cell shrink component={NumberCell} key={index} password={password} className={css.numberCell}>
							{values[index]}
						</Cell>
					))}
				</Layout>
			);
		} else {
			field = (
				<div {...rest} dataset={value}>
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
	// Skinnable
);

const NumberField = NumberFieldDecorator(NumberFieldBase);

export default NumberField;
