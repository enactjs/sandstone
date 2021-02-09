import CheckboxItem from '../../../../CheckboxItem';
import Icon from '../../../../Icon';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const icon = <Icon>plus</Icon>;

const app = (props) => <div {...props}>
	<div>
		<CheckboxItem
			id="checkboxItem1"
		>
			Checkbox Item
		</CheckboxItem>
		<CheckboxItem
			id="checkboxItem2"
			defaultSelected
		>
			Checkbox Item selected
		</CheckboxItem>
		<CheckboxItem
			id="checkboxItem3"
			indeterminate
		>
			Checkbox Item indeterminate
		</CheckboxItem>
		<CheckboxItem
			id="checkboxItem4"
			slotBefore={icon}
		>
			Checkbox Item slotBefore
		</CheckboxItem>
		<CheckboxItem
			id="checkboxItem5"
			defaultSelected
			inline
		>
			Checkbox Item inline
		</CheckboxItem>
		<CheckboxItem
			id="checkboxItem6"
			indeterminate
			inline
		>
			Checkbox Item inline indeterminate
		</CheckboxItem>
		<CheckboxItem
			id="checkboxItem7"
			defaultSelected
			disabled
		>
			Checkbox Item disabled
		</CheckboxItem>
	</div>
</div>;

export default ThemeDecorator(app);
