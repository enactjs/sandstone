import SwitchItem from '@enact/sandstone/SwitchItem';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

const SwitchItemView = () => (
	<>
		<SwitchItem>Text</SwitchItem>
		<SwitchItem disabled>Text</SwitchItem>
		<SwitchItem aria-label="This is a SwitchItem">Text</SwitchItem>
		<SwitchItem aria-label="This is a SwitchItem" disabled>Text</SwitchItem>
	</>
);

export default SwitchItemView;
