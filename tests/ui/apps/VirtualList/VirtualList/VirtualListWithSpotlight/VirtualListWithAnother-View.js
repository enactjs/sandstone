import spotlight from '@enact/spotlight';
import {Row, Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import {useCallback, useState} from 'react';

import Item from '../../../../../../Item';
import ThemeDecorator from '../../../../../../ThemeDecorator';
import VirtualList from '../../../../../../VirtualList';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const itemSize = ri.scale(78);
const itemStyle = {
	width: '100%',
	height: itemSize,
	margin: 0
};

const listStyle = {
	height: itemSize * 13,
	border: '1px solid red',
	margin: '0px'
};

const itemLists = [[], []];

// eslint-disable-next-line enact/display-name
const renderItem = (listIndex) => ({index, ...rest}) => {
	const item = itemLists[listIndex][index].item;
	return (
		<Item id={item} index={index} style={itemStyle} {...rest}>
			{item}
		</Item>
	);
};

const prepareItemList = (listIndex) => (dataSize) => {
	const
		itemNumberDigits = dataSize > 0 ? ((dataSize - 1) + '').length : 0,
		headingZeros = Array(itemNumberDigits).join('0');

	itemLists[listIndex].length = 0;

	for (let i = 0; i < dataSize; i++) {
		itemLists[listIndex].push({item : `Item${listIndex + 1} ${(headingZeros + i).slice(-itemNumberDigits)}`});
	}

	return dataSize;
};

// Prepare items for both lists
const numOfItems = [20, 5];
prepareItemList(0)(numOfItems[0]);
prepareItemList(1)(numOfItems[1]);

const App = (props) => {
	const numOfItemsForList0 = numOfItems[0];
	const [numOfItemsForList1, setNumOfItemsForList1] = useState(0);

	const handleClick = useCallback(() => {
		setNumOfItemsForList1(numOfItems[1]);
	}, [setNumOfItemsForList1]);

	return (
		<div id="view" {...props}>
			<Row align="center">
				<Cell align="start">
					<VirtualList
						childProps={{
							onClick: handleClick
						}}
						dataSize={numOfItemsForList0}
						id="list0"
						itemRenderer={renderItem(0)}
						itemSize={itemSize}
						style={listStyle}
					/>
				</Cell>
				<Cell align="end">
					<VirtualList
						dataSize={numOfItemsForList1}
						id="list1"
						itemRenderer={renderItem(1)}
						itemSize={itemSize}
						style={listStyle}
					/>
				</Cell>
			</Row>
		</div>
	);
};

export default ThemeDecorator(App);
