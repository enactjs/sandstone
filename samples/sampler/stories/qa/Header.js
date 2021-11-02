import {mergeComponentMetadata} from '@enact/storybook-utils';
import {text} from '@enact/storybook-utils/addons/controls';
import {Header, HeaderBase} from '@enact/sandstone/Panels';
import {Fragment} from 'react';

import {inputData, headerStoryConfig, commonProps} from './common/Header_Common';

Header.displayName = 'Header';
const Config = mergeComponentMetadata('Header', HeaderBase, Header);

export default {
	title: 'Sandstone/Header',
	component: 'Header'
};

// The Fragment (or any node, really; could be a <div> instead) is actually needed by
// Storybook to properly apply changes from the knobs to the stories' children that occupy
// the outermost node. This is most visible when the `noHeader` prop is given and several
// (not all) of the knobs fail to apply.
export const JustTitle = (args) => {
	return (
		<Fragment>
			<Header
				title={args['title']}
				{...commonProps()}
			/>
		</Fragment>
	);
};

text('title', JustTitle, Config, inputData.shortTitle);

JustTitle.storyName = 'just title';
JustTitle.parameters = headerStoryConfig;

export const ShortTitles = () => {
	return (
		<Fragment>
			<Header
				title={args['title']}
				subtitle={args['subtitle']}
				{...commonProps()}
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
				{...commonProps()}
			/>
		</Fragment>
	);
};

text('title', LongTitles, Config, inputData.longTitle);
text('subtitle', LongTitles, Config, inputData.longSubtitle);

LongTitles.storyName = 'long titles';
LongTitles.parameters = headerStoryConfig;
