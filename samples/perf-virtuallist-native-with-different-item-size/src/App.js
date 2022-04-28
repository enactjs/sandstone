import Dropdown from '@enact/sandstone/Dropdown';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import {useCallback, useState} from 'react';

import HorizontalDifferentWidthItemList from './views/HorizontalDifferentWidthItemList';
import VerticalDifferentHeightItemList from './views/VerticalDifferentHeightItemList';
import VerticalExpandableDifferentHeightItemList from './views/VerticalExpandableDifferentHeightItemList';

const views = [
	HorizontalDifferentWidthItemList,
	VerticalDifferentHeightItemList,
	VerticalExpandableDifferentHeightItemList
];

const viewNames = [
	'HorizontalDifferentWidthItemList',
	'VerticalDifferentHeightItemList',
	'VerticalExpandableDifferentHeightItemList'
];

const defaultViewIndex = 0;

const VirtualListSample = (props) => {
	const [index, setIndex] = useState(defaultViewIndex);

	const onSelect = useCallback(({selected}) => {
		setIndex(selected);
	}, []);

	const View = views[index];

	return (
		<div {...props}>
			<Dropdown
				direction="below"
				onSelect={onSelect}
				size="large"
				placeholder={viewNames[defaultViewIndex]}
				width="huge"
			>
				{viewNames}
			</Dropdown>
			<View />
		</div>
	);
};

export default ThemeDecorator(VirtualListSample);
