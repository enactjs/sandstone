import Heading from '@enact/sandstone/Heading';
import SwitchItem from '@enact/sandstone/SwitchItem';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text} from '@enact/storybook-utils/addons/controls';
import Group from '@enact/ui/Group';

SwitchItem.displayName = 'SwitchItem';

const inputData = {
	longText:
	'Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text',
	disabledLong:
	'Default disabled Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text',
	normalText: 'Switch Item'
};

export default {
	title: 'Sandstone/SwitchItem',
	component: 'SwitchItem'
};

export const WithLongText = (args) => (
	<div>
		<SwitchItem
			disabled={args['disabled']}
			inline={args['inline']}
			onToggle={action('onToggle')}
		>
			{args['Long Text']}
		</SwitchItem>
		<SwitchItem
			disabled
			inline={args['inline']}
			onToggle={action('onToggle')}
		>
			{args['Disable Long Text']}
		</SwitchItem>
	</div>
);

boolean('disabled', WithLongText, SwitchItem, false);
boolean('inline', WithLongText, SwitchItem, false);
text('Long Text', WithLongText, SwitchItem, inputData.longText);
text('Disable Long Text', WithLongText, SwitchItem, inputData.disabledLong);

WithLongText.storyName = 'with Long Text';

export const _Group = (args) => (
	<div>
		<Heading showLine>{'Switch items with normal text in a group'}</Heading>
		<Group
			childComponent={SwitchItem}
			itemProps={{
				inline: args['ItemProps-Inline'],
				disabled: args['disabled']
			}}
			selectedProp="selected"
			defaultSelected={1}
			onSelect={action('onSelect')}
		>
			{[
				args['Normal Text 1'],
				args['Normal Text 2'],
				args['Normal Text 3']
			]}
		</Group>
		<Heading showLine>{'Switch items with long text in a group'}</Heading>
		<Group
			childComponent={SwitchItem}
			itemProps={{
				inline: args['ItemProps-Inline'],
				disabled: args['disabled']
			}}
			childSelect="onToggle"
			selectedProp="selected"
			disabled={args['disabled']}
			defaultSelected={1}
			onSelect={action('onSelect')}
		>
			{[
				args['Long Text 1'],
				args['Long Text 2'],
				args['Long Text 3']
			]}
		</Group>
	</div>
);

boolean('ItemProps-Inline', _Group, SwitchItem, false);
boolean('disabled', _Group, SwitchItem, false);
text('Normal Text 1', _Group, SwitchItem, inputData.normalText + 1);
text('Normal Text 2', _Group, SwitchItem, inputData.normalText + 2);
text('Normal Text 3', _Group, SwitchItem, inputData.normalText + 3);
text('Long Text 1', _Group, SwitchItem, 'First ' + inputData.longText);
text('Long Text 2', _Group, SwitchItem, 'Second ' + inputData.longText);
text('Long Text 3', _Group, SwitchItem, 'Third ' + inputData.longText);

_Group.storyName = 'Group';
