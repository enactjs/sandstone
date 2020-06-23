import Heading from '@enact/sandstone/Heading';
import {InputField} from '@enact/sandstone/Input';
import Scroller from '@enact/sandstone/Scroller';
import Layout, {Cell} from '@enact/ui/Layout';
import React from 'react';

const InputFieldView = () => (
	<Layout orientation="vertical">
		<Cell component={Scroller}>
			<Heading showLine>InputField</Heading>
			<InputField size="small" />
			<InputField size="small" placeholder="Disabled input" disabled />
			<InputField size="small" iconBefore="search" />
			<InputField size="small" placeholder="Enter number" type="number" />
			<InputField size="small" placeholder="Enter password" type="password" />
			<InputField size="small" placeholder="Dismiss on Enter" dismissOnEnter />
			<InputField size="small" defaultValue="Initial value" />
			<InputField size="small" placeholder="Placeholder" />
		</Cell>
	</Layout>
);

export default InputFieldView;
