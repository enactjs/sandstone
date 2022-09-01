import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, object, select, text} from '@enact/storybook-utils/addons/controls';
import {ImageItem, ImageItemBase} from '@enact/sandstone/ImageItem';
import {ImageItem as UiImageItem} from '@enact/ui/ImageItem';
import ri from '@enact/ui/resolution';

const Config = mergeComponentMetadata('ImageItem', ImageItemBase, UiImageItem, ImageItem);
ImageItem.displayName = 'ImageItem';

const svgGenerator = (width, height, bgColor, textColor, customText) => (
    `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' class='img-fluid rounded mx-auto d-block' width='${width}' height='${height}'%3E%3Crect width='${width}' height='${height}' fill='%23${bgColor}'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='36px' fill='%23${textColor}'%3E${customText}%3C/text%3E%3C/svg%3E`
);

const src = {
	hd: svgGenerator(200, 200, '7ed31d', 'ffffff', '200 X 200'),
	fhd: svgGenerator(300, 300, '7ed31d', 'ffffff', '300 X 300'),
	uhd: svgGenerator(600, 600, '7ed31d', 'ffffff', '600 X 600')
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
					args['orientation'] === 'vertical' ? 768 : 1020
				),
				height: ri.scale(
					args['orientation'] === 'vertical' ? 588 : 240
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
