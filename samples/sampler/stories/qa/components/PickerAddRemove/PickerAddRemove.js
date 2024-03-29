import {Component} from 'react';
import PropTypes from 'prop-types';

import Button from '@enact/sandstone/Button';
import Input from '@enact/sandstone/Input';
import Picker from '@enact/sandstone/Picker';

class PickerAddRemove extends Component {
	static displayName = 'PickerAddRemove';

	static propTypes = {
		disabled: PropTypes.bool,
		joined: PropTypes.bool,
		noAnimation: PropTypes.bool,
		orientation: PropTypes.string,
		width: PropTypes.string,
		wrap: PropTypes.bool
	};

	static defaultProps = {
		disabled: false,
		joined: false,
		noAnimation: false,
		orientation: 'horizontal',
		width: 'medium',
		wrap: false
	};

	constructor (props) {
		super(props);

		this.state = {
			children: {
				0 : ''
			},
			inputIndex: 0,
			inputValue: '',
			value: 0
		};
	}

	handleAddReplace = () => {
		const children = this.state.children,
			index = this.state.inputIndex,
			value = this.state.inputValue || 'sample ' + index,
			newChild = {};

		newChild[index] = value;
		const newChildren = Object.assign({}, children, newChild);

		this.setState(({inputIndex}) => ({
			children: newChildren,
			inputIndex: inputIndex + 1,
			inputValue: ''
		}));
	};

	handleRemove = () => {
		this.setState(({children, inputIndex, value}) => {
			children = Object.assign({}, children);
			delete children[inputIndex];

			return ({
				children: children,
				value: Math.max(value - 1, 0)
			});
		});
	};

	handleValueUpdate = ({value}) => {
		this.setState({value});
	};

	handleIndexChange = ({value}) => {
		let index = parseInt(value);
		if (isNaN(index)) {
			index = 0;
		}
		this.setState({inputIndex: index});
	};

	handleValueChange = ({value}) => {
		this.setState({inputValue: value});
	};

	render () {
		const pickerChildren = Object.values(this.state.children);

		return (
			<div>
				<div>
					<Picker
						onChange={this.handleValueUpdate}
						value={this.state.value}
						{...this.props}
					>
						{pickerChildren}
					</Picker>
				</div>
				<div>
					Value:
					<Input
						onChange={this.handleValueChange}
						placeholder="value"
						value={this.state.inputValue}
					/>
				</div>
				<div>
					Index:
					<Input
						onChange={this.handleIndexChange}
						placeholder="index"
						value={this.state.inputIndex}
					/>
				</div>
				<Button onClick={this.handleAddReplace}>
					Add/Replace
				</Button>
				<Button onClick={this.handleRemove}>
					Remove
				</Button>
			</div>
		);
	}
}

export default PickerAddRemove;
