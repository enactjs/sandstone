import KeyGuide from '../../../../KeyGuide';
import React from 'react';

import {withConfig} from './utils';

const KeyGuideTests = [
	<KeyGuide open>{[{icon: 'red', children: 'red', key: 'a'}]}</KeyGuide>,
	<KeyGuide open>{[{icon: 'green', children: 'green', key: 'a'}]}</KeyGuide>,
	<KeyGuide open>{[{icon: 'blue', children: 'blue', key: 'a'}]}</KeyGuide>,
	<KeyGuide open>{[{icon: 'yellow', children: 'yellow', key: 'a'}]}</KeyGuide>,
	<KeyGuide open>{[{icon: 'plus', children: 'plus', key: 'a'}]}</KeyGuide>,
	<KeyGuide open>{[
		{icon: 'red', children: 'Red', key: 'a'},
		{icon: 'plus', children: 'plus', key: 'b'}
	]}</KeyGuide>,

	// RTL
	...withConfig({
		locale: 'ar-SA'
	}, [
		<KeyGuide open>{[
			{icon: 'red', children: 'Red', key: 'a'},
			{icon: 'plus', children: 'plus', key: 'b'}
		]}</KeyGuide>
	])
];

export default KeyGuideTests;
