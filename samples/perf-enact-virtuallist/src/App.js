import Item from '@enact/sandstone/Item';
import React, {Component} from 'react';
import ri from '@enact/ui/resolution';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import VirtualList from '@enact/sandstone/VirtualList';

import css from './App.module.less';

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

class VirtualListSample extends Component {
	componentDidMount () {
		this.scrollTo({animate: false, focus: true, index: 10});
	}

	getScrollTo = (scrollTo) => {
		this.scrollTo = scrollTo;
	}

	renderItem = ({index, ...rest}) => (
		<Item {...rest} className={css.item}>
			{items[index].title}
		</Item>
	)

	render () {
		return (
			<div {...this.props}>
				<VirtualList
					cbScrollTo={this.getScrollTo}
					dataSize={items.length}
					focusableScrollbar
					itemRenderer={this.renderItem}
					itemSize={ri.scale(62)}
					scrollMode="translate"
				/>
			</div>
		);
	}
}

export default ThemeDecorator(VirtualListSample);
