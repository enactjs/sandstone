import {connect} from 'react-redux';
import ImageItem from '@enact/sandstone/ImageItem';

import {selectItem} from '../../actions';

const mapStateToProps = ({data: {data: allItems, selectedItems}}, {['data-index']: dataIndex}) => {
	const {
		caption: children,
		subCaption: label,
		showSelection,
		src
	} = allItems[dataIndex];

	let style;
	if (dataIndex === 0) {
		style = {
			visibility: 'hidden'
		}
	}

	return {
		//children,
		//label,
		//style,
		selected: selectedItems.has(dataIndex),
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
