import {IconItem, IconItemBase} from '@enact/sandstone/IconItem';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, number, object, select, text} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';

import iconNames from '../helper/icons';
import {svgGenerator} from '../helper/svg';

const Config = mergeComponentMetadata('IconItem', IconItemBase, IconItem);
IconItem.displayName = 'IconItem';

const imageObj = {
	src: {
		hd: svgGenerator(200, 200, '7ed31d', 'ffffff', '200 X 200'),
		fhd: svgGenerator(300, 300, '7ed31d', 'ffffff', '300 X 300'),
		uhd: svgGenerator(600, 600, '7ed31d', 'ffffff', '600 X 600')
	},
	size: {
		width: ri.scaleToRem(150),
		height: ri.scaleToRem(150)
	}
};

export default {
	title: 'Sandstone/IconItem',
	component: 'IconItem'
};

export const _IconItem = (args) => (
	<IconItem
		background={args['background']}
		bordered={args['bordered']}
		disabled={args['disabled']}
		icon={args['icon']}
		image={args['image']}
		label={args['label']}
		labelColor={args['labelColor']}
		labelOn={args['labelOn']}
		style={{
			position: 'absolute',
			width: ri.scale(args['width']),
			height: ri.scale(args['height'])
		}}
		title={args['title']}
		titleOn={args['titleOn']}
	/>
);

text('background', _IconItem, Config, '#1b1b1b');
boolean('bordered', _IconItem, Config, true);
boolean('disabled', _IconItem, Config);
select('icon', _IconItem, ['', ...iconNames], Config, 'usb');
object('image', _IconItem, Config, imageObj);
text('label', _IconItem, Config, 'USB');
select('labelColor', _IconItem, ['light', 'dark'], Config);
select('labelOn', _IconItem, ['focus', 'render'], Config);
number('width', _IconItem, Config, 312);
number('height', _IconItem, Config, 240);
text('title', _IconItem, Config);
select('titleOn', _IconItem, ['focus', 'render'], Config);

_IconItem.storyName = 'IconItem';
_IconItem.parameters = {
	info: {
		text: 'The basic IconItem'
	}
};
