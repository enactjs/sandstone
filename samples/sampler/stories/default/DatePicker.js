import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata, removeProps} from '@enact/storybook-utils';
import {storiesOf} from '@storybook/react';

import DatePicker, {DatePickerBase} from '@enact/sandstone/DatePicker';

const Config = mergeComponentMetadata('DatePicker', DatePickerBase, DatePicker);
removeProps(Config, 'year day maxDays maxMonths month onChangeDate onChangeMonth onChangeYear order');

DatePicker.displayName = 'DatePicker';

storiesOf('Sandstone', module)
	.add(
		'DatePicker',
		() => (
			<DatePicker
				disabled={boolean('disabled', Config)}
				spotlightDisabled={boolean('spotlightDisabled', Config)}
				monthAriaLabel={text('monthAriaLabel', Config)}
				dayAriaLabel={text('dayAriaLabel', Config)}
				yearAriaLabel={text('yearAriaLabel', Config)}
				onChange={action('onChange')}
				onComplete={action('onComplete')}
			/>
		),
		{
			info: {
				text: 'The basic DatePicker'
			}
		}
	);
