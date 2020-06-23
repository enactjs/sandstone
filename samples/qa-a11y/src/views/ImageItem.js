import Heading from '@enact/sandstone/Heading';
import ImageItem from '@enact/sandstone/ImageItem';
import Scroller from '@enact/sandstone/Scroller';
import Layout, {Cell} from '@enact/ui/Layout';
import React from 'react';

const ImageItemView = () => (
	<Layout orientation="vertical">
		<Cell component={Scroller}>
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
		</Cell>
	</Layout>
);

export default ImageItemView;
