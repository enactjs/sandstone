import Checkbox from '@enact/sandstone/Checkbox';

import Section from '../components/Section';

import * as appCss from '../App/App.module.less';

const CheckboxView = () => (
	<>
		<Section title="Default">
			<Checkbox alt="Normal" />
			<Checkbox alt="Disabled" disabled />
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<Checkbox alt="Aria-labelled" aria-label="This is a Label 0." />
			<Checkbox alt="Aria-labelled and Disabled" aria-label="This is a Label 1." disabled />
		</Section>
	</>
);

export default CheckboxView;
