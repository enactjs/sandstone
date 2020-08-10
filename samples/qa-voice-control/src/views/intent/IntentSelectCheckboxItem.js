import React from 'react';
import {Panel, Header} from '@enact/sandstone/Panels';
import {Scroller} from '@enact/sandstone/Scroller';
import Heading from '@enact/sandstone/Heading';
import Group from '@enact/ui/Group';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import FormCheckboxItem from '@enact/sandstone/FormCheckboxItem';

class IntentSelectCheckboxItem extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			selected: [0, 1]
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
				<Header title="Intent to select CheckboxItem" />
				<Scroller>
					<Heading>CheckboxItem</Heading>
					<CheckboxItem>필터</CheckboxItem>
					<Heading>CheckboxItem Group - multiple</Heading>
					<Group
						childComponent={CheckboxItem}
						select="multiple"
						selectedProp="selected"
						selected={this.state.selected}
						onSelect={this.handleSelect}
					>
						{[
							'사과',
							'바나나',
							'호두'
						]}
					</Group>
					<Heading>FormCheckboxItem</Heading>
					<FormCheckboxItem>토끼</FormCheckboxItem>
				</Scroller>
			</Panel>
		);
	}
}

export default IntentSelectCheckboxItem;
