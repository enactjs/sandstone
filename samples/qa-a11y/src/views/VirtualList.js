import CheckboxItem from '@enact/sandstone/CheckboxItem';
import Item from '@enact/sandstone/Item';
import Region from '@enact/sandstone/Region';
import {VirtualList} from '@enact/sandstone/VirtualList';
import Layout, {Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import React from 'react';

import css from './VirtualList.module.less';

const
	horizontalStyle = {
		width: ri.scale(170),
		height: ri.scale(660),
		borderRight: ri.scale(2) + 'px solid #202328',
		boxSizing: 'border-box'
	},
	items = [],
	verticalStyle = {
		borderBottom: ri.scale(2) + 'px solid #202328',
		boxSizing: 'border-box'
	},
	// eslint-disable-next-line enact/prop-types, enact/display-name
	renderItem = (isHorizontalList) => ({index, ...rest}) => {
		const posinset = index + 1;

		return (
			<Item
				{...rest}
				aria-posinset={posinset}
				aria-setsize={items.length}
				role="listitem"
				style={isHorizontalList ? horizontalStyle : verticalStyle}
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
			isHorizontalList: false,
			isNative: false
		};
	}

	onToggleOrientation = () => this.setState((state) => ({isHorizontalList: !state.isHorizontalList}))

	onToggleScrollMode = () => this.setState((state) => ({isNative: !state.isNative}))

	render () {
		const
			{isHorizontalList, isNative} = this.state,
			scrollMode = isNative ? 'native' : 'translate';

		return (
			<Layout orientation="vertical">
				<Cell shrink>
					<CheckboxItem
						onClick={this.onToggleOrientation}
						selected={isHorizontalList}
					>
						Horizontal
					</CheckboxItem>
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
						direction={isHorizontalList ? 'horizontal' : 'vertical'}
						focusableScrollbar
						itemRenderer={renderItem(isHorizontalList)}
						itemSize={ri.scale(isHorizontalList ? 170 : 72)}
						scrollMode={scrollMode}
					/>
				</Cell>
			</Layout>
		);
	}
}

export default VirtualListView;
