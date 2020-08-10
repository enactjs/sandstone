import React from 'react';
import ri from '@enact/ui/resolution';
import {Panel, Header} from '@enact/sandstone/Panels';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import Item from '@enact/sandstone/Item';

let itemList = [];
for (let i = 0; i < 50; i++) {
	itemList.push('item' + i);
}

const itemSize = ri.scale(250);

class IntentVirtualGridList extends React.Component {
	constructor (props) {
		super(props);
	}

	renderItem = ({index, ...rest}) => {
		return (
			<Item index={index} {...rest}>{itemList[index]}</Item>
		);
	};

	render () {
		return (
			<Panel>
				<Header title="Intent to scroll on VirtualGridList" />
				<VirtualGridList
					direction="horizontal"
					dataSize={itemList.length}
					itemRenderer={this.renderItem}
					itemSize={{minWidth: itemSize, minHeight: itemSize}}
					spacing={ri.scale(0)}
				/>
			</Panel>
		);
	}
}

export default IntentVirtualGridList;
