import Item from '@enact/sandstone/Item';
import {Header} from '@enact/sandstone/Panels';
import {Scroller} from '@enact/sandstone/Scroller';
import React from 'react';

let itemList = [];
for (let i = 0; i < 60; i++) {
	itemList.push('item' + i);
}

class IntentHorizontalScroller extends React.Component {
	render () {
		return (
			<div>
				<>
					<Header title="Intent to scroll horizontally" />
					<Scroller
						focusableScrollbar
						direction="horizontal"
						horizontalScrollbar="visible"
						verticalScrollbar="hidden"
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
				</>
			</div>
		);
	}
}

export default IntentHorizontalScroller;
