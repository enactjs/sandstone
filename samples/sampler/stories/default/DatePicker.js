import { action } from '@enact/storybook-utils/addons/actions';
import { boolean, text } from '@enact/storybook-utils/addons/knobs';
import { mergeComponentMetadata, removeProps } from '@enact/storybook-utils';
import React from 'react';

import DatePicker, { DatePickerBase } from '@enact/sandstone/DatePicker';

const Config = mergeComponentMetadata('DatePicker', DatePickerBase, DatePicker);
removeProps(
	Config,
	'year day maxDays maxMonths month onChangeDate onChangeMonth onChangeYear order'
);

DatePicker.displayName = 'DatePicker';

export default {
	title: 'Sandstone',
};

export const _DatePicker = () => (
	<DatePicker
		disabled={boolean('disabled', Config)}
		spotlightDisabled={boolean('spotlightDisabled', Config)}
		monthAriaLabel={text('monthAriaLabel', Config)}
		dayAriaLabel={text('dayAriaLabel', Config)}
		yearAriaLabel={text('yearAriaLabel', Config)}
		onChange={action('onChange')}
		onComplete={action('onComplete')}
	/>
);

_DatePicker.story = {
	name: 'DatePicker',

	parameters: {
		info: {
			text: 'The basic DatePicker',
		},
	},
};
