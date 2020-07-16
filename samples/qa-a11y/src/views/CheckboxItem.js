import CheckboxItem from '@enact/sandstone/CheckboxItem';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

const CheckboxItemView = () => (
	<>
		<Section title="Default">
			<CheckboxItem alt="Normal">Text</CheckboxItem>
			<CheckboxItem alt="Disabled" disabled>Text</CheckboxItem>
		</Section>

		<Section className={css.marginTop} title="Aria-labelled">
			<CheckboxItem alt="Aria-labelled" aria-label="This is a Text">Text</CheckboxItem>
			<CheckboxItem alt="Aria-labelled and disabled" aria-label="This is a Text" disabled>Text</CheckboxItem>
		</Section>
	</>
);

export default CheckboxItemView;
