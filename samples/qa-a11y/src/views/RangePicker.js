import Heading from '@enact/sandstone/Heading';
import RangePicker from '@enact/sandstone/RangePicker';
import React from 'react';

const RangePickerView = () => (
	<>
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

		<h2>Customizable aria-labels</h2>
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
	</>
);

export default RangePickerView;
