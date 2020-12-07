import Item from '@enact/sandstone/Item';
import React from 'react';

import CommonView from '../../components/CommonView';

let itemList = [];
for (let i = 0; i < 60; i++) {
	itemList.push('item' + i);
}

class IntentHorizontalScroller extends React.Component {
	render () {
		return (
			<CommonView title="Intent to scroll horizontally" scrollerDirection="horizontal" style={{width: '100%', height: '400px'}}>
				<div style={{display:'flex', flexDirection:'row'}}>
					{
						itemList.map((item, index) => {
							return <Item key={index} data-index={index} style={{minWidth: 300, minHeight: 300}}>{item}</Item>;
						})
					}
				</div>
			</CommonView>
		);
	}
}

export default IntentHorizontalScroller;
