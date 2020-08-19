import Heading from '@enact/sandstone/Heading';
import RadioItem from '@enact/sandstone/RadioItem';
import Group from '@enact/ui/Group';
import React from 'react';

import CommonView from '../../components/CommonView';


class IntentSelectRadioItem extends React.Component {
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
			<CommonView title="Intent to select RadioItem">
				<Heading>RadioItem</Heading>
				<RadioItem>필터</RadioItem>
				<Heading>RadioItem Group - radio selection</Heading>
				<Group
					childComponent={RadioItem}
					select="radio"
					selectedProp="selected"
					selected={this.state.selected}
					onSelect={this.handleSelect}
				>
					{[
						'사진',
						'바나나',
						'음악'
					]}
				</Group>
			</CommonView>
		);
	}
}

export default IntentSelectRadioItem;
