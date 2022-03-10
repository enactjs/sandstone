import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Component} from 'react';
import ri from '@enact/ui/resolution';
import {VirtualGridList} from '@enact/sandstone/VirtualList';

import ImageItem from '../ImageItem';

import css from './ImageList.module.less';

import {
	updateItemsOrder as updateItemsOrderAction
} from '../../actions';

class ImageList extends Component {
	static propTypes = {
		dispatch: PropTypes.func,
		imageitems: PropTypes.array,
		minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		updateItemsOrder: PropTypes.func
	};

	calculateOfSize = (size) => ri.scale(parseInt(size) || 0);

	renderItem = ({editMode, ...rest}) => (
		<ImageItem
			{...rest}
			style={editMode ? {
				transform: `translateY(-${ri.scaleToRem(100)})`
			} : {}}
		/>
	);

	render = () => {
		const
			{imageitems, spacing, minHeight, minWidth, updateItemsOrder, ...rest} = this.props;

		delete rest.dispatch;

		return (
			<VirtualGridList
				{...rest}
				className={rest.direction === 'horizontal' ? css.horizontalPadding : css.verticalPadding}
				dataSize={imageitems.length}
				editMode
				hoverToScroll
				itemRenderer={this.renderItem}
				itemSize={{minHeight: this.calculateOfSize(minHeight), minWidth: this.calculateOfSize(minWidth)}}
				onUpdateItemsOrder={updateItemsOrder}
				spacing={this.calculateOfSize(spacing)}
			/>
		);
	};
}

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
