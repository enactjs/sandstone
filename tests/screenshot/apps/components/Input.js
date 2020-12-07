import Input from '../../../../Input';
import React from 'react';

import {withConfig, withProps} from './utils';

const BaseTests = [
	<Input />,
	<Input open title="Input Test" subtitle="Additional text" />,
	<Input open title="Input Test" subtitle="Additional text" placeholder="placeholder" />,
	<Input open title="Input Test" subtitle="Additional text" value="value" />,
	<Input open title="Input Test" subtitle="Additional text" value="value" type="password" />,
	<Input open title="Input Test" subtitle="Additional text" value="1234" type="number" />,
	<Input open title="Input Test" subtitle="Additional text" value="1234" type="passwordnumber" />,
	<Input open title="Input Test" subtitle="Additional text" value="1234" type="number" length={10} />
];

const InputTests = [
	...BaseTests,

	// Disabled tests
	...withProps({disabled: true, popupType: 'fullscreen'}, BaseTests),
	...withProps({disabled: true, popupType: 'overlay'}, BaseTests),

	// RTL overlay number input tests
	...withConfig({locale: 'ar-SA'}, [
		...withProps({popupType: 'overlay'}, BaseTests.slice(5))
	])
];

export default InputTests;
