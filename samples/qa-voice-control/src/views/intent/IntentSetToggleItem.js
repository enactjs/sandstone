import React from 'react';
import {Panel, Header} from '@enact/sandstone/Panels';
import Heading from '@enact/sandstone/Heading';
import Switch from '@enact/sandstone/Switch';
import SwitchItem from '@enact/sandstone/SwitchItem';

class IntentSetToggleItem extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			selected: 0
		};
	}

	handleSelect = (e) => {
		this.setState({
			selected: e.selected
		});
	};

	render () {
		return (
			<Panel>
				<Header title="Intent to set ToggleItem" />
				<Heading>SwitchItem</Heading>
				<SwitchItem>hello</SwitchItem>
				<Switch />
			</Panel>
		);
	}
}

export default IntentSetToggleItem;
