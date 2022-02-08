import { action } from '@enact/storybook-utils/addons/actions';
import { boolean, select, range } from '@enact/storybook-utils/addons/controls';
import Drawing from '@enact/sandstone/Drawing-POC';

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
    />
);

range('brushSize', _Drawing, Drawing, { min: 1, max: 20 }, 5);
boolean('disabled', _Drawing, Drawing);
select('brushColor', _Drawing, ['white', 'red', 'green'], 'green');
select('canvasColor', _Drawing, ['white', 'black'], 'black');

_Drawing.storyName = 'Drawing';
_Drawing.parameters = {
    info: {
        text: 'The basic Drawing',
    },
};
