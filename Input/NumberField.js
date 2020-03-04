import kind from '@enact/core/kind';
import hoc from '@enact/core/hoc';
import {handle, adaptEvent, forward} from '@enact/core/handle';
import PropTypes from 'prop-types';
import React from 'react';
import compose from 'ramda/src/compose';
import Changeable from '@enact/ui/Changeable';
import Layout, {Cell} from '@enact/ui/Layout';

import Skinnable from '../Skinnable';

import NumberCell from './NumberCell';
import {convertToPasswordFormat} from './util';

import componentCss from './Input.module.less';

const NUMBER_LENGTH_LIMIT = 6;

const NumberFieldBase = kind({
	name: 'NumberField',

	propTypes: /** @lends sandstone/Input.NumberField.prototype */ {
		length: PropTypes.number,
		type: PropTypes.oneOf(['number', 'password']),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	},

	defaultProps: {
		length: 4,
		type: 'number'
	},

	styles: {
		css: componentCss,
		className: 'numberField'
	},

	handlers: {
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

	render: ({length, onChange, type, value, ...rest}) => {
		const password = (type === 'password');
		console.log('NumberField value:', value);

		// const inputField = (<input type={type} onChange={onChange} value={value} />);

		if (length <= NUMBER_LENGTH_LIMIT) {
			const values = (value != null) ? value.toString().split('') : [];
			const items = new Array(length).fill('');
			return (
				<Layout aria-label={!password ? values.join(' ') : null} aria-live="polite" {...rest} dataset={value}>
					{items.map((_, index) => (
						<Cell shrink component={NumberCell} key={index} password={password}>
							{values[index]}
						</Cell>
					))}
				</Layout>
			);
		} else {
			return (
				<div {...rest} dataset={value}>
					{password ? convertToPasswordFormat(value) : value}
				</div>
			);
		}
	}
});

// Attempt to directly fire 'onChange' when the incoming props value changes
const FieldDecorator = hoc((configHoc, Wrapped) => {
	return class extends React.Component {
		static displayName = 'FieldDecorator';

		static propTypes = {
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		}

		constructor (props) {
			super(props);

			this.state = {
				value: props.value
			};
		}

		static getDerivedStateFromProps (props, state) {
			if (props.value !== state.value) {
				if (props.onChange) props.onChange({value: props.value}, props, {}); // don't have context here, so just pass empty object I guess :(
				console.log('FieldDecorator getDerivedStateFromProps:', props.value);
				return {
					value: props.value
				};
			}

			return null;
		}


		render () {
			return (<Wrapped {...this.props} />);
		}
	};
});

const NumberFieldDecorator = compose(
	Changeable,
	FieldDecorator,
	Skinnable
);

const NumberField = NumberFieldDecorator(NumberFieldBase);

export default NumberField;
