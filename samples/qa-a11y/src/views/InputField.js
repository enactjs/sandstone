import {InputField} from '@enact/sandstone/Input';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

const InputFieldView = () => (
	<>
		<Section title="Default">
			<InputField alt="With No Placeholder and value" />
			<InputField alt="Disabled with No Placeholder and value" disabled />
			<InputField alt="With defaultValue" defaultValue="Default Value" />
			<InputField alt="With Placeholder" placeholder="Placeholder" />
			<InputField alt="Disabled with Placeholder" disabled placeholder="Placeholder" />
		</Section>

		<Section className={css.marginTop} title="With type">
			<InputField alt="Number type with Placeholder" placeholder="Placeholder" type="number" />
			<InputField alt="Disabled Number type with Placeholder" disabled placeholder="Placeholder" type="number" />
			<InputField alt="Password type with Placeholder" placeholder="Placeholder" type="password" />
			<InputField alt="Disabled Password type with Placeholder" disabled placeholder="Placeholder" type="password" />
		</Section>

		<Section className={css.marginTop} title="With iconBefore">
			<InputField alt="With iconBefore" iconBefore="search" />
			<InputField alt="Disabled With iconBefore" disabled iconBefore="search" />
		</Section>

		<Section className={css.marginTop} title="With dismissOnEnter">
			<InputField alt="With Placeholder and dismissOnEnter" dismissOnEnter placeholder="Dismiss on Enter" />
			<InputField alt="Disabled With Placeholder and dismissOnEnter" dismissOnEnter disabled placeholder="Dismiss on Enter" />
		</Section>
	</>
);

export default InputFieldView;
