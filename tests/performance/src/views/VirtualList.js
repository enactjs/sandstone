import React from 'react';
import kind from '@enact/core/kind';
import VirtualList from '@enact/sandstone/VirtualList';

const items = [];

// eslint-disable-next-line enact/prop-types
const renderItem = ({index, ...rest}) => {
	return (
		<div {...rest}>
			{items[index].item}
		</div>
	);
};

for (let i = 0; i < 100; i++) {
	items.push({item :'Item ' + ('00' + i).slice(-3)});
}

const itemSize = 60;

const VirtualListView = kind({
	name: 'VirtualListView',

	render: () => (
		<div style={{height: '700px'}}>
			<VirtualList
				id="virtualList"
				dataSize={items.length}
				focusableScrollbar
				itemRenderer={renderItem}
				itemSize={itemSize}
			/>
		</div>
	)
});

export default VirtualListView;
