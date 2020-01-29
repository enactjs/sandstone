import Input from '../../../../Input';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

window.spotlight = spotlight;

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<div>
			<Input
				id="input1"
				defaultValue="Input field one"
			/>
			<Input
				id="input2"
				defaultValue="Input field two"
			/>
		</div>
		<div>
			<Input
				id="input3"
				defaultValue="Input field three"
			/>
			<Input
				id="input4"
				defaultValue="Input field four"
			/>
		</div>
		<div>
			<Input
				id="input5"
				disabled
				defaultValue="Input field five"
			/>
		</div>
	</div>
</div>;

export default ThemeDecorator(app);

