import Heading from '@enact/sandstone/Heading';
import Input from '@enact/sandstone/Input';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

const InputView = () => (
	<>
		<Heading showLine>Input</Heading>
		<Input />
		<Input placeholder="Disabled input" disabled />
		<Input iconAfter="lock" />
		<Input iconAfter="lock" disabled />
		<Input placeholder="Enter number" subtitle="Subtitle" title="Title" type="number" />
		<Input value="1234" subtitle="Subtitle" title="Title" type="number" disabled/>
		<Input placeholder="Enter passwordnumber" subtitle="Subtitle" title="Title" type="passwordnumber" />
		<Input value="1234"  subtitle="Subtitle" title="Title" type="passwordnumber"  disabled/>
		<Input placeholder="Enter password" subtitle="Subtitle" title="Title" type="password" />
		<Input value="1234"  subtitle="Subtitle" title="Title" type="password" disabled/>
		<Input placeholder="Dismiss on Enter" dismissOnEnter />
		<Input placeholder="Dismiss on Enter" dismissOnEnter disabled />
		<Input defaultValue="Initial value" />
		<Input placeholder="Placeholder" />
		<Heading showLine>Customizable aria-labels</Heading>
		<Input aria-label="add input" />
		<Input aria-label="add input" disabled />
		<Input popupAriaLabel="This is a input popup" />
	</>
);

export default InputView;
