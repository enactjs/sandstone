import Item from '../../../../Item';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<Item
			id="item1"
			title="Item 1"
			defaultSelected
		>
			Item 1
		</Item>
		<Item
			id="item2"
			title="Item 2 disabled"
			// defaultSelected
			disabled
		>
			Item disabled
		</Item>
		<Item
			id="item3"
			title="Item 3"
			// label="This is a label"
		>
			Item 3
		</Item>
	</div>
</div>;

export default ThemeDecorator(app);
