import kind from '@enact/core/kind';
import React from 'react';
import ExpandableItem from '@enact/sandstone/ExpandableItem';

const ExpandableItemView = kind({
	name: 'ExpandableItemView',

	render: () => (
		<ExpandableItem
			title="test"
		>
			This can be any type of content you might want to render inside a labeled expandable container
		</ExpandableItem>
	)
});

export default ExpandableItemView;
