import Item from '@enact/sandstone/Item';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ri from '@enact/ui/resolution';
import {VirtualGridList} from '@enact/sandstone/VirtualList';

const items = Array.from(new Array(1000)).map((n, i) => `Item  ${('00' + i).slice(-3)}`);

class SampleVirtualGridListNative extends Component {
	static propTypes = {
		index: PropTypes.number,
		onClick: PropTypes.func
	}

	renderItem = ({index, ...rest}) => (
		<Item {...rest} onClick={this.props.onClick}>
			<h6>
				{items[index]}
			</h6>
		</Item>
	);

	render () {
		const {index, ...rest} = this.props;

		delete rest.scrollLeft;
		delete rest.scrollTop;
		delete rest.onClick;

		const id = `vgl_${index}`;

		return (
			<VirtualGridList
				{...rest}
				cbScrollTo={this.getScrollTo}
				spotlightId={id} // Set a unique ID to preserve last focus
				dataSize={items.length}
				id={id}
				itemRenderer={this.renderItem}
				itemSize={{
					minWidth: ri.scale(360),
					minHeight: ri.scale(270)
				}}
			/>
		);
	}
}

export default SampleVirtualGridListNative;
