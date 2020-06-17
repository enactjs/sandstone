import Heading from '@enact/sandstone/Heading';
import Input, {InputField} from '@enact/sandstone/Input';
import Layout, {Cell} from '@enact/ui/Layout';
import React from 'react';
import Scroller from '@enact/sandstone/Scroller';

const InputView = () => (
	<Layout orientation="vertical">
		<Cell component={Scroller}>
			<Heading showLine>Input</Heading>
			<Input size="small" />
			<Input size="small" placeholder="Disabled input" disabled />
			<Input size="small" iconAfter="lock" />
			<Input size="small" placeholder="Enter number" type="number" />
			<Input size="small" placeholder="Enter password" type="password" />
			<Input size="small" placeholder="Dismiss on Enter" dismissOnEnter />
			<Input size="small" defaultValue="Initial value" />
			<Input size="small" placeholder="Placeholder" />
			<Heading showLine>InputField</Heading>
			<InputField size="small" />
			<InputField size="small" placeholder="Disabled input" disabled />
			<InputField size="small" iconBefore="search" />
			<InputField size="small" placeholder="Enter number" type="number" />
			<InputField size="small" placeholder="Enter password" type="password" />
			<InputField size="small" placeholder="Dismiss on Enter" dismissOnEnter />
			<InputField size="small" defaultValue="Initial value" />
			<InputField size="small" placeholder="Placeholder" />
			<Heading showLine>Customizable aria-labels</Heading>
			<Input size="small" aria-label="add input" />
			<Input size="small" popupAriaLabel="This is a input popup" />
		</Cell>
	</Layout>
);

export default InputView;
