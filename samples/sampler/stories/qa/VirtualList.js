import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {Column, Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import {VirtualListBasic as UiVirtualListBasic} from '@enact/ui/VirtualList';
import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Item from '@enact/sandstone/Item';
import {Header, Panel, Panels} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import Button from '@enact/sandstone/Button';
import SwitchItem from '@enact/sandstone/SwitchItem';
import VirtualList from '@enact/sandstone/VirtualList';

import {storiesOf} from '@storybook/react';

import css from './VirtualList.module.less';

const Config = mergeComponentMetadata('VirtualList', UiVirtualListBasic, VirtualList);

const
	listStyle = {
		height: ri.scaleToRem(402)
	},
	items = [],
	defaultDataSize = 1000,
	defaultDataSizeForSmallMinLargeSize = 5,
	defaultItemSize = 1000,
	defaultMinItemSize = 200,
	prop = {
		scrollbarOption: ['auto', 'hidden', 'visible'],
		scrollModeOption: ['native', 'translate']
	},
	wrapOption = {
		false: false,
		true: true,
		'&quot;noAnimation&quot;': 'noAnimation'
	},
	// eslint-disable-next-line enact/prop-types, enact/display-name
	renderItem = (ItemComponent, size, vertical, onClick) => ({index, ...rest}) => {
		const style = vertical ? {} : {height: '100%', width: ri.unit(size, 'rem'), writingMode: 'vertical-lr'};

		return (
			<ItemComponent index={index} style={style} onClick={onClick} {...rest}>
				{items[index].item}
			</ItemComponent>
		);
	};

const updateDataSize = (dataSize) => {
	const
		itemNumberDigits = dataSize > 0 ? ((dataSize - 1) + '').length : 0,
		headingZeros = Array(itemNumberDigits).join('0');

	items.length = 0;

	for (let i = 0; i < dataSize; i++) {
		items.push({item: 'Item ' + (headingZeros + i).slice(-itemNumberDigits), selected: false});
	}

	return dataSize;
};

updateDataSize(defaultDataSize);

const updateItemSize = ({minSize, dataSize, size}) => ({minSize, size: new Array(dataSize).fill(size)});

class StatefulSwitchItem extends React.Component {
	static propTypes = {
		index: PropTypes.number
	}

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
	}

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
			<div style={textStyle}>
				{children}
			</div>
			<Button icon="list" data-index={index} style={switchStyle} />
			<Button icon="star" data-index={index} style={switchStyle} />
			<Button icon="home" data-index={index} style={switchStyle} />
		</div>
	);
});

const CustomHeader = (props) => {
	const [children, setChildren] = useState(false);

	function handleChildren () {
		setChildren(!children);
	}

	return (
		<Header {...props} slotAfter={<Button size="small" onClick={handleChildren}>Show header children</Button>}>
			{children ? <Item>Header Item</Item> : null}
		</Header>
	);
};

