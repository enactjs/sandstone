import CheckboxItem from '@enact/sandstone/CheckboxItem';
import Item from '@enact/sandstone/Item';
import Layout, {Cell} from '@enact/ui/Layout';
import React from 'react';
import Region from '@enact/sandstone/Region';
import ri from '@enact/ui/resolution';
import {VirtualList} from '@enact/sandstone/VirtualList';

import css from './VirtualList.module.less';

const
	items = [],
	verticalStyle = {
		borderBottom: ri.scale(2) + 'px solid #202328',
		boxSizing: 'border-box'
	},
	// eslint-disable-next-line enact/prop-types, enact/display-name
	renderItem = ({index, ...rest}) => {
		const posinset = index + 1;

		return (
			<Item
				{...rest}
				aria-posinset={posinset}
				aria-setsize={items.length}
				role="listitem"
				style={verticalStyle}
			>
				{items[index]}
			</Item>
		);
	};

for (let i = 0; i < 100; i++) {
	items.push('Item ' + ('00' + i).slice(-3));
}

class VirtualListView extends React.Component {
	constructor () {
		super();
		this.state = {
			isNative: false
		};
	}

	onToggleScrollMode = () => this.setState((state) => ({isNative: !state.isNative}))

	render () {
		const
			{isNative} = this.state,
			scrollMode = isNative ? 'native' : 'translate';

		return (
			<Layout orientation="vertical">
				<Cell shrink>
					<CheckboxItem
						onClick={this.onToggleScrollMode}
						selected={isNative}
					>
						Native
					</CheckboxItem>
				</Cell>
				<Cell className={css.region} component={Region} title="X of Y feature">
					<VirtualList
						dataSize={items.length}
						direction="vertical"
						focusableScrollbar
						itemRenderer={renderItem}
						itemSize={ri.scale(156)}
						scrollMode={scrollMode}
					/>
				</Cell>
			</Layout>
		);
	}
}

export default VirtualListView;
