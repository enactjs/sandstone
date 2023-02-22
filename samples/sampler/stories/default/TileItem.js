import {TileItem, TileItemBase} from '@enact/sandstone/TileItem';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, number, object, select, text} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';

import iconNames from '../helper/icons';
import {svgGenerator} from '../helper/svg';

const Config = mergeComponentMetadata('TileItem', TileItemBase, TileItem);
TileItem.displayName = 'TileItem';

const imageObj = {
	src: {
		hd: svgGenerator(100, 100, '7ed31d', 'ffffff', ''),
		fhd: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png',//svgGenerator(150, 150, '7ed31d', 'ffffff', ''),
		uhd: svgGenerator(300, 300, '7ed31d', 'ffffff', '')
	},
	size: {
		width: ri.scaleToRem(150),
		height: ri.scaleToRem(150)
	}
};

export default {
	title: 'Sandstone/TileItem',
	component: 'TileItem'
};

export const _TileItem = (args) => (
	<TileItem
		background={args['background']}
		bordered={args['bordered']}
		disabled={args['disabled']}
		icon={args['icon']}
		image={args['image']}
		label={args['label']}
		labelOn={args['labelOn']}
		style={{
			position: 'absolute',
			width: ri.scale(args['width']),
			height: ri.scale(args['height'])
		}}
		title={args['title']}
	/>
);

text('background', _TileItem, Config, '#000000');
boolean('bordered', _TileItem, Config, true);
boolean('disabled', _TileItem, Config);
select('icon', _TileItem, ['', ...iconNames], Config, 'gamepad');
object('image', _TileItem, Config, imageObj);
text('label', _TileItem, Config, 'Playstation 5');
select('labelOn', _TileItem, ['focus', 'render'], Config);
number('width', _TileItem, Config, 312);
number('height', _TileItem, Config, 240);
text('title', _TileItem, Config, 'App title');

_TileItem.storyName = 'TileItem';
_TileItem.parameters = {
	info: {
		text: 'The basic TileItem'
	}
};
