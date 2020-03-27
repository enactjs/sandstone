import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {ImageItem as UiImageItem} from '@enact/ui/ImageItem';
import ri from '@enact/ui/resolution';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {ImageItem, ImageItemBase} from '@enact/sandstone/ImageItem';

const Config = mergeComponentMetadata('ImageItem', UiImageItem, ImageItemBase, ImageItem);
ImageItem.displayName = 'ImageItem';

const prop = {
	orientation: ['horizontal', 'vertical']
};

storiesOf('Sandstone', module)
	.add(
		'ImageItem',
		() => (
			<ImageItem
				children={text('children', Config, 'ImageItem Caption')}
				disabled={boolean('disabled', Config)}
				orientation={select('orientation', prop.orientation, Config)}
				selected={boolean('selected', Config)}
				showSelection={boolean('showSelection', Config)}
				src={text('src', Config, 'http://placehold.it/600x600/7ed31d/ffffff&text=Image')}
				style={{
					position: 'absolute',
					width: ri.scale(select('orientation', prop.orientation, Config) === 'vertical' ? 640 : 1020),
					height: ri.scale(select('orientation', prop.orientation, Config) === 'vertical' ? 516 : 240)
				}}
				label={text('label', Config, 'ImageItem label')}
			/>
		),
		{
			info: {
				text: 'The basic ImageItem'
			}
		}
	);
