import Switch from '@enact/sandstone/Switch';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

const SwitchView = () => (
	<>
		<Section title="Default">
			<Switch alt="Normal" />
			<Switch alt="Disabled" disabled />
		</Section>

		<Section className={css.marginTop} title="Aria-labelled">
			<Switch alt="Aria-labelled" aria-label="This is a Label." />
			<Switch alt="Aria-labelled and Disabled" aria-label="This is a Label." disabled />
		</Section>
	</>
);

export default SwitchView;
