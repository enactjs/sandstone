import { boolean, select, range } from '@enact/storybook-utils/addons/controls';
import Drawing from '@enact/sandstone/Drawing';

Drawing.displayName = 'Drawing';

export default {
    title: 'Sandstone/Drawing',
    component: 'Drawing',
};

export const _Drawing = (args) => (
    <Drawing
        brushSize={args['brushSize']}
        brushColor={args['brushColor']}
        canvasColor={args['canvasColor']}
		disabled={args['disabled']}
    />
);

select('brushColor', _Drawing, ['white', 'red', 'green'], 'green');
range('brushSize', _Drawing, Drawing, { min: 1, max: 20 }, 5);
select('canvasColor', _Drawing, ['white', 'black'], 'black');
boolean('disabled', _Drawing, Drawing);

_Drawing.storyName = 'Drawing';
_Drawing.parameters = {
    info: {
        text: 'The basic Drawing',
    },
};
