import Heading from '../../../../../Heading';
import ExpandableList from '../../../../../ExpandableList';
import Layout, {Cell} from '@enact/ui/Layout';
import React from 'react';
import Scroller from '../../../../../Scroller';

const
	data = [
		{
			ariaLabel: 'First option',
			value: 'option1'
		},
		{
			ariaLabel: 'Second option',
			value: 'option2'
		},
		{
			ariaLabel: 'Third option',
			value: 'option3'
		}
	],
	noneText = 'nothing selected',
	title = 'title';

class CustomExpandableList extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			label: noneText
		};
	}

	onSelect = ({selected}) => {
		if (selected) { // case with 'multiple' select prop in ExpandableList
			let label = '';
			for (let i = 0; i < selected.length; i++) {
				label = label + data[selected[i]].ariaLabel + ', ';
			}
			this.setState({label: label});
		} else { // Nothing selected in ExpandableList
			this.setState({label: noneText});
		}
	}

	render () {
		return (
			<ExpandableList
				aria-label={title + ' ' + this.state.label}
				noneText={noneText}
				onSelect={this.onSelect}
				select="multiple"
				title={title}
			>
				{data.map((o, i) => ({key: i, children: o.value, 'aria-label': o.ariaLabel}))}
			</ExpandableList>
		);
	}
}

const ExpandableListView = () => (
	<Layout orientation="vertical">
		<Cell component={Scroller} focusableScrollbar>
			<Heading showLine>Default</Heading>
			<ExpandableList
				noneText={noneText}
				select="multiple"
				title={title}
			>
				{['option1', 'option2', 'option3']}
			</ExpandableList>
			<Heading showLine>Customizable aria-labels</Heading>
			<CustomExpandableList />
		</Cell>
	</Layout>
);

export default ExpandableListView;
