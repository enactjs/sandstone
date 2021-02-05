import {mergeComponentMetadata} from '@enact/storybook-utils';
import {text} from '@enact/storybook-utils/addons/knobs';
import {Header, HeaderBase} from '@enact/sandstone/Panels';
import React from 'react';

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
export const JustTitle = () => {
	return (
		<React.Fragment>
			<Header
				title={text('title', Config, inputData.shortTitle)}
			{...commonProps()}
			/>
		</React.Fragment>
	);
};

JustTitle.storyName = 'just title';
JustTitle.parameters = headerStoryConfig;

export const ShortTitles = () => {
	return (
		<React.Fragment>
			<Header
				title={text('title', Config, inputData.shortTitle)}
				subtitle={text('subtitle', Config, inputData.shortSubtitle)}
			{...commonProps()}
			/>
		</React.Fragment>
	);
};

ShortTitles.storyName = 'short titles';
ShortTitles.parameters = headerStoryConfig;

export const LongTitles = () => {
	return (
		<React.Fragment>
			<Header
				title={text('title', Config, inputData.longTitle)}
				subtitle={text('subtitle', Config, inputData.longSubtitle)}
			{...commonProps()}
			/>
		</React.Fragment>
	);
};

LongTitles.storyName = 'long titles';
LongTitles.parameters = headerStoryConfig;
