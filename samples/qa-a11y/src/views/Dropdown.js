import Dropdown from '@enact/sandstone/Dropdown';
import Layout, {Cell} from '@enact/ui/Layout';
import React from 'react';
import Scroller from '@enact/sandstone/Scroller';

const list = [
	{children: 'Option1', key: 'item1', 'aria-label': 'aria label 1'},
	{children: 'Option2', key: 'item2', 'aria-label': 'aria label 2'},
	{children: 'Option3', key: 'item3', 'aria-label': 'arai label 3'}
];

class A11yDropdown extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			ariaLabel: null
		};
	}

	onSelect = ({selected}) => {
		this.setState({ariaLabel: list[selected]['aria-label']});
	}

	render () {
		return (
			<Dropdown
				aria-label={this.state.ariaLabel}
				onSelect={this.onSelect}
				title="Dropdown"
				{...this.props}
			>
				{list}
			</Dropdown>
		);
	}
}

const DropdownView = () => (
	<Layout orientation="vertical">
		<Cell component={Scroller} focusableScrollbar>
			<Dropdown placeholder="Dropdown" title="String Array children">
				{['Option1', 'Option2', 'Option3']}
			</Dropdown>
			<br />
			<br />
			<A11yDropdown placeholder="Dropdown" title="Object Array children with aria-label">
				{list}
			</A11yDropdown>
		</Cell>
	</Layout>
);

export default DropdownView;
