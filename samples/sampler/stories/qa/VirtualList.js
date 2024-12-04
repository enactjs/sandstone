import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';
import {Header, Panel, Panels} from '@enact/sandstone/Panels';
import {FixedPopupPanels, Panel as FixedPopupPanel} from '@enact/sandstone/FixedPopupPanels';
import Scroller from '@enact/sandstone/Scroller';
import SwitchItem from '@enact/sandstone/SwitchItem';
import VirtualList from '@enact/sandstone/VirtualList';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/controls';
import {Column, Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import {VirtualListBasic as UiVirtualListBasic} from '@enact/ui/VirtualList';
import PropTypes from 'prop-types';
import {Component, useCallback, useState} from 'react';

import css from './VirtualList.module.less';

const Config = mergeComponentMetadata('VirtualList', UiVirtualListBasic, VirtualList);

const listStyle = {
	height: ri.scaleToRem(402)
};

const items = [];

const defaultDataSize = 1000;

const defaultDataSizeForSmallMinLargeSize = 5;

const defaultItemSize = 1000;

const defaultMinItemSize = 200;

const prop = {
	scrollbarOption: ['auto', 'hidden', 'visible'],
	scrollModeOption: ['native', 'translate'],
	wrapOption: {
		false: false,
		true: true,
		noAnimation: 'noAnimation'
	}
};

// eslint-disable-next-line enact/prop-types
const renderItem = (ItemComponent, size, vertical, onClick) => ({index, ...rest}) => {
	const style = vertical ?
		{} :
		{height: '100%', width: ri.unit(size, 'rem'), writingMode: 'vertical-lr', margin: '0'};

	return (
		<ItemComponent index={index} style={style} onClick={onClick} {...rest}>
			{items[index].item}
		</ItemComponent>
	);
};

const updateDataSize = (dataSize) => {
	const itemNumberDigits = dataSize > 0 ? (dataSize - 1 + '').length : 0,
		headingZeros = Array(itemNumberDigits).join('0');

	items.length = 0;

	for (let i = 0; i < dataSize; i++) {
		items.push({item: 'Item ' + (headingZeros + i).slice(-itemNumberDigits), selected: false});
	}

	return dataSize;
};

updateDataSize(defaultDataSize);

const updateItemSize = ({minSize, dataSize, size}) => ({
	minSize,
	size: new Array(dataSize).fill(size)
});

class StatefulSwitchItem extends Component {
	static propTypes = {
		index: PropTypes.number
	};

	constructor (props) {
		super(props);

		this.state = {
			prevIndex: props.index,
			selected: items[props.index].selected
		};
	}

	static getDerivedStateFromProps (props, state) {
		if (state.prevIndex !== props.index) {
			return {
				prevIndex: props.index,
				selected: items[props.index].selected
			};
		}

		return null;
	}

	onToggle = () => {
		items[this.props.index].selected = !items[this.props.index].selected;
		this.setState(({selected}) => ({
			selected: !selected
		}));
	};

	render () {
		const props = Object.assign({}, this.props);
		delete props.index;

		return (
			<SwitchItem {...props} onToggle={this.onToggle} selected={this.state.selected}>
				{this.props.children}
			</SwitchItem>
		);
	}
}

const ContainerItemWithControls = SpotlightContainerDecorator(({children, index, ...rest}) => {
	const itemHeight = ri.scaleToRem(156);
	const containerStyle = {display: 'flex', width: '100%', height: itemHeight};
	const textStyle = {flex: '1 1 100%', lineHeight: itemHeight};
	const switchStyle = {flex: '0 0 auto'};
	return (
		<div {...rest} style={containerStyle}>
			<div style={textStyle}>{children}</div>
			<Button icon="list" data-index={index} style={switchStyle} />
			<Button icon="star" data-index={index} style={switchStyle} />
			<Button icon="home" data-index={index} style={switchStyle} />
		</div>
	);
});

const CustomHeader = (props) => {
	const [children, setChildren] = useState(false);
	const handleClick = useCallback(() => {
		setChildren(!children);
	}, [children]);

	return (
		<Header
			{...props}
			slotAfter={
				<Button onClick={handleClick} size="small">
					{`${children ? 'Hide' : 'Show'} Header Children`}
				</Button>
			}
		>
			{children ? <Item>Header Item</Item> : null}
		</Header>
	);
};

// eslint-disable-next-line enact/prop-types
const InPanels = ({className, title, ...rest}) => {
	const [index, setIndex] = useState(0);
	const handleSelectItem = useCallback(() => {
		setIndex(index === 0 ? 1 : 0);
	}, [index]);

	return (
		<Panels className={className} index={index}>
			<Panel>
				<CustomHeader slot="header" title={`${title} Panel 0`} type="compact" />
				<VirtualList
					id="spotlight-list"
					// eslint-disable-next-line enact/prop-types
					itemRenderer={renderItem(Item, rest.itemSize, true, handleSelectItem)}
					spotlightId="virtual-list"
					{...rest}
				/>
			</Panel>
			<Panel title={`${title} Panel 1`}>
				<Header title={`${title} Panel 1`} type="compact" />
				<Item onClick={handleSelectItem}>Go Back</Item>
			</Panel>
		</Panels>
	);
};

class VirtualListWithCBScrollTo extends Component {
	static propTypes = {
		dataSize: PropTypes.number
	};

	componentDidUpdate (prevProps) {
		if (this.props.dataSize !== prevProps.dataSize) {
			this.scrollTo({animate: false, focus: false, index: 0});
		}
	}

	scrollTo = null;

	getScrollTo = (scrollTo) => {
		this.scrollTo = scrollTo;
	};

	render () {
		return <VirtualList {...this.props} cbScrollTo={this.getScrollTo} />;
	}
}

export default {
	title: 'Sandstone/VirtualList',
	component: 'VirtualList'
};

export const HorizontalScrollInScroller = (args) => {
	const listProps = {
		className: css.horizontalPadding,
		dataSize: updateDataSize(args['dataSize']),
		direction: 'horizontal',
		horizontalScrollbar: args['horizontalScrollbar'],
		itemRenderer: renderItem(Item, ri.scale(args['itemSize']), false),
		itemSize: ri.scale(args['itemSize']),
		key: args['scrollMode'],
		noScrollByWheel: args['noScrollByWheel'],
		onKeyDown: action('onKeyDown'),
		onScrollStart: action('onScrollStart'),
		onScrollStop: action('onScrollStop'),
		scrollMode: args['scrollMode'],
		spacing: ri.scale(args['spacing']),
		style: listStyle,
		verticalScrollbar: args['verticalScrollbar'],
		wrap: args['wrap']
	};

	return (
		<Scroller className={css.verticalPadding}>
			<VirtualList {...listProps} key="1" />
			<VirtualList {...listProps} key="2" />
			<VirtualList {...listProps} key="3" />
		</Scroller>
	);
};

number('dataSize', HorizontalScrollInScroller, Config, defaultDataSize);
select('horizontalScrollbar', HorizontalScrollInScroller, prop.scrollbarOption, Config);
number('itemSize', HorizontalScrollInScroller, Config, 156);
select('scrollMode', HorizontalScrollInScroller, prop.scrollModeOption, Config);
boolean('noScrollByWheel', HorizontalScrollInScroller, Config);
number('spacing', HorizontalScrollInScroller, Config);
select('verticalScrollbar', HorizontalScrollInScroller, prop.scrollbarOption, Config);
select('wrap', HorizontalScrollInScroller, prop.wrapOption, Config);

HorizontalScrollInScroller.storyName = 'horizontal scroll in Scroller';
HorizontalScrollInScroller.parameters = {
	propTables: [Config]
};

export const WithMoreItems = (args) => {
	return (
		<VirtualList
			dataSize={updateDataSize(args['dataSize'])}
			horizontalScrollbar={args['horizontalScrollbar']}
			hoverToScroll={args['hoverToScroll']}
			itemRenderer={renderItem(StatefulSwitchItem, ri.scale(args['itemSize']), true)}
			itemSize={ri.scale(args['itemSize'])}
			key={args['scrollMode']}
			noScrollByWheel={args['noScrollByWheel']}
			onKeyDown={action('onKeyDown')}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
			scrollMode={args['scrollMode']}
			spacing={ri.scale(args['spacing'])}
			spotlightDisabled={args['spotlightDisabled']}
			verticalScrollbar={args['verticalScrollbar']}
			wrap={args['wrap']}
		/>
	);
};

number('dataSize', WithMoreItems, Config, defaultDataSize);
select('horizontalScrollbar', WithMoreItems, prop.scrollbarOption, Config);
boolean('hoverToScroll', WithMoreItems, Config);
number('itemSize', WithMoreItems, Config, 156);
select('scrollMode', WithMoreItems, prop.scrollModeOption, Config);
boolean('noScrollByWheel', WithMoreItems, Config);
number('spacing', WithMoreItems, Config);
boolean('spotlightDisabled', WithMoreItems, Config, false);
select('verticalScrollbar', WithMoreItems, prop.scrollbarOption, Config);
select('wrap', WithMoreItems, prop.wrapOption, Config);

WithMoreItems.storyName = 'with more items';
WithMoreItems.parameters = {
	propTables: [Config]
};

export const WithSmallItemMinSizeAndLargeItemSize = (args) => {
	return (
		<VirtualList
			dataSize={updateDataSize(args['dataSize'])}
			direction="horizontal"
			horizontalScrollbar={args['horizontalScrollbar']}
			hoverToScroll={args['hoverToScroll']}
			itemRenderer={renderItem(Item, ri.scale(args['size']), false)}
			itemSize={updateItemSize({
				minSize: ri.scale(args['minSize']),
				dataSize: args['dataSize'],
				size: ri.scale(args['size'])
			})}
			key={args['scrollMode']}
			scrollMode={args['scrollMode']}
			spacing={ri.scale(args['spacing'])}
		/>
	);
};

number('dataSize', WithSmallItemMinSizeAndLargeItemSize, Config, defaultDataSizeForSmallMinLargeSize);
select('horizontalScrollbar', WithSmallItemMinSizeAndLargeItemSize, prop.scrollbarOption, Config);
boolean('hoverToScroll', WithSmallItemMinSizeAndLargeItemSize, Config);
number('size', WithSmallItemMinSizeAndLargeItemSize, Config, defaultItemSize);
number('minSize', WithSmallItemMinSizeAndLargeItemSize, Config, defaultMinItemSize);
select('scrollMode', WithSmallItemMinSizeAndLargeItemSize, prop.scrollModeOption, Config);
number('spacing', WithSmallItemMinSizeAndLargeItemSize, Config);

WithSmallItemMinSizeAndLargeItemSize.storyName = 'with small item min size and large item size';
WithSmallItemMinSizeAndLargeItemSize.parameters = {
	propTables: [Config]
};

export const _InPanels = (args) => {
	const title = 'VirtualList in panels';
	return (
		<InPanels
			title={title}
			dataSize={updateDataSize(args['dataSize'])}
			horizontalScrollbar={args['horizontalScrollbar']}
			hoverToScroll={args['hoverToScroll']}
			itemSize={ri.scale(args['itemSize'])}
			key={args['scrollMode']}
			noScrollByWheel={args['noScrollByWheel']}
			onKeyDown={action('onKeyDown')}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
			scrollMode={args['scrollMode']}
			spacing={ri.scale(args['spacing'])}
			spotlightDisabled={args['spotlightDisabled']}
			verticalScrollbar={args['verticalScrollbar']}
			wrap={args['wrap']}
		/>
	);
};

number('dataSize', _InPanels, Config, defaultDataSize);
select('horizontalScrollbar', _InPanels, prop.scrollbarOption, Config);
boolean('hoverToScroll', _InPanels, Config);
number('itemSize', _InPanels, Config, 156);
select('scrollMode', _InPanels, prop.scrollModeOption, Config);
boolean('noScrollByWheel', _InPanels, Config);
number('spacing', _InPanels, Config);
boolean('spotlightDisabled', _InPanels, Config, false);
select('verticalScrollbar', _InPanels, prop.scrollbarOption, Config);
select('wrap', _InPanels, prop.wrapOption, Config);

_InPanels.storyName = 'in Panels';
_InPanels.parameters = {
	props: {
		noPanels: true
	}
};

export const InFixedPopupPanels = (args) => {
	return (
		<FixedPopupPanels
			open
			index={0}
		>
			<FixedPopupPanel>
				<Header title="Panel1" />
				<VirtualList
					dataSize={updateDataSize(args['dataSize'])}
					horizontalScrollbar={args['horizontalScrollbar']}
					hoverToScroll={args['hoverToScroll']}
					itemRenderer={renderItem(Item, ri.scale(args['itemSize']), true)}
					itemSize={ri.scale(args['itemSize'])}
					key={args['scrollMode']}
					noScrollByWheel={args['noScrollByWheel']}
					onKeyDown={action('onKeyDown')}
					onScrollStart={action('onScrollStart')}
					onScrollStop={action('onScrollStop')}
					scrollMode={args['scrollMode']}
					spacing={ri.scale(args['spacing'])}
					spotlightDisabled={args['spotlightDisabled']}
					verticalScrollbar={args['verticalScrollbar']}
					wrap={args['wrap']}
				/>
			</FixedPopupPanel>
		</FixedPopupPanels>
	);
};

number('dataSize', InFixedPopupPanels, Config, defaultDataSize);
select('horizontalScrollbar', InFixedPopupPanels, prop.scrollbarOption, Config);
boolean('hoverToScroll', InFixedPopupPanels, Config);
number('itemSize', InFixedPopupPanels, Config, 156);
select('scrollMode', InFixedPopupPanels, prop.scrollModeOption, Config);
boolean('noScrollByWheel', InFixedPopupPanels, Config);
number('spacing', InFixedPopupPanels, Config);
boolean('spotlightDisabled', InFixedPopupPanels, Config, false);
select('verticalScrollbar', InFixedPopupPanels, prop.scrollbarOption, Config);
select('wrap', InFixedPopupPanels, prop.wrapOption, Config);

InFixedPopupPanels.storyName = 'in FixedPopupPanels';
InFixedPopupPanels.parameters = {
	propTables: [Config]
};

export const ScrollingTo0WheneverDataSizeChanges = (args) => {
	return (
		<VirtualListWithCBScrollTo
			dataSize={updateDataSize(args['dataSize'])}
			itemRenderer={renderItem(StatefulSwitchItem, ri.scale(args['itemSize']), true)}
			itemSize={ri.scale(args['itemSize'])}
			key={args['scrollMode']}
			scrollMode={args['scrollMode']}
		/>
	);
};

number('dataSize', ScrollingTo0WheneverDataSizeChanges, Config, defaultDataSize);
number('itemSize', ScrollingTo0WheneverDataSizeChanges, Config, 156);
select('scrollMode', ScrollingTo0WheneverDataSizeChanges, prop.scrollModeOption, Config);

ScrollingTo0WheneverDataSizeChanges.storyName = 'scrolling to 0 whenever dataSize changes';
ScrollingTo0WheneverDataSizeChanges.parameters = {
	propTables: [Config]
};

export const OverscrollEffectOnWherePageKeyIsTrue = (args) => {
	return (
		<VirtualList
			overscrollEffectOn={{
				arrowKey: false,
				drag: false,
				pageKey: true,
				track: false,
				wheel: false
			}}
			dataSize={updateDataSize(args['dataSize'])}
			itemRenderer={renderItem(StatefulSwitchItem, ri.scale(args['itemSize']), true)}
			itemSize={ri.scale(args['itemSize'])}
			key={args['scrollMode']}
			scrollMode={args['scrollMode']}
		/>
	);
};

number('dataSize', OverscrollEffectOnWherePageKeyIsTrue, Config, defaultDataSize);
number('itemSize', OverscrollEffectOnWherePageKeyIsTrue, Config, 156);
select('scrollMode', OverscrollEffectOnWherePageKeyIsTrue, prop.scrollModeOption, Config);

OverscrollEffectOnWherePageKeyIsTrue.storyName = 'overscrollEffectOn where pageKey is true';
OverscrollEffectOnWherePageKeyIsTrue.parameters = {
	propTables: [Config]
};

export const WithExtraItems = (args) => {
	return (
		<Column>
			<Cell
				component={VirtualList}
				dataSize={updateDataSize(args['dataSize'])}
				direction="vertical"
				horizontalScrollbar={args['horizontalScrollbar']}
				itemRenderer={renderItem(Item, ri.scale(args['size']), true)}
				itemSize={ri.scale(args['itemSize'])}
				key={args['scrollMode']}
				noScrollByWheel={args['noScrollByWheel']}
				onKeyDown={action('onKeyDown')}
				onScrollStart={action('onScrollStart')}
				onScrollStop={action('onScrollStop')}
				scrollMode={args['scrollMode']}
				spacing={ri.scale(args['spacing'])}
				spotlightDisabled={args['spotlightDisabled(for all items)']}
				verticalScrollbar={args['verticalScrollbar']}
				wrap={args['wrap']}
			/>
			<Cell shrink component={Item}>
				extra item1
			</Cell>
			<Cell shrink component={Item}>
				extra item2
			</Cell>
			<Cell shrink component={Item}>
				extra item3
			</Cell>
		</Column>
	);
};

number('dataSize', WithExtraItems, Config, 10);
select('horizontalScrollbar', WithExtraItems, prop.scrollbarOption, Config);
number('size', WithExtraItems, Config, 156);
number('itemSize', WithExtraItems, Config, 156);
select('scrollMode', WithExtraItems, prop.scrollModeOption, Config);
boolean('noScrollByWheel', WithExtraItems, Config);
number('spacing', WithExtraItems, Config, 0);
boolean('spotlightDisabled(for all items)', WithExtraItems, Config, false);
select('verticalScrollbar', WithExtraItems, prop.scrollbarOption, Config);
select('wrap', WithExtraItems, prop.wrapOption, Config);

WithExtraItems.storyName = 'with extra items';
WithExtraItems.parameters = {
	propTables: [Config]
};

export const WithContainerItemsHaveSpottableControls = (args) => {
	return (
		<VirtualList
			overscrollEffectOn={{
				arrowKey: false,
				drag: false,
				pageKey: true,
				track: false,
				wheel: false
			}}
			dataSize={updateDataSize(args['dataSize'])}
			itemRenderer={renderItem(
				ContainerItemWithControls,
				ri.scale(args['itemSize']),
				true
			)}
			itemSize={ri.scale(args['itemSize'])}
			key={args['scrollMode']}
			scrollMode={args['scrollMode']}
			wrap={args['wrap']}
		/>
	);
};

number('dataSize', WithContainerItemsHaveSpottableControls, Config, defaultDataSize);
number('itemSize', WithContainerItemsHaveSpottableControls, Config, 156);
select('scrollMode', WithContainerItemsHaveSpottableControls, prop.scrollModeOption, Config);
select('wrap', WithContainerItemsHaveSpottableControls, prop.wrapOption, Config);

WithContainerItemsHaveSpottableControls.storyName = 'with container items have spottable controls';
WithContainerItemsHaveSpottableControls.parameters = {
	propTables: [Config]
};

const fixedItemSizes = new Array(16).fill(ri.scale(390));
const variableItemSizes = fixedItemSizes.map((size, index) => {
	return index % 2 ? size * 2 : size;
});

// eslint-disable-next-line enact/prop-types, enact/display-name
const renderVirtualListItem = (data, onClick = {}) => ({index, ...rest}) => {
	return (
		<Item {...rest} style={{width: data[index], margin: ri.scaleToRem(15)}} onClick={onClick(index)}>
			{`item ${index}`}
		</Item>
	);
};

export const WithChangingFixedAndVariableItemSizes = () => {
	const [variableItemSizesMode, setVariableItemSizesMode] = useState(false);
	const handleDataSize = useCallback(() => {
		setVariableItemSizesMode(!variableItemSizesMode);
	}, [variableItemSizesMode]);

	return (
		<Column>
			<Cell shrink>
				<Button size="small" onClick={handleDataSize}>Update Items</Button>
			</Cell>
			<br />
			<br />
			<Cell>
				<VirtualList
					dataSize={16}
					direction="horizontal"
					itemRenderer={renderVirtualListItem(variableItemSizesMode ? variableItemSizes : fixedItemSizes)}
					itemSize={{
						size: variableItemSizesMode ? variableItemSizes : fixedItemSizes,
						minSize: Math.min(...variableItemSizes)
					}}
				/>
			</Cell>
		</Column>
	);
};

WithChangingFixedAndVariableItemSizes.storyName = 'with changing fixed and variable item sizes';
WithChangingFixedAndVariableItemSizes.parameters = {
	propTables: [Config]
};

export const WithChangingItemSizes = () => {
	const itemSizes = [ri.scale(240), ri.scale(360), ri.scale(720)];

	const [isReversed, setIsReversed] = useState(false);
	const handleDataSize = useCallback(() => {
		setIsReversed(!isReversed);
	}, [isReversed]);

	return (
		<Column>
			<Cell shrink>
				<Button size="small" onClick={handleDataSize}>Update Items</Button>
			</Cell>
			<br />
			<br />
			<Cell>
				<VirtualList
					dataSize={itemSizes.length}
					direction="horizontal"
					itemRenderer={renderVirtualListItem(isReversed ? [...itemSizes].reverse() : itemSizes)}
					itemSize={{
						size: isReversed ? [...itemSizes].reverse() : itemSizes,
						minSize: Math.min(...itemSizes)
					}}
				/>
			</Cell>
		</Column>
	);
};

WithChangingItemSizes.storyName = 'with changing item sizes';
WithChangingItemSizes.parameters = {
	propTables: [Config]
};

const initializeItemSizes = (size) => {
	const data = new Array(size).fill(ri.scale(390));
	return data.map((val, index) => index % 2 ? val * 2 : val);
};

export const WithChangingDataSizeAndItemSizes = () => {
	const [data, setData] = useState(initializeItemSizes(16));

	const handleRestore = useCallback(() => {
		setData(initializeItemSizes(16));
	}, []);

	const handleItemClick = useCallback(index => () => {
		setData(data.filter((_, i) => i !== index));
	}, [data]);

	return (
		<Column>
			<Cell shrink>
				<Button size="small" onClick={handleRestore}>Restore items</Button>
			</Cell>
			<br />
			<br />
			<Cell>
				<VirtualList
					dataSize={data.length}
					direction="horizontal"
					itemRenderer={renderVirtualListItem(data, handleItemClick)}
					itemSize={{
						size: data,
						minSize: Math.min(...data)
					}}
				/>
			</Cell>
		</Column>
	);
};

WithChangingDataSizeAndItemSizes.storyName = 'with changing dataSize and itemSizes';
WithChangingDataSizeAndItemSizes.parameters = {
	propTables: [Config]
};
