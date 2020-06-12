import Button from '@enact/sandstone/Button';
import Icon from '@enact/sandstone/Icon';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
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
	fontSize = ri.scale(30),
	oneLineSize = ri.scale(60),
	lineHeight = `${oneLineSize}px`,
	padding = `0 ${ri.scale(60)}px`,
	spacing = 60;

class ExpandableDifferenctHeightItem extends Component {
	static propTypes = {
		'data-index': PropTypes.number,
		index: PropTypes.number,
		items: PropTypes.array,
		updateItemStatus: PropTypes.func
	}

	itemStyleDefault = {
		position: 'absolute',
		width: '100%',
		padding,
		boxSizing: 'border-box',
		fontSize,
		lineHeight,
		whiteSpace: 'pre'
	}

	buttonStyleDefault = {
		display: 'block',
		height: '50px',
		marginLeft: 'auto',
		marginRight: 0
	}

	textStyleDefault = {
		overflow: 'hidden',
		textOverflow: 'ellipsis'
	}

	iconButtonStyleDefault = {
		position: 'absolute',
		top: 0,
		right: 0
	}

	render () {
		const
			{index, 'data-index': dataIndex, items, style: itemStyleFromList, updateItemStatus, ...rest} = this.props,
			{title: children, numOfLines, open} = items[index],
			itemStyle = {...this.itemStyleDefault, ...itemStyleFromList};

		// 1. Lone text and closed item
		if (numOfLines > 2 && !open) {
			return (
				<div {...rest} data-index={dataIndex} style={itemStyle}>
					<div style={{height: oneLineSize * 2, ...this.textStyleDefault}}>
						{children}
					</div>
					<Button data-index={dataIndex} style={this.buttonStyleDefault} onClick={() => updateItemStatus(index, true)/* eslint-disable-line react/jsx-no-bind */}>
						Open<Icon>arrowsmalldown</Icon>
					</Button>
					<Button data-index={dataIndex} icon="closex" style={this.iconButtonStyleDefault} />
				</div>
			);

			// 2. Long text and opened item
		} else if (numOfLines > 2 /* && open */) {
			return (
				<div {...rest} data-index={dataIndex} style={itemStyle}>
					<div>
						{children}
					</div>
					<Button data-index={dataIndex} style={this.buttonStyleDefault} onClick={() => updateItemStatus(index, false)/* eslint-disable-line react/jsx-no-bind */}>
						Close<Icon>arrowsmallup</Icon>
					</Button>
					<Button data-index={dataIndex} icon="closex" style={this.iconButtonStyleDefault} />
				</div>
			);

			// 3. Short text
		} else { // if (numOfLines <= 2)
			return (
				<div {...rest} data-index={dataIndex} style={itemStyle}>
					<div style={{height: oneLineSize * numOfLines}}>
						{children}
					</div>
					<Button data-index={dataIndex} icon="closex" style={this.iconButtonStyleDefault} />
				</div>
			);
		}
	}
}

class ResizableItem extends Component {
	static propTypes = {
		updateItemSize: PropTypes.func
	}

	constructor (props) {
		super(props);
		this.itemRef = React.createRef();
	}

	componentDidMount () {
		this.calculateMetrics();
	}

	componentDidUpdate () {
		this.calculateMetrics();
	}

	calculateMetrics () {
		if (this.itemRef.current) {
			const
				index = this.itemRef.current.props.index,
				dom = ReactDOM.findDOMNode(this.itemRef.current); // eslint-disable-line react/no-find-dom-node

			this.props.updateItemSize(index, dom.offsetHeight);
		}
	}

	render () {
		const props = {...this.props};

		delete props.updateItemSize;

		return (
			<ExpandableDifferenctHeightItem
				{...props}
				ref={this.itemRef}
			/>
		);
	}
}

class VerticalExpandableDifferentHeightItemList extends Component {
	constructor (props) {
		let
			position = 0,
			itemSize = [],
			items = [];

		super(props);

		for (let i = 0; i < numOfItems; i++) {
			const
				numOfLines = Math.ceil(Math.random() * 6),
				height = numOfLines * oneLineSize;

			items.push({
				title: (`${('00' + i).slice(-3)} - ${position}px - ${languages[i % 10]}\n`).repeat(numOfLines),
				numOfLines
			});
			position += (height + spacing);
		}

		this.state = {
			items,
			itemSize
		};
	}

	updateItemSize = (index, size) => {
		if (this.state.itemSize[index] !== size) {
			this.setState(({itemSize}) => {
				return {itemSize: [...itemSize.slice(0, index), size, ...itemSize.slice(index + 1)]};
			});
		}
	}

	updateItemStatus = (index, open) => {
		this.setState(({itemSize, items}) => {
			const {title, numOfLines} = items[index];

			return {
				itemSize: [...itemSize.slice(0, index)],
				items: [...items.slice(0, index), {title, numOfLines, open}, ...items.slice(index + 1)]
			};
		});
	}

	renderItem = (props) => {
		return <ResizableItem {...props} />;
	}

	render () {
		return (
			<VirtualList
				{...this.props}
				childProps={{
					updateItemSize: this.updateItemSize,
					updateItemStatus: this.updateItemStatus,
					items: this.state.items
				}}
				dataSize={this.state.items.length}
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

export default VerticalExpandableDifferentHeightItemList;
