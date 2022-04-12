import {Header, Panel} from '@enact/sandstone/Panels';
import Item from '@enact/sandstone/Item';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import {useCallback} from 'react';

let items = [];
for (let i = 0; i < 100; i++) {
	items.push('item' + i);
}

const itemSize = ri.scale(250);

const IntentVirtualGridList = () => {
	const renderItem = useCallback(({index, ...rest}) => {
		return (
			<Item index={index} {...rest}>{items[index]}</Item>
		);
	}, []);

	return (
		<Panel>
			<Header title="Intent to scroll on VirtualGridList" />
			<VirtualGridList
				dataSize={items.length}
				direction="horizontal"
				itemRenderer={renderItem}
				itemSize={{minWidth: itemSize, minHeight: itemSize}}
				spacing={0}
			/>
		</Panel>
	);
};

export default IntentVirtualGridList;
