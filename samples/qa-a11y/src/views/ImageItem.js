import Heading from '@enact/sandstone/Heading';
import ImageItem from '@enact/sandstone/ImageItem';
import React from 'react';

const SelectableImageItem = (props) => {
	const [checked, setChecked] = React.useState(false);
	const handleClick = () => setChecked(!checked);

	return <ImageItem {...props} onClick={handleClick} selected={checked} />; // eslint-disable-line react/jsx-no-bind
};

const ImageItemView = () => (
	<>
		<ImageItem
			label="ImageItem label"
			orientation="horizontal"
			src="http://via.placeholder.com/200x200/7ed31d/ffffff"
		>
			ImageItem Caption
		</ImageItem>
		<Heading showLine>ImageItem with showSelection</Heading>
		<SelectableImageItem
			label="ImageItem label"
			orientation="horizontal"
			showSelection
			src="http://via.placeholder.com/200x200/7ed31d/ffffff"
		>
			ImageItem Caption
		</SelectableImageItem>
		<Heading showLine>Aria-labeled ImageItem</Heading>
		<ImageItem
			aria-label="This is an image item"
			label="ImageItem label"
			orientation="horizontal"
			src="http://via.placeholder.com/200x200/7ed31d/ffffff"
		>
			ImageItem Caption
		</ImageItem>
		<Heading showLine>Aria-labeled ImageItem with showSelection</Heading>
		<SelectableImageItem
			aria-label="This is an image item"
			label="ImageItem label"
			orientation="horizontal"
			showSelection
			src="http://via.placeholder.com/200x200/7ed31d/ffffff"
		>
			ImageItem Caption
		</SelectableImageItem>
	</>
);

export default ImageItemView;
