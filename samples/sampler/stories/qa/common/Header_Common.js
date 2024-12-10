import {mergeComponentMetadata} from '@enact/storybook-utils';
import Button from '@enact/sandstone/Button';
import {Header, HeaderBase} from '@enact/sandstone/Panels';
import Steps from '@enact/sandstone/Steps';
import clone from 'ramda/src/clone';

const Config = mergeComponentMetadata('Header', HeaderBase, Header);

export const inputData = {
	tallText: 'ฟิ้  ไั  ஒ  த',

	shortTitle: 'Enact',
	shortSubtitle: 'An app framework',
	shortRtlTitle: 'غينيا واستمر',
	shortRtlSubtitle: 'غينيا واستمر',

	longTitle: 'Core, The building blocks of an Enact application. Sandstone, our touch-centric UI library.',
	longSubtitle: 'An app development framework built atop React that’s easy to use, performant and customizable. The goal of Enact is to provide the building blocks for creating robust and maintainable applications.',
	longRtlTitle: 'هذا النص طويل ولكن ليس طويلاً. بالتأكيد ليست قصيرة جدا ، على الرغم من.'
};

export const prop = {
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

export const headerStoryConfig = {
	props: {
		noHeader: true
	}
};

export const makeCustomizedConfig = (customDefaults) => {
	const customizedConfig = Object.assign({}, Config); // Shallow copy this fn into a normal object
	customizedConfig.defaultProps = Object.assign(
		{}, // Fresh new defaultProps object
		clone(Config.defaultProps), // Deep copy the defaultProps from our object into a fresh defaultProps object of our shallow copy (preserving all other props as their original references)
		{
			backButtonBackgroundOpacity: 'opaque',
			centered: false,
			closeButtonBackgroundOpacity: 'opaque',
			noCloseButton: false,
			slotAbove: 'none',
			slotBefore: 'no buttons',
			slotAfter: 'no buttons',
			children: 'no buttons'
		}, // Story global defaults (things not represented by defaultProps on the real component)
		customDefaults // Individual story defaults, preferences
	);

	return customizedConfig;
};

export const commonProps = (args) => {
	return {
		type: args['type'],
		centered: args['centered'],
		backButtonBackgroundOpacity: args['backButtonBackgroundOpacity'],
		closeButtonBackgroundOpacity: args['closeButtonBackgroundOpacity'],
		noCloseButton: args['noCloseButton'],
		marqueeOn: args['marqueeOn'],
		slotAbove: prop.above[args['slotAbove']],
		slotBefore: prop.buttons[args['slotBefore']],
		slotAfter: prop.buttons[args['slotAfter']],
		children: prop.buttons[args['children']]
	};
};
