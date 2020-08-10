import Item from '@enact/sandstone/Item';
import {Panel, Header} from '@enact/sandstone/Panels';
import {VirtualList} from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';

import React from 'react';




let itemList = [];
for (let i = 0; i < 30; i++) {
	itemList.push('item' + i);
}

const itemSize = ri.scale(72);

class IntentVirtualList extends React.Component {
	constructor (props) {
		super(props);
	}

	componentDidMount () {
		// this.scrollTo({animate: false, focus: false, align: 'bottom'});
	}

	renderItem = ({index, ...rest}) => {
		return (
			<Item onClick={this.handleClick} {...rest}>{itemList[index]}</Item>
		);
	};

	cbScrollTo = (ref) => {
		this.scrollTo = ref;
	};

	handleClick = () => {
		this.scrollTo({align: 'bottom', focus: true});
	};

	render () {
		const {...rest} = this.props;

		delete rest.setComponent;

		return (
			<Panel {...rest}>
				<Header title="Intent to scroll on VirtualList" />
				<VirtualList
					dataSize={itemList.length}
					itemRenderer={this.renderItem}
					itemSize={itemSize}
					cbScrollTo={this.cbScrollTo}
					data-webos-voice-focused
				/>
			</Panel>
		);
	}
}

export default IntentVirtualList;
