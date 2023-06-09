import kind from '@enact/core/kind';
import React from 'react';
import Slider from '@enact/sandstone/Slider';

const SliderView = kind({
	name: 'SliderView',

	render: () => (
		<Slider id="slider" min={0} max={100} defaultValue={0} />
	)
});

export default SliderView;
