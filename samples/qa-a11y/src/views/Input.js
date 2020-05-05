import Heading from '@enact/sandstone/Heading';
import Input from '@enact/sandstone/Input';
import Layout, {Cell} from '@enact/ui/Layout';
import React from 'react';
import Scroller from '@enact/sandstone/Scroller';

const InputView = () => (
	<Layout orientation="vertical">
		<Cell component={Scroller} focusableScrollbar>
			<Heading showLine>Default</Heading>
			<Input size="small" />
			<Input size="small" placeholder="Disabled input" disabled />
			<Input size="small" iconAfter="lock" />
			<Input size="small" placeholder="Enter number" type="number" />
			<Input size="small" placeholder="Enter password" type="password" />
			<Input size="small" placeholder="Dismiss on Enter" dismissOnEnter />
			<Input size="small" defaultValue="Initial value" />
			<Input size="small" placeholder="Placeholder" />
			<Heading showLine>Customizable aria-labels</Heading>
			<Input size="small" iconBefore="plus" aria-label="add input" />
		</Cell>
	</Layout>
);

export default InputView;
