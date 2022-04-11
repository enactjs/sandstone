import RangePicker from '../../../../RangePicker';
import ThemeDecorator from '../../../../ThemeDecorator';

const app = (props) => <div {...props}>
	<div style={{margin: '20px 0'}}>
		<RangePicker defaultValue={0} className="rangePickerDefault" min={0} max={10} step={5} />
		<RangePicker defaultValue={5} disabled className="rangePickerDisabled" min={0} max={10} step={5} />
		<RangePicker defaultValue={0} className="rangePickerWithNegativeValues" min={-10} max={10} />
		<RangePicker defaultValue={0} className="rangePickerWrap" min={0} max={10} step={5} wrap />
		<RangePicker defaultValue={0} className="rangePickerJoined" joined min={0} max={10} step={5} />
	</div>
	<div>
		<RangePicker defaultValue={0} className="rangePickerVertical" min={0} max={10} orientation="vertical" step={5} />
		<RangePicker defaultValue={5} disabled className="rangePickerVerticalDisabled" orientation="vertical" min={0} max={10} step={5} />
		<RangePicker defaultValue={0} className="rangePickerWithNegativeValuesVertical" orientation="vertical" min={-10} max={10} />
		<RangePicker defaultValue={0} className="rangePickerVerticalWrap" min={0} max={10} orientation="vertical" step={5} wrap />
		<RangePicker defaultValue={0} className="rangePickerVerticalJoined" joined min={0} max={10} orientation="vertical" step={5} />
		<RangePicker defaultValue={0} className="rangePickerVerticalWrapJoined" joined min={0} max={10} orientation="vertical" step={5} wrap />
	</div>
</div>;

export default ThemeDecorator(app);
