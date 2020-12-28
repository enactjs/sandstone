import {boolean, object, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {ImageItem as UiImageItem} from '@enact/ui/ImageItem';
import ri from '@enact/ui/resolution';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {ImageItem, ImageItemBase} from '@enact/sandstone/ImageItem';

const Config = mergeComponentMetadata('ImageItem', UiImageItem, ImageItemBase, ImageItem);
ImageItem.displayName = 'ImageItem';

const src = {
	'hd':  'http://via.placeholder.com/200x200/7ed31d/ffffff',
	'fhd': 'http://via.placeholder.com/300x300/7ed31d/ffffff',
	'uhd': 'http://via.placeholder.com/600x600/7ed31d/ffffff'
};

const prop = {
	orientation: ['horizontal', 'vertical']
};
const dataIndexProp = {
	'data-index': 0
};

storiesOf('ImageItem', module)
	.add(
		'with data-index',
		() => {
			const dataIndex = boolean('data-index', Config);

			return (
				<ImageItem
					{...dataIndex ? {...dataIndexProp} : null}
					key={!!dataIndex + ''}
					label={text('label', Config, 'ImageItem label')}
					orientation={select('orientation', prop.orientation, Config)}
					src={object('src', Config, src)}
					style={{
						width: ri.scale(select('orientation', prop.orientation, Config) === 'vertical' ? 768 : 1020),
						height: ri.scale(select('orientation', prop.orientation, Config) === 'vertical' ? 588 : 240)
					}}
				>
					{text('children', Config, 'ImageItem Caption')}
				</ImageItem>
			);
		}
	);
