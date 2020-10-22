import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {action} from '@enact/storybook-utils/addons/actions';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import Group from '@enact/ui/Group';
import React from 'react';
import {storiesOf} from '@storybook/react';

import CheckboxItem from '@enact/sandstone/CheckboxItem';
import Item, {ItemBase} from '@enact/sandstone/Item';

Group.displayName = 'Group';
const Config = mergeComponentMetadata('CheckboxItem', ItemBase, Item, CheckboxItem);

const prop = {
	longText : 'Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text',
	tallText : ['नरेंद्र मोदी', ' ฟิ้  ไั  ஒ  து', 'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ'],
	extraSpaceText : 'This		Text 		has			extra 		space',
	rtlText: 'هناك حقيقة مثبتة منذ زمن طويل وهي'
};

storiesOf('CheckboxItem', module)
	.add(
		'with long text',
		() => (
			<CheckboxItem
				disabled={boolean('disabled', Config, false)}
				inline={boolean('inline', Config)}
				onToggle={action('onToggle')}
			>
				{text('children', Config, prop.longText)}
			</CheckboxItem>
		)
	)
	.add(
		'with tall characters',
		() => (
			<CheckboxItem
				disabled={boolean('disabled', Config, false)}
				inline={boolean('inline', Config)}
				onToggle={action('onToggle')}
			>
				{select('children', prop.tallText, Config, prop.tallText[0])}
			</CheckboxItem>
		)
	)
	.add(
		'with extra spacing',
		() => (
			<CheckboxItem
				disabled={boolean('disabled', Config, false)}
				inline={boolean('inline', Config)}
				onToggle={action('onToggle')}
			>
				{text('children', Config, prop.extraSpaceText)}
			</CheckboxItem>
		)
	)
	.add(
		'with right to left text',
		() => (
			<CheckboxItem
				disabled={boolean('disabled', Config, false)}
				inline={boolean('inline', Config)}
				onToggle={action('onToggle')}
			>
				{text('children', Config, prop.rtlText)}
			</CheckboxItem>
		)
	)
	.add(
		'grouped',
		() => (
			<Group
				childComponent={CheckboxItem}
				childSelect="onToggle"
				itemProps={{
					inline: boolean('itemProps-inline', Group, false),
					disabled: boolean('itemProps-disabled', Group, false)
				}}
				select={select('select', ['single', 'radio', 'multiple'], Group, 'multiple')}
				selectedProp="selected"
				defaultSelected={0}
				onSelect={action('onSelect')}
			>
				{['Checkbox Item 1', 'Checkbox Item 2', 'Checkbox Item 3']}
			</Group>
		)
	);
