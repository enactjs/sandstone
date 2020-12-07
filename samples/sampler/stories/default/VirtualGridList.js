import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import ri from '@enact/ui/resolution';
import React from 'react';
import {storiesOf} from '@storybook/react';
import {VirtualListBasic as UiVirtualListBasic} from '@enact/ui/VirtualList';

import {ImageItem} from '@enact/sandstone/ImageItem';
import {VirtualGridList} from '@enact/sandstone/VirtualList';

import css from './VirtualGridList.module.less';

const
	wrapOption = {
		false: false,
		true: true,
		'&quot;noAnimation&quot;': 'noAnimation'
	},
	prop = {
		direction: {horizontal: 'horizontal', vertical: 'vertical'},
		scrollbarOption: ['auto', 'hidden', 'visible'],
		scrollModeOption: ['native', 'translate']
	},
	items = [],
	defaultDataSize = 1000,
	longContent = 'Lorem ipsum dolor sit amet',
	shouldAddLongContent = ({index, modIndex}) => (
		index % modIndex === 0 ? ` ${longContent}` : ''
	),
	// eslint-disable-next-line enact/prop-types
	renderItem = ({index, ...rest}) => {
		const {text, subText, source} = items[index];

		return (
			<ImageItem
				{...rest}
				label={subText}
				src={source}
			>
				{text}
			</ImageItem>
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
			text = `Item ${count}${shouldAddLongContent({index: i, modIndex: 2})}`,
			subText = `SubItem ${count}${shouldAddLongContent({index: i, modIndex: 3})}`,
			color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
			source = {
				'hd': `http://placehold.it/200x200/${color}/ffffff&text=Image ${i}`,
				'fhd': `http://placehold.it/300x300/${color}/ffffff&text=Image ${i}`,
				'uhd': `http://placehold.it/600x600/${color}/ffffff&text=Image ${i}`
			};

		items.push({text, subText, source});
	}

	return dataSize;
};

updateDataSize(defaultDataSize);

const VirtualGridListConfig = mergeComponentMetadata('VirtualGridList', UiVirtualListBasic, VirtualGridList);

storiesOf('Sandstone', module)
	.add(
		'VirtualList.VirtualGridList',
		() => (
			<VirtualGridList
				className={
					select('direction', prop.direction, VirtualGridListConfig) === 'vertical' ?
						css.verticalPadding :
						css.horizontalPadding
				}
				dataSize={updateDataSize(number('dataSize', VirtualGridListConfig, defaultDataSize))}
				direction={select('direction', prop.direction, VirtualGridListConfig)}
				horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, VirtualGridListConfig)}
				itemRenderer={renderItem}
				itemSize={{
					minWidth: ri.scale(number('itemSize.minWidth', VirtualGridListConfig, 688)),
					minHeight: ri.scale(number('itemSize.minHeight', VirtualGridListConfig, 570))
				}}
				key={select('scrollMode', prop.scrollModeOption, VirtualGridListConfig)}
				noScrollByWheel={boolean('noScrollByWheel', VirtualGridListConfig)}
				onScrollStart={action('onScrollStart')}
				onScrollStop={action('onScrollStop')}
				scrollMode={select('scrollMode', prop.scrollModeOption, VirtualGridListConfig)}
				spacing={ri.scale(number('spacing', VirtualGridListConfig, 0))}
				spotlightDisabled={boolean('spotlightDisabled', VirtualGridListConfig, false)}
				verticalScrollbar={select('verticalScrollbar', prop.scrollbarOption, VirtualGridListConfig)}
				wrap={wrapOption[select('wrap', ['false', 'true', '"noAnimation"'], VirtualGridListConfig)]}
			/>
		),
		{
			info: {
				text: 'Basic usage of VirtualGridList'
			}
		}
	);
