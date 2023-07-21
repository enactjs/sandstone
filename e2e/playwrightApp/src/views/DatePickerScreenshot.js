import DatePicker from '../../../../DatePicker';
import ThemeDecorator from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';
// import {generateDate} from "@enact/ui-test-utils/utils";

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

// const jan30 = generateDate('2019-01-30');
// const jan31 = generateDate('2019-01-31');
// const maxYear = generateDate('2099-01-30');
// const minYear = generateDate('1900-01-30');

const app = (props) => <div {...props}>
	<div>
		<DatePicker defaultValue={new Date(2023, 7, 10)}/>
		{/*<DatePicker defaultValue={jan31} disabled/>*/}
		{/*<DatePicker defaultValue={maxYear}/>*/}
		{/*<DatePicker defaultValue={minYear}/>*/}
	</div>
</div>;

export default ThemeDecorator(app);

