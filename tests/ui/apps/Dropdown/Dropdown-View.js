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
	<div>
		<Dropdown id="dropdownDefault" title="dropdownDefault">
			{['one', 'two', 'three', 'four', 'five']}
		</Dropdown>
		<Dropdown id="dropdownSelected" title="dropdownSelected" defaultSelected={1}>
			{['one', 'two', 'three', 'four', 'five']}
		</Dropdown>
		<DropdownChange id="dropdownChangeSelected" title="dropdownChangeSelected" changeProp="selected" changePropValue={null} selected={3}>
			{['one', 'two', 'three', 'four', 'five']}
		</DropdownChange>
		<DropdownChange id="dropdownChangeChildren" title="dropdownChangeChildren" changeProp="children" changePropValue={['three', 'five', 'seven']}>
			{['one', 'two', 'three', 'four', 'five']}
		</DropdownChange>
		<DropdownChange id="dropdownChangeLessChildren" title="dropdownChangeLessChildren" changeProp="children" changePropValue={children.filter((v) => v.includes('3'))} selected={28} waiting={1500}>
			{children}
		</DropdownChange>
	</div>
</div>;

export default ThemeDecorator(app);
