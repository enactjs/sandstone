import kind from '@enact/core/kind';
import React from 'react';
import Item from '@enact/sandstone/Item';

const ItemView = kind({
	name: 'ItemTest',

	render: () => (
		<Item id="item">Item Test</Item>
	)
});

export default ItemView;
