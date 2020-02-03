import ExpandableList from '../../../../ExpandableList';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const children = ['option1', 'option2', 'option3'];

// ExpandableList options:
// select, disabled, noneText, title, closeOnSelect noAutoClose, noLockBottom,
// defaultOpen, defaultSelected

const app = (props) => <div {...props}>
	<div>
		<ExpandableList
			id="expandable1"
			title="ExpandableList Radio Select"
			select="radio"
			noneText="Nothing Selected"
		>
			{children}
		</ExpandableList>
		<ExpandableList
			id="expandable2"
			title="ExpandableList Multi Select"
			select="multiple"
			noneText="Nothing Selected"
		>
			{children}
		</ExpandableList>
		<ExpandableList
			id="expandable3"
			title="ExpandableList Single Select"
			select="single"
			noneText="Nothing Selected"
		>
			{children}
		</ExpandableList>
		<ExpandableList
			id="expandable4"
			title="ExpandableList No Lock Bottom"
			select="radio"
			noneText="Nothing Selected"
			noLockBottom
		>
			{children}
		</ExpandableList>
		<ExpandableList
			id="expandable5"
			title="ExpandableList No Auto Close"
			select="radio"
			noneText="Nothing Selected"
			noAutoClose
		>
			{children}
		</ExpandableList>
		<ExpandableList
			id="expandable6"
			title="ExpandableList Default Open"
			select="radio"
			noneText="Nothing Selected"
			defaultOpen
		>
			{children}
		</ExpandableList>
		<ExpandableList
			id="expandable7"
			title="ExpandableList Disabled"
			select="radio"
			noneText="Nothing Selected"
			disabled
		>
			{children}
		</ExpandableList>
	</div>
</div>;

export default ThemeDecorator(app);


