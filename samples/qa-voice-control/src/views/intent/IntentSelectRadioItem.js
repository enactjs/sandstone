import Heading from '@enact/sandstone/Heading';
import {Header} from '@enact/sandstone/Panels';
import RadioItem from '@enact/sandstone/RadioItem';
import {Scroller} from '@enact/sandstone/Scroller';
import Group from '@enact/ui/Group';
import React from 'react';


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
			<>
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
			</>
		);
	}
}

export default IntentSelectRadioItem;
