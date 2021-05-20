import Checkbox from '../../../../Checkbox';

import {withConfig} from './utils';

const CheckboxTests = [
	<Checkbox />,
	<Checkbox selected />,
	<Checkbox selected disabled />,
	<Checkbox>star</Checkbox>,
	<Checkbox selected>star</Checkbox>,
	<Checkbox indeterminate />,
	<Checkbox indeterminate indeterminateIcon="star" />,
	<Checkbox indeterminate disabled />,

	// Focused
	...withConfig({focus: true}, [
		<Checkbox />,
		<Checkbox selected />,
		<Checkbox selected disabled />,
		<Checkbox>star</Checkbox>,
		<Checkbox selected>star</Checkbox>,
		<Checkbox indeterminate />,
		<Checkbox indeterminate indeterminateIcon="star" />,
		<Checkbox indeterminate disabled />
	])
];
export default CheckboxTests;
