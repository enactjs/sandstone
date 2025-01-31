import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ColorPickerSettingsApp from '../ColorPickerSettingsApp';
import {hexToHSL, HSLToHex} from '../utils';

const FloatingLayerController = FloatingLayerDecorator('div');

const changeSliderValueByKey = async (element, steps, decrease) => {
	const keyCode = decrease ? 37 : 39;

	await fireEvent.mouseOver(element);

	for (let i = 0; i < steps; i++) {
		await fireEvent.keyDown(element, {keyCode: keyCode});
	}
};

const sliderValues = (elements) => {
	const values = [];

	elements.forEach(element => {
		values.push(element.getAttribute('aria-valuetext'));
	});

	return values;
};

describe('ColorPickerSettingsApp', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test('should open and close ColorPickerSettingsApp popup', async () => {
		const closeButtonText = '󯿵';
		const user = userEvent.setup();

		render(
			<FloatingLayerController>
				<ColorPickerSettingsApp />
			</FloatingLayerController>
		);

		const ColorPickerSettingsAppButton = screen.getByRole('button');
		await user.click(ColorPickerSettingsAppButton);
		const closeButton = screen.queryByText(closeButtonText);

		expect(closeButton).not.toBeNull();

		await user.click(closeButton);

		expect(screen.queryByText(closeButtonText)).toBeNull();
	});

	test('should not open ColorPickerSettingsApp popup if disabled is set to true', async () => {
		const closeButtonText = '󯿵';
		const user = userEvent.setup();

		render(
			<FloatingLayerController>
				<ColorPickerSettingsApp disabled />
			</FloatingLayerController>
		);

		const ColorPickerSettingsAppButton = screen.getByRole('button');
		await user.click(ColorPickerSettingsAppButton);

		const closeButton = screen.queryByText(closeButtonText);

		expect(closeButton).toBeNull();
	});

	test('should have the text set', async () => {
		const text = 'Color Picker';
		const user = userEvent.setup();

		render(
			<FloatingLayerController>
				<ColorPickerSettingsApp text={text} />
			</FloatingLayerController>
		);

		const ColorPickerSettingsAppText = screen.queryByText(text);

		expect(ColorPickerSettingsAppText).not.toBeNull();

		await user.click(ColorPickerSettingsAppText);
		const popupText = screen.queryAllByText(text)[1];

		expect(popupText).not.toBeUndefined();
	});

	test('should have the color set', async () => {
		const color = '#00FF00';

		render(
			<FloatingLayerController>
				<ColorPickerSettingsApp color={color} />
			</FloatingLayerController>
		);

		const expected = `background-image: ${color}`;
		const ColorPickerSettingsAppButton = screen.getByRole('button');

		expect(ColorPickerSettingsAppButton).toHaveStyle(expected);
	});

	test('should have the presetColors', async () => {
		const presetColors = ['#FF0000', '#00FF00', '#0000FF'];
		const presetColorsRGB = ['rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)'];
		const user = userEvent.setup();

		render(
			<FloatingLayerController>
				<ColorPickerSettingsApp presetColors={presetColors} />
			</FloatingLayerController>
		);

		const ColorPickerSettingsAppButton = screen.getByRole('button');
		await user.click(ColorPickerSettingsAppButton);

		const buttons = screen.getAllByRole('button');
		const buttonsWithSpecificStyle = buttons.filter(element => {
			const compoundStyle = window.getComputedStyle(element);
			return presetColorsRGB.find(color => color === compoundStyle.getPropertyValue('background-color'));
		});

		expect(buttonsWithSpecificStyle.length).toEqual(presetColors.length);
	});

	test('should emit an colorHandler event when select color from presetColors', async () => {
		const color = '#FFFFFF';
		const colorHandler = jest.fn();
		const presetColors = ['#FF0000'];
		const user = userEvent.setup();

		render(
			<FloatingLayerController>
				<ColorPickerSettingsApp color={color} colorHandler={colorHandler} presetColors={presetColors} />
			</FloatingLayerController>
		);

		const ColorPickerSettingsAppButton = screen.getByRole('button');
		await user.click(ColorPickerSettingsAppButton);

		const button = screen.getAllByRole('button')[2];
		Object.defineProperty(button, 'offsetParent', {value: {id: presetColors[0]}});

		await user.click(button);

		expect(colorHandler).toHaveBeenCalled();
	});

	test('should change color when hue, saturation and lightness sliders values changed', async () => {
		const color = '#00FF00';
		const colorHandler = jest.fn();
		const user = userEvent.setup();

		render(
			<FloatingLayerController>
				<ColorPickerSettingsApp color={color} colorHandler={colorHandler} />
			</FloatingLayerController>
		);

		const ColorPickerSettingsAppButton = screen.getByRole('button');
		await user.click(ColorPickerSettingsAppButton);

		const sliders = screen.getAllByRole('slider');

		const [hue, saturation, lightness] = sliderValues(sliders);

		await changeSliderValueByKey(sliders[0], 30);
		fireEvent.blur(sliders[0]);
		await changeSliderValueByKey(sliders[1], 30, true);
		fireEvent.blur(sliders[1]);
		await changeSliderValueByKey(sliders[2], 30, true);
		fireEvent.blur(sliders[2]);

		const [changedHue, changedSaturation, changedLightness] = sliderValues(sliders);

		expect(hue).not.toEqual(changedHue);
		expect(saturation).not.toEqual(changedSaturation);
		expect(lightness).not.toEqual(changedLightness);
	});

	// Utility functions
	test('should return hsl from hex color if length is 4', () => {
		const hexBlueColor = '#00F';
		const hexGreenColor = '#0F0';
		const hexPinkColor = '#F9A';
		const hexRedColor = '#F00';

		const hslBlueColor = hexToHSL(hexBlueColor);
		const hslGreenColor = hexToHSL(hexGreenColor);
		const hslPinkColor = hexToHSL(hexPinkColor);
		const hslRedColor = hexToHSL(hexRedColor);

		const expectedBlue = {h: 240, s: 100, l: 50};
		const expectedGreen = {h: 120, s: 100, l: 50};
		const expectedPink = {h: 350, s: 100, l: 80};
		const expectedRed = {h: 0, s: 100, l: 50};

		expect(hslBlueColor).toEqual(expectedBlue);
		expect(hslGreenColor).toEqual(expectedGreen);
		expect(hslPinkColor).toEqual(expectedPink);
		expect(hslRedColor).toEqual(expectedRed);
	});

	test('should return hex from hsl color', () => {
		const hslAquaColor = HSLToHex(180, 100, 50);
		const hslBlueColor = HSLToHex(240, 100, 50);
		const hslFuchsiaColor = HSLToHex(300, 100, 50);
		const hslRedColor = HSLToHex(0, 100, 50);
		const hslYellowColor = HSLToHex(60, 100, 50);

		const hexAquaColor = '#00ffff';
		const hexBlueColor = '#0000ff';
		const hexFuchsiaColor = '#ff00ff';
		const hexRedColor = '#ff0000';
		const hexYellowColor = '#ffff00';


		expect(hslAquaColor).toEqual(hexAquaColor);
		expect(hslBlueColor).toEqual(hexBlueColor);
		expect(hslFuchsiaColor).toEqual(hexFuchsiaColor);
		expect(hslRedColor).toEqual(hexRedColor);
		expect(hslYellowColor).toEqual(hexYellowColor);
	});
});
