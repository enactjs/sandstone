import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, object, select, text} from '@enact/storybook-utils/addons/controls';
import {Primary, Stories, Title} from '@enact/storybook-utils/addons/docs';
import {ImageItem, ImageItemBase} from '@enact/sandstone/ImageItem';
import {ImageItem as UiImageItem} from '@enact/ui/ImageItem';
import ri from '@enact/ui/resolution';

import {svgGenerator} from '../helper/svg';

const Config = mergeComponentMetadata('ImageItem', ImageItemBase, UiImageItem, ImageItem);
ImageItem.displayName = 'ImageItem';

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
	component: 'ImageItem',
	parameters: {
		docs: {
			page: () => (
				<>
					<Title />
					<Primary />
					<Stories />
				</>
			)
		}
	}
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
