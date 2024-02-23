import {useContext} from 'react';
import ImageItem from '@enact/sandstone/ImageItem';

import {RecordContext, RecordDispatchContext} from '../../context/RecordContext';
import {selectItem} from '../../context/RecordContext';

const ImageItemComponent = (props) => {
	const {['data-index']: dataIndex} = props;

	const {data} = useContext(RecordContext);
	const dispatch = useContext(RecordDispatchContext);

	const onClick = () => (dispatch(selectItem(dataIndex)))
	console.log(data[dataIndex]);
	// TODO : scroll, onClick

	return (
		<ImageItem
			label={data[dataIndex].subCaption}
			children={data[dataIndex].caption}
			src={data[dataIndex].src}
			showSelection={data[dataIndex].showSelection}
			selected={data[dataIndex].selected}
			onClick={onClick}
		/>
	)
};

export default ImageItemComponent;

