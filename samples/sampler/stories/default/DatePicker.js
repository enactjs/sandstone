import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata, removeProps} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import DatePicker, {DatePickerBase} from '@enact/sandstone/DatePicker';

const Config = mergeComponentMetadata('DatePicker', DatePickerBase, DatePicker);
removeProps(Config, 'year defaultOpen day maxDays maxMonths month onChangeDate onChangeMonth onChangeYear order');

DatePicker.displayName = 'DatePicker';

storiesOf('Sandstone', module)
	.add(
		'DatePicker',
		() => (
			<DatePicker
				disabled={boolean('disabled', Config)}
				onChange={action('onChange')}
				monthAriaLabel={text('monthAriaLabel', Config)}
				dayAriaLabel={text('dayAriaLabel', Config)}
				yearAriaLabel={text('yearAriaLabel', Config)}
			/>
		),
		{
			info: {
				text: 'The basic DatePicker'
			}
		}
	);
