import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, text, select} from '@enact/storybook-utils/addons/controls';
import BodyText, {BodyTextBase} from '@enact/sandstone/BodyText';
import UiBodyText, {BodyTextBase as UiBodyTextBase} from '@enact/ui/BodyText';

BodyText.displayName = 'BodyText';
const Config = mergeComponentMetadata(
	'BodyText',
	UiBodyTextBase,
	UiBodyText,
	BodyTextBase,
	BodyText
);

export default {
	title: 'Sandstone/BodyText',
	component: 'BodyText'
};

export const _BodyText = (args) => (
	<BodyText
		centered={args['centered']}
		noWrap={args['noWrap']}
		size={args['size']}
	>
		{args['children']}
	</BodyText>
);

boolean('centered', _BodyText, Config);
boolean('noWrap', _BodyText, Config);
select('size', _BodyText, ['', 'large', 'small'], Config);
text('children', _BodyText, Config, 'This is Body Text');

_BodyText.storyName = 'BodyText';
_BodyText.parameters = {
	info: {
		text: 'The basic BodyText'
	}
};
