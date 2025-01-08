import ColorPicker from '../../../../ColorPicker';
import ThemeDecorator from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const colors = ['#eb4034', '#32a852', '#3455eb'];

const App = (props) => {
	return (
		<div {...props}>
			<ColorPicker
				id="colorPicker"
				color={colors[0]}
				colors={colors}
				onChangeColor={() => {}}
				open
				type="grid"
			/>
		</div>
	);
};

export default ThemeDecorator(App);
