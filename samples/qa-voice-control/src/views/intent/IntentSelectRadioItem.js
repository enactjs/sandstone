import Heading from '@enact/sandstone/Heading';
import RadioItem from '@enact/sandstone/RadioItem';
import Group from '@enact/ui/Group';
import {Component} from 'react';

import CommonView from '../../components/CommonView';


class IntentSelectRadioItem extends Component {
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
				<RadioItem data-testid="apple">사과</RadioItem>
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
