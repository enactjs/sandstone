import Heading from '@enact/sandstone/Heading';
import SwitchItem from '@enact/sandstone/SwitchItem';
import React from 'react';

import CommonView from '../../components/CommonView';


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
			<CommonView title="Intent to set ToggleItem">
				<Heading>SwitchItem</Heading>
				<SwitchItem data-testid="hello">Hello</SwitchItem>
			</CommonView>
		);
	}
}

export default IntentSetToggleItem;
