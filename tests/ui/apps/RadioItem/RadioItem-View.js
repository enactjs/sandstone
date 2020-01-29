import RadioItem from '../../../../RadioItem';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<RadioItem
			id="radioItem1"
		>
			Radio Item1
		</RadioItem>
		<RadioItem
			id="radioItem2"
			defaultSelected
		>
			Radio Item selected
		</RadioItem>
		<RadioItem
			id="radioItem3"
			defaultSelected
			inline
		>
			Radio Item inline
		</RadioItem>
		<RadioItem
			id="radioItem4"
			defaultSelected
			disabled
		>
			Radio Item disabled
		</RadioItem>
		<RadioItem
			id="radioItem5"
			defaultSelected
			inline
			disabled
		>
			Radio Item inline disabled
		</RadioItem>
	</div>
</div>;

export default ThemeDecorator(app);
