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
const dataIndexProp = {
	'data-index': 0
};

export default {
	title: 'Sandstone/ImageItem',
	component: 'ImageItem'
};

export const WithDataIndex = (args) => {
	const dataIndex = args['data-index'];

	return (
		<ImageItem
			{...(dataIndex ? {...dataIndexProp} : null)}
			key={!!dataIndex + ''}
			label={args['label']}
			orientation={args['orientation']}
			selected={args['selected']}
			showSelection={args['showSelection']}
			src={args['src']}
			style={{
				width: ri.scale(
					args['selected'] === 'vertical' ? 768 : 1020
				),
				height: ri.scale(
					args['selected'] === 'vertical' ? 588 : 240
				)
			}}
		>
			{args['children']}
		</ImageItem>
	);
};

boolean('data-index', WithDataIndex, Config);
text('label', WithDataIndex, Config, 'ImageItem label');
select('orientation', WithDataIndex, prop.orientation, Config);
boolean('selected', WithDataIndex, Config);
boolean('showSelection', WithDataIndex, Config);
object('src', WithDataIndex, Config, src);
text('children', WithDataIndex, Config, 'ImageItem Caption');

WithDataIndex.storyName = 'with data-index';
