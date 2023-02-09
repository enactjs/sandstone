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

const prop = {
	orientation: ['horizontal', 'vertical']
};

export default {
	title: 'Sandstone/TileItem',
	component: 'TileItem'
};

export const _TileItem = (args) => (
	<TileItem
		centered={args['centered']}
		disabled={args['disabled']}
		label={args['label']}
		orientation={args['orientation']}
		selected={args['selected']}
		showSelection={args['showSelection']}
		src={args['src']}
		style={{
			position: 'absolute',
			width: ri.scaleToRem(args['orientation'] === 'vertical' ? 768 : 1020),
			height: ri.scaleToRem(args['orientation'] === 'vertical' ? 588 : 240)
		}}
	>
		{args['children']}
	</TileItem>
);

boolean('centered', _TileItem, Config);
boolean('disabled', _TileItem, Config);
text('label', _TileItem, Config, 'TileItem label');
select('orientation', _TileItem, prop.orientation, Config);
boolean('selected', _TileItem, Config);
boolean('showSelection', _TileItem, Config);
object('src', _TileItem, Config, src);
select('orientation', _TileItem, prop.orientation, Config);
text('children', _TileItem, Config, 'TileItem Caption');

_TileItem.storyName = 'TileItem';
_TileItem.parameters = {
	info: {
		text: 'The basic TileItem'
	}
};
