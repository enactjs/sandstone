import RadioItem from '@enact/sandstone/RadioItem';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

const RadioItemView = () => (
	<>
		<Section title="Default">
			<RadioItem alt="Normal">Text</RadioItem>
			<RadioItem alt="Disabled" disabled>Text</RadioItem>
		</Section>

		<Section className={css.marginTop} title="Aria-labelled">
			<RadioItem alt="Aria-labelled" aria-label="This is a Label.">Text</RadioItem>
			<RadioItem alt="Aria-labelled and Disabled" aria-label="This is a Label." disabled>Text</RadioItem>
		</Section>
	</>
);

export default RadioItemView;
