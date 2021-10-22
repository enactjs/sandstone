import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import Picker from '@enact/sandstone/Picker';

import {decrementIcons, incrementIcons} from '../helper/icons';

// Set up some defaults for info and knobs
const prop = {
	orientation: ['horizontal', 'vertical'],
	reverse: {
		' ': null,
		false: false,
		true: true
	},
	type: ['number', 'string'],
	width: [null, 'small', 'medium', 'large']
};

const airports = [
	'San Francisco International Airport Terminal 1',
	'Milan Malpensa Airport Terminal 2',
	'Paris-Charles De Gaulle Airport Terminal 3',
	'Boston Logan Airport Terminal D',
	'Tokyo Narita Airport Terminal 5',
	'Heathrow Terminal 6',
	'נמל התעופה בן גוריון טרמינל הבינלאומי'
];

Picker.displayName = 'Picker';

export default {
	title: 'Sandstone/Picker',
	component: 'Picker'
};

export const _Picker = (args) => (
	<Picker
		aria-label={args['aria-label']}
		decrementAriaLabel={args['decrementAriaLabel']}
		decrementIcon={args['decrementIcon']}
		disabled={args['disabled']}
		incrementAriaLabel={args['incrementAriaLabel']}
		incrementIcon={args['incrementIcon']}
		inlineTitle={args['inlineTitle']}
		joined={args['joined']}
		noAnimation={args['noAnimation']}
		onChange={action('onChange')}
		orientation={args['orientation']}
		reverse={prop.reverse[args['reverse']]}
		title={args['title']}
		type={args['type']}
		width={args['width']}
		wrap={args['wrap']}
	>
		{airports}
	</Picker>
);

text('aria-label', _Picker, Picker, '');
text('decrementAriaLabel', _Picker, Picker, '');
select('decrementIcon', _Picker, ['', ...decrementIcons], Picker);
boolean('disabled', _Picker, Picker);
text('incrementAriaLabel', _Picker, Picker, '');
select('incrementIcon', _Picker, ['', ...incrementIcons], Picker);
boolean('inlineTitle', _Picker, Picker);
boolean('joined', _Picker, Picker);
boolean('noAnimation', _Picker, Picker);
select('orientation', _Picker, prop.orientation, Picker, prop.orientation[0]);
select('reverse', _Picker, [' ', 'false', 'true'], Picker);
text('title', _Picker, Picker);
select('type', _Picker, prop.type, Picker);
select('width', _Picker, prop.width, Picker, prop.width[3]);
boolean('wrap', _Picker, Picker);

_Picker.storyName = 'Picker';
_Picker.parameters = {
	info: {
		text: 'Basic usage of Picker'
	}
};
