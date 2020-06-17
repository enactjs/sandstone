import DatePicker from '@enact/sandstone/DatePicker';
import Heading from '@enact/sandstone/Heading';
import Picker from '@enact/sandstone/Picker';
import RangePicker from '@enact/sandstone/RangePicker';
import React from 'react';
import Scroller from '@enact/sandstone/Scroller';
import TimePicker from '@enact/sandstone/TimePicker';

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
			<Picker aria-valuetext={valueText} onChange={this.handleChange} {...this.props}>{children}</Picker>
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

		<Heading showLine>RangePicker</Heading>
		<RangePicker
			defaultValue={0}
			max={100}
			min={0}
			orientation="horizontal"
			step={5}
			width="medium"
		/>

		<Heading showLine>Joined RangePicker</Heading>
		<RangePicker
			defaultValue={0}
			joined
			max={100}
			min={0}
			orientation="horizontal"
			step={5}
			width="medium"
		/>

		<Heading showLine>Vertical RangePicker</Heading>
		<RangePicker
			defaultValue={0}
			max={100}
			min={0}
			orientation="vertical"
			step={5}
			width="medium"
		/>
		<RangePicker
			defaultValue={0}
			joined
			max={100}
			min={0}
			orientation="vertical"
			step={5}
			width="medium"
		/>

		<Heading showLine>DatePicker</Heading>
		<DatePicker
			title="Date"
		/>

		<Heading showLine>TimePicker</Heading>
		<TimePicker
			title="Time"
		/>

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

		<Heading showLine>RangePicker</Heading>
		<RangePicker
			decrementAriaLabel="Decrement"
			defaultValue={0}
			incrementAriaLabel="Increment"
			max={100}
			min={0}
			orientation="horizontal"
			step={5}
			width="medium"
		/>

		<Heading showLine>Joined RangePicker</Heading>
		<RangePicker
			aria-label="Joined range Picker"
			defaultValue={0}
			joined
			max={100}
			min={0}
			orientation="horizontal"
			step={5}
			width="medium"
		/>

		<Heading showLine>Vertical RangePicker</Heading>
		<RangePicker
			decrementAriaLabel="Decrement"
			defaultValue={0}
			incrementAriaLabel="Increment"
			max={100}
			min={0}
			orientation="vertical"
			step={5}
			width="medium"
		/>
		<RangePicker
			aria-label="Joined range Picker"
			defaultValue={0}
			joined
			max={100}
			min={0}
			orientation="vertical"
			step={5}
			width="medium"
		/>

		<Heading showLine>DatePicker</Heading>
		<DatePicker
			dayAriaLabel="Day picker"
			monthAriaLabel="Month picker"
			title="Date"
			yearAriaLabel="Year picker"
		/>

		<Heading showLine>TimePicker</Heading>
		<TimePicker
			hourAriaLabel="Hour picker"
			meridiemAriaLabel="Meridiem picker"
			minuteAriaLabel="Minute picker"
			title="Time"
		/>
	</Scroller>
);

export default PickerView;
