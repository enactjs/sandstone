import CheckboxItem from '@enact/sandstone/CheckboxItem';
import ImageItem from '@enact/sandstone/ImageItem';
import Region from '@enact/sandstone/Region';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import Layout, {Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import React from 'react';

import css from './VirtualGridList.module.less';

const
	items = [],
	// eslint-disable-next-line enact/prop-types, enact/display-name
	renderItem = ({index, ...rest}) => {
		const
			{caption, label, src} = items[index],
			posinset = index + 1;

		return (
			<ImageItem
				{...rest}
				aria-posinset={posinset}
				aria-setsize={items.length}
				role="listitem"
				src={src}
				label={label}
			>
				{caption}
			</ImageItem>
		);
	};

for (let i = 0; i < 100; i++) {
	const
		count = ('00' + i).slice(-3),
		caption = `Item ${count}`,
		color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
		label = `SubItem ${count}`,
		src = `http://placehold.it/300x300/${color}/ffffff&text=Image ${i}`;

	items.push({caption, label, src});
}

class VirtualGridListView extends React.Component {
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
						onToggle={this.onToggleOrientation}
						selected={isHorizontalList}
					>
						Horizontal
					</CheckboxItem>
					<CheckboxItem
						onToggle={this.onToggleScrollMode}
						selected={isNative}
					>
						Native
					</CheckboxItem>
				</Cell>
				<Cell className={css.region} component={Region} title="X of Y feature">
					<VirtualGridList
						dataSize={items.length}
						direction={isHorizontalList ? 'horizontal' : 'vertical'}
						itemRenderer={renderItem}
						itemSize={{
							minWidth: ri.scale(200),
							minHeight: ri.scale(200)
						}}
						scrollMode={scrollMode}
					/>
				</Cell>
			</Layout>
		);
	}
}

export default VirtualGridListView;
