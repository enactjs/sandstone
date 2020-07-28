import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import ri from '@enact/ui/resolution';
import {VirtualListBasic as UiVirtualListBasic} from '@enact/ui/VirtualList/VirtualListBasic';
import React from 'react';

import Button from '@enact/sandstone/Button';
import ContextualPopupDecorator from '@enact/sandstone/ContextualPopupDecorator';
import ImageItem from '@enact/sandstone/ImageItem';
import Item from '@enact/sandstone/Item';
import {VirtualList, VirtualGridList} from '@enact/sandstone/VirtualList';

import {storiesOf} from '@storybook/react';

const VirtualListConfig = mergeComponentMetadata('VirtualList', UiVirtualListBasic, VirtualList);
const Config = mergeComponentMetadata('VirtualGridList', UiVirtualListBasic, VirtualGridList);

const
	defaultDataSize = 1000,
	prop = {
		direction: {horizontal: 'horizontal', vertical: 'vertical'},
		scrollbarOption: ['auto', 'hidden', 'visible'],
		scrollModeOption: ['native', 'translate']
	},
	wrapOption = {
		false: false,
		true: true,
		'&quot;noAnimation&quot;': 'noAnimation'
	},
	items = [],
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
			text = `Item ${count}`,
			subText = `SubItem ${count}`,
			color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
			source = `http://placehold.it/600x600/${color}/ffffff&text=Image ${i}`;

		items.push({text, subText, source});
	}

	return dataSize;
};

updateDataSize(defaultDataSize);

let itemList = [];
for (let i = 0; i < 60; i++) {
	itemList.push('item' + i);
}

const ContextualPopupButton = ContextualPopupDecorator(Button);

let lastIndex = 0;

class MyVirtualList extends React.Component {
	componentDidMount () {
		this.scrollTo({index: lastIndex, animate: false, focus: true});
	}

	closePopup (index) {
		lastIndex = index;
		// eslint-disable-next-line enact/prop-types
		this.props.closePopup();
	}

	renderItem = ({index, ...rest}) => {
		return (
			/* eslint-disable react/jsx-no-bind */
			<Item
				{...rest}
				onClick={() => this.closePopup(index)}
			>
				{itemList[index]}
			</Item>
		);
	};

	getScrollTo = (scrollTo) => {
		this.scrollTo = scrollTo;
	}

	render () {
		let props = {...this.props};
		delete props.closePopup;

		return (
			<div {...props} style={{width: ri.scaleToRem(1830), height: ri.scaleToRem(1200)}}>
				<VirtualGridList
					cbScrollTo={this.getScrollTo}
					dataSize={itemList.length}
					direction="vertical"
					itemRenderer={this.renderItem}
					itemSize={{minWidth: ri.scale(570), minHeight: ri.scale(156)}}
					key={select('scrollMode', prop.scrollModeOption, Config)}
					scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
				/>
			</div>
		);
	}
}

class VirtualGridListInVirtualList extends React.Component {
	constructor (props) {
		super(props);
	}

	renderGridList = ({index}) => {
		const isVertical = select('direction', prop.direction, VirtualListConfig) === 'vertical';
		const itemWidth = ri.scale(number('minWidth', Config, 688));
		const itemHeight = ri.scale(number('minHeight', Config, 570));
		const style = isVertical ?
			{height:itemHeight, paddingBottom: ri.scaleToRem(36)} :
			{width: itemWidth};
		return (
			<VirtualGridList
				data-index={index}
				dataSize={updateDataSize(number('dataSize', Config, 300))}
				direction={isVertical ? 'horizontal' : 'vertical'}
				horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, Config)}
				itemRenderer={renderItem}
				itemSize={{
					minWidth:itemWidth,
					minHeight: itemHeight
				}}
				key={select('scrollMode', prop.scrollModeOption, Config) + index}
				noScrollByWheel={boolean('noScrollByWheel', Config)}
				onKeyDown={action('onKeyDown')}
				onScrollStart={action('onScrollStart')}
				onScrollStop={action('onScrollStop')}
				scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
				spacing={ri.scale(number('spacing', Config, 0))}
				spotlightDisabled={boolean('spotlightDisabled', Config, false)}
				style={style}
				verticalScrollbar={select('verticalScrollbar', prop.scrollbarOption, Config)}
				wrap={wrapOption[select('wrap', ['false', 'true', '"noAnimation"'], Config)]}
			/>
		);
	}

	render = () => {
		const direction = select('direction', prop.direction, VirtualListConfig);
		return (
			<VirtualList
				dataSize={number('dataSize', VirtualListConfig, 5)}
				direction={direction}
				itemSize={direction === 'vertical' ? ri.scale(number('minHeight', Config, 570)) : ri.scale(number('minWidth', Config, 688))}
				key={select('scrollMode', prop.scrollModeOption, Config)}
				noScrollByWheel={boolean('noScrollByWheel', Config)}
				scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
				spacing={ri.scale(number('spacing', VirtualListConfig))}
				style={direction === 'vertical' ? {paddingRight: ri.scaleToRem(36)} : {paddingBottom: ri.scaleToRem(36)}}
				wrap={wrapOption[select('wrap', ['false', 'true', '"noAnimation"'], VirtualListConfig)]}
				itemRenderer={this.renderGridList}
			/>
		);
	}
}

class ButtonAndVirtualGridList extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isPopup: false
		};
	}

	renderPopup = (rest) => {
		return (
			<MyVirtualList {...rest} closePopup={this.closePopup} />
		);
	}

	openPopup = () => {
		this.setState({isPopup: true});
	}

	closePopup = () => {
		this.setState({isPopup: false});
	}

	render () {
		return (
			<div>
				<ContextualPopupButton
					open={this.state.isPopup}
					popupComponent={this.renderPopup}
					onClick={this.openPopup}
					direction="right middle"
					spotlightRestrict="self-only"
					onClose={this.closePopup}
				>
					Focus here
				</ContextualPopupButton>
			</div>
		);
	}
}

storiesOf('VirtualGridList', module)
	.add(
		'Horizontal VirtualGridList',
		() => (
			<VirtualGridList
				dataSize={updateDataSize(number('dataSize', Config, defaultDataSize))}
				direction="horizontal"
				horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, Config)}
				itemRenderer={renderItem}
				itemSize={{
					minWidth: ri.scale(number('minWidth', Config, 688)),
					minHeight: ri.scale(number('minHeight', Config, 570))
				}}
				key={select('scrollMode', prop.scrollModeOption, Config)}
				noScrollByWheel={boolean('noScrollByWheel', Config)}
				onKeyDown={action('onKeyDown')}
				onScrollStart={action('onScrollStart')}
				onScrollStop={action('onScrollStop')}
				scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
				spacing={ri.scale(number('spacing', Config, 0))}
				style={{paddingBottom: ri.unit(ri.scale(36) + 'px', 'rem')}}
				spotlightDisabled={boolean('spotlightDisabled', Config, false)}
				verticalScrollbar={select('verticalScrollbar', prop.scrollbarOption, Config)}
				wrap={wrapOption[select('wrap', ['false', 'true', '"noAnimation"'], Config)]}
			/>
		),
		{propTables: [Config]}
	)
	.add(
		'Horizontal VirtualGridList in VirtualList',
		() => (
			<VirtualGridListInVirtualList />
		)
	)
	.add(
		'with Button, Spotlight goes to correct target',
		() => (
			<ButtonAndVirtualGridList />
		)
	);
