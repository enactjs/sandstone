import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {Picker, PickerBase} from '@enact/sandstone/Picker';

import {decrementIcons, incrementIcons} from '../helper/icons';

const Config = mergeComponentMetadata('Picker', PickerBase, Picker);

// Set up some defaults for info and controls
const prop = {
	changedBy: ['enter', 'leftRight'],
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
		changedBy={args['changedBy']}
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

text('aria-label', _Picker, Config, '');
select('changedBy', _Picker, prop.changedBy, Config, 'enter');
text('decrementAriaLabel', _Picker, Config, '');
select('decrementIcon', _Picker, ['', ...decrementIcons], Config);
boolean('disabled', _Picker, Config);
text('incrementAriaLabel', _Picker, Config, '');
select('incrementIcon', _Picker, ['', ...incrementIcons], Config);
boolean('inlineTitle', _Picker, Config);
boolean('joined', _Picker, Config);
boolean('noAnimation', _Picker, Config);
select('orientation', _Picker, prop.orientation, Config, prop.orientation[0]);
select('reverse', _Picker, [' ', 'false', 'true'], Config);
text('title', _Picker, Config);
select('type', _Picker, prop.type, Config);
select('width', _Picker, prop.width, Config, prop.width[3]);
boolean('wrap', _Picker, Config);

_Picker.storyName = 'Picker';
_Picker.parameters = {
	info: {
		text: 'Basic usage of Picker'
	}
};
