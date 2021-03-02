import {mergeComponentMetadata} from '@enact/storybook-utils';
import {number, select} from '@enact/storybook-utils/addons/knobs';
import Steps, {StepsBase} from '@enact/sandstone/Steps';

import iconNames from '../helper/icons';

Steps.displayName = 'Steps';
const Config = mergeComponentMetadata('Steps', StepsBase, Steps);

const prop = {
	icons: [null, 'numbers', ...iconNames],
	sizes: ['tiny', 'small', 'medium', 'large'],
	skip: {
		'null (Default, skip nothing)': null,
		'3 (skip just step 3)': 3,
		'[2, 3, 6] (skip step 2, 3, and 6)': [2, 3, 6],
	},
};

export default {
	title: 'Sandstone/Steps',
	component: 'Steps'
};

export const _Steps = () => {
	return (
		<Steps
			current={number('current', Config, {range: true, min: 1, max: 10}, 3)}
			total={number('total', Config, {range: true, min: 2, max: 10}, 5)}
			pastIcon={select('pastIcon', prop.icons, Config)}
			currentIcon={select('currentIcon', prop.icons, Config)}
			futureIcon={select('futureIcon', prop.icons, Config)}
			size={select('size', prop.sizes, Config)}
			skip={select('skip', prop.skip, Config)}
			skipIcon={select('skipIcon', prop.icons, Config)}
		/>
	);
};

_Steps.storyName = 'Steps';
_Steps.parameters = {
	info: {
		text: 'Basic usage of Steps'
	}
};
