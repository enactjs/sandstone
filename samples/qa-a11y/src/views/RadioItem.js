import RadioItem from '@enact/sandstone/RadioItem';
import React from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const RadioItemView = () => (
	<>
		<Section title="Default">
			<RadioItem alt="Normal">Text 0</RadioItem>
			<RadioItem alt="Disabled" disabled>Text 1</RadioItem>
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<RadioItem alt="Aria-labelled" aria-label="This is a Label 0.">Text 0</RadioItem>
			<RadioItem alt="Aria-labelled and Disabled" aria-label="This is a Label 1." disabled>Text 1</RadioItem>
		</Section>
	</>
);

export default RadioItemView;
