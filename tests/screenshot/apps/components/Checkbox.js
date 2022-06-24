import Checkbox from '../../../../Checkbox';

import {withConfig} from './utils';

const CheckboxTests = [
	<Checkbox />,
	<Checkbox selected />,
	<Checkbox>star</Checkbox>,
	<Checkbox selected disabled />,
	<Checkbox selected>star</Checkbox>,
	<Checkbox indeterminate />,
	<Checkbox indeterminate indeterminateIcon="star" />,
	<Checkbox indeterminate disabled />,

	// Focused
	...withConfig({focus: true}, [
		<Checkbox selected>home</Checkbox>,
		<Checkbox>home</Checkbox>,
		<Checkbox selected>home</Checkbox>,
		<Checkbox indeterminate indeterminateIcon="home" />
	])
];
export default CheckboxTests;
