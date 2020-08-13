import Dropdown from '../../../../Dropdown';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);
const children = Array.from(Array(100), (v, i) => (i + ''));

function DropdownChange ({changeProp, changePropValue, waiting = 500, ...rest}) {
	const [value, change] = React.useState(rest[changeProp]);

	const onOpen = React.useCallback(() => {
		const timer = setTimeout(() => {
			change(changePropValue);
		}, waiting);

		return () => clearTimeout(timer);
	}, [change, changePropValue, waiting]);

	rest[changeProp] = value;

	return <Dropdown {...rest} onOpen={onOpen} />;
}

const app = (props) => <div {...props}>
	<div style={{padding: 100}} id="wrapper">
		<Dropdown id="dropdownDefault" title="Default">
			{['one', 'two', 'three', 'four', 'five']}
		</Dropdown>
		<Dropdown id="dropdownSelected" defaultSelected={1} title="Selected">
			{['one', 'two', 'three', 'four', 'five']}
		</Dropdown>
		<DropdownChange id="dropdownChangeSelected" changeProp="selected" changePropValue={null} selected={3} title="Change Selected">
			{['one', 'two', 'three', 'four', 'five']}
		</DropdownChange>
		<DropdownChange id="dropdownChangeChildren" changeProp="children" changePropValue={['three', 'five', 'seven']} title="Change Children">
			{['one', 'two', 'three', 'four', 'five']}
		</DropdownChange>
		<DropdownChange id="dropdownChangeLessChildren" changeProp="children" changePropValue={children.filter((v) => v.includes('3'))} selected={28} title="Change to Less Children" waiting={1500}>
			{children}
		</DropdownChange>
	</div>
</div>;

export default ThemeDecorator(app);
