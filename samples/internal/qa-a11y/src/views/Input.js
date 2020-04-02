import Heading from '../../../../../Heading';
import ExpandableInput from '../../../../../ExpandableInput';
import Input from '../../../../../Input';
import Layout, {Cell} from '@enact/ui/Layout';
import React from 'react';
import Scroller from '../../../../../Scroller';

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
			<Heading showLine>Expandable Input</Heading>
			<ExpandableInput title="No noneText" />
			<ExpandableInput title="Disabled Input" noneText="I am disabled." disabled />
			<ExpandableInput title="Input with noneText" noneText="Nothing inputted" />
			<ExpandableInput title="Input with defaultValue" defaultValue="Initial value" />
			<ExpandableInput title="Input with Placeholder" noneText="No input" placeholder="Placeholder" />
			<ExpandableInput title="Input with Password" type="password" />
			<Heading showLine>Customizable aria-labels</Heading>
			<Input size="small" iconBefore="plus" aria-label="add input" />
			<ExpandableInput title="Expandable Input" aria-label="expandable input" />
		</Cell>
	</Layout>
);

export default InputView;
