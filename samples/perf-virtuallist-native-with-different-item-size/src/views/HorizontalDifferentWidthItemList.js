import Item from '@enact/sandstone/Item';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useState} from 'react';
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

const itemStyleDefault = {
	height: '100%',
	fontSize,
	lineHeight,
	whiteSpace: 'pre'
};

const innerItemStyleDefault = {
	writingMode: 'vertical-rl'
};

const DifferenctWidthItem = ({index, items, style: itemStyleFromList, ...rest}) => {
	const
		{title: children, width} = items[index],
		itemStyle = {...itemStyleDefault, ...itemStyleFromList, width: width + 'px'};

	return (
		<Item {...rest} style={itemStyle}>
			<div style={innerItemStyleDefault}>
				{children}
			</div>
		</Item>
	);
};

DifferenctWidthItem.propTypes = {
	index: PropTypes.number,
	items: PropTypes.array
};

const HorizontalDifferenctWidthItemList = (props) => {
	const [items, setItems] = useState([]);
	const [itemSize, setItemSize] = useState([]);

	useEffect( () => {
		let  position = 0, arrayItemSize = [], arrayItems = [];
		for (let i = 0; i < numOfItems; i++) {
			const
				numOfLines = Math.ceil(Math.random() * 6),
				width = numOfLines * oneLineSize + paddingSize;

			arrayItems.push({
				title: (`${('00' + i).slice(-3)} | ${position}px | ${languages[i % 10]}\n`).repeat(numOfLines),
				width
			});
			arrayItemSize.push(width);
			position += (width + spacing);
		}
		setItems(arrayItems);
		setItemSize(arrayItemSize);
	}, []);

	const renderItem = useCallback((renderProps) => {
		return <DifferenctWidthItem {...renderProps} />;
	}, []);

	return (
		<VirtualList
			{...props}
			childProps={{
				items: items
			}}
			dataSize={items.length}
			direction="horizontal"
			itemRenderer={renderItem}
			itemSize={{
				minSize: oneLineSize,
				size: itemSize
			}}
			spacing={spacing}
			style={{height: '600px', paddingBottom: `${ri.scale(72)}px`}}
		/>
	);

};

export default HorizontalDifferenctWidthItemList;
