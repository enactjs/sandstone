import Item from '../../../../Item';
import VirtualList from '../../../../VirtualList';
import ri from '@enact/ui/resolution';

const renderItem = () => ({index, ...rest}) => { // eslint-disable-line enact/display-name, enact/prop-types
	const items = ['Item 000', 'Item 001', 'Item 002', 'Item 003', 'Item 004', 'Item 005', 'Item 006', 'Item 007', 'Item 008', 'Item 009'];
	const itemStyle = {
		borderBottom: ri.unit(6, 'rem') + ' solid #202328',
		boxSizing: 'border-box',
		height: ri.unit(144, 'rem')
	};

	return (
		<Item {...rest} style={itemStyle}>
			{items[index]}
		</Item>
	);
};

const VirtualListTests = [
	<div>
		<VirtualList
			dataSize={10}
			itemSize={ri.scale( 144)}
			itemRenderer={renderItem(ri.scale(144))}
		/>
	</div>,
	<div>
		<VirtualList
			dataSize={10}
			horizontalScrollbar="visible"
			itemSize={ri.scale( 144)}
			itemRenderer={renderItem(ri.scale(144))}
			verticalScrollbar="visible"
		/>
	</div>
];

export default VirtualListTests;
