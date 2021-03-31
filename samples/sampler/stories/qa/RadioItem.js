import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean} from '@enact/storybook-utils/addons/knobs';
import Item, {ItemBase} from '@enact/sandstone/Item';
import RadioItem from '@enact/sandstone/RadioItem';

RadioItem.displayName = 'RadioItem';
const Config = mergeComponentMetadata('RadioItem', ItemBase, Item, RadioItem);

const radioData = {
	longTextWithSpace: [
		'FirstLongTextWithSpace Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac tellus in velit ornare commodo. Nam dignissim fringilla nulla, sit amet hendrerit sapien laoreet quis. Praesent quis tellus non diam viverra feugiat. FirstLongTextWithSpace End.',
		'SecondLongTextWithSpace Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac tellus in velit ornare commodo. Nam dignissim fringilla nulla, sit amet hendrerit sapien laoreet quis. Praesent quis tellus non diam viverra feugiat. SecondLongTextWithSpace End'
	],
	longTextWithoutSpace: [
		'FirstLongTextWithoutSpace_Lorem_ipsum_dolor_sit_amet,consectetur_adipiscing_elit.Aenean_ac_tellus_in_velit_ornare_commodo.Nam_dignissim_fringilla_nulla,sit_amet_hendrerit_sapien_laoreet_quis.Praesent_quis_tellus_non_diam_viverra_feugiat.FirstLongTextWithoutSpace_End',
		'SecondLongTextWithoutSpace_Lorem_ipsum_dolor_sit_amet,consectetur_adipiscing_elit.Aenean_ac_tellus_in_velit_ornare_commodo.Nam_dignissim_fringilla_nulla,sit_amet_hendrerit_sapien_laoreet_quis.Praesent_quis_tellus_non_diam_viverra_feugiat.SecondLongTextWithoutSpace_End.'
	],
	tallText: ['இந்தியா', 'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ', 'តន្ត្រី'],
	rightToLeft: ['صباح الخير', 'مساء الخير']
};

export default {
	title: 'Sandstone/RadioItem',
	component: 'RadioItem'
};

export const WithLongTextAndSpaces = () => (
	<div>
		<RadioItem
			disabled={boolean('disabled', Config)}
			inline={boolean('inline', Config)}
			onToggle={action('onToggle')}
		>
			{radioData.longTextWithSpace[0]}
		</RadioItem>
		<RadioItem
			disabled={boolean('disabled', Config)}
			inline={boolean('inline', Config)}
			onToggle={action('onToggle')}
		>
			{radioData.longTextWithSpace[1]}
		</RadioItem>
	</div>
);

WithLongTextAndSpaces.storyName = 'with long text and spaces';

export const WithLongTextAndNoSpaces = () => (
	<div>
		<RadioItem
			disabled={boolean('disabled', Config)}
			inline={boolean('inline', Config)}
			onToggle={action('onToggle')}
		>
			{radioData.longTextWithoutSpace[0]}
		</RadioItem>
		<RadioItem
			disabled={boolean('disabled', Config)}
			inline={boolean('inline', Config)}
			onToggle={action('onToggle')}
		>
			{radioData.longTextWithoutSpace[1]}
		</RadioItem>
	</div>
);

WithLongTextAndNoSpaces.storyName = 'with long text and no spaces';

export const WithTallCharacters = () => (
	<div>
		<RadioItem
			disabled={boolean('disabled', Config)}
			inline={boolean('inline', Config)}
			onToggle={action('onToggle')}
		>
			{radioData.tallText[0]}
		</RadioItem>
		<RadioItem
			disabled={boolean('disabled', Config)}
			inline={boolean('inline', Config)}
			onToggle={action('onToggle')}
		>
			{radioData.tallText[1]}
		</RadioItem>
		<RadioItem
			disabled={boolean('disabled', Config)}
			inline={boolean('inline', Config)}
			onToggle={action('onToggle')}
		>
			{radioData.tallText[2]}
		</RadioItem>
	</div>
);

WithTallCharacters.storyName = 'with tall characters';

export const WithRightToLeftText = () => (
	<div>
		<RadioItem
			disabled={boolean('disabled', Config)}
			inline={boolean('inline', Config)}
			onToggle={action('onToggle')}
		>
			{radioData.rightToLeft[0]}
		</RadioItem>
		<RadioItem
			disabled={boolean('disabled', Config)}
			inline={boolean('inline', Config)}
			onToggle={action('onToggle')}
		>
			{radioData.rightToLeft[1]}
		</RadioItem>
	</div>
);

WithRightToLeftText.storyName = 'with right to left text';

export const SelectedByDefault = () => (
	<div>
		<RadioItem
			disabled={boolean('disabled', Config)}
			inline={boolean('inline', Config)}
			onToggle={action('onToggle')}
			defaultSelected
		>
			RadioItem1
		</RadioItem>
		<RadioItem
			disabled={boolean('disabled', Config)}
			inline={boolean('inline', Config)}
			onToggle={action('onToggle')}
			defaultSelected
		>
			RadioItem2
		</RadioItem>
	</div>
);

SelectedByDefault.storyName = 'selected by default';
