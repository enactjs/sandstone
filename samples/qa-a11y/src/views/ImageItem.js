import Heading from '@enact/sandstone/Heading';
import ImageItem from '@enact/sandstone/ImageItem';
import React from 'react';

const ImageItemView = () => (
	<>
		<ImageItem
			label="ImageItem label"
			orientation="horizontal"
			src="http://via.placeholder.com/200x200/7ed31d/ffffff"
		>
			ImageItem Caption
		</ImageItem>
		<Heading showLine>Aria-labled Items</Heading>
		<ImageItem
			aria-label="This is an image item"
			label="ImageItem label"
			orientation="horizontal"
			src="http://via.placeholder.com/200x200/7ed31d/ffffff"
		>
			ImageItem Caption
		</ImageItem>
	</>
);

export default ImageItemView;
