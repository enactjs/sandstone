import ImageItem from '@enact/sandstone/ImageItem';
import React, {Component} from 'react';
import ri from '@enact/ui/resolution';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import {VirtualGridList} from '@enact/sandstone/VirtualList';

import css from './App.module.less';

const items = [];

for (let i = 0; i < 1000; i++) {
	let color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
		count = ('00' + i).slice(-3);
	items.push({
		text: 'Item ' + count,
		subText: 'SubItem ' + count,
		url: 'http://placehold.it/193x150/' + color + '/ffffff&text=Image ' + i
	});
}

class VirtualGridListNativeSample extends Component {
	componentDidMount () {
		this.scrollTo({animate: false, focus: true, index: 19});
	}

	getScrollTo = (scrollTo) => {
		this.scrollTo = scrollTo;
	}

	renderItem = ({index, ...rest}) => {
		return (
			<ImageItem
				{...rest}
				className={css.gridListItem}
				src={items[index].url}
				label={items[index].subText}
			>
				{items[index].text}
			</ImageItem>
		);
	}

	render () {
		return (
			<div {...this.props}>
				<VirtualGridList
					cbScrollTo={this.getScrollTo}
					dataSize={items.length}
					focusableScrollbar
					itemRenderer={this.renderItem}
					itemSize={{minWidth: ri.scale(316), minHeight: ri.scale(300)}}
					spacing={ri.scale(67)}
				/>
			</div>
		);
	}
}

export default ThemeDecorator(VirtualGridListNativeSample);