// eslint-disable-next-line enact/prop-types
const InPanels = ({className, title, ...rest}) => {
	const [index, setIndex] = useState(0);

	function handleSelectItem () {
		setIndex(index === 0 ? 1 : 0);
	}

	return (
		<Panels className={className} index={index}>
			<Panel>
				<CustomHeader
					slot="header"
					title={`${title} Panel 0`}
					type="compact"
				/>
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

// eslint-disable-next-line enact/prop-types
class VirtualListWithCBScrollTo extends React.Component {
	static propTypes = {
		dataSize: PropTypes.number
	}

	componentDidUpdate (prevProps) {
		if (this.props.dataSize !== prevProps.dataSize) {
			this.scrollTo({animate: false, focus: false, index: 0});
		}
	}

	scrollTo = null

	getScrollTo = (scrollTo) => {
		this.scrollTo = scrollTo;
	}

	render () {
		return (
			<VirtualList
				{...this.props}
				cbScrollTo={this.getScrollTo}
			/>
		);
	}
}

storiesOf('VirtualList', module)
	.add(
		'horizontal scroll in Scroller',
		() => {
			const listProps = {
				className: css.horizontalPadding,
				dataSize: updateDataSize(number('dataSize', Config, defaultDataSize)),
				direction: 'horizontal',
				horizontalScrollbar: select('horizontalScrollbar', prop.scrollbarOption, Config),
				itemRenderer: renderItem(Item, ri.scale(number('itemSize', Config, 156)), false),
				itemSize: ri.scale(number('itemSize', Config, 156)),
				key: select('scrollMode', prop.scrollModeOption, Config),
				noScrollByWheel: boolean('noScrollByWheel', Config),
				onKeyDown: action('onKeyDown'),
				onScrollStart: action('onScrollStart'),
				onScrollStop: action('onScrollStop'),
				scrollMode: select('scrollMode', prop.scrollModeOption, Config),
				spacing: ri.scale(number('spacing', Config)),
				style: listStyle,
				verticalScrollbar: select('verticalScrollbar', prop.scrollbarOption, Config),
				wrap: wrapOption[select('wrap', ['false', 'true', '"noAnimation"'], Config)]
			};

			return (
				<Scroller className={css.verticalPadding}>
					<VirtualList {...listProps} key="1" />
					<VirtualList {...listProps} key="2" />
					<VirtualList {...listProps} key="3" />
				</Scroller>
			);
		},
		{propTables: [Config]}
	)
	.add(
		'with more items',
		() => {
			return (
				<VirtualList
					dataSize={updateDataSize(number('dataSize', Config, defaultDataSize))}
					horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, Config)}
					itemRenderer={renderItem(StatefulSwitchItem, ri.scale(number('itemSize', Config, 156)), true)}
					itemSize={ri.scale(number('itemSize', Config, 156))}
					key={select('scrollMode', prop.scrollModeOption, Config)}
					noScrollByWheel={boolean('noScrollByWheel', Config)}
					onKeyDown={action('onKeyDown')}
					onScrollStart={action('onScrollStart')}
					onScrollStop={action('onScrollStop')}
					scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
					spacing={ri.scale(number('spacing', Config))}
					spotlightDisabled={boolean('spotlightDisabled', Config, false)}
					verticalScrollbar={select('verticalScrollbar', prop.scrollbarOption, Config)}
					wrap={wrapOption[select('wrap', ['false', 'true', '"noAnimation"'], Config)]}
				/>
			);
		},
		{propTables: [Config]}
	)
	.add(
		'with small item min size and large item size',
		() => {
			return (
				<VirtualList
					dataSize={updateDataSize(number('dataSize', Config, defaultDataSizeForSmallMinLargeSize))}
					direction="horizontal"
					horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, Config)}
					itemRenderer={renderItem(Item, ri.scale(number('size', Config, defaultItemSize)), false)}
					itemSize={updateItemSize({
						minSize: ri.scale(number('minSize', Config, defaultMinItemSize)),
						dataSize: number('dataSize', Config, defaultDataSizeForSmallMinLargeSize),
						size: ri.scale(number('size', Config, defaultItemSize))
					})}
					key={select('scrollMode', prop.scrollModeOption, Config)}
					scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
					spacing={ri.scale(number('spacing', Config))}
				/>
			);
		},
		{propTables: [Config]}
	)
	.add(
		'in Panels',
		(context) => {
			const title = `${context.kind} ${context.story}`.trim();
			return (
				<InPanels
					title={title}
					dataSize={updateDataSize(number('dataSize', Config, defaultDataSize))}
					horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, Config)}
					itemSize={ri.scale(number('itemSize', Config, 156))}
					key={select('scrollMode', prop.scrollModeOption, Config)}
					noScrollByWheel={boolean('noScrollByWheel', Config)}
					onKeyDown={action('onKeyDown')}
					onScrollStart={action('onScrollStart')}
					onScrollStop={action('onScrollStop')}
					scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
					spacing={ri.scale(number('spacing', Config))}
					spotlightDisabled={boolean('spotlightDisabled', Config, false)}
					verticalScrollbar={select('verticalScrollbar', prop.scrollbarOption, Config)}
					wrap={wrapOption[select('wrap', ['false', 'true', '"noAnimation"'], Config)]}
				/>
			);
		},
		{
			props: {
				noPanels: true
			}
		}
	)
	.add(
		'scrolling to 0 whenever dataSize changes',
		() => {
			return (
				<VirtualListWithCBScrollTo
					dataSize={updateDataSize(number('dataSize', Config, defaultDataSize))}
					itemRenderer={renderItem(StatefulSwitchItem, ri.scale(number('itemSize', Config, 156)), true)}
					itemSize={ri.scale(number('itemSize', Config, 156))}
					key={select('scrollMode', prop.scrollModeOption, Config)}
					scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
				/>
			);
		},
		{propTables: [Config]}
	)
	.add(
		'overscrollEffectOn where pageKey is true',
		() => {
			return (
				<VirtualList
					overscrollEffectOn={{
						arrowKey: false,
						drag: false,
						pageKey: true,
						track: false,
						wheel: false
					}}
					dataSize={updateDataSize(number('dataSize', Config, defaultDataSize))}
					itemRenderer={renderItem(StatefulSwitchItem, ri.scale(number('itemSize', Config, 156)), true)}
					itemSize={ri.scale(number('itemSize', Config, 156))}
					key={select('scrollMode', prop.scrollModeOption, Config)}
					scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
				/>
			);
		},
		{propTables: [Config]}
	)
	.add(
		'with extra items',
		() => {
			return (
				<Column>
					<Cell
						component={VirtualList}
						dataSize={updateDataSize(number('dataSize', Config, 10))}
						direction="vertical"
						horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, Config)}
						itemRenderer={renderItem(Item, ri.scale(number('size', Config, 156)), true)}
						itemSize={ri.scale(number('itemSize', Config, 156))}
						key={select('scrollMode', prop.scrollModeOption, Config)}
						noScrollByWheel={boolean('noScrollByWheel', Config)}
						onKeyDown={action('onKeyDown')}
						onScrollStart={action('onScrollStart')}
						onScrollStop={action('onScrollStop')}
						scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
						spacing={ri.scale(number('spacing', Config, 0))}
						spotlightDisabled={boolean('spotlightDisabled(for all items)', Config, false)}
						verticalScrollbar={select('verticalScrollbar', prop.scrollbarOption, Config)}
						wrap={wrapOption[select('wrap', ['false', 'true', '"noAnimation"'], Config)]}
					/>
					<Cell shrink component={Item}>extra item1</Cell>
					<Cell shrink component={Item}>extra item2</Cell>
					<Cell shrink component={Item}>extra item3</Cell>
				</Column>
			);
		},
		{propTables: [Config]}
	)
	.add(
		'with container items have spottable controls',
		() => {
			return (
				<VirtualList
					overscrollEffectOn={{
						arrowKey: false,
						drag: false,
						pageKey: true,
						track: false,
						wheel: false
					}}
					dataSize={updateDataSize(number('dataSize', Config, defaultDataSize))}
					itemRenderer={renderItem(ContainerItemWithControls, ri.scale(number('itemSize', Config, 156)), true)}
					itemSize={ri.scale(number('itemSize', Config, 156))}
					key={select('scrollMode', prop.scrollModeOption, Config)}
					scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
					wrap={wrapOption[select('wrap', ['false', 'true', '"noAnimation"'], Config)]}
				/>
			);
		},
		{propTables: [Config]}
	);
