import Input from '@enact/sandstone/Input';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

const InputView = () => (
	<>
		<Section title="Default">
			<Input alt="With No Placeholder" />
			<Input alt="With defaultValue" defaultValue="Default" />
			<Input alt="With Placeholder" placeholder="Placeholder" />
			<Input alt="Disabled with Placeholder" disabled placeholder="Placeholder" />
		</Section>

		<Section className={css.marginTop} title="Number, Passwordnumber, and Password">
			<Input alt="Number Type With Title, Subtitle, and Placeholder" placeholder="Placeholder" subtitle="Subtitle" title="Title" type="number" />
			<Input alt="Disabled Number Type with Title, Subtitle, and Value" disabled subtitle="Subtitle" title="Title" type="number" value="1234" />
			<Input alt="Passwordnumber Type with Title, Subtitle, and Placeholder" placeholder="Placeholder" subtitle="Subtitle" title="Title" type="passwordnumber" />
			<Input alt="Disabled Passwordnumber Type with Title, Subtitle, and Value" disabled subtitle="Subtitle" title="Title" type="passwordnumber" value="1234" />
			<Input alt="Password Type With Title, Subtitle, and Placeholder" placeholder="Placeholder" subtitle="Subtitle" title="Title" type="password" />
			<Input alt="Disabled Password Type With Title, Subtitle, and Value" disabled subtitle="Subtitle" title="Title" type="password" value="1234" />
		</Section>

		<Section className={css.marginTop} title="With iconAfter">
			<Input alt="With iconAfter" iconAfter="lock" />
			<Input alt="Disabled With iconAfter" disabled iconAfter="lock" />
		</Section>

		<Section className={css.marginTop} title="With dismissOnEnter">
			<Input alt="With Placeholder and dismissOnEnter" dismissOnEnter placeholder="Placeholder" />
			<Input alt="Disabled With Placeholder and dismissOnEnter" dismissOnEnter disabled placeholder="Placeholder" />
		</Section>

		<Section className={css.marginTop} title="Aria-labelled">
			<Input alt="Aria-labelled" aria-label="This is a Label." />
			<Input alt="Aria-labelled and Disabled" aria-label="This is a Label." disabled />
			<Input alt="With popupAriaLabel" popupAriaLabel="This is a input popup" />
			<Input alt="Number Type With Title, Subtitle, and Placeholder" aria-label="This is a Label." placeholder="Placeholder" subtitle="Subtitle" title="Title" type="number" />
		</Section>
	</>
);

export default InputView;
