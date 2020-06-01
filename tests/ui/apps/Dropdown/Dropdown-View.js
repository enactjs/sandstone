import Dropdown from '../../../../Dropdown';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

function DropdownChange ({changeProp, changePropValue, ...rest}) {
	const [value, change] = React.useState(rest[changeProp]);

	const onOpen = React.useCallback(() => {
		const timer = setTimeout(() => {
			change(changePropValue);
		}, 500);

		return () => clearTimeout(timer);
	}, [change, changePropValue]);

	rest[changeProp] = value;

	return <Dropdown {...rest} onOpen={onOpen} />;
}

const app = (props) => <div {...props}>
	<div>
		<Dropdown id="dropdownDefault">
			{['one', 'two', 'three', 'four', 'five']}
		</Dropdown>
		<Dropdown id="dropdownSelected" selected={1}>
			{['one', 'two', 'three', 'four', 'five']}
		</Dropdown>
		<DropdownChange id="dropdownChangeSelected" changeProp="selected" changePropValue={null} selected={3}>
			{['one', 'two', 'three', 'four', 'five']}
		</DropdownChange>
		<DropdownChange id="dropdownChangeChildren" changeProp="children" changePropValue={['three', 'five', 'seven']}>
			{['one', 'two', 'three', 'four', 'five']}
		</DropdownChange>
	</div>
</div>;

export default ThemeDecorator(app);
