import ActionGuide, {ActionGuideBase} from '@enact/sandstone/ActionGuide';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {text, select} from '@enact/storybook-utils/addons/controls';

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

export const _ActionGuide = (args) => {
	const iconType = args['icon type'];
	let icon;
	switch (iconType) {
		case 'glyph':
			icon = args['icon'];
			break;
		case 'url src':
			icon = args['src'];
			break;
		default:
			icon = args['custom icon'];
	}

	return (
		<ActionGuide icon={icon}>
			{args['children']}
		</ActionGuide>
	);
};

select('icon type', _ActionGuide, ['glyph', 'url src', 'custom'], Config, 'glyph');
select('icon', _ActionGuide, ['', ...iconNames], Config, 'arrowsmalldown');
select('src', _ActionGuide, [docs, factory, logo], Config, logo);
text('custom icon', _ActionGuide, Config);
text('children', _ActionGuide, Config, 'Press some key to do something');

_ActionGuide.storyName = 'ActionGuide';
_ActionGuide.parameters = {
	info: {
		text: 'Explains the operation of an action'
	}
};
