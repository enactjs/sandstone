import {Header, HeaderBase} from '@enact/sandstone/Panels';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {Fragment} from 'react';
import {commonProps, headerStoryConfig, inputData, makeCustomizedConfig, prop} from './common/Header_Common';

Header.displayName = 'Header';
const Config = mergeComponentMetadata('Header', HeaderBase, Header);
const customizedConfig = makeCustomizedConfig();

export default {
	title: 'Sandstone/Header',
	component: 'Header'
};

// The Fragment (or any node, really; could be a <div> instead) is actually needed by
// Storybook to properly apply changes from the controls to the stories' children that occupy
// the outermost node. This is most visible when the `noHeader` prop is given and several
// (not all) of the controls fail to apply.
export const JustTitle = (args) => {
	return (
		<Fragment>
			<Header
				title={args['title']}
				{...commonProps(args)}
			/>
		</Fragment>
	);
};

text('title', JustTitle, Config, inputData.shortTitle);
select('type', JustTitle, prop.type, customizedConfig);
boolean('centered', JustTitle, customizedConfig);
select('backButtonBackgroundOpacity', JustTitle, prop.backgroundOpacity, customizedConfig);
select('closeButtonBackgroundOpacity', JustTitle, prop.backgroundOpacity, customizedConfig);
boolean('noCloseButton', JustTitle, customizedConfig);
select('marqueeOn', JustTitle, prop.marqueeOn, customizedConfig);
select('slotAbove', JustTitle, prop.aboveSelection, customizedConfig);
select('slotBefore', JustTitle, prop.buttonsSelection, customizedConfig);
select('slotAfter', JustTitle, prop.buttonsSelection, customizedConfig);
select('children', JustTitle, prop.buttonsSelection, customizedConfig);

JustTitle.storyName = 'just title';
JustTitle.parameters = headerStoryConfig;

export const ShortTitles = (args) => {
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

text('title', ShortTitles, Config, inputData.shortTitle);
text('subtitle', ShortTitles, Config, inputData.shortSubtitle);
select('type', ShortTitles, prop.type, customizedConfig);
boolean('centered', ShortTitles, customizedConfig);
select('backButtonBackgroundOpacity', ShortTitles, prop.backgroundOpacity, customizedConfig);
select('closeButtonBackgroundOpacity', ShortTitles, prop.backgroundOpacity, customizedConfig);
boolean('noCloseButton', ShortTitles, customizedConfig);
select('marqueeOn', ShortTitles, prop.marqueeOn, customizedConfig);
select('slotAbove', ShortTitles, prop.aboveSelection, customizedConfig);
select('slotBefore', ShortTitles, prop.buttonsSelection, customizedConfig);
select('slotAfter', ShortTitles, prop.buttonsSelection, customizedConfig);
select('children', ShortTitles, prop.buttonsSelection, customizedConfig);

ShortTitles.storyName = 'short titles';
ShortTitles.parameters = headerStoryConfig;

export const LongTitles = (args) => {
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

text('title', LongTitles, Config, inputData.longTitle);
text('subtitle', LongTitles, Config, inputData.longSubtitle);
select('type', LongTitles, prop.type, customizedConfig);
boolean('centered', LongTitles, customizedConfig);
select('backButtonBackgroundOpacity', LongTitles, prop.backgroundOpacity, customizedConfig);
select('closeButtonBackgroundOpacity', LongTitles, prop.backgroundOpacity, customizedConfig);
boolean('noCloseButton', LongTitles, customizedConfig);
select('marqueeOn', LongTitles, prop.marqueeOn, customizedConfig);
select('slotAbove', LongTitles, prop.aboveSelection, customizedConfig);
select('slotBefore', LongTitles, prop.buttonsSelection, customizedConfig);
select('slotAfter', LongTitles, prop.buttonsSelection, customizedConfig);
select('children', LongTitles, prop.buttonsSelection, customizedConfig);

LongTitles.storyName = 'long titles';
LongTitles.parameters = headerStoryConfig;
