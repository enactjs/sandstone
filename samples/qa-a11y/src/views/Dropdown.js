import Dropdown from '@enact/sandstone/Dropdown';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

const list = [
	{children: 'Option1', key: 'item1', 'aria-label': 'aria label 1'},
	{children: 'Option2', key: 'item2', 'aria-label': 'aria label 2'},
	{children: 'Option3', key: 'item3', 'aria-label': 'aria label 3'}
];

const disabledList = list.map(item => ({...item, disabled: true}));

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
		const {children} = this.props;

		return (
			<Dropdown
				onSelect={this.onSelect}
				aria-label={this.state.ariaLabel}
				{...this.props /* Can be overridden the aria-label with this.props['aria-label'] */}
			>
				{children}
			</Dropdown>
		);
	}
}

const DropdownView = () => (
	<>
		<Section title="String array as the children prop">
			<Dropdown
				alt="selected With Placeholder"
				placeholder="Placeholder"
				selected={2}
			>
				{['Option1', 'Option2', 'Option3']}
			</Dropdown>
			<Dropdown
				alt="With Placeholder and title"
				placeholder="Placeholder"
				title="Title"
			>
				{['Option1', 'Option2', 'Option3']}
			</Dropdown>
			<Dropdown
				alt="Disabled with Placeholder and title"
				disabled
				placeholder="Placeholder"
				title="Title"
			>
				{['Option1', 'Option2', 'Option3']}
			</Dropdown>
			<Dropdown
				alt="Aria-lablelled with Placeholder and title"
				aria-label="This is a Dropdown."
				placeholder="Placeholder"
				title="Title"
			>
				{['Option1', 'Option2', 'Option3']}
			</Dropdown>
			<Dropdown
				alt="Aria-lablelled and disabled with Placeholder and title"
				aria-label="This is a Dropdown."
				disabled
				placeholder="Placeholder"
				title="Title"
			>
				{['Option1', 'Option2', 'Option3']}
			</Dropdown>
		</Section>

		<Section className={css.marginTop} title="Object array as the children prop">
			<Dropdown
				alt="With Placeholder and Title"
				placeholder="Placeholder"
				title="Title"
			>
				{list}
			</Dropdown>
			<Dropdown
				alt="With Placeholder, Title, and Aria-labelled Disabled Options"
				placeholder="Placeholder"
				title="Title"
			>
				{disabledList}
			</Dropdown>
		</Section>

		<Section className={css.marginTop} title="Aria-labelled Dropdown based on selected option's aria-label">
			<A11yDropdown
				aria-label="This is a Dropdown."
				placeholder="Placeholder"
				title="Title"
			>
				{list}
			</A11yDropdown>
		</Section>
	</>
);

export default DropdownView;
