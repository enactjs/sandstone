import FormCheckboxItem from '@enact/sandstone/FormCheckboxItem';

import Section from '../components/Section';

import appCss from '../App/App.module.scss';

const FormCheckboxItemView = () => (
	<>
		<Section title="Default">
			<FormCheckboxItem alt="Normal">Text 0</FormCheckboxItem>
			<FormCheckboxItem alt="Disabled" disabled>Text 1</FormCheckboxItem>
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<FormCheckboxItem alt="Aria-labelled" aria-label="This is a Label 0.">Text 0</FormCheckboxItem>
			<FormCheckboxItem alt="Aria-labelled and Disabled" aria-label="This is a Label 1." disabled>Text 1</FormCheckboxItem>
		</Section>
	</>
);

export default FormCheckboxItemView;
