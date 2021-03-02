import {mergeComponentMetadata} from '@enact/storybook-utils';
import {text} from '@enact/storybook-utils/addons/knobs';
import {Header, HeaderBase} from '@enact/sandstone/Panels';
import {Fragment} from 'react';

import {inputData, headerStoryConfig, commonProps} from './common/Header_Common';

Header.displayName = 'Header';
const Config = mergeComponentMetadata('Header', HeaderBase, Header);

const miniDefaultProps = {
	type: 'mini',
	noCloseButton: true
};

export default {
	title: 'Sandstone/Header/Mini',
	component: 'Header'
};

export const ___JustTitle = () => {
	return (
		<Fragment>
			<Header
				title={text('title', Config, inputData.shortTitle)}
			{...commonProps(miniDefaultProps)}
			/>
		</Fragment>
	);
};

___JustTitle.storyName = 'just title';
___JustTitle.parameters = headerStoryConfig;

export const ___ShortTitles = () => {
	return (
		<Fragment>
			<Header
				title={text('title', Config, inputData.shortTitle)}
				subtitle={text('subtitle', Config, inputData.shortSubtitle)}
			{...commonProps(miniDefaultProps)}
			/>
		</Fragment>
	);
};

___ShortTitles.storyName = 'short titles';
___ShortTitles.parameters = headerStoryConfig;

export const ___LongTitles = () => {
	return (
		<Fragment>
			<Header
				title={text('title', Config, inputData.longTitle)}
				subtitle={text('subtitle', Config, inputData.longSubtitle)}
			{...commonProps(miniDefaultProps)}
			/>
		</Fragment>
	);
};

___LongTitles.storyName = 'long titles';
___LongTitles.parameters = headerStoryConfig;
