import Item from '@enact/sandstone/Item';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ri from '@enact/ui/resolution';
import {VirtualList} from '@enact/sandstone/VirtualList';

const
	languages = [
		'한국어 - 한국',
		'English - United States',
		'Português - Brasil',
		'Português - Portugal',
		'Čeština - Česká republika',
		'Dansk - Danmark',
		'Deutsch - Deutschland',
		'Ελληνική γλώσσα - Ελλάδα',
		'Español - España',
		'Suomi - Suomi'
	],
	numOfItems = 100,
	fontSize = ri.scale(20),
	oneLineSize = ri.scale(50),
	lineHeight = `${fontSize}px`,
	spacing = 50;

class DifferenctWidthItem extends Component {
	static propTypes = {
		index: PropTypes.number,
		items: PropTypes.array
	}

	itemStyleDefault = {
		position: 'absolute',
		height: '100%',
		borderRight: 'solid 10px gray',
		boxSizing: 'border-box',
		fontSize,
		lineHeight,
		whiteSpace: 'pre',
		writingMode: 'vertical-rl'
	}

	render () {
		const
			{index, items, style: itemStyleFromList, ...rest} = this.props,
			{title: children, width} = items[index],
			itemStyle = {...this.itemStyleDefault, ...itemStyleFromList, width: width + 'px'};

		return (
			<Item {...rest} style={itemStyle}>
				{children}
			</Item>
		);
	}
}

class HorizontalDifferenctWidthItemList extends Component {
	constructor (props) {
		let
			position = 0,
			itemSize = [],
			items = [];

		super(props);

		for (let i = 0; i < numOfItems; i++) {
			const
				numOfLines = Math.ceil(Math.random() * 6),
				width = numOfLines * oneLineSize;

			items.push({
				title: (`${('00' + i).slice(-3)} | ${position}px | ${numOfLines}lines |${languages[i % 10]}\n`),
				width
			});
			itemSize.push(width);
			position += (width + spacing);
		}

		this.state = {
			items,
			itemSize
		};
	}

	renderItem = (props) => {
		return <DifferenctWidthItem {...props} />;
	}

	render () {
		return (
			<VirtualList
				{...this.props}
				childProps={{
					items: this.state.items
				}}
				dataSize={this.state.items.length}
				direction="horizontal"
				itemRenderer={this.renderItem}
				itemSize={{
					minSize: oneLineSize,
					size: this.state.itemSize
				}}
				spacing={spacing}
			/>
		);
	}
}

export default HorizontalDifferenctWidthItemList;
