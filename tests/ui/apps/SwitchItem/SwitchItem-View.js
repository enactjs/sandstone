import SwitchItem from '../../../../SwitchItem';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<SwitchItem
			id="switchItem1"
		>
			Switch Item1
		</SwitchItem>
		<SwitchItem
			id="switchItem2"
			defaultSelected
		>
			Switch Item selected
		</SwitchItem>
		<SwitchItem
			id="switchItem3"
			defaultSelected
			inline
		>
			Switch Item inline
		</SwitchItem>
		<SwitchItem
			id="switchItem4"
			defaultSelected
			disabled
		>
			Switch Item disabled
		</SwitchItem>
		<SwitchItem
			id="switchItem5"
			defaultSelected
			inline
			disabled
		>
			Switch Item inline disabled
		</SwitchItem>
	</div>
</div>;

export default ThemeDecorator(app);
