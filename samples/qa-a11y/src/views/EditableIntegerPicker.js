import EditableIntegerPicker from '../../../../../EditableIntegerPicker';
import Heading from '../../../../../Heading';
import Scroller from '../../../../../Scroller';
import PropTypes from 'prop-types';
import React from 'react';

class EditableIntegerPickerWithAriaText extends React.Component {
	static propTypes = {
		defaultValue: PropTypes.number,
		unit: PropTypes.string
	}

	static defaultProps = {
		defaultValue: 0,
		unit: ''
	}

	constructor (props) {
		super(props);
		this.state = {
			value: props.defaultValue
		};
	}

	handleChange = (ev) => this.setState({value: ev.value})

	render () {
		const
			{value} = this.state,
			text = 'The current length is ' + value + this.props.unit;

		return (
			<EditableIntegerPicker {...this.props} aria-valuetext={text} onChange={this.handleChange} />
		);
	}
}

const EditableIntegerPickerView = () => (
	<Scroller focusableScrollbar>
		<Heading showLine>Default</Heading>
		<EditableIntegerPicker
			min={0}
			max={10}
		/>

		<Heading showLine>Vertical/Horizontal</Heading>
		<EditableIntegerPicker
			defaultValue={10}
			min={0}
			max={50}
			orientation="vertical"
			step={5}
			unit="cm"
		/>
		<EditableIntegerPicker
			defaultValue={10}
			min={0}
			max={50}
			step={5}
			unit="cm"
		/>

		<Heading showLine>Customizable aria-valuetext</Heading>
		<EditableIntegerPickerWithAriaText
			defaultValue={10}
			min={0}
			max={50}
			step={5}
			unit="cm"
		/>
	</Scroller>
);

export default EditableIntegerPickerView;
