import ColorPicker from '../../../../ColorPickerPOC';

const colors = ['#eb4034', '#32a852', '#3455eb'];

const ColorPickerTests = [
	<ColorPicker
		color={colors[0]}
		colors={colors}
		onChangeColor={() => {}}
		open
	/>,
	<ColorPicker
		disabled
		color={colors[0]}
		colors={colors}
		onChangeColor={() => {}}
		open
	/>
];

export default ColorPickerTests;
