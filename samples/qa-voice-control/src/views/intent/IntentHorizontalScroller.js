import React from 'react';
import {Panel, Header} from '@enact/sandstone/Panels';
import Item from '@enact/sandstone/Item';
import {Scroller} from '@enact/sandstone/Scroller';

let itemList = [];
for (let i = 0; i < 60; i++) {
	itemList.push('item' + i);
}

class IntentHorizontalScroller extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<div>
				<Panel>
					<Header title="Intent to scroll horizontally" />
					<Scroller
						focusableScrollbar
						direction="horizontal"
						verticalScrollbar="hidden"
						horizontalScrollbar="visible"
						style={{width: '100%', height: '400px'}}
					>
						<div style={{display:'flex', flexDirection:'row'}}>
							{
								itemList.map((item, index) => {
									return <Item key={index} data-index={index} style={{minWidth: 300, minHeight: 300}}>{item}</Item>;
								})
							}
						</div>
					</Scroller>
				</Panel>
			</div>
		);
	}
}

export default IntentHorizontalScroller;
