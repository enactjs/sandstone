import {VirtualGridList} from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import {useCallback} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import ImageItem from '../ImageItem';

import css from './ImageList.module.less';

import {
	updateItemsOrder as updateItemsOrderAction
} from '../../store';

const ImageList = ({imageitems, minHeight, minWidth, updateItemsOrder, spacing, ...rest}) => {
	const calculateOfSize = (size) => ri.scale(parseInt(size) || 0);

	const renderItem = useCallback(({editMode, ...renderRest}) => (
		<ImageItem
			{...renderRest}
			style={editMode ? {transform: `translateY(-${ri.scaleToRem(100)})`} : {}}
		/>
	), []);


	delete rest.dispatch;

	return (
		<VirtualGridList
			{...rest}
			className={rest.direction === 'horizontal' ? css.horizontalPadding : css.verticalPadding}
			dataSize={imageitems.length}
			hoverToScroll
			itemRenderer={renderItem}
			itemSize={{minHeight: calculateOfSize(minHeight), minWidth: calculateOfSize(minWidth)}}
			editable={{
				css: css,
				onComplete: ({detail: {order}}) => {
					updateItemsOrder(order);
				}
			}}
			spacing={calculateOfSize(spacing)}
		/>
	);
};

ImageList.propTypes = {
	direction: PropTypes.string,
	dispatch: PropTypes.func,
	imageitems: PropTypes.array,
	minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	updateItemsOrder: PropTypes.func
};

const mapStateToProps = ({data}) => ({
	imageitems: data.dataOrder,
	minHeight: data.minHeight,
	minWidth: data.minWidth,
	spacing: data.spacing
});

const mapDispatchToProps = (dispatch) => {
	return {
		updateItemsOrder: (newDataOrder) => dispatch(updateItemsOrderAction(newDataOrder))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageList);
