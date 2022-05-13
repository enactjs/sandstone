import Button from '@enact/sandstone/Button';
import Icon from '@enact/sandstone/Icon';
import PropTypes from 'prop-types';
import {forwardRef, useCallback, useEffect, useRef, useState} from 'react';
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
	padding = `0 ${ri.scale(60)}px`,
	spacing = 60;

const itemStyleDefault = {
	position: 'absolute',
	width: '100%',
	padding,
	boxSizing: 'border-box',
	fontSize,
	lineHeight,
	whiteSpace: 'pre'
};

const buttonStyleDefault = {
	display: 'block',
	height: '50px',
	marginLeft: 'auto',
	marginRight: 0
};

const textStyleDefault = {
	overflow: 'hidden',
	textOverflow: 'ellipsis'
};

const iconButtonStyleDefault = {
	position: 'absolute',
	top: 0,
	right: 0
};

const ExpandableDifferentHeightItem = forwardRef(({index, 'data-index': dataIndex, items, style: itemStyleFromList, updateItemStatus, ...rest}, ref) => {
	const {title: children, numOfLines, open} = items[index],
		itemStyle = {...itemStyleDefault, ...itemStyleFromList};

	// 1. Long text and closed item
	if (numOfLines > 2 && !open) {
		return (
			<div {...rest} data-index={dataIndex} style={itemStyle} ref={ref}>
				<div style={{height: oneLineSize * 2, ...textStyleDefault}}>
					{children}
				</div>
				<Button data-index={dataIndex} style={buttonStyleDefault} onClick={() => updateItemStatus(index, true)/* eslint-disable-line react/jsx-no-bind */}>
					Open<Icon>arrowsmalldown</Icon>
				</Button>
				<Button data-index={dataIndex} icon="closex" style={iconButtonStyleDefault} />
			</div>
		);

		// 2. Long text and opened item
	} else if (numOfLines > 2 /* && open */) {
		return (
			<div {...rest} data-index={dataIndex} style={itemStyle} ref={ref}>
				<div>
					{children}
				</div>
				<Button data-index={dataIndex} style={buttonStyleDefault} onClick={() => updateItemStatus(index, false)/* eslint-disable-line react/jsx-no-bind */}>
					Close<Icon>arrowsmallup</Icon>
				</Button>
				<Button data-index={dataIndex} icon="closex" style={iconButtonStyleDefault} />
			</div>
		);

		// 3. Short text
	} else { // if (numOfLines <= 2)
		return (
			<div {...rest} data-index={dataIndex} style={itemStyle} ref={ref}>
				<div style={{height: oneLineSize * numOfLines}}>
					{children}
				</div>
				<Button data-index={dataIndex} icon="closex" style={iconButtonStyleDefault} />
			</div>
		);
	}
});

ExpandableDifferentHeightItem.propTypes = {
	'data-index': PropTypes.number,
	index: PropTypes.number,
	items: PropTypes.array,
	updateItemStatus: PropTypes.func
};

const ResizableItem = ({updateItemSize, ...rest}) => {
	const indexRef = useRef(0);
	const domRef = useRef({});

	const calculateMetrics = () => {
		if (domRef.current) {
			const index = indexRef.current;
			const offsetHeight = domRef.current.offsetHeight;

			updateItemSize(index, offsetHeight);
		}
	};

	indexRef.current = rest.index;

	useEffect(() => {
		calculateMetrics();
	});

	return (
		<ExpandableDifferentHeightItem
			{...rest}
			ref={domRef}
		/>
	);
};

ResizableItem.propTypes = {
	index: PropTypes.number,
	updateItemSize: PropTypes.func
};

const VerticalExpandableDifferentHeightItemList = (props) => {
	const [items, setItems] = useState([]);
	const [itemSize, setItemSize] = useState([]);

	useEffect(() => {
		let position = 0, arrayItems = [];

		for (let i = 0; i < numOfItems; i++) {
			const
				numOfLines = Math.ceil(Math.random() * 6),
				height = numOfLines * oneLineSize;

			arrayItems.push({
				title: (`${('00' + i).slice(-3)} - ${position}px - ${languages[i % 10]}\n`).repeat(numOfLines),
				numOfLines
			});
			position += (height + spacing);
		}
		setItems(arrayItems);
	}, []);

	const updateItemSize = (index, size) => {
		if (itemSize[index] !== size) {
			setItemSize((arrayItemSize) => {
				return [...arrayItemSize.slice(0, index), size, ...arrayItemSize.slice(index + 1)];
			});
		}
	};

	const updateItemStatus = (index, open) => {
		setItemSize((arrayItemSize) => {
			return [...arrayItemSize.slice(0, index)];
		});

		setItems((arrayItems) => {
			const {title, numOfLines} = arrayItems[index];
			return [...arrayItems.slice(0, index), {title, numOfLines, open}, ...arrayItems.slice(index + 1)];
		});
	};

	const renderItem = useCallback((renderProps) => {
		return <ResizableItem {...renderProps} />;
	}, []);

	return (
		<VirtualList
			{...props}
			childProps={{
				updateItemSize: updateItemSize,
				updateItemStatus: updateItemStatus,
				items: items
			}}
			dataSize={items.length}
			itemRenderer={renderItem}
			itemSize={{
				minSize: oneLineSize,
				size: itemSize
			}}
			spacing={spacing}
			style={{height: '600px', paddingRight: `${ri.scale(36)}px`}}
		/>
	);
};

export default VerticalExpandableDifferentHeightItemList;
