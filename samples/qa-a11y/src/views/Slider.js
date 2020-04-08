import Heading from '@enact/sandstone/Heading';
import IncrementSlider from '@enact/sandstone/IncrementSlider';
import PropTypes from 'prop-types';
import React from 'react';
import Slider from '@enact/sandstone/Slider';

class CustomIncrementSlider extends React.Component {
	static propTypes = {
		customText: PropTypes.string
	}

	constructor (props) {
		super(props);
		this.state = {
			value: 0
		};
	}

	handleChange = (ev) => this.setState({value: ev.value})

	render () {
		const valueText = `${this.props.customText} ${this.state.value}`;

		return (
			<IncrementSlider aria-valuetext={valueText} onChange={this.handleChange} value={this.state.value} />
		);
	}
}

const SliderView = () => (
	<div>
		<Heading showLine>Default</Heading>
		<Slider />
		<Heading showLine>IncrementSlider</Heading>
		<IncrementSlider />
		<Heading showLine>IncrementSlider with customizable aria-labels</Heading>
		<IncrementSlider decrementAriaLabel="Decrement" incrementAriaLabel="Increment" />
		<Heading showLine>IncrementSlider using ValueText</Heading>
		<CustomIncrementSlider customText="Volume" />
	</div>
);

export default SliderView;
