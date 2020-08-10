import React from 'react';
import {Panel, Header} from '@enact/sandstone/Panels';
import {Scroller} from '@enact/sandstone/Scroller';
import Heading from '@enact/sandstone/Heading';
import RadioItem from '@enact/sandstone/RadioItem';
import Group from '@enact/ui/Group';

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
			<Panel>
				<Header title="Intent to select RadioItem" />
				<Scroller>
					<Heading>RadioItem</Heading>
					<RadioItem>필터</RadioItem>
					<Heading>RadioItem Group - radio</Heading>
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
				</Scroller>
			</Panel>
		);
	}
}

export default IntentSelectRadioItem;
