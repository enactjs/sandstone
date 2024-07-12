import {VirtualGridList} from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import {useCallback, useContext} from 'react';
import PropTypes from 'prop-types';

import ImageListItem from '../ImageListItem';
import {RecordContext} from '../../context/RecordContext';

import css from './ImageList.module.less';

const ImageList = (props) => {
	const {dataOrder, minHeight, minWidth, spacing} = useContext(RecordContext);

	const calculateOfSize = (size) => ri.scale(parseInt(size) || 0);

	const renderItem = useCallback(({...renderRest}) => (<ImageListItem {...renderRest} />), []);

	return (
		<VirtualGridList
			{...props}
			className={props.direction === 'horizontal' ? css.horizontalPadding : css.verticalPadding}
			dataSize={dataOrder.length}
			itemRenderer={renderItem}
			itemSize={{minHeight: calculateOfSize(minHeight), minWidth: calculateOfSize(minWidth)}}
			spacing={calculateOfSize(spacing)}
		/>
	);
};

ImageList.propTypes = {
	direction: PropTypes.string
};

export default ImageList;
