import Input from '@enact/sandstone/Input';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const InputView = () => (
	<>
		<Section title="Default">
			<Input alt="With No Placeholder" subtitle="Subtitle" title="Title" />
			<Input alt="With DefaultValue" defaultValue="Default Value" subtitle="Subtitle" title="Title" />
			<Input alt="With Placeholder" placeholder="Placeholder" subtitle="Subtitle" title="Title" />
			<Input alt="Disabled With Placeholder" disabled placeholder="Placeholder" subtitle="Subtitle" title="Title" />
		</Section>

		<Section className={appCss.marginTop} title="With type">
			<Input alt="Number Type With Placeholder" placeholder="Placeholder" subtitle="Subtitle" title="Title" type="number" />
			<Input alt="Disabled Number Type With Value" disabled subtitle="Subtitle" title="Title" type="number" value="1234" />
			<Input alt="Passwordnumber Type With Placeholder" placeholder="Placeholder" subtitle="Subtitle" title="Title" type="passwordnumber" />
			<Input alt="Disabled Passwordnumber Type With Value" disabled subtitle="Subtitle" title="Title" type="passwordnumber" value="1234" />
			<Input alt="Password Type With Placeholder" placeholder="Placeholder" subtitle="Subtitle" title="Title" type="password" />
			<Input alt="Disabled Password Type With Value" disabled subtitle="Subtitle" title="Title" type="password" value="1234" />
			<Input alt="Url Type With Placeholder" placeholder="Placeholder" subtitle="Subtitle" title="Title" type="url" />
			<Input alt="Disabled Url Type With Value" disabled subtitle="Subtitle" title="Title" type="url" value="https://enactjs.com" />
		</Section>

		<Section className={appCss.marginTop} title="With iconAfter">
			<Input alt="With iconAfter Without Titles" iconAfter="lock" />
			<Input alt="Disabled With iconAfter Without Titles" disabled iconAfter="lock" />
		</Section>

		<Section className={appCss.marginTop} title="With dismissOnEnter">
			<Input alt="With Placeholder and dismissOnEnter Without Titles" dismissOnEnter placeholder="Placeholder" />
			<Input alt="Disabled With Placeholder and dismissOnEnter Without Titles" dismissOnEnter disabled placeholder="Placeholder" />
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<Input alt="Aria-labelled" aria-label="This is a Label 0." subtitle="Subtitle" title="Title" />
			<Input alt="Aria-labelled and Disabled" aria-label="This is a Label 1." subtitle="Subtitle" title="Title" disabled />
			<Input alt="With popupAriaLabel" popupAriaLabel="This is a Label 2." subtitle="Subtitle" title="Title" />
			<Input alt="Number Type With Placeholder, Aria-labelled, and popupAriaLabel" aria-label="This is a Label 3." popupAriaLabel="This is a Label 4." placeholder="Placeholder" subtitle="Subtitle" title="Title" type="number" />
			<Input alt="Number Type With Placeholder Aria-labelled, and backButtonAriaLabel" aria-label="This is a Label 5." backButtonAriaLabel="This is a Back." placeholder="Placeholder" subtitle="Subtitle" title="Title" type="number" />
		</Section>
	</>
);

export default InputView;
