import ColorPickerPOC from '../../../../ColorPickerPOC';
import ThemeDecorator from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';
import {useState} from 'react';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const App = (props) => {
	const [selectedColor, setSelectedColor] = useState('#eb4034');
	const [favoriteColors, ] = useState(['#eb4034', '#32a852', '#3455eb']);

	return (
		<div {...props}>
			<ColorPickerPOC
				id="colorPicker"
				color={typeof selectedColor === 'object' ? selectedColor.selectedColor : selectedColor}
				colors={favoriteColors}
				onChangeColor={setSelectedColor}
				open
			/>
		</div>
	);
};

export default ThemeDecorator(App);
