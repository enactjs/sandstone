import {GridListImageItem} from '../../../../../GridListImageItem';
import Layout, {Cell} from '@enact/ui/Layout';
import React from 'react';
import Region from '../../../../../Region';
import ri from '@enact/ui/resolution';
import ToggleButton from '../../../../../ToggleButton';
import {VirtualGridList} from '../../../../../VirtualList';

import css from './VirtualGridList.module.less';

const
	items = [],
	// eslint-disable-next-line enact/prop-types, enact/display-name
	renderItem = ({index, ...rest}) => {
		const
			{text, subText, source} = items[index],
			posinset = index + 1;

		return (
			<GridListImageItem
				{...rest}
				aria-posinset={posinset}
				aria-setsize={items.length}
				caption={text}
				role="listitem"
				source={source}
				subCaption={subText}
			/>
		);
	};

for (let i = 0; i < 100; i++) {
	const
		count = ('00' + i).slice(-3),
		text = `Item ${count}`,
		subText = `SubItem ${count}`,
		color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
		source = `http://placehold.it/300x300/${color}/ffffff&text=Image ${i}`;

	items.push({text, subText, source});
}

class VirtualGridListView extends React.Component {
	constructor () {
		super();
		this.state = {
			customAriaLabel: false,
			isHorizontalList: false,
			isNative: false
		};
	}

	onClickChangeAriaLabelButton = () => this.setState((state) => ({customAriaLabel: !state.customAriaLabel}))

	onClickChangeDirectionButton = () => this.setState((state) => ({isHorizontalList: !state.isHorizontalList}))

	onClickChangeJSNativeButton = () => this.setState((state) => ({isNative: !state.isNative}))

	render () {
		const
			{customAriaLabel, isHorizontalList, isNative} = this.state,
			scrollMode = isNative ? 'native' : 'translate';

		return (
			<Layout orientation="vertical">
				<Cell shrink>
					<ToggleButton
						size="small"
						onClick={this.onClickChangeAriaLabelButton}
						selected={customAriaLabel}
					>
						Customizable aria-labels on ScrollButtons
					</ToggleButton>
					<ToggleButton
						size="small"
						onClick={this.onClickChangeDirectionButton}
						selected={isHorizontalList}
					>
						Horizontal
					</ToggleButton>
					<ToggleButton
						size="small"
						onClick={this.onClickChangeJSNativeButton}
						selected={isNative}
					>
						Native
					</ToggleButton>
				</Cell>
				<Cell className={css.region} component={Region} title="X of Y feature">
					<VirtualGridList
						dataSize={items.length}
						direction={isHorizontalList ? 'horizontal' : 'vertical'}
						focusableScrollbar
						itemRenderer={renderItem}
						itemSize={{
							minWidth: ri.scale(200),
							minHeight: ri.scale(200)
						}}
						scrollDownAriaLabel={customAriaLabel ? 'This is scroll down' : null}
						scrollMode={scrollMode}
						scrollUpAriaLabel={customAriaLabel ? 'This is scroll up' : null}
					/>
				</Cell>
			</Layout>
		);
	}
}

export default VirtualGridListView;
