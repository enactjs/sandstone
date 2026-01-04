import ColorPicker from '../../../../ColorPicker';

const colors = ['#eb4034', '#32a852', '#3455eb'];

const ColorPickerTests = [
	<ColorPicker
		color={colors[0]}
		colors={colors}
		onChangeColor={() => {}}
		open
		type="grid"
	/>,
	<ColorPicker
		color={colors[0]}
		colors={colors}
		onChangeColor={() => {}}
		open
		type="spectrum"
	/>,
	<ColorPicker
		color={colors[0]}
		colors={colors}
		onChangeColor={() => {}}
		open
		type="sliders"
	/>,
	// disabled
	<ColorPicker
		disabled
		color={colors[0]}
		colors={colors}
		onChangeColor={() => {}}
		open
		type="grid"
	/>,
	<ColorPicker
		disabled
		color={colors[0]}
		colors={colors}
		onChangeColor={() => {}}
		open
		type="spectrum"
	/>,
	<ColorPicker
		disabled
		color={colors[0]}
		colors={colors}
		onChangeColor={() => {}}
		open
		type="sliders"
	/>
];

export default ColorPickerTests;
