import {Header, Panel} from '@enact/sandstone/Panels';
import Item from '@enact/sandstone/Item';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import React from 'react';

let items = [];
for (let i = 0; i < 100; i++) {
	items.push('item' + i);
}

const itemSize = ri.scale(250);

class IntentVirtualGridList extends React.Component {
	renderItem = ({index, ...rest}) => {
		return (
			<Item index={index} {...rest}>{items[index]}</Item>
		);
	};

	render () {
		return (
			<Panel>
				<Header title="Intent to scroll on VirtualGridList" />
				<VirtualGridList
					dataSize={items.length}
					direction="horizontal"
					itemRenderer={this.renderItem}
					itemSize={{minWidth: itemSize, minHeight: itemSize}}
					spacing={0}
				/>
			</Panel>
		);
	}
}

export default IntentVirtualGridList;
