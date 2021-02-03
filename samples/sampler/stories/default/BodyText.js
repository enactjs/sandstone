import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, text, select} from '@enact/storybook-utils/addons/knobs';
import BodyText, {BodyTextBase} from '@enact/sandstone/BodyText';
import UiBodyText, {BodyTextBase as UiBodyTextBase} from '@enact/ui/BodyText';
import React from 'react';

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

export const _BodyText = () => (
	<BodyText
		centered={boolean('centered', Config)}
		noWrap={boolean('noWrap', Config)}
		size={select('size', ['', 'large', 'small'], Config)}
	>
		{text('children', Config, 'This is Body Text')}
	</BodyText>
);

_BodyText.storyName = 'BodyText';
_BodyText.parameters = {
    info: {
        text: 'The basic BodyText'
    }
};
