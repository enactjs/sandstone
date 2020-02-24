import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {Column, Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import {ScrollableBase as UiScrollableBase} from '@enact/ui/Scrollable/Scrollable';
import {VirtualListBasic as UiVirtualListBasic} from '@enact/ui/VirtualList/VirtualListBasic';
import React from 'react';

import Item from '@enact/sandstone/Item';
import {VirtualList, VirtualListBasic} from '@enact/sandstone/VirtualList';

import {storiesOf} from '@storybook/react';

const Config = mergeComponentMetadata('VirtualList', UiVirtualListBasic, UiScrollableBase, VirtualListBasic);

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

storiesOf('VirtualList with Native type', module)
	.add(
		'with extra items',
		() => (
			<Column>
				<Cell
					component={VirtualList}
					dataSize={updateDataSize(number('dataSize', Config, 10))}
					direction="vertical"
					focusableScrollbar={boolean('focusableScrollbar', Config)}
					horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, Config)}
					// eslint-disable-next-line react/jsx-no-bind
					itemRenderer={({index, ...rest}) => {
						return (<Item {...rest}>{items[index]}</Item>);
					}}
					itemSize={ri.scale(number('itemSize', Config, 120))}
					noScrollByWheel={boolean('noScrollByWheel', Config)}
					onKeyDown={action('onKeyDown')}
					onScrollStart={action('onScrollStart')}
					onScrollStop={action('onScrollStop')}
					spacing={ri.scale(number('spacing', Config, 40))}
					spotlightDisabled={boolean('spotlightDisabled(for all items)', Config, false)}
					type="Native"
					verticalScrollbar={select('verticalScrollbar', prop.scrollbarOption, Config)}
					wrap={wrapOption[select('wrap', ['false', 'true', '"noAnimation"'], Config)]}
				/>
				<Cell shrink component={Item}>extra item1</Cell>
				<Cell shrink component={Item}>extra item2</Cell>
				<Cell shrink component={Item}>extra item3</Cell>
			</Column>
		)
	);
