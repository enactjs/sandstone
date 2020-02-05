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
	</div>
</div>;

export default ThemeDecorator(app);
