import {mergeComponentMetadata} from '@enact/storybook-utils';
import {text} from '@enact/storybook-utils/addons/knobs';
import {Header, HeaderBase} from '@enact/sandstone/Panels';
import React from 'react';

import {inputData, headerStoryConfig, commonProps} from './common/Header_Common';
import { componentFromProp } from 'recompose';

Header.displayName = 'Header';
const Config = mergeComponentMetadata('Header', HeaderBase, Header);

const compactDefaultProps = {
	type: 'compact'
};

export default {
	title: 'Sandstone/Header/Compact',
	component: 'Header'
};

export const __JustTitle = () => {
	return (
		<React.Fragment>
			<Header
				title={text('title', Config, inputData.shortTitle)}
			{...commonProps(compactDefaultProps)}
			/>
		</React.Fragment>
	);
};

__JustTitle.storyName = 'just title';
__JustTitle.parameters = headerStoryConfig;

export const __ShortTitles = () => {
	return (
		<React.Fragment>
			<Header
				title={text('title', Config, inputData.shortTitle)}
				subtitle={text('subtitle', Config, inputData.shortSubtitle)}
			{...commonProps(compactDefaultProps)}
			/>
		</React.Fragment>
	);
};

__ShortTitles.storyName = 'short titles';
__ShortTitles.parameters = headerStoryConfig;

export const __LongTitles = () => {
	return (
		<React.Fragment>
			<Header
				title={text('title', Config, inputData.longTitle)}
				subtitle={text('subtitle', Config, inputData.longSubtitle)}
			{...commonProps(compactDefaultProps)}
			/>
		</React.Fragment>
	);
};

__LongTitles.storyName = 'long titles';
__LongTitles.parameters = headerStoryConfig;
