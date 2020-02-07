import Slider from '../../../../Slider';
import React from 'react';

// TODO: progressAnchor, RTL, disabled

const SliderTests = [
	<Slider />,
	<Slider defaultValue={50} />,
	<Slider value={50} />,
	<Slider disabled />,
	<Slider defaultValue={50} disabled />,
	<Slider value={50} noFill />,
	<Slider value={100} />,
	<Slider min={-50} />,
	<Slider max={50} />,
	<Slider max={50} value={50} />,
	<Slider orientation="vertical" />,
	<Slider orientation="vertical" defaultValue={50} />,
	<Slider orientation="vertical" value={50} />,
	<Slider orientation="vertical" value={50} noFill />,
	<Slider orientation="vertical" value={100} />,
	<Slider orientation="vertical" defaultValue={50} disabled />,
	<Slider orientation="vertical" min={-50} />,
	<Slider orientation="vertical" max={50} />,
	<Slider orientation="vertical" max={50} value={50} />
];
export default SliderTests;
