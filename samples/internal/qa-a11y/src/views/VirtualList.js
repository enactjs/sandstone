import Item from '../../../../../Item';
import Layout, {Cell} from '@enact/ui/Layout';
import React from 'react';
import Region from '../../../../../Region';
import ri from '@enact/ui/resolution';
import ToggleButton from '../../../../../ToggleButton';
import {VirtualList} from '../../../../../VirtualList';

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
					<VirtualList
						dataSize={items.length}
						direction={isHorizontalList ? 'horizontal' : 'vertical'}
						focusableScrollbar
						itemRenderer={renderItem(isHorizontalList)}
						itemSize={ri.scale(isHorizontalList ? 170 : 72)}
						scrollDownAriaLabel={customAriaLabel ? 'This is scroll down' : null}
						scrollMode={scrollMode}
						scrollUpAriaLabel={customAriaLabel ? 'This is scroll up' : null}
					/>
				</Cell>
			</Layout>
		);
	}
}

export default VirtualListView;
