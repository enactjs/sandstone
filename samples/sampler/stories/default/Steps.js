import {mergeComponentMetadata} from '@enact/storybook-utils';
import {range, select} from '@enact/storybook-utils/addons/controls';
import {Primary, Title} from '@enact/storybook-utils/addons/docs';
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
		'[2, 3, 6] (skip step 2, 3, and 6)': [2, 3, 6]
	}
};

export default {
	title: 'Sandstone/Steps',
	component: 'Steps',
	parameters: {
		docs: {
			page: () => (
				<>
					<Title />
					<Primary />
				</>
			)
		}
	}
};

export const _Steps = (args) => (
	<Steps
		current={args['current']}
		total={args['total']}
		pastIcon={args['pastIcon']}
		currentIcon={args['currentIcon']}
		futureIcon={args['futureIcon']}
		size={args['size']}
		skip={args['skip']}
		skipIcon={args['skipIcon']}
	/>
);

range('current', _Steps, Config, {min: 1, max: 10}, 3);
range('total', _Steps, Config, {min: 2, max: 10}, 5);
select('pastIcon', _Steps, prop.icons, Config);
select('currentIcon', _Steps, prop.icons, Config);
select('futureIcon', _Steps, prop.icons, Config);
select('size', _Steps, prop.sizes, Config);
select('skip', _Steps, prop.skip, Config);
select('skipIcon', _Steps, prop.icons, Config);

_Steps.storyName = 'Steps';
_Steps.parameters = {
	info: {
		text: 'Basic usage of Steps'
	}
};
