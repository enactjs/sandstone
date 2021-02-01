import { action } from '@enact/storybook-utils/addons/actions';
import { boolean, select, text } from '@enact/storybook-utils/addons/knobs';
import React from 'react';

import Picker from '@enact/sandstone/Picker';

import { decrementIcons, incrementIcons } from '../helper/icons';

// Set up some defaults for info and knobs
const prop = {
	orientation: ['horizontal', 'vertical'],
	width: [null, 'small', 'medium', 'large'],
};

const airports = [
	'San Francisco International Airport Terminal 1',
	'Milan Malpensa Airport Terminal 2',
	'Paris-Charles De Gaulle Airport Terminal 3',
	'Boston Logan Airport Terminal D',
	'Tokyo Narita Airport Terminal 5',
	'Heathrow Terminal 6',
	'נמל התעופה בן גוריון טרמינל הבינלאומי',
];

// const Config = mergeComponentMetadata('FormCheckboxItem', FormCheckboxItem);
Picker.displayName = 'Picker';

export default {
	title: 'Sandstone',
};

export const _Picker = () => (
	<Picker
		aria-label={text('aria-label', Picker, '')}
		decrementAriaLabel={text('decrementAriaLabel', Picker, '')}
		decrementIcon={select('decrementIcon', ['', ...decrementIcons], Picker)}
		disabled={boolean('disabled', Picker)}
		incrementAriaLabel={text('incrementAriaLabel', Picker, '')}
		incrementIcon={select('incrementIcon', ['', ...incrementIcons], Picker)}
		joined={boolean('joined', Picker)}
		noAnimation={boolean('noAnimation', Picker)}
		onChange={action('onChange')}
		orientation={select('orientation', prop.orientation, Picker, prop.orientation[0])}
		width={select('width', prop.width, Picker, prop.width[3])}
		wrap={boolean('wrap', Picker)}
	>
		{airports}
	</Picker>
);

_Picker.story = {
	parameters: {
		info: {
			text: 'Basic usage of Picker',
		},
	},
};
