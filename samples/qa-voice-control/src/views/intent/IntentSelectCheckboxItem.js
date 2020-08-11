import CheckboxItem from '@enact/sandstone/CheckboxItem';
import FormCheckboxItem from '@enact/sandstone/FormCheckboxItem';
import Heading from '@enact/sandstone/Heading';
import {Header} from '@enact/sandstone/Panels';
import {Scroller} from '@enact/sandstone/Scroller';
import Group from '@enact/ui/Group';
import React from 'react';


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
			<>
				<Header title="Intent to select CheckboxItem" />
				<Scroller>
					<Heading>CheckboxItem</Heading>
					<CheckboxItem>필터</CheckboxItem>
					<Heading>CheckboxItem Group - multiple</Heading>
					<Group
						childComponent={CheckboxItem}
						onSelect={this.handleSelect}
						select="multiple"
						selected={this.state.selected}
						selectedProp="selected"
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
			</>
		);
	}
}

export default IntentSelectCheckboxItem;
