import {connect} from 'react-redux';
import ImageItem from '@enact/sandstone/ImageItem';

import {selectItem} from '../../store';

const mapStateToProps = ({data: {data: allItems, selectedItems}}, {['data-index']: dataIndex}) => {
	const {
		caption: children,
		subCaption: label,
		showSelection,
		src
	} = allItems[dataIndex];

	return {
		children,
		label,
		selected: selectedItems.includes(dataIndex),
		showSelection,
		src
	};
};

const mapDispatchToProps = (dispatch, {['data-index']: dataIndex}) => {
	return {
		onClick: () => dispatch(selectItem(dataIndex))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageItem);
