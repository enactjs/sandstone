import SwitchItem from '@enact/sandstone/SwitchItem';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

const SwitchItemView = () => (
	<>
		<Section title="Default">
			<SwitchItem alt="Normal">Text</SwitchItem>
			<SwitchItem alt="Disabled" disabled>Text</SwitchItem>
		</Section>

		<Section className={css.marginTop} title="Aria-labelled">
			<SwitchItem alt="Aria-labelled" aria-label="This is a Label.">Text</SwitchItem>
			<SwitchItem alt="Aria-labelled and Disabled" aria-label="This is a Label." disabled>Text</SwitchItem>
		</Section>
	</>
);

export default SwitchItemView;
