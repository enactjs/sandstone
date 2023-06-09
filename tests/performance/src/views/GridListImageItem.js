import kind from '@enact/core/kind';
import React from 'react';
import GridListImageItem from '@enact/sandstone/GridListImageItem';

const GridListImageItemView = kind({
	name: 'GridListImageItemView',

	render: () => (
		<GridListImageItem
			id="gridListImageItem"
			caption="image0"
			source="http://placehold.it/100x100/9037ab/ffffff&text=Image0"
			subCaption="sub-image0"
		/>
	)
});

export default GridListImageItemView;
