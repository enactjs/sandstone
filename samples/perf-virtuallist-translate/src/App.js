import Item from '@enact/sandstone/Item';
import ri from '@enact/ui/resolution';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import VirtualList from '@enact/sandstone/VirtualList';
import {useCallback, useEffect, useRef} from 'react';

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

const VirtualListSample = (props) => {
	const scrollToRef = useRef(null);

	useEffect(() => {
		scrollToRef.current({animate: false, focus: true, index: 10});
	}, []);

	const getScrollTo = useCallback((scrollTo) => {
		scrollToRef.current = scrollTo;
	}, []);

	const renderItem = useCallback(({index, ...rest}) => (
		<Item {...rest}>
			{items[index].title}
		</Item>
	), []);

	return (
		<VirtualList
			{...props}
			cbScrollTo={getScrollTo}
			dataSize={items.length}
			itemRenderer={renderItem}
			itemSize={ri.scale(156)}
			scrollMode="translate"
		/>
	);
};

export default ThemeDecorator(VirtualListSample);
