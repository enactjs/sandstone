import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import ri from '@enact/ui/resolution';
import {ScrollableBase as UiScrollableBase} from '@enact/ui/Scrollable';
import {storiesOf} from '@storybook/react';
import {VirtualListBasic as UiVirtualListBasic} from '@enact/ui/VirtualList';

import Item from '@enact/sandstone/Item';
import VirtualList, {VirtualListBasic} from '@enact/sandstone/VirtualList';

const
	wrapOption = {
		false: false,
		true: true,
		'&quot;noAnimation&quot;': 'noAnimation'
	},
	prop = {
		scrollbarOption: ['auto', 'hidden', 'visible']
	},
	items = [],
	defaultDataSize = 1000,
	// eslint-disable-next-line enact/prop-types, enact/display-name
	renderItem = (size) => ({index, ...rest}) => {
		const itemStyle = {
			borderBottom: ri.unit(6, 'rem') + ' solid #202328',
			boxSizing: 'border-box',
			height: size + 'px'
		};

		return (
			<Item {...rest} style={itemStyle}>
				{items[index]}
			</Item>
		);
	};

const updateDataSize = (dataSize) => {
	const
		itemNumberDigits = dataSize > 0 ? ((dataSize - 1) + '').length : 0,
		headingZeros = Array(itemNumberDigits).join('0');

	items.length = 0;

	for (let i = 0; i < dataSize; i++) {
		items.push('Item ' + (headingZeros + i).slice(-itemNumberDigits));
	}

	return dataSize;
};

updateDataSize(defaultDataSize);

const VirtualListConfig = mergeComponentMetadata('VirtualList', UiVirtualListBasic, UiScrollableBase, VirtualListBasic);

storiesOf('Sandstone', module)
	.add(
		'VirtualList',
		() => {
			return (
				<VirtualList
					dataSize={updateDataSize(number('dataSize', VirtualListConfig, defaultDataSize))}
					focusableScrollbar={boolean('focusableScrollbar', VirtualListConfig)}
					horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, VirtualListConfig)}
					itemRenderer={renderItem(ri.scale(number('itemSize', VirtualListConfig, 144)))}
					itemSize={ri.scale(number('itemSize', VirtualListConfig, 144))}
					noScrollByWheel={boolean('noScrollByWheel', VirtualListConfig)}
					onScrollStart={action('onScrollStart')}
					onScrollStop={action('onScrollStop')}
					spacing={ri.scale(number('spacing', VirtualListConfig))}
					spotlightDisabled={boolean('spotlightDisabled', VirtualListConfig, false)}
					verticalScrollbar={select('verticalScrollbar', prop.scrollbarOption, VirtualListConfig)}
					wrap={wrapOption[select('wrap', ['false', 'true', '"noAnimation"'], VirtualListConfig)]}
				/>
			);
		},
		{
			info: {
				text: 'Basic usage of VirtualList'
			}
		}
	);
