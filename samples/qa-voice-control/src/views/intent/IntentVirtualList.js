import Item from '@enact/sandstone/Item';
import {Header, Panel} from '@enact/sandstone/Panels';
import {VirtualList} from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import {useCallback, useRef} from 'react';

let items = [];
for (let i = 0; i < 30; i++) {
	items.push('item' + i);
}

const IntentVirtualList = () => {

	const scrollTo = useRef();

	const cbScrollTo = useCallback((ref) => {
		scrollTo.current = ref;
	}, []);

	const handleClick = useCallback(() => {
		scrollTo.current({align: 'bottom', focus: true});
	}, []);

	const renderItem = useCallback(({index, ...rest}) => {
		return (
			<Item
				{...rest}
				onClick={handleClick}
				style={{height: ri.unit(72, 'rem')}}
			>
				{items[index]}
			</Item>
		);
	}, [handleClick]);

	return (
		<Panel>
			<Header title="Intent to scroll on VirtualList" />
			<VirtualList
				cbScrollTo={cbScrollTo}
				data-webos-voice-focused
				dataSize={items.length}
				itemRenderer={renderItem}
				itemSize={72}
				spacing={12}
			/>
		</Panel>
	);

};

export default IntentVirtualList;
