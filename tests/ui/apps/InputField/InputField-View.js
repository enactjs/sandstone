import {InputField} from '../../../../Input';
import ThemeDecorator from '../../../../ThemeDecorator/ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

window.spotlight = spotlight;

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<div>
			<InputField
				id="input1"
				defaultValue="InputField one"
			/>
			<InputField
				id="input2"
				defaultValue="InputField two"
			/>
		</div>
		<div>
			<InputField
				id="input3"
				defaultValue="InputField three"
			/>
			<InputField
				id="input4"
				defaultValue="InputField four"
			/>
		</div>
		<div>
			<InputField
				id="input5"
				disabled
				defaultValue="InputField five"
			/>
		</div>
	</div>
</div>;

export default ThemeDecorator(app);
