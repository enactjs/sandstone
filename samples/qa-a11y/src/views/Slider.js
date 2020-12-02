/* eslint-disable react/jsx-no-bind */

import Button from '@enact/sandstone/Button';
import Slider from '@enact/sandstone/Slider';
import PropTypes from 'prop-types';
import React from 'react';

import Section from '../components/Section';

const CustomSlider = ({customText, ...rest}) => {
	const [value, setValue] = React.useState(0);
	const valueText = `${customText} ${value}`;

	const handleChange = (ev) => setValue(ev.value);

		return (
			<Slider aria-valuetext={valueText} onChange={handleChange} value={value} {...rest} />
		);
};

CustomSlider.propTypes = {
	customText: PropTypes.string
};

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
