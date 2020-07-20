import Picker from '@enact/sandstone/Picker';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

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
	<>
		<h2>Default</h2>

		<Section className={css.marginTop} title="Horizontal">
			<Picker
				alt="Horizontal"
				orientation="horizontal"
				width="medium"
			>
				{airports}
			</Picker>

			<Picker
				alt="Horizontal and Disabled"
				disabled
				orientation="horizontal"
				width="medium"
			>
				{airports}
			</Picker>
		</Section>

		<Section className={css.marginTop} title="Horizontal and Joined">
			<Picker
				alt="Horizontal and Joined"
				joined
				orientation="horizontal"
				width="medium"
			>
				{airports}
			</Picker>

			<Picker
				alt="Horizontal, Joined, and Disabled"
				disabled
				joined
				orientation="horizontal"
				width="medium"
			>
				{airports}
			</Picker>
		</Section>

		<Section className={css.marginTop} title="Vertical" vertical>
			<Picker
				alt="Vertical"
				orientation="vertical"
				width="medium"
			>
				{airports}
			</Picker>

			<Picker
				alt="Vertical and Joined"
				joined
				orientation="vertical"
				width="medium"
			>
				{airports}
			</Picker>

			<Picker
				alt="Vertical and Disabled"
				disabled
				orientation="vertical"
				width="medium"
			>
				{airports}
			</Picker>

			<Picker
				alt="Vertical, Joined, and Disabled"
				disabled
				joined
				orientation="vertical"
				width="medium"
			>
				{airports}
			</Picker>
		</Section>

		<h2 className={css.headerMarginTop}>decrementAriaLabel and incrementAriaLabel</h2>

		<Section className={css.marginTop} title="Horizontal">
			<Picker
				alt="Horizontal"
				decrementAriaLabel="This is a Label 1."
				incrementAriaLabel="This is a Label 2."
				orientation="horizontal"
				width="medium"
			>
				{airports}
			</Picker>

			<Picker
				alt="Horizontal and Disabled"
				decrementAriaLabel="This is a Label 1."
				disabled
				incrementAriaLabel="This is a Label 2."
				orientation="horizontal"
				width="medium"
			>
				{airports}
			</Picker>
		</Section>

		<Section className={css.marginTop} title="Horizontal and Joined">
			<Picker
				alt="Horizontal and Joined"
				decrementAriaLabel="This is a Label 1."
				incrementAriaLabel="This is a Label 2."
				joined
				orientation="horizontal"
				width="medium"
			>
				{airports}
			</Picker>

			<Picker
				alt="Horizontal, Joined, and Disabled"
				decrementAriaLabel="This is a Label 1."
				disabled
				incrementAriaLabel="This is a Label 2."
				joined
				orientation="horizontal"
				width="medium"
			>
				{airports}
			</Picker>
		</Section>

		<Section className={css.marginTop} title="Vertical" vertical>
			<Picker
				alt="Vertical"
				decrementAriaLabel="Decrement"
				incrementAriaLabel="Increment"
				orientation="vertical"
				width="medium"
			>
				{airports}
			</Picker>

			<Picker
				alt="Vertical and Joined"
				decrementAriaLabel="Decrement"
				incrementAriaLabel="Increment"
				joined
				orientation="vertical"
				width="medium"
			>
				{airports}
			</Picker>

			<Picker
				alt="Vertical and Disabled"
				decrementAriaLabel="Decrement"
				disabled
				incrementAriaLabel="Increment"
				orientation="vertical"
				width="medium"
			>
				{airports}
			</Picker>

			<Picker
				alt="Vertical, Joined, and Disabled"
				decrementAriaLabel="Decrement"
				disabled
				incrementAriaLabel="Increment"
				joined
				orientation="vertical"
				width="medium"
			>
				{airports}
			</Picker>
		</Section>

		<h2 className={css.headerMarginTop}>Aria-labelled</h2>

		<Section className={css.marginTop} title="Horizontal">
			<Picker
				alt="Horizontal"
				aria-label="This is a Label 0."
				orientation="horizontal"
				width="medium"
			>
				{airports}
			</Picker>

			<Picker
				alt="Horizontal and Disabled"
				aria-label="This is a Label 1."
				disabled
				orientation="horizontal"
				width="medium"
			>
				{airports}
			</Picker>
		</Section>

		<Section className={css.marginTop} title="Horizontal and Joined">
			<Picker
				alt="Horizontal and Joined"
				aria-label="This is a Label 2."
				joined
				orientation="horizontal"
				width="medium"
			>
				{airports}
			</Picker>

			<Picker
				alt="Horizontal, Joined, and Disabled"
				aria-label="This is a Label 3."
				disabled
				joined
				orientation="horizontal"
				width="medium"
			>
				{airports}
			</Picker>
		</Section>

		<Section className={css.marginTop} title="Vertical" vertical>
			<Picker
				alt="Vertical"
				aria-label="This is a Label 4."
				orientation="vertical"
				width="medium"
			>
				{airports}
			</Picker>

			<Picker
				alt="Vertical and Joined"
				aria-label="This is a Label 5."
				joined
				orientation="vertical"
				width="medium"
			>
				{airports}
			</Picker>

			<Picker
				alt="Vertical and Disabled"
				aria-label="This is a Label 6."
				disabled
				orientation="vertical"
				width="medium"
			>
				{airports}
			</Picker>

			<Picker
				alt="Vertical, Joined, and Disabled"
				aria-label="This is a Label 7."
				disabled
				joined
				orientation="vertical"
				width="medium"
			>
				{airports}
			</Picker>
		</Section>

		<h2 className={css.headerMarginTop}>Aria-labelled based on selected Item</h2>

		<Section className={css.marginTop} title="Aria-labelled based on selected Item">
			<CustomPicker
				alt="Horizontal"
				orientation="horizontal"
				width="medium"
			>
				{subjects}
			</CustomPicker>
			<CustomPicker
				alt="Horizontal and Disabled"
				disabled
				orientation="horizontal"
				width="medium"
			>
				{subjects}
			</CustomPicker>
		</Section>

		<Section className={css.marginTop} title="With decrementAriaLabel and incrementAriaLabel">
			<CustomPicker
				alt="Horizontal"
				decrementAriaLabel="Decrement"
				incrementAriaLabel="Increment"
				orientation="horizontal"
				width="medium"
			>
				{subjects}
			</CustomPicker>
		</Section>
	</>
);

export default PickerView;
