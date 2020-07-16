import FormCheckboxItem from '@enact/sandstone/FormCheckboxItem';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

const FormCheckboxItemView = () => (
	<>
		<Section title="Default">
			<FormCheckboxItem alt="Normal">Text</FormCheckboxItem>
			<FormCheckboxItem alt="Disabled" disabled>Text</FormCheckboxItem>
		</Section>

		<Section className={css.marginTop} title="Aria-labelled">
			<FormCheckboxItem alt="Aria-labelled" aria-label="This is a Label.">Text</FormCheckboxItem>
			<FormCheckboxItem alt="Aria-labelled and Disabled" aria-label="This is a Label." disabled>Text</FormCheckboxItem>
		</Section>
	</>
);

export default FormCheckboxItemView;
