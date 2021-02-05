import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import Item, {ItemBase} from '@enact/sandstone/Item';
import Group from '@enact/ui/Group';
import React from 'react';

Group.displayName = 'Group';
const Config = mergeComponentMetadata('CheckboxItem', ItemBase, Item, CheckboxItem);

const prop = {
	longText:
	'Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text',
	tallText: ['नरेंद्र मोदी', ' ฟิ้  ไั  ஒ  து', 'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ', 'តន្ត្រី'],
	extraSpaceText: 'This		Text 		has			extra 		space',
	rtlText: 'هناك حقيقة مثبتة منذ زمن طويل وهي',
};

export default {
	title: 'Sandstone/CheckboxItem',
	component: 'CheckboxItem'
};

export const WithLongText = () => (
	<CheckboxItem
		disabled={boolean('disabled', Config, false)}
		inline={boolean('inline', Config)}
		onToggle={action('onToggle')}
	>
	{text('children', Config, prop.longText)}
	</CheckboxItem>
);

WithLongText.storyName = 'with long text';

export const WithTallCharacters = () => (
	<CheckboxItem
		disabled={boolean('disabled', Config, false)}
		inline={boolean('inline', Config)}
		onToggle={action('onToggle')}
	>
	{select('children', prop.tallText, Config, prop.tallText[0])}
	</CheckboxItem>
);

WithTallCharacters.storyName = 'with tall characters';

export const WithExtraSpacing = () => (
	<CheckboxItem
		disabled={boolean('disabled', Config, false)}
		inline={boolean('inline', Config)}
		onToggle={action('onToggle')}
	>
	{text('children', Config, prop.extraSpaceText)}
	</CheckboxItem>
);

WithExtraSpacing.storyName = 'with extra spacing';

export const WithRightToLeftText = () => (
	<CheckboxItem
		disabled={boolean('disabled', Config, false)}
		inline={boolean('inline', Config)}
		onToggle={action('onToggle')}
	>
	{text('children', Config, prop.rtlText)}
	</CheckboxItem>
);

WithRightToLeftText.storyName = 'with right to left text';

export const Grouped = () => (
	<Group
		childComponent={CheckboxItem}
		childSelect="onToggle"
		itemProps={{
			inline: boolean('itemProps-inline', Group, false),
			disabled: boolean('itemProps-disabled', Group, false),
		}}
		select={select('select', ['single', 'radio', 'multiple'], Group, 'multiple')}
		selectedProp="selected"
		defaultSelected={0}
		onSelect={action('onSelect')}
	>
	{['Checkbox Item 1', 'Checkbox Item 2', 'Checkbox Item 3']}
	</Group>
);

Grouped.storyName = 'grouped';
