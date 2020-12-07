import ActionGuide from '../../../../ActionGuide';
import React from 'react';

import {withConfig} from './utils';

const LtrTests = [
	<ActionGuide>This is some text</ActionGuide>,
	<ActionGuide icon="star" />,
	<ActionGuide icon="star">This is some text</ActionGuide>
];

const ActionGuideTests = [
	...LtrTests,
	...withConfig({locale: 'vi-VN'}, LtrTests),  // Tallglyph validation
	...withConfig({locale: 'ar-SA'}, LtrTests)
];

export default ActionGuideTests;
