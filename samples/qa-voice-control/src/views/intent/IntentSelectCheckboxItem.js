import CheckboxItem from '@enact/sandstone/CheckboxItem';
import FormCheckboxItem from '@enact/sandstone/FormCheckboxItem';
import Heading from '@enact/sandstone/Heading';
import Group from '@enact/ui/Group';
import React from 'react';

import CommonView from '../../components/CommonView';


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
			<CommonView title="Intent to select CheckboxItem">
				<Heading>CheckboxItem</Heading>
				<CheckboxItem data-testid="orange">오렌지</CheckboxItem>
				<Heading>CheckboxItem Group - multiple selection</Heading>
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
				<FormCheckboxItem data-testid="rabbit">토끼</FormCheckboxItem>
			</CommonView>
		);
	}
}

export default IntentSelectCheckboxItem;
