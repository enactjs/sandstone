import {Header, HeaderBase} from '@enact/sandstone/Panels';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {Fragment} from 'react';

import {commonProps, headerStoryConfig, inputData, makeCustomizedConfig, prop} from './common/Header_Common';

Header.displayName = 'Header';
const Config = mergeComponentMetadata('Header', HeaderBase, Header);
const customizedConfig = makeCustomizedConfig();

export default {
	title: 'Sandstone/Header/Locale',
	component: 'Header'
};

export const RtlText = (args) => {
	return (
		<Fragment>
			<Header
				title={args['title']}
				subtitle={args['subtitle']}
				{...commonProps(args)}
			/>
		</Fragment>
	);
};

text('title', RtlText, Config, inputData.shortRtlTitle);
text('subtitle', RtlText, Config, inputData.shortRtlSubtitle);
select('type', RtlText, prop.type, customizedConfig);
boolean('centered', RtlText, customizedConfig);
select('backButtonBackgroundOpacity', RtlText, prop.backgroundOpacity, customizedConfig);
select('closeButtonBackgroundOpacity', RtlText, prop.backgroundOpacity, customizedConfig);
boolean('noCloseButton', RtlText, customizedConfig);
select('marqueeOn', RtlText, prop.marqueeOn, customizedConfig);
select('slotAbove', RtlText, prop.aboveSelection, customizedConfig);
select('slotBefore', RtlText, prop.buttonsSelection, customizedConfig);
select('slotAfter', RtlText, prop.buttonsSelection, customizedConfig);
select('children', RtlText, prop.buttonsSelection, customizedConfig);

RtlText.storyName = 'RTL text';
RtlText.parameters = headerStoryConfig;

export const RtlTextLongTitle = (args) => {
	return (
		<Fragment>
			<Header
				title={args['title']}
				subtitle={args['subtitle']}
				{...commonProps(args)}
			/>
		</Fragment>
	);
};

text('title', RtlTextLongTitle, Config, inputData. longRtlTitle);
text('subtitle', RtlTextLongTitle, Config, inputData.shortRtlSubtitle);
select('type', RtlTextLongTitle, prop.type, customizedConfig);
boolean('centered', RtlTextLongTitle, customizedConfig);
select('backButtonBackgroundOpacity', RtlTextLongTitle, prop.backgroundOpacity, customizedConfig);
select('closeButtonBackgroundOpacity', RtlTextLongTitle, prop.backgroundOpacity, customizedConfig);
boolean('noCloseButton', RtlTextLongTitle, customizedConfig);
select('marqueeOn', RtlTextLongTitle, prop.marqueeOn, customizedConfig);
select('slotAbove', RtlTextLongTitle, prop.aboveSelection, customizedConfig);
select('slotBefore', RtlTextLongTitle, prop.buttonsSelection, customizedConfig);
select('slotAfter', RtlTextLongTitle, prop.buttonsSelection, customizedConfig);
select('children', RtlTextLongTitle, prop.buttonsSelection, customizedConfig);

RtlTextLongTitle.storyName = 'RTL text, long title';
RtlTextLongTitle.parameters = headerStoryConfig;

export const TallGlyphs = (args) => {
	return (
		<Fragment>
			<Header
				title={args['title']}
				subtitle={args['subtitle']}
				{...commonProps(args)}
			/>
		</Fragment>
	);
};

text('title', TallGlyphs, Config, inputData.tallText);
text('subtitle', TallGlyphs, Config, inputData.tallText);
select('type', TallGlyphs, prop.type, customizedConfig);
boolean('centered', TallGlyphs, customizedConfig);
select('backButtonBackgroundOpacity', TallGlyphs, prop.backgroundOpacity, customizedConfig);
select('closeButtonBackgroundOpacity', TallGlyphs, prop.backgroundOpacity, customizedConfig);
boolean('noCloseButton', TallGlyphs, customizedConfig);
select('marqueeOn', TallGlyphs, prop.marqueeOn, customizedConfig);
select('slotAbove', TallGlyphs, prop.aboveSelection, customizedConfig);
select('slotBefore', TallGlyphs, prop.buttonsSelection, customizedConfig);
select('slotAfter', TallGlyphs, prop.buttonsSelection, customizedConfig);
select('children', TallGlyphs, prop.buttonsSelection, customizedConfig);

TallGlyphs.storyName = 'tall-glyphs';
TallGlyphs.parameters = headerStoryConfig;
