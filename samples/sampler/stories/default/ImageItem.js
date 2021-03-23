import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, object, select, text} from '@enact/storybook-utils/addons/knobs';
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

export const _ImageItem = () => (
	<div style={{width: ri.scaleToRem(400), height: ri.scaleToRem(300)}}>
		<ImageItem
			centered={boolean('centered', Config)}
			disabled={boolean('disabled', Config)}
			label={text('label', Config, 'ImageItem label')}
			orientation={select('orientation', prop.orientation, Config)}
			selected={boolean('selected', Config)}
			showSelection={boolean('showSelection', Config)}
			src={object('src', Config, src)}
		>
			{text('children', Config, 'ImageItem Caption')}
		</ImageItem>
	</div>
);

_ImageItem.storyName = 'ImageItem';
_ImageItem.parameters = {
	info: {
		text: 'The basic ImageItem'
	}
};
