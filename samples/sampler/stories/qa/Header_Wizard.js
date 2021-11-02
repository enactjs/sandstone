import {mergeComponentMetadata} from '@enact/storybook-utils';
import {text} from '@enact/storybook-utils/addons/controls';
import {Header, HeaderBase} from '@enact/sandstone/Panels';
import {Fragment} from 'react';

import {inputData, headerStoryConfig, commonProps} from './common/Header_Common';

Header.displayName = 'Header';
const Config = mergeComponentMetadata('Header', HeaderBase, Header);

const wizardDefaultProps = {
	type: 'wizard',
	centered: true,
	noCloseButton: true,
	slotAbove: 'steps',
	slotBefore: '1 button',
	slotAfter: '1 button'
};

export default {
	title: 'Sandstone/Header/Wizard',
	component: 'Header'
};

export const JustTitle = (args) => {
	return (
		<Fragment>
			<Header
				title={args['title']}
				{...commonProps(compactDefaultProps)}
			/>
		</Fragment>
	);
};

text('title', JustTitle, Config, inputData.shortTitle);

JustTitle.storyName = 'just title';
JustTitle.parameters = headerStoryConfig;

export const ShortTitles = (args) => {
	return (
		<Fragment>
			<Header
				title={args['title']}
				subtitle={args['subtitle']}
				{...commonProps(wizardDefaultProps)}
			/>
		</Fragment>
	);
};

text('title', ShortTitles, Config, inputData.shortTitle);
text('subtitle', ShortTitles, Config, inputData.shortSubtitle);

ShortTitles.storyName = 'short titles';
ShortTitles.parameters = headerStoryConfig;

export const LongTitles = (args) => {
	return (
		<Fragment>
			<Header
				title={args['title']}
				subtitle={args['subtitle']}
				{...commonProps(wizardDefaultProps)}
			/>
		</Fragment>
	);
};

text('title', LongTitles, Config, inputData.longTitle);
text('subtitle', LongTitles, Config, inputData.longSubtitle);

LongTitles.storyName = 'long titles';
LongTitles.parameters = headerStoryConfig;
