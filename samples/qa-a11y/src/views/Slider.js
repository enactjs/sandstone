import Button from '@enact/sandstone/Button';
import Slider from '@enact/sandstone/Slider';
import PropTypes from 'prop-types';
import React from 'react';

import Section from '../components/Section';

class CustomSlider extends React.Component {
	static propTypes = {
		customText: PropTypes.string
	};

	constructor (props) {
		super(props);
		this.state = {
			value: 0
		};
	}

	handleChange = (ev) => this.setState({value: ev.value});

	render () {
		const {customText, ...rest} = this.props;
		const valueText = `${customText} ${this.state.value}`;

		return (
			<Slider aria-valuetext={valueText} onChange={this.handleChange} value={this.state.value} {...rest} />
		);
	}
}

const SliderView = () => (
	<>
		<Section title="Default">
			<Slider alt="Normal" />
			<Slider alt="Disabled" disabled />
		</Section>
		<br />
		<br />
		<Section title="Aria-ValueText">
			<CustomSlider alt="Aria-valuetext" customText="This is Volume" />
			<CustomSlider alt="Aria-valuetext and disabled" customText="This is Volume" disabled />
		</Section>
		<br />
		<br />
		<Button>To Escape to the Left via 5-way Left</Button>
	</>
);

export default SliderView;
