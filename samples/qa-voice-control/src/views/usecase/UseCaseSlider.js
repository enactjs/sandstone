import Item from '@enact/sandstone/Item';
import {Header} from '@enact/sandstone/Panels';
import Slider from '@enact/sandstone/Slider';
import React from 'react';


class UseCaseSlider extends React.Component {
	render () {
		return (
			<>
				<Header title="Slider" />
				<Slider />
				<Item>hello</Item>
			</>
		);
	}
}

export default UseCaseSlider;
