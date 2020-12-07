import SwitchItem from '@enact/sandstone/SwitchItem';
import React from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const SwitchItemView = () => (
	<>
		<Section title="Default">
			<SwitchItem alt="Normal">Text 0</SwitchItem>
			<SwitchItem alt="Disabled" disabled>Text 1</SwitchItem>
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<SwitchItem alt="Aria-labelled" aria-label="This is a Label 0.">Text 0</SwitchItem>
			<SwitchItem alt="Aria-labelled and Disabled" aria-label="This is a Label 1." disabled>Text 1</SwitchItem>
		</Section>
	</>
);

export default SwitchItemView;
