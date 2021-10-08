import {mergeComponentMetadata, removeProps} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text} from '@enact/storybook-utils/addons/knobs';
import DatePicker, {DatePickerBase} from '@enact/sandstone/DatePicker';

DatePicker.displayName = 'DatePicker';
const Config = mergeComponentMetadata('DatePicker', DatePickerBase, DatePicker);
removeProps(
	Config,
	'year day maxDays maxMonths month onChangeDate onChangeMonth onChangeYear order'
);

export default {
	title: 'Sandstone/DatePicker',
	component: 'DatePicker'
};

export const _DatePicker = () => (
	<DatePicker
		disabled={boolean('disabled', Config)}
		spotlightDisabled={boolean('spotlightDisabled', Config)}
		noLabel={boolean('noLabel', Config)}
		monthAriaLabel={text('monthAriaLabel', Config)}
		dayAriaLabel={text('dayAriaLabel', Config)}
		yearAriaLabel={text('yearAriaLabel', Config)}
		onChange={action('onChange')}
		onComplete={action('onComplete')}
	/>
);

_DatePicker.storyName = 'DatePicker';
_DatePicker.parameters = {
	info: {
		text: 'The basic DatePicker'
	}
};
