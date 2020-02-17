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
		>
			Item1
		</Item>
		<Item
			id="item2"
			defaultSelected
			disabled
		>
			Item disabled
		</Item>
		<Item id="item3" inline>Inline Item</Item>
		<Item id="item4" inline>Inline Item</Item>
		<Item id="item5" inline>Inline Item</Item>
	</div>
</div>;

export default ThemeDecorator(app);
