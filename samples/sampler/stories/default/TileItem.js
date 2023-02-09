import {TileItem, TileItemBase} from '@enact/sandstone/TileItem';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, object, select, text} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';

import {svgGenerator} from '../helper/svg';

const Config = mergeComponentMetadata('TileItem', TileItemBase, TileItem);
TileItem.displayName = 'TileItem';

const src = {
	hd: svgGenerator(200, 200, '7ed31d', 'ffffff', '200 X 200'),
	fhd: svgGenerator(300, 300, '7ed31d', 'ffffff', '300 X 300'),
	uhd: svgGenerator(600, 600, '7ed31d', 'ffffff', '600 X 600')
};

export default {
	title: 'Sandstone/TileItem',
	component: 'TileItem'
};

export const _TileItem = (args) => (
	<TileItem
		bordered={args['bordered']}
		disabled={args['disabled']}
		label={args['label']}
		imageSrc={args['imageSrc']}
		style={{
			position: 'absolute',
			width: ri.scaleToRem(312),
			height: ri.scaleToRem(240)
		}}
	/>
);

boolean('bordered', _TileItem, Config);
boolean('disabled', _TileItem, Config);
text('label', _TileItem, Config, 'USB');
object('imageSrc', _TileItem, Config, src);

_TileItem.storyName = 'TileItem';
_TileItem.parameters = {
	info: {
		text: 'The basic TileItem'
	}
};
