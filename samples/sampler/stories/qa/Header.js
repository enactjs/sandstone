import {boolean, text, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';
import clone from 'ramda/src/clone';

import Button from '@enact/sandstone/Button';
import {Header, HeaderBase} from '@enact/sandstone/Panels';
import Steps from '@enact/sandstone/Steps';

Header.displayName = 'Header';
const Config = mergeComponentMetadata('Header', HeaderBase, Header);

const inputData = {
	tallText: 'ฟิ้  ไั  ஒ  த',

	shortTitle: 'Enact',
	shortSubtitle: 'An app framework',
	shortRtlTitle: 'غينيا واستمر',
	shortRtlSubtitle: 'غينيا واستمر',

	longTitle: 'Core, The building blocks of an Enact application. Sandstone, our touch-centric UI library.',
	longSubtitle: 'An app development framework built atop React that’s easy to use, performant and customizable. The goal of Enact is to provide the building blocks for creating robust and maintainable applications.',
	longRtlTitle: 'هذا النص طويل ولكن ليس طويلاً. بالتأكيد ليست قصيرة جدا ، على الرغم من.'
};

const prop = {
	above: {
		none: null,
		steps: <Steps current={3} total={5} />
	},
	aboveSelection: ['none', 'steps'],
	buttons: {
		'no buttons': null,
		'1 button': <Button key="button-ellipsis1" size="small" icon="ellipsis" />,
		'2 buttons': [
			<Button key="button-search2" size="small" icon="search" />,
			<Button key="button-ellipsis2" size="small" icon="ellipsis" />
		]
	},
	buttonsSelection: ['no buttons', '1 button', '2 buttons'],
	backgroundOpacity: ['opaque', 'transparent'],
	marqueeOn: ['hover', 'render'],
	type: ['standard', 'compact', 'wizard', 'mini']
};

const headerStoryConfig = {
	props: {
		noHeader: true
	}
};

const commonProps = (customDefaults) => {
	const customizedConfig = Object.assign({}, Config); // Shallow copy this fn into a normal object
	customizedConfig.defaultProps = Object.assign(
		{}, // Fresh new defaltProps object
		clone(Config.defaultProps), // Deep copy the defaultProps from our object into a fresh defaultProps object of our shallow copy (preserving all other props as their original references)
		{
			backButtonBackgroundOpacity: 'opaque',
			centered: false,
			closeButtonBackgroundOpacity: 'opaque',
			noBackButton: false,
			noCloseButton: false,
			slotAbove: 'none',
			slotBefore: 'no buttons',
			slotAfter: 'no buttons',
			children: 'no buttons'
		}, // Story global defaults (things not represented by defaultProps on the real component)
		customDefaults // Individual story defaults, preferences
	);
	return {
		type: select('type', prop.type, customizedConfig),
		centered: boolean('centered', customizedConfig),
		backButtonAvailable: boolean('backButtonAvailable', customizedConfig),
		backButtonBackgroundOpacity: select('backButtonBackgroundOpacity', prop.backgroundOpacity, customizedConfig),
		closeButtonBackgroundOpacity: select('closeButtonBackgroundOpacity', prop.backgroundOpacity, customizedConfig),
		noBackButton: boolean('noBackButton', customizedConfig),
		noCloseButton: boolean('noCloseButton', customizedConfig),
		marqueeOn: select('marqueeOn', prop.marqueeOn, customizedConfig),
		slotAbove: prop.above[select('slotAbove', prop.aboveSelection, customizedConfig)],
		slotBefore: prop.buttons[select('slotBefore', prop.buttonsSelection, customizedConfig)],
		slotAfter: prop.buttons[select('slotAfter', prop.buttonsSelection, customizedConfig)],
		children: prop.buttons[select('children', prop.buttonsSelection, customizedConfig)]
	};
};

storiesOf('Header', module)
	.add(
		'just title',
		// The Fragment (or any node, really; could be a <div> instead) is actually needed by
		// Storybook to properly apply changes from the knobs to the stories' children that occupy
		// the outermost node. This is most visible when the `noHeader` prop is given and several
		// (not all) of the knobs fail to apply.
		() => {
			return (<React.Fragment>
				<Header
					title={text('title', Config, inputData.shortTitle)}
					{...commonProps()}
				/>
			</React.Fragment>);
		}, headerStoryConfig
	)
	.add(
		'short titles',
		() => {
			return (<React.Fragment>
				<Header
					title={text('title', Config, inputData.shortTitle)}
					subtitle={text('subtitle', Config, inputData.shortSubtitle)}
					{...commonProps()}
				/>
			</React.Fragment>);
		}, headerStoryConfig
	)
	.add(
		'long titles',
		() => {
			return (<React.Fragment>
				<Header
					title={text('title', Config, inputData.longTitle)}
					subtitle={text('subtitle', Config, inputData.longSubtitle)}
					{...commonProps()}
				/>
			</React.Fragment>);
		}, headerStoryConfig
	);

storiesOf('Header.Locale', module)
	.add(
		'RTL text',
		() => {
			return (<React.Fragment>
				<Header
					title={text('title', Config, inputData.shortRtlTitle)}
					subtitle={text('subtitle', Config, inputData.shortRtlSubtitle)}
					{...commonProps()}
				/>
			</React.Fragment>);
		}, headerStoryConfig
	)
	.add(
		'RTL text, long title',
		() => {
			return (<React.Fragment>
				<Header
					title={text('title', Config, inputData. longRtlTitle)}
					subtitle={text('subtitle', Config, inputData.shortRtlSubtitle)}
					{...commonProps()}
				/>
			</React.Fragment>);
		}, headerStoryConfig
	)
	.add(
		'tall-glyphs',
		() => {
			return (<React.Fragment>
				<Header
					title={text('title', Config, inputData.tallText)}
					subtitle={text('subtitle', Config, inputData.tallText)}
					{...commonProps()}
				/>
			</React.Fragment>);
		}, headerStoryConfig
	);

const wizardDefaultProps = {
	type: 'wizard',
	centered: true,
	noCloseButton: true,
	slotAbove: 'steps',
	slotBefore: '1 button',
	slotAfter: '1 button'
};
storiesOf('Header.Wizard', module)
	.add(
		'just title',
		() => {
			return (<React.Fragment>
				<Header
					title={text('title', Config, inputData.shortTitle)}
					{...commonProps(wizardDefaultProps)}
				/>
			</React.Fragment>);
		}, headerStoryConfig
	)
	.add(
		'short titles',
		() => {
			return (<React.Fragment>
				<Header
					title={text('title', Config, inputData.shortTitle)}
					subtitle={text('subtitle', Config, inputData.shortSubtitle)}
					{...commonProps(wizardDefaultProps)}
				/>
			</React.Fragment>);
		}, headerStoryConfig
	)
	.add(
		'long titles',
		() => {
			return (<React.Fragment>
				<Header
					title={text('title', Config, inputData.longTitle)}
					subtitle={text('subtitle', Config, inputData.longSubtitle)}
					{...commonProps(wizardDefaultProps)}
				/>
			</React.Fragment>);
		}, headerStoryConfig
	);


const compactDefaultProps = {
	type: 'compact'
};
storiesOf('Header.Compact', module)
	.add(
		'just title',
		() => {
			return (<React.Fragment>
				<Header
					title={text('title', Config, inputData.shortTitle)}
					{...commonProps(compactDefaultProps)}
				/>
			</React.Fragment>);
		}, headerStoryConfig
	)
	.add(
		'short titles',
		() => {
			return (<React.Fragment>
				<Header
					title={text('title', Config, inputData.shortTitle)}
					subtitle={text('subtitle', Config, inputData.shortSubtitle)}
					{...commonProps(compactDefaultProps)}
				/>
			</React.Fragment>);
		}, headerStoryConfig
	)
	.add(
		'long titles',
		() => {
			return (<React.Fragment>
				<Header
					title={text('title', Config, inputData.longTitle)}
					subtitle={text('subtitle', Config, inputData.longSubtitle)}
					{...commonProps(compactDefaultProps)}
				/>
			</React.Fragment>);
		}, headerStoryConfig
	);


const miniDefaultProps = {
	type: 'mini',
	noCloseButton: true
};
storiesOf('Header.Mini', module)
	.add(
		'just title',
		() => {
			return (<React.Fragment>
				<Header
					title={text('title', Config, inputData.shortTitle)}
					{...commonProps(miniDefaultProps)}
				/>
			</React.Fragment>);
		}, headerStoryConfig
	)
	.add(
		'short titles',
		() => {
			return (<React.Fragment>
				<Header
					title={text('title', Config, inputData.shortTitle)}
					subtitle={text('subtitle', Config, inputData.shortSubtitle)}
					{...commonProps(miniDefaultProps)}
				/>
			</React.Fragment>);
		}, headerStoryConfig
	)
	.add(
		'long titles',
		() => {
			return (<React.Fragment>
				<Header
					title={text('title', Config, inputData.longTitle)}
					subtitle={text('subtitle', Config, inputData.longSubtitle)}
					{...commonProps(miniDefaultProps)}
				/>
			</React.Fragment>);
		}, headerStoryConfig
	);
