import {mergeComponentMetadata} from '@enact/storybook-utils';
import {text} from '@enact/storybook-utils/addons/knobs';
import {Header, HeaderBase} from '@enact/sandstone/Panels';
import {Fragment} from 'react';

import {inputData, headerStoryConfig, commonProps} from './common/Header_Common';

Header.displayName = 'Header';
const Config = mergeComponentMetadata('Header', HeaderBase, Header);

const compactDefaultProps = {
	type: 'compact'
};

export default {
	title: 'Sandstone/Header/Compact',
	component: 'Header'
};

export const JustTitle = () => {
	return (
		<Fragment>
			<Header
				title={text('title', Config, inputData.shortTitle)}
				{...commonProps(compactDefaultProps)}
			/>
		</Fragment>
	);
};

JustTitle.storyName = 'just title';
JustTitle.parameters = headerStoryConfig;

export const ShortTitles = () => {
	return (
		<Fragment>
			<Header
				title={text('title', Config, inputData.shortTitle)}
				subtitle={text('subtitle', Config, inputData.shortSubtitle)}
				{...commonProps(compactDefaultProps)}
			/>
		</Fragment>
	);
};

ShortTitles.storyName = 'short titles';
ShortTitles.parameters = headerStoryConfig;

export const LongTitles = () => {
	return (
		<Fragment>
			<Header
				title={text('title', Config, inputData.longTitle)}
				subtitle={text('subtitle', Config, inputData.longSubtitle)}
				{...commonProps(compactDefaultProps)}
			/>
		</Fragment>
	);
};

LongTitles.storyName = 'long titles';
LongTitles.parameters = headerStoryConfig;
