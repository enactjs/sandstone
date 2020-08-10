import React from 'react';
import {Panel, Header} from '@enact/sandstone/Panels';
import Slider from '@enact/sandstone/Slider';
import Item from '@enact/sandstone/Item';

class UseCaseSlider extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<Panel>
				<Header title="Use Case Slider" />
				<Slider />
				<Item>dummy</Item>
			</Panel>
		);
	}
}

export default UseCaseSlider;
