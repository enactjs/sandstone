import {mergeComponentMetadata} from '@enact/storybook-utils';
import {text} from '@enact/storybook-utils/addons/knobs';
import {Header, HeaderBase} from '@enact/sandstone/Panels';
import React from 'react';

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

export const _JustTitle = () => {
	return (
		<React.Fragment>
			<Header
				title={text('title', Config, inputData.shortTitle)}
			{...commonProps(wizardDefaultProps)}
			/>
		</React.Fragment>
	);
};

_JustTitle.storyName = 'just title';
_JustTitle.parameters = headerStoryConfig;

export const _ShortTitles = () => {
	return (
		<React.Fragment>
			<Header
				title={text('title', Config, inputData.shortTitle)}
				subtitle={text('subtitle', Config, inputData.shortSubtitle)}
			{...commonProps(wizardDefaultProps)}
			/>
		</React.Fragment>
	);
};

_ShortTitles.storyName = 'short titles';
_ShortTitles.parameters = headerStoryConfig;

export const _LongTitles = () => {
	return (
		<React.Fragment>
			<Header
				title={text('title', Config, inputData.longTitle)}
				subtitle={text('subtitle', Config, inputData.longSubtitle)}
			{...commonProps(wizardDefaultProps)}
			/>
		</React.Fragment>
	);
};

_LongTitles.storyName = 'long titles';
_LongTitles.parameters = headerStoryConfig;
