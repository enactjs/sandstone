import DayPicker from '../../../../DayPicker';
import ThemeDecorator from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div style={{display: 'flex'}} {...props}>
	<DayPicker
		id="dayPickerDefault"
		style={{width: '400px'}}
	/>
	<DayPicker
		id="dayPickerDisabled"
		disabled
		style={{width: '400px'}}
	/>
</div>;

export default ThemeDecorator(app);
