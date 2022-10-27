import DatePicker, {DatePickerBase} from '@enact/sandstone/DatePicker';
import {mergeComponentMetadata, removeProps} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text} from '@enact/storybook-utils/addons/controls';
import {Primary, Title} from '@enact/storybook-utils/addons/docs';

DatePicker.displayName = 'DatePicker';
const Config = mergeComponentMetadata('DatePicker', DatePickerBase, DatePicker);
removeProps(
	Config,
	'year day maxDays maxMonths month onChangeDate onChangeMonth onChangeYear order'
);

export default {
	title: 'Sandstone/DatePicker',
	component: 'DatePicker',
	parameters: {
		docs: {
			page: () => (
				<>
					<Title />
					<Primary />
				</>
			)
		}
	}
};

export const _DatePicker = (args) => (
	<DatePicker
		disabled={args['disabled']}
		spotlightDisabled={args['spotlightDisabled']}
		noLabel={args['noLabel']}
		monthAriaLabel={args['monthAriaLabel']}
		dayAriaLabel={args['dayAriaLabel']}
		yearAriaLabel={args['yearAriaLabel']}
		onChange={action('onChange')}
		onComplete={action('onComplete')}
	/>
);

boolean('disabled', _DatePicker, Config);
boolean('spotlightDisabled', _DatePicker, Config);
boolean('noLabel', _DatePicker, Config);
text('monthAriaLabel', _DatePicker, Config);
text('dayAriaLabel', _DatePicker, Config);
text('yearAriaLabel', _DatePicker, Config);

_DatePicker.storyName = 'DatePicker';
_DatePicker.parameters = {
	info: {
		text: 'The basic DatePicker'
	}
};
