import FormCheckboxItem from '../../../../FormCheckboxItem';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<FormCheckboxItem
			id="formCheckboxItem1"
		>
			FormCheckbox Item
		</FormCheckboxItem>
		<FormCheckboxItem
			id="formCheckboxItem2"
			defaultSelected
		>
			FormCheckbox Item selected
		</FormCheckboxItem>
		<FormCheckboxItem
			id="formCheckboxItem3"
			iconPosition="after"
			defaultSelected
		>
			FormCheckbox Item after
		</FormCheckboxItem>
		<FormCheckboxItem
			id="formCheckboxItem4"
			defaultSelected
			inline
		>
			FormCheckbox Item inline
		</FormCheckboxItem>
		<FormCheckboxItem
			id="formCheckboxItem5"
			iconPosition="after"
			defaultSelected
			inline
		>
			FormCheckbox Item inline after
		</FormCheckboxItem>
		<FormCheckboxItem
			id="formCheckboxItem6"
			defaultSelected
			disabled
		>
			FormCheckbox Item disabled
		</FormCheckboxItem>
		<FormCheckboxItem
			id="formCheckboxItem7"
			defaultSelected
			inline
			disabled
		>
			FormCheckbox Item inline disabled
		</FormCheckboxItem>
	</div>
</div>;

export default ThemeDecorator(app);
