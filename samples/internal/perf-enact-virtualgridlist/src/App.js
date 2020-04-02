import GridListImageItem from '../../../../GridListImageItem';
import React, {Component} from 'react';
import ri from '@enact/ui/resolution';
import ThemeDecorator from '../../../../ThemeDecorator';
import {VirtualGridList} from '../../../../VirtualList';

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

class VirtualGridListSample extends Component {
	componentDidMount () {
		this.scrollTo({animate: false, focus: true, index: 19});
	}

	getScrollTo = (scrollTo) => {
		this.scrollTo = scrollTo;
	}

	renderItem = ({index, ...rest}) => {
		return (
			<GridListImageItem
				{...rest}
				caption={items[index].text}
				className={css.gridListItem}
				source={items[index].url}
				subCaption={items[index].subText}
			/>
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

export default ThemeDecorator(VirtualGridListSample);
