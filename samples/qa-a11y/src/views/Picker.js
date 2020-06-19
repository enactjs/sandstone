import DatePicker, {dateToLocaleString} from '@enact/sandstone/DatePicker';
import DayPicker from '@enact/sandstone/DayPicker';
import {FixedPopupPanels, Header, Panel} from '@enact/sandstone/FixedPopupPanels';
import Heading from '@enact/sandstone/Heading';
import Item from '@enact/sandstone/Item';
import Picker from '@enact/sandstone/Picker';
import RangePicker from '@enact/sandstone/RangePicker';
import Scroller from '@enact/sandstone/Scroller';
import TimePicker, {timeToLocaleString} from '@enact/sandstone/TimePicker';
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
			<Picker aria-valuetext={valueText} onChange={this.handleChange} {...this.props}>{children}</Picker>
		);
	}
}

class DatePickerItem extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			open: false,
			value: null
		};
	}

	handleClose = () => this.setState({open: false})
	handleOpen = () => this.setState({open: true})
	handleChange = ({value}) => this.setState({value: dateToLocaleString(value)})

	render () {
		return (
			<>
				<Item label={this.state.value || 'Not selected'} onClick={this.handleOpen}>Date</Item>
				<FixedPopupPanels
					onClose={this.handleClose}
					open={this.state.open}
				>
					<Panel>
						<Header>
							<title>Header Title</title>
							<subtitle>Subtitle</subtitle>
						</Header>
						<DatePicker
							onChange={this.handleChange}
							{...this.props}
						/>
					</Panel>
				</FixedPopupPanels>
			</>
		);
	}
}

class DayPickerItem extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			content: null,
			open: false
		};
	}

	handleClose = () => this.setState({open: false})
	handleOpen = () => this.setState({open: true})
	handleSelect = ({content}) => this.setState({content: content})

	render () {
		return (
			<>
				<Item label={this.state.content || 'Not selected'} onClick={this.handleOpen}>Day</Item>
				<FixedPopupPanels
					onClose={this.handleClose}
					open={this.state.open}
				>
					<Panel>
						<Header>
							<title>Header Title</title>
							<subtitle>Subtitle</subtitle>
						</Header>
						<DayPicker
							onSelect={this.handleSelect}
							{...this.props}
						/>
					</Panel>
				</FixedPopupPanels>
			</>
		);
	}
}

class TimePickerItem extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			open: false,
			value: null
		};
	}

	handleClose = () => this.setState({open: false})
	handleOpen = () => this.setState({open: true})
	handleChange = ({value}) => this.setState({value: timeToLocaleString(value)})

	render () {
		return (
			<>
				<Item label={this.state.value || 'Not selected'} onClick={this.handleOpen}>Time</Item>
				<FixedPopupPanels
					onClose={this.handleClose}
					open={this.state.open}
				>
					<Panel>
						<Header>
							<title>Header Title</title>
							<subtitle>Subtitle</subtitle>
						</Header>
						<TimePicker
							onChange={this.handleChange}
							{...this.props}
						/>
					</Panel>
				</FixedPopupPanels>
			</>
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
		<DatePickerItem
			title="Date"
		/>

		<Heading showLine>DayPicker</Heading>
		<DayPickerItem
			title="Day"
		/>

		<Heading showLine>TimePicker</Heading>
		<TimePickerItem
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
		<DatePickerItem
			dayAriaLabel="Day picker"
			monthAriaLabel="Month picker"
			title="Date"
			yearAriaLabel="Year picker"
		/>

		<Heading showLine>TimePicker</Heading>
		<TimePickerItem
			hourAriaLabel="Hour picker"
			meridiemAriaLabel="Meridiem picker"
			minuteAriaLabel="Minute picker"
			title="Time"
		/>
	</Scroller>
);

export default PickerView;
