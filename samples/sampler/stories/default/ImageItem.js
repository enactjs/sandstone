import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, object, select, text} from '@enact/storybook-utils/addons/controls';
import {ImageItem, ImageItemBase} from '@enact/sandstone/ImageItem';
import {ImageItem as UiImageItem} from '@enact/ui/ImageItem';
import ri from '@enact/ui/resolution';

const Config = mergeComponentMetadata('ImageItem', UiImageItem, ImageItemBase, ImageItem);
ImageItem.displayName = 'ImageItem';

const src = {
	hd: 'http://via.placeholder.com/200x200/7ed31d/ffffff',
	fhd: 'http://via.placeholder.com/300x300/7ed31d/ffffff',
	uhd: 'http://via.placeholder.com/600x600/7ed31d/ffffff'
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
object('src', _ImageItem, Config, src);
select('orientation', _ImageItem, prop.orientation, Config);
text('children', _ImageItem, Config, 'ImageItem Caption');

_ImageItem.storyName = 'ImageItem';
_ImageItem.parameters = {
	info: {
		text: 'The basic ImageItem'
	}
};
