import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/controls';
import Item from '@enact/sandstone/Item';
import VirtualList from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import {VirtualListBasic as UiVirtualListBasic} from '@enact/ui/VirtualList';

import css from './VirtualList.module.less';

const prop = {
		scrollbarOption: ['auto', 'hidden', 'visible'],
		scrollModeOption: ['native', 'translate'],
		wrapOption: {
			false: false,
			true: true,
			noAnimation: 'noAnimation'
		}
	},
	items = [],
	defaultDataSize = 1000,
	// eslint-disable-next-line enact/prop-types, enact/display-name
	renderItem = (size) => ({index, ...rest}) => {
		return (
			<Item {...rest} style={{height: ri.unit(size, 'rem')}}>
				{items[index]}
			</Item>
		);
	};

const updateDataSize = (dataSize) => {
	const itemNumberDigits = dataSize > 0 ? (dataSize - 1 + '').length : 0,
		headingZeros = Array(itemNumberDigits).join('0');

	items.length = 0;

	for (let i = 0; i < dataSize; i++) {
		items.push('Item ' + (headingZeros + i).slice(-itemNumberDigits));
	}

	return dataSize;
};

updateDataSize(defaultDataSize);

const ConfigOverscroll = mergeComponentMetadata('ConfigOverscroll', UiVirtualListBasic, VirtualList);
const VirtualListConfig = mergeComponentMetadata('VirtualList', UiVirtualListBasic, VirtualList);

export default {
	title: 'Sandstone/VirtualList',
	component: 'VirtualList'
};

export const _VirtualList = (args) => (
	<VirtualList
		className={css.verticalPadding}
		dataSize={updateDataSize(args['dataSize'])}
		horizontalScrollbar={args['horizontalScrollbar']}
		hoverToScroll={args['hoverToScroll']}
		itemRenderer={renderItem(ri.scale(args['itemSize']))}
		itemSize={ri.scale(args['itemSize'])}
		key={args['scrollMode']}
		noScrollByWheel={args['noScrollByWheel']}
		onScrollStart={action('onScrollStart')}
		onScrollStop={action('onScrollStop')}
		overscrollEffectOn={{
			arrowKey: args['overscrollEffectOnArrowKey'],
			drag: args['overscrollEffectOnDrag'],
			pageKey: args['overscrollEffectOnPageKey'],
			track: args['overscrollEffectOnTrack'],
			wheel: args['overscrollEffectOnWheel']
		}}
		scrollMode={args['scrollMode']}
		spacing={ri.scale(args['spacing'])}
		spotlightDisabled={args['spotlightDisabled']}
		verticalScrollbar={args['verticalScrollbar']}
		wrap={args['wrap']}
	/>
);

number('dataSize', _VirtualList, VirtualListConfig, defaultDataSize);
select('horizontalScrollbar', _VirtualList, prop.scrollbarOption, VirtualListConfig);
boolean('hoverToScroll', _VirtualList, VirtualListConfig);
number('itemSize', _VirtualList, VirtualListConfig, 156);
number('itemSize', _VirtualList, VirtualListConfig, 156);
boolean('noScrollByWheel', _VirtualList, VirtualListConfig);
boolean('overscrollEffectOnArrowKey', _VirtualList, ConfigOverscroll, false);
boolean('overscrollEffectOnDrag', _VirtualList, ConfigOverscroll, true);
boolean('overscrollEffectOnPageKey', _VirtualList, ConfigOverscroll, false);
boolean('overscrollEffectOnTrack', _VirtualList, ConfigOverscroll, false);
boolean('overscrollEffectOnWheel', _VirtualList, ConfigOverscroll, true);
select('scrollMode', _VirtualList, prop.scrollModeOption, VirtualListConfig);
number('spacing', _VirtualList, VirtualListConfig);
boolean('spotlightDisabled', _VirtualList, VirtualListConfig, false);
select('verticalScrollbar', _VirtualList, prop.scrollbarOption, VirtualListConfig);
select('wrap', _VirtualList, prop.wrapOption, VirtualListConfig);

_VirtualList.storyName = 'VirtualList';
_VirtualList.parameters = {
	info: {
		text: 'Basic usage of VirtualList'
	}
};
