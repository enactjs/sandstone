import Heading from '@enact/sandstone/Heading';
import Picker from '@enact/sandstone/Picker';
import Scroller from '@enact/sandstone/Scroller';
import React from 'react';

const
	airports = [
		'San Francisco Airport Terminal Gate 1',
		'Boston Airport Terminal Gate 2',
		'Tokyo Airport Terminal Gate 3',
		'נמל התעופה בן גוריון טרמינל הבינלאומי'
	],
	subjects = ['English', 'Maths', 'Korean', 'Science', 'History'],
	subjectValue = ['80', '90', '100', '70', '50'];

class CustomPicker extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			index: 0
		};
	}

	handleChange = (ev) => this.setState({index: ev.value})

	render () {
		const
			{index} = this.state,
			{children} = this.props,
			valueText = `${children[index]} ${subjectValue[index]}`;

		return (
			<Picker {...this.props} aria-valuetext={valueText} onChange={this.handleChange}>{children}</Picker>
		);
	}
}

const PickerView = () => (
	<Scroller>
		<h2>Default</h2>
		<Heading showLine>Picker</Heading>
		<Picker
			orientation="horizontal"
			width="medium"
		>
			{airports}
		</Picker>

		<Heading showLine>Picker With Accessibility Value</Heading>
		<CustomPicker
			orientation="horizontal"
			width="medium"
		>
			{subjects}
		</CustomPicker>

		<Heading showLine>Joined Picker</Heading>
		<Picker
			joined
			orientation="horizontal"
			width="medium"
		>
			{airports}
		</Picker>

		<Heading showLine>Vertical Picker</Heading>
		<Picker
			orientation="vertical"
			width="medium"
		>
			{airports}
		</Picker>
		<Picker
			joined
			orientation="vertical"
			width="medium"
		>
			{airports}
		</Picker>

		<h2>Customizable aria-labels</h2>
		<Heading showLine>Picker</Heading>
		<Picker
			decrementAriaLabel="Decrement"
			incrementAriaLabel="Increment"
			orientation="horizontal"
			width="medium"
		>
			{airports}
		</Picker>

		<Heading showLine>Picker With Accessibility Value</Heading>
		<CustomPicker
			decrementAriaLabel="Decrement"
			incrementAriaLabel="Increment"
			orientation="horizontal"
			width="medium"
		>
			{subjects}
		</CustomPicker>

		<Heading showLine>Joined Picker</Heading>
		<Picker
			aria-label="Joined Picker"
			joined
			orientation="horizontal"
			width="medium"
		>
			{airports}
		</Picker>

		<Heading showLine>Vertical Picker</Heading>
		<Picker
			decrementAriaLabel="Decrement"
			incrementAriaLabel="Increment"
			orientation="vertical"
			width="medium"
		>
			{airports}
		</Picker>
		<Picker
			aria-label="Joined Picker"
			joined
			orientation="vertical"
			width="medium"
		>
			{airports}
		</Picker>
	</Scroller>
);

export default PickerView;
