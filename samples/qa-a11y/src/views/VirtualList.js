import CheckboxItem from '@enact/sandstone/CheckboxItem';
import Item from '@enact/sandstone/Item';
import {VirtualList} from '@enact/sandstone/VirtualList';
import Layout, {Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

const
	items = [],
	// eslint-disable-next-line enact/prop-types, enact/display-name
	renderItem = ({index, ...rest}) => (
		<Item {...rest}>
			{items[index]}
		</Item>
	);

for (let i = 0; i < 100; i++) {
	items.push('Item ' + ('00' + i).slice(-3));
}

class VirtualListView extends React.Component {
	constructor () {
		super();
		this.state = {
			isNative: true
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
				<VirtualList
					dataSize={items.length}
					direction="vertical"
					focusableScrollbar
					itemRenderer={renderItem}
					itemSize={ri.scale(156)}
					scrollMode={scrollMode}
				/>
			</Layout>
		);
	}
}

export default VirtualListView;
