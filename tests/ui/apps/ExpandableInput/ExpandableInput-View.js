import ExpandableInput from '../../../../ExpandableInput';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);


// ExpandableInput options:
// disabled, noneText, title, placeholder, iconBefore, iconAfter, type
// defaultOpen, defaultValue

const app = (props) => <div {...props}>
	<div>
		<ExpandableInput
			id="expandable1"
			title="ExpandableInput Default"
			noneText="No Input Text"
		/>
		<ExpandableInput
			id="expandable2"
			title="ExpandableInput Default Value"
			noneText="No Input Text"
			defaultValue="Default Value"
		/>
		<ExpandableInput
			id="expandable3"
			title="ExpandableInput Default Open"
			noneText="No Input Text"
			defaultOpen
		/>
		<ExpandableInput
			id="expandable4"
			title="ExpandableInput Password"
			noneText="No Input Text"
			type="password"
			defaultValue="Password"
		/>
		<ExpandableInput
			id="expandable5"
			title="ExpandableInput Placeholder"
			noneText="No Input Text"
			placeholder="Placeholder"
			defaultOpen
		/>
		<ExpandableInput
			id="expandable6"
			title="ExpandableInput Icon Before"
			noneText="No Input Text"
			iconBefore="minus"
			defaultOpen
		/>
		<ExpandableInput
			id="expandable7"
			title="ExpandableInput Icon After"
			noneText="No Input Text"
			iconAfter="plus"
			defaultOpen
		/>
		<ExpandableInput
			id="expandable8"
			title="ExpandableInput Icon Before and After"
			noneText="No Input Text"
			iconBefore="minus"
			iconAfter="plus"
			defaultOpen
		/>
		<ExpandableInput
			id="expandable9"
			title="ExpandableInput Disabled"
			noneText="No Input Text"
			disabled
		/>
	</div>
</div>;

export default ThemeDecorator(app);
