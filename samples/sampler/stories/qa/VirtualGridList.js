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
import {VirtualGridList} from '@enact/sandstone/VirtualList';

import {storiesOf} from '@storybook/react';

import css from '../default/VirtualGridList.module.less';

const Config = mergeComponentMetadata('VirtualGridList', UiVirtualListBasic, VirtualGridList);

const
	defaultDataSize = 1000,
	prop = {
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
	},
	renderSelectionItem = ({index, ...rest}) => { // eslint-disable-line enact/prop-types
		const {selected, source, subText, text} = items[index];

		// console.log(index, selected);

		return (
			<ImageItem
				{...rest}
				label={subText}
				selected={selected}
				showSelection
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
			source = `http://placehold.it/600x600/${color}/ffffff&text=Image ${i}`,
			selected = !Math.round((Math.random()));

		items.push({text, selected, subText, source});
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
		'with showSelection ImageItem',
		() => (
			<VirtualGridList
				className={
					select('direction', prop.direction, Config) === 'vertical' ?
						css.verticalPadding :
						css.horizontalPadding
				}
				dataSize={updateDataSize(number('dataSize', Config, defaultDataSize))}
				direction={select('direction', prop.direction, Config)}
				horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, Config)}
				itemRenderer={renderSelectionItem}
				itemSize={{
					minWidth: ri.scale(number('itemSize.minWidth', Config, 688)),
					minHeight: ri.scale(number('itemSize.minHeight', Config, 570))
				}}
				key={select('scrollMode', prop.scrollModeOption, Config)}
				noScrollByWheel={boolean('noScrollByWheel', Config)}
				onScrollStart={action('onScrollStart')}
				onScrollStop={action('onScrollStop')}
				scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
				spacing={ri.scale(number('spacing', Config, 0))}
				spotlightDisabled={boolean('spotlightDisabled', Config, false)}
				verticalScrollbar={select('verticalScrollbar', prop.scrollbarOption, Config)}
				wrap={wrapOption[select('wrap', ['false', 'true', '"noAnimation"'], Config)]}
			/>
		),
		{
			info: {
				text: 'Basic usage of VirtualGridList'
			}
		}
	)
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
		'with Button, Spotlight goes to correct target',
		() => (
			<ButtonAndVirtualGridList />
		)
	);
