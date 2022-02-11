import Drawing from '@enact/sandstone/Drawing';
import {boolean, range, select} from '@enact/storybook-utils/addons/controls';

Drawing.displayName = 'Drawing';

export default {
	component: 'Drawing',
	title: 'Sandstone/Drawing'
};

export const _Drawing = (args) => (
	<Drawing
		brushColor={args['brushColor']}
		brushSize={args['brushSize']}
		canvasColor={args['canvasColor']}
		disabled={args['disabled']}
	/>
);

boolean('disabled', _Drawing, Drawing);
range('brushSize', _Drawing, Drawing, {min: 1, max: 20}, 5);
select('brushColor', _Drawing, ['white', 'red', 'green'], 'green');
select('canvasColor', _Drawing, ['white', 'black'], 'black');

_Drawing.storyName = 'Drawing';
_Drawing.parameters = {
	info: {
		text: 'The basic Drawing'
	}
};
