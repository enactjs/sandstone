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
			id="item1DefaultSelected"
			defaultSelected
		>
			Item 1
		</Item>
		<Item
			id="item2Disabled"
			disabled
		>
			Item 2 disabled
		</Item>
		<Item
			id="item3WithLabel"
			label="This is a label"
		>
			Item 3
		</Item>
		<Item
			id="item4Inline"
			label="label for inline"
			inline
		>
			Item 4 inline
		</Item>
		<Item
			id="item5InLineDisabled"
			label=""
			inline
			disabled
		>
			Item 5 inline disabled
		</Item>
	</div>
</div>;

export default ThemeDecorator(app);
