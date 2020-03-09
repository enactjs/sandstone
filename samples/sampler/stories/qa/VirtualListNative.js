import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {Column, Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import {VirtualListBasic as UiVirtualListBasic} from '@enact/ui/VirtualList/VirtualListBasic';
import React from 'react';

import Item from '@enact/sandstone/Item';
import VirtualList from '@enact/sandstone/VirtualList';

import {storiesOf} from '@storybook/react';

const Config = mergeComponentMetadata('VirtualList', UiVirtualListBasic, VirtualList);

const
	items = [],
	prop = {
		scrollbarOption: ['auto', 'hidden', 'visible']
	},
	wrapOption = {
		false: false,
		true: true,
		'&quot;noAnimation&quot;': 'noAnimation'
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

storiesOf('VirtualList with native scrollMode', module)
	.add(
		'with extra items',
		() => (
			<Column>
				<Cell
					component={VirtualList}
					dataSize={updateDataSize(number('dataSize', Config, 10))}
					direction="vertical"
					horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, Config)}
					// eslint-disable-next-line react/jsx-no-bind
					itemRenderer={({index, ...rest}) => {
						return (<Item {...rest} style={{margin: 0, paddingBottom: 0, paddingTop: 0}}>{items[index]}</Item>);
					}}
					itemSize={ri.scale(number('itemSize', Config, 156))}
					noScrollByWheel={boolean('noScrollByWheel', Config)}
					onKeyDown={action('onKeyDown')}
					onScrollStart={action('onScrollStart')}
					onScrollStop={action('onScrollStop')}
					spacing={ri.scale(number('spacing', Config, 0))}
					spotlightDisabled={boolean('spotlightDisabled(for all items)', Config, false)}
					verticalScrollbar={select('verticalScrollbar', prop.scrollbarOption, Config)}
					wrap={wrapOption[select('wrap', ['false', 'true', '"noAnimation"'], Config)]}
				/>
				<Cell shrink component={Item}>extra item1</Cell>
				<Cell shrink component={Item}>extra item2</Cell>
				<Cell shrink component={Item}>extra item3</Cell>
			</Column>
		)
	);
