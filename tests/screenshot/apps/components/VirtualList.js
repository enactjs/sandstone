import ri from '@enact/ui/resolution';

import Item from '../../../../Item';
import VirtualList from '../../../../VirtualList';

const renderItem = () => ({index, ...rest}) => { // eslint-disable-line enact/display-name
	const items = ['Item 000', 'Item 001', 'Item 002', 'Item 003', 'Item 004', 'Item 005', 'Item 006', 'Item 007', 'Item 008', 'Item 009'];
	const itemStyle = {
		height: ri.unit(144, 'rem')
	};

	return (
		<Item {...rest} style={itemStyle}>
			{items[index]}
		</Item>
	);
};

const VirtualListTests = [
	// [QWTC-2339] The Light skin tested on 'tests/screenshot/specs/light/Light-specs*.js'.
	<div>
		<VirtualList
			dataSize={10}
			itemSize={ri.scale( 144)}
			itemRenderer={renderItem(ri.scale(144))}
			spacing={ri.scale(60)}
		/>
	</div>,
	<div>
		<VirtualList
			dataSize={10}
			focusableScrollbar
			horizontalScrollbar="visible"
			itemSize={ri.scale( 144)}
			itemRenderer={renderItem(ri.scale(144))}
			verticalScrollbar="visible"
		/>
	</div>
];

export default VirtualListTests;
