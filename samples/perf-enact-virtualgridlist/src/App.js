import ImageItem from '@enact/sandstone/ImageItem';
import React, {Component} from 'react';
import ri from '@enact/ui/resolution';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import {VirtualGridList} from '@enact/sandstone/VirtualList';

import css from './App.module.less';

const items = [];

for (let i = 0; i < 1000; i++) {
	const count = ('00' + i).slice(-3);
	items.push({
		text: 'Item ' + count,
		subText: 'SubItem ' + count
	});
}

class VirtualGridListSample extends Component {
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
					itemSize={{minWidth: ri.scale(642), minHeight: ri.scale(600)}} // FHD: 312 x 300, UHD: 624 x 600
					scrollMode="translate"
				/>
			</div>
		);
	}
}

export default ThemeDecorator(VirtualGridListSample);
