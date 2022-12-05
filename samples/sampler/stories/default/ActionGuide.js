import {mergeComponentMetadata} from '@enact/storybook-utils';
import {text, select} from '@enact/storybook-utils/addons/knobs';
import ActionGuide, {ActionGuideBase} from '@enact/sandstone/ActionGuide';

// import icons
import docs from '../../images/icon-enact-docs.png';
import factory from '../../images/icon-enact-factory.svg';
import logo from '../../images/icon-enact-logo.svg';

import iconNames from '../helper/icons';

ActionGuide.displayName = 'ActionGuide';
const Config = mergeComponentMetadata('ActionGuide', ActionGuideBase, ActionGuide);

export default {
	title: 'Sandstone/ActionGuide',
	component: 'ActionGuide'
};

export const _ActionGuide = () => {
	const iconType = select('icon type', ['glyph', 'url src', 'custom'], Config, 'glyph');
	let icon;
	switch (iconType) {
		case 'glyph':
			icon = select('icon', ['', ...iconNames], Config, 'arrowsmalldown');
			break;
		case 'url src':
			icon = select('src', [docs, factory, logo], Config, logo);
			break;
		default:
			icon = text('custom icon', Config);
	}

	return (
		<ActionGuide buttonAriaLabel={text('buttonAriaLabel', Config, 'More')} icon={icon}>
			{text('children', Config, 'Press some key to do something')}
		</ActionGuide>
	);
};

_ActionGuide.storyName = 'ActionGuide';
_ActionGuide.parameters = {
	info: {
		text: 'Explains the operation of an action'
	}
};
