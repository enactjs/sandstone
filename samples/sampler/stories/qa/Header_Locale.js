import {mergeComponentMetadata} from '@enact/storybook-utils';
import {text} from '@enact/storybook-utils/addons/knobs';
import {Header, HeaderBase} from '@enact/sandstone/Panels';
import React from 'react';

import {inputData, headerStoryConfig, commonProps} from './common/Header_Common';

Header.displayName = 'Header';
const Config = mergeComponentMetadata('Header', HeaderBase, Header);

export default {
	title: 'Sandstone/Header/Locale',
	component: 'Header'
};

export const RtlText = () => {
	return (
		<React.Fragment>
			<Header
				title={text('title', Config, inputData.shortRtlTitle)}
				subtitle={text('subtitle', Config, inputData.shortRtlSubtitle)}
			{...commonProps()}
			/>
		</React.Fragment>
	);
};

RtlText.storyName = 'RTL text';
RtlText.parameters = headerStoryConfig;

export const RtlTextLongTitle = () => {
	return (
		<React.Fragment>
			<Header
				title={text('title', Config, inputData. longRtlTitle)}
				subtitle={text('subtitle', Config, inputData.shortRtlSubtitle)}
			{...commonProps()}
			/>
		</React.Fragment>
	);
};

RtlTextLongTitle.storyName = 'RTL text, long title';
RtlTextLongTitle.parameters = headerStoryConfig;

export const TallGlyphs = () => {
	return (
		<React.Fragment>
			<Header
				title={text('title', Config, inputData.tallText)}
				subtitle={text('subtitle', Config, inputData.tallText)}
			{...commonProps()}
			/>
		</React.Fragment>
	);
};

TallGlyphs.storyName = 'tall-glyphs';
TallGlyphs.parameters = headerStoryConfig;
