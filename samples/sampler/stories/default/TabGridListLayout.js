import {action} from '@enact/storybook-utils/addons/actions';
import {number, select, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {ImageItem} from '@enact/sandstone/ImageItem';
import {scale} from '@enact/ui/resolution';
import {TabGridListLayout, TabGridListItem} from '@enact/sandstone/TabGridListLayout';

TabGridListLayout.displayName = 'TabGridListLayout';

const items = [],
	defaultDataSize = 1000,
	longContent = 'Lorem ipsum dolor sit amet',
	prop = {
		direction: {horizontal: 'horizontal', vertical: 'vertical'},
		scrollbarOption: ['auto', 'hidden', 'visible'],
		scrollModeOption: ['native', 'translate']
	},
	shouldAddLongContent = ({index, modIndex}) => (
		index % modIndex === 0 ? ` ${longContent}` : ''
	),
	// eslint-disable-next-line enact/prop-types
	renderItem = ({index, ...rest}) => {
		const {children, label, src} = items[index];

		return (
			<ImageItem
				{...rest}
				label={label}
				src={src}
			>{children}</ImageItem>
		);
	};

const updateDataSize = (dataSize) => {
	const
		itemNumberDigits = dataSize > 0 ? ((dataSize - 1) + '').length : 0,
		headingZeros = Array(itemNumberDigits).join('0');

	items.length = 0;

	for (let i = 0; i < dataSize; i++) {
		const
			count = (headingZeros + i).slice(-itemNumberDigits),
			children = `Item ${count}${shouldAddLongContent({index: i, modIndex: 2})}`,
			label = `SubItem ${count}${shouldAddLongContent({index: i, modIndex: 3})}`,
			color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
			src = `http://placehold.it/300x300/${color}/ffffff&text=Image ${i}`;

		items.push({children, label, src});
	}

	return dataSize;
};

updateDataSize(defaultDataSize);

storiesOf('Sandstone', module)
	.add(
		'TabGridListLayout',
		() => (
			<TabGridListLayout
				onSelect={action('onSelect')}
				// leaving this knob out for now until we build out horizontal tabs
				// orientation={select('orientation', ['vertical', 'horizontal'], TabGridListLayout, 'vertical')}
				title={text('title', TabGridListLayout, 'The Matrix')}
				subtitle={text('subtitle', TabGridListLayout, 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.')}
			>
				<TabGridListItem
					dataSize={updateDataSize(number('dataSize', defaultDataSize))}
					direction={select('direction', prop.direction)}
					icon="circle"
					title="List one"
					itemRenderer={renderItem}
					itemSize={{
						minWidth: scale(number('minWidth', 640)),
						minHeight: scale(number('minHeight', 540))
					}}
				/>
				<TabGridListItem
					dataSize={updateDataSize(number('dataSize', defaultDataSize))}
					direction={select('direction', prop.direction)}
					icon="star"
					title="List two"
					itemRenderer={renderItem}
					itemSize={{
						minWidth: scale(number('minWidth', 640)),
						minHeight: scale(number('minHeight', 540))
					}}
				/>
			</TabGridListLayout>
		),
		{
			props: {
				noPanel: true
			}
		}
	);
