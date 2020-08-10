import React from 'react';
import {Panel, Header} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import {Spottable} from '@enact/spotlight/Spottable';
import {ItemBase} from '@enact/sandstone/Item';
import css from './UseCaseHorizontalScroller.module.less';

let itemList = [];
for (let i = 0; i < 60; i++) {
	itemList.push('item' + i);
}

const SpottableItem = Spottable(ItemBase);

class UseCaseHorizontalScroller extends React.Component {
	render () {
		return (
			<Panel>
				<Header title="Use Case Horizontal Scroller" />
				<Scroller
					focusableScrollbar
					direction="horizontal"
					verticalScrollbar="hidden"
					horizontalScrollbar="visible"
				>
					<div style={{display:'flex', flexDirection:'row'}}>
						{
							itemList.map((item, index) => {
								return (
									<SpottableItem key={index} className={css.deviceItem}>
										<div className={css.deviceItemBackground} />
										<div style={{fontSize: 30}}>{index}</div>
									</SpottableItem>
								);
							})
						}
					</div>
				</Scroller>
			</Panel>
		);
	}
}

export default UseCaseHorizontalScroller;
