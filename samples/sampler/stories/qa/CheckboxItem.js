import CheckboxItem from '@enact/sandstone/CheckboxItem';
import Item, {ItemBase} from '@enact/sandstone/Item';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {Primary, Stories, Title} from '@enact/storybook-utils/addons/docs';
import Group from '@enact/ui/Group';

Group.displayName = 'Group';
const Config = mergeComponentMetadata('CheckboxItem', ItemBase, Item, CheckboxItem);

const prop = {
	longText:
	'Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text',
	tallText: ['नरेंद्र मोदी', 'ฟิ้ ไั ஒ து', 'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ', 'តន្ត្រី'],
	extraSpaceText: 'This		Text 		has			extra 		space',
	rtlText: 'هناك حقيقة مثبتة منذ زمن طويل وهي'
};

export default {
	title: 'Sandstone/CheckboxItem',
	component: 'CheckboxItem',
	parameters: {
		docs: {
			page: () => (
				<>
					<Title />
					<Primary />
					<Stories />
				</>
			)
		}
	}
};

export const WithLongText = (args) => (
	<CheckboxItem
		disabled={args['disabled']}
		inline={args['inline']}
		onToggle={action('onToggle')}
	>
		{args['children']}
	</CheckboxItem>
);

boolean('disabled', WithLongText, Config, false);
boolean('inline', WithLongText, Config);
text('children', WithLongText, Config, prop.longText);

WithLongText.storyName = 'with long text';

export const WithTallCharacters = (args) => (
	<CheckboxItem
		disabled={args['disabled']}
		inline={args['inline']}
		onToggle={action('onToggle')}
	>
		{args['children']}
	</CheckboxItem>
);

boolean('disabled', WithTallCharacters, Config, false);
boolean('inline', WithTallCharacters, Config);
select('children', WithTallCharacters, prop.tallText, Config, prop.tallText[0]);

WithTallCharacters.storyName = 'with tall characters';

export const WithExtraSpacing = (args) => (
	<CheckboxItem
		disabled={args['disabled']}
		inline={args['inline']}
		onToggle={action('onToggle')}
	>
		{args['children']}
	</CheckboxItem>
);

boolean('disabled', WithExtraSpacing, Config, false);
boolean('inline', WithExtraSpacing, Config);
text('children', WithExtraSpacing, Config, prop.extraSpaceText);

WithExtraSpacing.storyName = 'with extra spacing';

export const WithRightToLeftText = (args) => (
	<CheckboxItem
		disabled={args['disabled']}
		inline={args['inline']}
		onToggle={action('onToggle')}
	>
		{args['children']}
	</CheckboxItem>
);

boolean('disabled', WithRightToLeftText, Config, false);
boolean('inline', WithRightToLeftText, Config);
text('children', WithRightToLeftText, Config, prop.rtlText);

WithRightToLeftText.storyName = 'with right to left text';

export const Grouped = (args) => (
	<Group
		childComponent={CheckboxItem}
		childSelect="onToggle"
		itemProps={{
			inline: args['itemProps-inline'],
			disabled: args['itemProps-disabled']
		}}
		select={args['select']}
		selectedProp="selected"
		defaultSelected={0}
		onSelect={action('onSelect')}
	>
		{['Checkbox Item 1', 'Checkbox Item 2', 'Checkbox Item 3']}
	</Group>
);

boolean('itemProps-disabled', Grouped, Config, false);
boolean('itemProps-inline', Grouped, Config, false);
select('select', Grouped, ['single', 'radio', 'multiple'], Group, 'multiple');

Grouped.storyName = 'grouped';
