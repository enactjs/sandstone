import DatePicker from '../../../../DatePicker';
import ThemeDecorator from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<DatePicker
			id="datePickerDefault"
		/>
		<DatePicker
			id="datePickerWithDefaultValue"
			defaultValue={new Date(2009, 5, 6)}
		/>
		<DatePicker
			id="datePickerDisabled"
			disabled
		/>
		<DatePicker
			id="datePickerDisabledWithDefaultValue"
			defaultValue={new Date(2009, 5, 6)}
			disabled
		/>
		<DatePicker
			id="datePickerCheckMinValue"
			defaultValue={new Date(1905, 5, 6)}
		/>
		<DatePicker
			id="datePickerCheckMaxValue"
			defaultValue={new Date(2094, 5, 6)}
		/>
	</div>
</div>;

export default ThemeDecorator(app);
