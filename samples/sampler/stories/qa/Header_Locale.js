import {mergeComponentMetadata} from '@enact/storybook-utils';
import {text} from '@enact/storybook-utils/addons/controls';
import {Header, HeaderBase} from '@enact/sandstone/Panels';
import {Fragment} from 'react';

import {inputData, headerStoryConfig, commonProps} from './common/Header_Common';

Header.displayName = 'Header';
const Config = mergeComponentMetadata('Header', HeaderBase, Header);

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
				{...commonProps()}
			/>
		</Fragment>
	);
};

text('title', RtlText, Config, inputData.shortRtlTitle);
text('subtitle', RtlText, Config, inputData.shortRtlSubtitle);

RtlText.storyName = 'RTL text';
RtlText.parameters = headerStoryConfig;

export const RtlTextLongTitle = (args) => {
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

text('title', RtlTextLongTitle, Config, inputData. longRtlTitle);
text('subtitle', RtlTextLongTitle, Config, inputData.shortRtlSubtitle);

RtlTextLongTitle.storyName = 'RTL text, long title';
RtlTextLongTitle.parameters = headerStoryConfig;

export const TallGlyphs = (args) => {
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

text('title', TallGlyphs, Config, inputData.tallText);
text('subtitle', TallGlyphs, Config, inputData.tallText);

TallGlyphs.storyName = 'tall-glyphs';
TallGlyphs.parameters = headerStoryConfig;
