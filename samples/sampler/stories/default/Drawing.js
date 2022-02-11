import Drawing from '@enact/sandstone/Drawing';
import {boolean} from '@enact/storybook-utils/addons/controls';

Drawing.displayName = 'Drawing';

export default {
	component: 'Drawing',
	title: 'Sandstone/Drawing'
};

export const _Drawing = (args) => (
	<Drawing
		disabled={args['disabled']}
	/>
);

boolean('disabled', _Drawing, Drawing);

_Drawing.storyName = 'Drawing';
_Drawing.parameters = {
	info: {
		text: 'The basic Drawing'
	}
};
