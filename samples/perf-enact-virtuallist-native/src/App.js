import Item from '@enact/sandstone/Item';
import React, {Component} from 'react';
import ri from '@enact/ui/resolution';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import {VirtualList} from '@enact/sandstone/VirtualList';

const
	items = [],
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
	];

for (let i = 0; i < 1000; i++) {
	items.push({title: ('00' + i).slice(-3) + ' - ' + languages[i % 10]});
}

class VirtualListNativeSample extends Component {
	componentDidMount () {
		this.scrollTo({animate: false, focus: true, index: 10});
	}

	getScrollTo = (scrollTo) => {
		this.scrollTo = scrollTo;
	}

	renderItem = ({index, ...rest}) => (
		<Item {...rest}>
			{items[index].title}
		</Item>
	)

	render () {
		return (
			<VirtualList
				{...this.props}
				cbScrollTo={this.getScrollTo}
				dataSize={items.length}
				itemRenderer={this.renderItem}
				itemSize={ri.scale(156)}
			/>
		);
	}
}

export default ThemeDecorator(VirtualListNativeSample);
