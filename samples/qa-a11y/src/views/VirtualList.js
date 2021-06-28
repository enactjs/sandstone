/* eslint-disable react/jsx-no-bind */

import CheckboxItem from '@enact/sandstone/CheckboxItem';
import Item from '@enact/sandstone/Item';
import {VirtualList} from '@enact/sandstone/VirtualList';
import Layout, {Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import {useState} from 'react';

const items = [];
// eslint-disable-next-line enact/prop-types
const renderItem = ({index, ...rest}) => (
	<Item {...rest}>
		{items[index]}
	</Item>
);

for (let i = 0; i < 100; i++) {
	items.push('Item ' + ('00' + i).slice(-3));
}

const VirtualListView = () => {
	const [native, setNative] = useState(true);
	const scrollMode = native ? 'native' : 'translate';

	const handleToggleScrollMode = () => setNative(!native);

	return (
		<Layout orientation="vertical">
			<Cell shrink>
				<CheckboxItem
					onClick={handleToggleScrollMode}
					selected={native}
				>
					Native
				</CheckboxItem>
			</Cell>
			<VirtualList
				dataSize={items.length}
				itemRenderer={renderItem}
				itemSize={ri.scale(156)}
				scrollMode={scrollMode}
			/>
		</Layout>
	);
};

export default VirtualListView;
