import ri from '@enact/ui/resolution';
import {Component} from 'react';

import img from '../../images/600x600.png';
import ImageItem from '../../../../ImageItem';
import {VirtualGridList} from '../../../../VirtualList';

import {withConfig} from './utils';

const items = [];
const defaultDataSize = 10;

const renderItem = ({index, ...rest}) => {
	const {caption, label, src} = items[index];

	return (
		<ImageItem
			{...rest}
			label={label}
			src={src}
		>
			{caption}
		</ImageItem>
	);
};

const updateDataSize = (dataSize) => {
	items.length = 0;

	for (let i = 0; i < dataSize; i++) {
		const
			count = ('00' + i).slice(-3),
			caption = `Item ${count}`,
			label = `SubItem ${count}`,
			src = img;

		items.push({caption, label, src});
	}

	return dataSize;
};

updateDataSize(defaultDataSize);

class SnapToCenterVGL extends Component {
	constructor (props) {
		super(props);
	}

	componentDidMount () {
		this.scrollTo({index: 1, animate: false, focus: this.props.focus, stickTo: 'center'});
	}

	renderItem = ({index, ...rest}) => {
		const {src} = items[index];
		let customProps = {};
		if (index === 0 || index === items.length - 1) {
			customProps = {
				style: {
					visibility: 'hidden'
				},
				spotlightDisabled: true
			};
		}

		return (
			<ImageItem
				{...rest}
				src={src}
				style={{
					paddingLeft: ri.scaleToRem(240),
					paddingRight: ri.scaleToRem(240)
				}}
				{...customProps}
			/>
		);
	};

	getScrollTo = (scrollTo) => {
		this.scrollTo = scrollTo;
	};

	render () {
		return (
			<VirtualGridList
				cbScrollTo={this.getScrollTo}
				dataSize={updateDataSize(10)}
				itemRenderer={this.renderItem}
				itemSize={{
					minWidth: ri.scale(1230),
					minHeight: ri.scale(540)
				}}
				snapToCenter
				spacing={0}
				style={{
					width: ri.scaleToRem(2400)
				}}
				verticalScrollbar="hidden"
			/>
		);
	}
}

const VirtualGridListTests = [
	// [QWTC-2107], [QWTC-2109]
	<div>
		<VirtualGridList
			dataSize={items.length}
			itemSize={{minWidth: ri.scale(688), minHeight: ri.scale(570)}}
			itemRenderer={renderItem}
		/>
	</div>,
	<div>
		<VirtualGridList
			dataSize={items.length}
			focusableScrollbar
			horizontalScrollbar="visible"
			itemSize={{minWidth: ri.scale(688), minHeight: ri.scale(570)}}
			itemRenderer={renderItem}
			verticalScrollbar="visible"
		/>
	</div>,
	// [QWTC-2107]
	<div>
		<VirtualGridList
			dataSize={items.length}
			direction="horizontal"
			itemSize={{minWidth: ri.scale(270), minHeight: ri.scale(270)}}
			itemRenderer={renderItem}
			style={{height: ri.scale(300)}}
		/>
	</div>,
	<div>
		<VirtualGridList
			dataSize={items.length}
			direction="horizontal"
			horizontalScrollbar="hidden"
			itemSize={{minWidth: ri.scale(270), minHeight: ri.scale(270)}}
			itemRenderer={renderItem}
			style={{height: ri.scale(300)}}
		/>
	</div>,
	<div>
		<VirtualGridList
			dataSize={items.length}
			direction="horizontal"
			itemSize={{minWidth: ri.scale(270), minHeight: ri.scale(270)}}
			itemRenderer={renderItem}
			spacing={ri.scale(60)}
			style={{height: ri.scale(300)}}
		/>
	</div>,
	<div>
		<SnapToCenterVGL focus />
	</div>,
	<div>
		<SnapToCenterVGL />
	</div>,
	// [QWTC-2109]
	...withConfig({locale: 'ar-SA'}, [
		<VirtualGridList
			dataSize={items.length}
			itemSize={{minWidth: ri.scale(270), minHeight: ri.scale(270)}}
			itemRenderer={renderItem}
		/>
	])
];

export default VirtualGridListTests;
