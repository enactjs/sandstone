import Heading from '@enact/sandstone/Heading';
import {Header} from '@enact/sandstone/Panels';
import Switch from '@enact/sandstone/Switch';
import SwitchItem from '@enact/sandstone/SwitchItem';
import React from 'react';


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
			<>
				<Header title="Intent to set ToggleItem" />
				<Heading>SwitchItem</Heading>
				<SwitchItem>hello</SwitchItem>
				<Switch />
			</>
		);
	}
}

export default IntentSetToggleItem;
