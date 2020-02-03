import SelectableItem from '../../../../SelectableItem';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<SelectableItem
			id="selectableItem1"
		>
			Selectable Item1
		</SelectableItem>
		<SelectableItem
			id="selectableItem2"
			defaultSelected
		>
			Selectable Item selected
		</SelectableItem>
		<SelectableItem
			id="selectableItem3"
			defaultSelected
			inline
		>
			Selectable Item inline
		</SelectableItem>
		<SelectableItem
			id="selectableItem4"
			defaultSelected
			disabled
		>
			Selectable Item disabled
		</SelectableItem>
		<SelectableItem
			id="selectableItem5"
			defaultSelected
			inline
			disabled
		>
			Selectable Item inline disabled
		</SelectableItem>
	</div>
</div>;

export default ThemeDecorator(app);
