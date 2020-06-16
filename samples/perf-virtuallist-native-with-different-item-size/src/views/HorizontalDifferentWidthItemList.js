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
	fontSize = `${ri.scale(30)}px`,
	oneLineSize = ri.scale(60),
	lineHeight = `${oneLineSize}px`,
	spacing = 60,
	paddingSize = ri.scale(48);

class DifferenctWidthItem extends Component {
	static propTypes = {
		index: PropTypes.number,
		items: PropTypes.array
	}

	itemStyleDefault = {
		height: '100%',
		fontSize,
		lineHeight,
		whiteSpace: 'pre'
	}

	innerItemStyleDefault = {
		writingMode: 'vertical-rl'
	}

	render () {
		const
			{index, items, style: itemStyleFromList, ...rest} = this.props,
			{title: children, width} = items[index],
			itemStyle = {...this.itemStyleDefault, ...itemStyleFromList, width: width + 'px'};

		return (
			<Item {...rest} style={itemStyle}>
				<div style={this.innerItemStyleDefault}>
					{children}
				</div>
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
				width = numOfLines * oneLineSize + paddingSize;

			items.push({
				title: (`${('00' + i).slice(-3)} | ${position}px | ${languages[i % 10]}\n`).repeat(numOfLines),
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
				style={{height: '600px', paddingBottom: `${ri.scale(72)}px`}}
			/>
		);
	}
}

export default HorizontalDifferenctWidthItemList;
