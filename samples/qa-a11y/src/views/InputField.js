import Heading from '@enact/sandstone/Heading';
import {InputField} from '@enact/sandstone/Input';
import React from 'react';

const InputFieldView = () => (
	<>
		<Heading showLine>InputField</Heading>
		<InputField />
		<InputField placeholder="Disabled input" disabled />
		<InputField iconBefore="search" />
		<InputField placeholder="Enter number" type="number" />
		<InputField placeholder="Enter password" type="password" />
		<InputField placeholder="Dismiss on Enter" dismissOnEnter />
		<InputField defaultValue="Initial value" />
		<InputField placeholder="Placeholder" />
	</>
);

export default InputFieldView;
