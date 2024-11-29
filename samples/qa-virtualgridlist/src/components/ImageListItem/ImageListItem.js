import ImageItem from '@enact/sandstone/ImageItem';
import {useContext} from 'react';

import {RecordContext, RecordDispatchContext, selectItem as selectItemAction} from '../../context/RecordContext';

const ImageListItem = (props) => {
	const {['data-index']: dataIndex} = props;

	const {data, selectedItems} = useContext(RecordContext);
	const dispatch = useContext(RecordDispatchContext);

	const onClick = () => (dispatch(selectItemAction(dataIndex)));

	return (
		<ImageItem
			label={data[dataIndex].subCaption}
			src={data[dataIndex].src}
			showSelection={data[dataIndex].showSelection}
			selected={selectedItems.includes(dataIndex)}
			/* eslint-disable react/jsx-no-bind */
			onClick={onClick}
			{...props}
		>{data[dataIndex].caption}</ImageItem>
	);
};

export default ImageListItem;
