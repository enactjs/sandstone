import ExpandableItem from '../../../../ExpandableItem';
import Item from '../../../../Item';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const children = <Item>The Expanded Item</Item>;

const app = (props) => <div {...props}>
	<div>
		<ExpandableItem
			id="expandableItemDefaultClosedWithoutNoneText"
			title="ExpandableItem Default"
		>
			{children}
		</ExpandableItem>
		<ExpandableItem
			id="expandableItemDefaultClosedWithNoneText"
			noneText="Nothing Selected"
			title="ExpandableItem Default With noneText"
		>
			{children}
		</ExpandableItem>
		<ExpandableItem
			defaultOpen
			id="expandableItemDefaultOpenWithNoneText"
			noneText="Nothing Selected"
			title="ExpandableItem Default Open"
		>
			{children}
		</ExpandableItem>
		<ExpandableItem
			autoClose
			id="expandableItemWithAutoClose"
			title="ExpandableItem With autoClose"
		>
			{children}
		</ExpandableItem>
		<ExpandableItem
			id="expandableItemWithLockBottom"
			lockBottom
			title="ExpandableItem With lockBottom"
		>
			{children}
		</ExpandableItem>
		<ExpandableItem
			id="expandableItemWithoutChildren"
			title="ExpandableItem Without Children"
		/>
		<ExpandableItem
			id="expandableItemAutoLabel"
			label="Labeled Item"
			noneText="Nothing Selected"
			title="ExpandableItem With Label (auto)"
		>
			{children}
		</ExpandableItem>
		<ExpandableItem
			id="expandableItemAlwaysLabel"
			label="Labeled Item"
			showLabel="always"
			title="ExpandableItem With Label (always)"
		>
			{children}
		</ExpandableItem>
		<ExpandableItem
			id="expandableItemNeverLabel"
			label="Labeled Item"
			showLabel="never"
			title="ExpandableItem With Label (never)"
		>
			{children}
		</ExpandableItem>
		<ExpandableItem
			disabled
			id="expandableItemDisabledWithNoneText"
			noneText="Nothing Selected"
			title="ExpandableItem Disabled"
		>
			{children}
		</ExpandableItem>
	</div>
</div>;

export default ThemeDecorator(app);
