import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text} from '@enact/storybook-utils/addons/knobs';
import Heading from '@enact/sandstone/Heading';
import SwitchItem from '@enact/sandstone/SwitchItem';
import Group from '@enact/ui/Group';

SwitchItem.displayName = 'SwitchItem';

const inputData = {
	longText:
	'Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text',
	disabledLong:
	'Default disabled Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text',
	normalText: 'Switch Item',
};

export default {
	title: 'Sandstone/SwitchItem',
	component: 'SwitchItem'
};

export const WithLongText = () => (
	<div>
		<SwitchItem
			disabled={boolean('disabled', SwitchItem, false)}
			inline={boolean('inline', SwitchItem, false)}
			onToggle={action('onToggle')}
		>
			{text('Long Text', SwitchItem, inputData.longText)}
		</SwitchItem>
		<SwitchItem
			disabled
			inline={boolean('inline', SwitchItem, false)}
			onToggle={action('onToggle')}
		>
			{text('Disable Long Text', SwitchItem, inputData.disabledLong)}
		</SwitchItem>
	</div>
);

WithLongText.storyName = 'with Long Text';

export const _Group = () => (
	<div>
		<Heading showLine>{'Switch items with normal text in a group'}</Heading>
		<Group
			childComponent={SwitchItem}
			itemProps={{
			inline: boolean('ItemProps-Inline', SwitchItem, false),
			disabled: boolean('disabled', SwitchItem, false),
		}}
			selectedProp="selected"
			defaultSelected={1}
			onSelect={action('onSelect')}
		>
			{[
			text('Normal Text 1', SwitchItem, inputData.normalText + 1),
			text('Normal Text 2', SwitchItem, inputData.normalText + 2),
			text('Normal Text 3', SwitchItem, inputData.normalText + 3),
			]}
		</Group>
		<Heading showLine>{'Switch items with long text in a group'}</Heading>
		<Group
			childComponent={SwitchItem}
			itemProps={{
			inline: boolean('ItemProps-Inline', SwitchItem, false),
			disabled: boolean('disabled', SwitchItem, false),
		}}
			childSelect="onToggle"
			selectedProp="selected"
			disabled={boolean('disabled', SwitchItem, false)}
			defaultSelected={1}
			onSelect={action('onSelect')}
		>
			{[
			text('Long Text 1', SwitchItem, 'First ' + inputData.longText),
			text('Long Text 2', SwitchItem, 'Second ' + inputData.longText),
			text('Long Text 3', SwitchItem, 'Third ' + inputData.longText),
			]}
		</Group>
	</div>
);

_Group.storyName = 'Group';
