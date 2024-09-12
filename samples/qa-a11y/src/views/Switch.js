import Switch from '@enact/sandstone/Switch';

import Section from '../components/Section';

import appCss from '../App/App.module.scss';

const SwitchView = () => (
	<>
		<Section title="Default">
			<Switch alt="Normal" />
			<Switch alt="Disabled" disabled />
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<Switch alt="Aria-labelled" aria-label="This is a Label 0." />
			<Switch alt="Aria-labelled and Disabled" aria-label="This is a Label 1." disabled />
		</Section>
	</>
);

export default SwitchView;
