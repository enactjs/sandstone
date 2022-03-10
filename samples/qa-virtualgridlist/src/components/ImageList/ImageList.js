import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ri from '@enact/ui/resolution';
import {VirtualGridList} from '@enact/sandstone/VirtualList';

import ImageItem from '../ImageItem';

import css from './ImageList.module.less';
import {useCallback} from 'react';

const ImageList = ({imageitems, spacing, minHeight, minWidth, ...rest}) => {
	const calculateOfSize = (size) => ri.scale(parseInt(size) || 0);

	const renderItem = useCallback(({...renderRest}) => (<ImageItem {...renderRest} />), []);

	delete rest.dispatch;

	return (
		<VirtualGridList
			{...rest}
			className={rest.direction === 'horizontal' ? css.horizontalPadding : css.verticalPadding}
			dataSize={imageitems.length}
			itemRenderer={renderItem}
			itemSize={{minHeight: calculateOfSize(minHeight), minWidth: calculateOfSize(minWidth)}}
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
	spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

const mapStateToProps = ({data}) => ({
	imageitems: data.dataOrder,
	minHeight: data.minHeight,
	minWidth: data.minWidth,
	spacing: data.spacing
});

export default connect(mapStateToProps)(ImageList);
