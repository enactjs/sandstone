import Picker from '../../../../Picker';
import ThemeDecorator from '../../../../ThemeDecorator';

const pickerList = [
	'Apple',
	'Banana',
	'Clementine',
	'Durian'
];

const app = (props) => <div {...props}>
	<div>
		<Picker className="pickerDefault">{pickerList}</Picker>
		<Picker defaultValue={1} disabled className="pickerDisabled">{pickerList}</Picker>
		<Picker defaultValue={1} className="pickerWithDefaultValue">{pickerList}</Picker>
		<Picker className="pickerWrap" wrap>{pickerList}</Picker>
		<Picker className="pickerJoined" joined>{pickerList}</Picker>
		<Picker className="pickerJoinedChangedByArrow" changedBy="arrow" joined>{pickerList}</Picker>
	</div>
	<div>
		<Picker className="pickerVertical" orientation="vertical">{pickerList}</Picker>
		<Picker defaultValue={1} disabled className="pickerDisabledVertical" orientation="vertical">{pickerList}</Picker>
		<Picker className="pickerWrapVertical" orientation="vertical" wrap>{pickerList}</Picker>
		<Picker className="pickerJoinedVertical" joined orientation="vertical">{pickerList}</Picker>
		<Picker className="pickerVerticalWrapJoined" joined orientation="vertical" wrap>{pickerList}</Picker>
	</div>
</div>;

export default ThemeDecorator(app);
