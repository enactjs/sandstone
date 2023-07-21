import DatePicker from '../../../../DatePicker';
import ThemeDecorator from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);


const app = (props) => <div {...props}>
	<div>
		<DatePicker defaultValue={new Date(2023, 7, 10)}/>
	</div>
</div>;

export default ThemeDecorator(app);

