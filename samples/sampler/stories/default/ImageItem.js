import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {ImageItem, ImageItemBase} from '@enact/sandstone/ImageItem';
import {ImageItem as UiImageItem} from '@enact/ui/ImageItem';
import ri from '@enact/ui/resolution';

import {svgGenerator} from '../helper/svg';

const Config = mergeComponentMetadata('ImageItem', UiImageItem, ImageItemBase, ImageItem);
ImageItem.displayName = 'ImageItem';

const src = {
	hd: svgGenerator(200, 200, '7ed31d', 'ffffff', '200 X 200'),
	fhd: svgGenerator(300, 300, '7ed31d', 'ffffff', '300 X 300'),
	uhd: svgGenerator(600, 600, '7ed31d', 'ffffff', '600 X 600')
};

const prop = {
	orientation: ['horizontal', 'vertical']
};

export default {
	title: 'Sandstone/ImageItem',
	component: 'ImageItem'
};

export const _ImageItem = (args) => (
	<ImageItem
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
	</ImageItem>
);

boolean('centered', _ImageItem, Config);
boolean('disabled', _ImageItem, Config);
text('label', _ImageItem, Config, 'ImageItem label');
select('orientation', _ImageItem, prop.orientation, Config);
boolean('selected', _ImageItem, Config);
boolean('showSelection', _ImageItem, Config);
select('src', _ImageItem, src, Config, src.hd);
select('orientation', _ImageItem, prop.orientation, Config);
text('children', _ImageItem, Config, 'ImageItem Caption');

_ImageItem.storyName = 'ImageItem';
_ImageItem.parameters = {
	info: {
		text: 'The basic ImageItem'
	}
};
