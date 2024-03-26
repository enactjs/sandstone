/* eslint-disable react/jsx-no-bind */

import Dropdown from '@enact/sandstone/Dropdown';
import {useState} from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const list = [
	{children: 'Option0', key: 'item0'},
	{children: 'Option1', key: 'item1'},
	{children: 'Option2', key: 'item2'}
];

const ariaLabelList = [
	{'aria-label': 'This is an Option 0.'},
	{'aria-label': 'This is an Option 1.'},
	{'aria-label': 'This is an Option 2.'}
];

const ariaLabelledList = list.map((item, index) => ({...item, ...ariaLabelList[index]}));

const disabledList = ariaLabelledList.map(item => ({...item, disabled: true}));

const A11yDropdown = (props) => {
	const [ariaLabel, setAriaLabel] = useState(null);

	const onSelect = ({selected}) => {
		setAriaLabel(ariaLabelledList[selected]['aria-label']);
	};

	return (
		<Dropdown
			aria-label={ariaLabel}
			onSelect={onSelect}
			{...props /* Can be overridden the aria-label with this.props['aria-label'] */}
		/>
	);
};

const DropdownView = () => (
	<>
		<Section title="String array as the children prop">
			<Dropdown
				alt="With Placeholder"
				placeholder="Placeholder"
			>
				{['Option 0', 'Option 1', 'Option 2']}
			</Dropdown>
			<br />
			<Dropdown
				alt="With Placeholder and title"
				placeholder="Placeholder"
				title="Title"
			>
				{['Option 0', 'Option 1', 'Option 2']}
			</Dropdown>
			<br />
			<Dropdown
				alt="Disabled with Placeholder and title"
				disabled
				placeholder="Placeholder"
				title="Title"
			>
				{['Option 0', 'Option 1', 'Option 2']}
			</Dropdown>
			<br />
			<Dropdown
				alt="Aria-lablelled with Placeholder and title (Should not read title and Placeholder)"
				aria-label="This is a Label."
				placeholder="Placeholder"
				title="Title"
			>
				{['Option 0', 'Option 1', 'Option 2']}
			</Dropdown>
			<br />
			<Dropdown
				alt="Aria-lablelled and Disabled with Placeholder and title (Should not read title and Placeholder)"
				aria-label="This is a Label."
				disabled
				placeholder="Placeholder"
				title="Title"
			>
				{['Option 0', 'Option 1', 'Option 2']}
			</Dropdown>
		</Section>

		<Section className={appCss.marginTop} title="Object array as the children prop">
			<Dropdown
				alt="With Placeholder and Title"
				placeholder="Placeholder"
				title="Title"
			>
				{list}
			</Dropdown>
			<br />
			<Dropdown
				alt="With Placeholder, Title, and Aria-labelled Disabled Options"
				placeholder="Placeholder"
				title="Title"
			>
				{disabledList}
			</Dropdown>
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled Dropdown based on selected option's aria-label">
			<A11yDropdown
				alt="Aria-labelled with Placeholder, Title and Aria-labelled Options (Should not read title and Placeholder)"
				aria-label="This is a Label."
				placeholder="Placeholder"
				title="Title"
			>
				{ariaLabelledList}
			</A11yDropdown>
		</Section>
	</>
);

export default DropdownView;
