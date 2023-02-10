import {TileItem, TileItemBase} from '@enact/sandstone/TileItem';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, object, select, text} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';

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
		label={args['label']}
		image={args['image']}
		style={{
			position: 'absolute',
			width: ri.scaleToRem(312),
			height: ri.scaleToRem(240)
		}}
	/>
);

text('background', _TileItem, Config, '#FFFFFF');
boolean('bordered', _TileItem, Config);
boolean('disabled', _TileItem, Config);
text('label', _TileItem, Config, 'Youtube');
object('image', _TileItem, Config, imageObj);

_TileItem.storyName = 'TileItem';
_TileItem.parameters = {
	info: {
		text: 'The basic TileItem'
	}
};
