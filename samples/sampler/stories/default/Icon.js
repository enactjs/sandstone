import {mergeComponentMetadata} from '@enact/storybook-utils';
import {range, select, text} from '@enact/storybook-utils/addons/controls';
import {Primary, Title} from '@enact/storybook-utils/addons/docs';
import Heading from '@enact/sandstone/Heading';
import Icon, {IconBase} from '@enact/sandstone/Icon';
import Scroller from '@enact/sandstone/Scroller';
import UiIcon from '@enact/ui/Icon';

// import icons
import docs from '../../images/icon-enact-docs.png';
import factory from '../../images/icon-enact-factory.svg';
import logo from '../../images/icon-enact-logo.svg';

import iconNames from '../helper/icons';

Icon.displayName = 'Icon';
const Config = mergeComponentMetadata('Icon', UiIcon, IconBase, Icon);

export default {
	title: 'Sandstone/Icon',
	component: 'Icon',
	parameters: {
		docs: {
			page: () => (
				<>
					<Title />
					<Primary />
				</>
			)
		}
	}
};

export const _Icon = (args) => {
	const flip = args['flip'];

	let size = args['size'];
	if (size === 'custom number') {
		size = args['size (number)'];
	}

	const iconType = args['icon type'];
	let children;
	switch (iconType) {
		case 'glyph':
			children = args['icon'];
			break;
		case 'url src':
			children = args['src'];
			break;
		default:
			children = args['custom icon'];
	}
	return (
		<Scroller style={{height: '100%'}}>
			<Icon flip={flip} size={size}>
				{children}
			</Icon>
			<br />
			<br />
			<Heading showLine>All Icons</Heading>
			{iconNames.map((icon, index) => (
				<Icon key={index} flip={flip} size={size} title={icon}>
					{icon}
				</Icon>
			))}
		</Scroller>
	);
};

select('flip', _Icon, ['', 'auto', 'both', 'horizontal', 'vertical'], Config, '');
select('size', _Icon, ['tiny', 'small', 'medium', 'large', 'custom number'], Config);
range('size (number)', _Icon, Config, {min: 24, max: 480, step: 6}, 60);
select('icon type', _Icon, ['glyph', 'url src', 'custom'], Config, 'glyph');
select('icon', _Icon, ['', ...iconNames], Config, 'plus');
select('src', _Icon, [docs, factory, logo], Config, logo);
text('custom icon', _Icon, Config);

_Icon.storyName = 'Icon';
_Icon.parameters = {
	info: {
		text: 'Basic usage of Icon'
	}
};
