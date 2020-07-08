import Dropdown from '@enact/sandstone/Dropdown';
import React from 'react';

const list = [
	{children: 'Option1', key: 'item1', 'aria-label': 'aria label 1'},
	{children: 'Option2', key: 'item2', 'aria-label': 'aria label 2'},
	{children: 'Option3', key: 'item3', 'aria-label': 'aria label 3'}
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
	};

	render () {
		return (
			<Dropdown
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
	<>
		<Dropdown placeholder="Dropdown without title">
			{['Option1', 'Option2', 'Option3']}
		</Dropdown>
		<br />
		<br />
		<Dropdown placeholder="Dropdown" title="String Array children">
			{['Option1', 'Option2', 'Option3']}
		</Dropdown>
		<br />
		<br />
		<Dropdown aria-label="This is a dropdown" placeholder="Dropdown" title="String Array children with aria-label">
			{['Option1', 'Option2', 'Option3']}
		</Dropdown>
		<br />
		<br />
		<A11yDropdown placeholder="Dropdown" title="Object Array children with item's aria-label">
			{list}
		</A11yDropdown>
		<br />
		<br />
		<A11yDropdown aria-label="This is a dropdown" placeholder="Dropdown" title="Object Array children with component's aria-label and item's aria-label">
			{list}
		</A11yDropdown>
	</>
);

export default DropdownView;
