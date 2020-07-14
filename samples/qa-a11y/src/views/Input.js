import Heading from '@enact/sandstone/Heading';
import Input from '@enact/sandstone/Input';
import React from 'react';

const InputView = () => (
	<>
		<Heading showLine>Input</Heading>
		<Input />
		<Input placeholder="Disabled input" disabled />
		<Input iconAfter="lock" />
		<Input placeholder="Enter number" subtitle="Subtitle" title="Title" type="number" />
		<Input placeholder="Enter passwordnumber" subtitle="Subtitle" title="Title" type="passwordnumber" />
		<Input placeholder="Enter password" subtitle="Subtitle" title="Title" type="password" />
		<Input placeholder="Dismiss on Enter" dismissOnEnter />
		<Input defaultValue="Initial value" />
		<Input placeholder="Placeholder" />
		<Heading showLine>Customizable aria-labels</Heading>
		<Input aria-label="add input" />
		<Input popupAriaLabel="This is a input popup" />
	</>
);

export default InputView;
