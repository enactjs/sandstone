import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {act, fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ColorPicker, {FavoriteColors}  from '../ColorPicker';
import GridColorPicker from '../ColorPickerGrid';
import SliderColorPicker from '../ColorPickerSlider';
import SpectrumColorPicker from '../ColorPickerSpectrum';
import {hexToHSL, hslToHex} from '../utils';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('ColorPicker', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	const colors = ['#eb4034', '#32a852', '#3455eb'];

	test('should render a Grid Color Picker at first render when type="grid"', () => {
		const onChangeColorHandler = jest.fn();
		const {container} = render(
			<FloatingLayerController>
				<ColorPicker
					color={colors[0]}
					colors={colors}
					onChangeColor={onChangeColorHandler}
					open
					type="grid"
				/>
			</FloatingLayerController>
		);
		const colorPicker = container.querySelector('.colorPicker'); // eslint-disable-line testing-library/no-container
		const colorBlocks = container.querySelectorAll('.colorBlock'); // eslint-disable-line testing-library/no-container

		expect(colorPicker).toBeInTheDocument();
		expect(colorBlocks[0]).toBeInTheDocument();
	});

	test('should render a Grid Color Picker when clicking on "Grid" tab', async () => {
		const user = userEvent.setup();
		const onChangeColorHandler = jest.fn();
		const {container} = render(
			<FloatingLayerController>
				<ColorPicker
					color={colors[0]}
					colors={colors}
					onChangeColor={onChangeColorHandler}
					open
					type="sliders"
				/>
			</FloatingLayerController>
		);
		const gridTab = screen.getByText('Grid');

		await user.click(gridTab);

		const colorPicker = container.querySelector('.colorPicker'); // eslint-disable-line testing-library/no-container
		const colorBlocks = container.querySelectorAll('.colorBlock'); // eslint-disable-line testing-library/no-container

		expect(colorPicker).toBeInTheDocument();
		expect(colorBlocks[0]).toBeInTheDocument();
	});

	test('should render a Sliders Color Picker at first render when type="sliders"', () => {
		const onChangeColorHandler = jest.fn();
		const {container} = render(
			<FloatingLayerController>
				<ColorPicker
					color={colors[0]}
					colors={colors}
					onChangeColor={onChangeColorHandler}
					open
					type="sliders"
				/>
			</FloatingLayerController>
		);
		const colorPicker = container.querySelector('.colorPicker'); // eslint-disable-line testing-library/no-container
		const sliders = screen.getAllByRole('slider');
		const [red, green, blue] = sliders;

		expect(colorPicker).toBeInTheDocument();
		expect(red).toBeInTheDocument();
		expect(green).toBeInTheDocument();
		expect(blue).toBeInTheDocument();
	});

	test('should render a Sliders Color Picker when clicking on "Sliders" tab', async () => {
		const user = userEvent.setup();
		const onChangeColorHandler = jest.fn();
		render(
			<FloatingLayerController>
				<ColorPicker
					color={colors[0]}
					colors={colors}
					onChangeColor={onChangeColorHandler}
					open
					type="grid"
				/>
			</FloatingLayerController>
		);
		const sliderTab = screen.getByText('Sliders');

		await user.click(sliderTab);

		const sliders = screen.getAllByRole('slider');
		const [red, green, blue] = sliders;

		expect(red).toBeInTheDocument();
		expect(green).toBeInTheDocument();
		expect(blue).toBeInTheDocument();

	});

	describe('Favorite Colors', () => {
		test('should render favorite colors and a selected color containers', () => {
			const favoriteColorsHandler = jest.fn();
			const selectedColorHandler = jest.fn();
			const {container} = render(
				<FavoriteColors
					favoriteColors={colors}
					favoriteColorsHandler={favoriteColorsHandler}
					selectedColor={colors[0]}
					selectedColorHandler={selectedColorHandler}
				/>
			);
			const favoriteColors = container.querySelectorAll('.favoriteColor'); // eslint-disable-line testing-library/no-container
			const selectedColor = container.querySelector('.selectedColorContainer'); // eslint-disable-line testing-library/no-container

			expect(favoriteColors[0]).toBeInTheDocument();
			expect(selectedColor).toBeInTheDocument();
		});

		test('should update selectedColor when selecting a color', async () => {
			const onChangeColorHandler = jest.fn();
			const user = userEvent.setup();
			const {container} = render(
				<FloatingLayerController>
					<ColorPicker
						color={colors[0]}
						colors={colors}
						onChangeColor={onChangeColorHandler}
						open
						type="grid"
					/>
				</FloatingLayerController>
			);
			const colorsColumnDiv = container.querySelectorAll('.colorPicker'); // eslint-disable-line testing-library/no-container
			const secondColorBlock = colorsColumnDiv[0].querySelectorAll('.colorBlock')[1];
			const selectedColor = container.querySelector('.selectedColor'); // eslint-disable-line testing-library/no-container

			await user.click(secondColorBlock);

			expect(secondColorBlock).toHaveStyle({backgroundColor: 'rgb(0, 55, 74)'});
			expect(selectedColor).toHaveStyle({backgroundColor: 'rgb(0, 55, 74)'});
		});

		test('should update favorite colors after clicking a color from the color picker', async () => {
			const onChangeColorHandler = jest.fn();
			const user = userEvent.setup();
			const {container} = render(
				<FloatingLayerController>
					<ColorPicker
						color={colors[0]}
						colors={colors}
						onChangeColor={onChangeColorHandler}
						open
					/>
				</FloatingLayerController>
			);
			const colorsColumnDiv = container.querySelectorAll('.colorPicker'); // eslint-disable-line testing-library/no-container
			const secondColorBlock = colorsColumnDiv[0].querySelectorAll('.colorBlock')[1];
			const selectedColor = container.querySelector('.selectedColor'); // eslint-disable-line testing-library/no-container

			await user.click(secondColorBlock);
			await user.click(selectedColor);

			const favoriteColors = screen.getAllByRole('button');

			expect(secondColorBlock).toHaveStyle({backgroundColor: 'rgb(0, 55, 74)'});
			expect(selectedColor).toHaveStyle({backgroundColor: 'rgb(0, 55, 74)'});
			// last added favorite color should have the same background color
			expect(favoriteColors[3]).toHaveStyle({backgroundColor: 'rgb(0, 55, 74)'});

		});

		test('should not update favoriteColors when ColorPicker is disabled', async () => {
			const onChangeColorHandler = jest.fn();
			const user = userEvent.setup();
			const {container} = render(
				<FloatingLayerController>
					<ColorPicker
						color={colors[0]}
						colors={colors}
						disabled
						onChangeColor={onChangeColorHandler}
						open
					/>
				</FloatingLayerController>
			);
			const colorsColumnDiv = container.querySelectorAll('.colorPicker'); // eslint-disable-line testing-library/no-container
			const secondColorBlock = colorsColumnDiv[0].querySelectorAll('.colorBlock')[1];
			const selectedColor = container.querySelector('.selectedColor'); // eslint-disable-line testing-library/no-container
			const favoriteColorsContainer = screen.getAllByRole('button');

			await user.click(secondColorBlock);
			await user.click(selectedColor);

			expect(onChangeColorHandler).not.toHaveBeenCalled();
			// check if three favorite colors blocks and one selected color block is rendered
			expect(favoriteColorsContainer[0]).toBeInTheDocument();
			expect(favoriteColorsContainer[1]).toBeInTheDocument();
			expect(favoriteColorsContainer[2]).toBeInTheDocument();
			expect(favoriteColorsContainer[3]).toBeInTheDocument();
			expect(favoriteColorsContainer[4]).toBe(undefined); // eslint-disable-line no-undefined
		});

		test('should update selectedColor after clicking a favorite color', async () => {
			const onChangeColorHandler = jest.fn();
			const user = userEvent.setup();
			render(
				<FloatingLayerController>
					<ColorPicker
						color={colors[0]}
						colors={colors}
						disabled
						onChangeColor={onChangeColorHandler}
						open
					/>
				</FloatingLayerController>
			);
			const favoriteColorsContainer = screen.getAllByRole('button');
			const firstFavoriteColor = favoriteColorsContainer[0];

			user.click(firstFavoriteColor);
			const selectedColorButton = favoriteColorsContainer[3];

			expect(firstFavoriteColor).toHaveStyle({backgroundColor: 'rgb(235, 64, 52)'});
			expect(selectedColorButton).toHaveStyle({backgroundColor: 'rgb(235, 64, 52)'});
		});

		test('should render a "trash" icon after long click on a favorite color block', async () => {
			const onChangeColorHandler = jest.fn();
			const user = userEvent.setup();
			render(
				<FloatingLayerController>
					<ColorPicker
						color={colors[0]}
						colors={colors}
						onChangeColor={onChangeColorHandler}
						open
					/>
				</FloatingLayerController>
			);
			const favoriteColors = screen.getAllByRole('button');
			const firstFavoriteColor = favoriteColors[0];

			await act(async () => {
				// Simulate long press
				await user.pointer({
					keys: "[MouseLeft>]",
					target: firstFavoriteColor
				});
				// Wait for 1 second to simulate the duration of the long press
				await new Promise((resolve) => setTimeout(resolve, 1000));
			});

			const expected = 983077; // decimal converted charCode of Unicode 'trash' character

			expect(firstFavoriteColor.textContent.codePointAt()).toBe(expected);
		});
	});

	describe('Grid ColorPicker', () => {
		test('should render Grid Color Picker', () => {
			const {container} = render(<GridColorPicker />);
			const colorPicker = container.querySelector('.colorPicker'); // eslint-disable-line testing-library/no-container

			expect(colorPicker).toBeInTheDocument();
		});

		test('should emit a selectedColorHandler event when selecting a color from the grid', async () => {
			const onClickHandler = jest.fn();
			const selectedColorHandler = jest.fn();
			const user = userEvent.setup();
			const {container} = render(
				<GridColorPicker onClick={onClickHandler} selectedColorHandler={selectedColorHandler} />
			);
			const colorsColumnDiv = container.querySelectorAll('.colorPicker'); // eslint-disable-line testing-library/no-container
			const secondColorBlock = colorsColumnDiv[0].querySelectorAll('.colorBlock')[1];

			await user.click(secondColorBlock);
			expect(onClickHandler).toHaveBeenCalled();
			expect(selectedColorHandler).toHaveBeenCalled();
		});
	});

	describe('Spectrum ColorPicker', () => {
		beforeEach(() => {
			// Create a mock canvas element
			const mockCanvas = document.createElement('canvas');
			// Set dimensions if necessary
			mockCanvas.width = 800;
			mockCanvas.height = 600;

			// Create a mock context
			const mockContext = {
				createLinearGradient: jest.fn(() => ({
					addColorStop: jest.fn()
				})),
				fillRect: jest.fn(),
				getImageData: jest.fn(() => ({
					data: new Uint8ClampedArray(800 * 600 * 4) // Mock image data
				}))
			};

			// Mock the getContext method to return the mock context
			global.HTMLCanvasElement.prototype.getContext = jest.fn(() => mockContext);
		});

		test('should render a Spectrum Color Picker at first render when type="spectrum"', () => {
			const onChangeColorHandler = jest.fn();
			const {container} = render(
				<FloatingLayerController>
					<ColorPicker
						color={colors[0]}
						colors={colors}
						onChangeColor={onChangeColorHandler}
						open
						type="spectrum"
					/>
				</FloatingLayerController>
			);
			const colorPicker = container.querySelector('.colorPicker'); // eslint-disable-line testing-library/no-container
			const canvas = container.querySelector('.gradientCanvas'); // eslint-disable-line testing-library/no-container

			expect(colorPicker).toBeInTheDocument();
			expect(canvas).toBeInTheDocument();
		});

		test('should render a Spectrum Color Picker when clicking on "Spectrum" tab', async () => {
			const user = userEvent.setup();
			const onChangeColorHandler = jest.fn();
			const {container} = render(
				<FloatingLayerController>
					<ColorPicker
						color={colors[0]}
						colors={colors}
						onChangeColor={onChangeColorHandler}
						open
						type="grid"
					/>
				</FloatingLayerController>
			);
			const spectrumTab = screen.getByText('Spectrum');

			await user.click(spectrumTab);

			const colorPicker = container.querySelector('.colorPicker'); // eslint-disable-line testing-library/no-container
			const canvas = container.querySelector('.gradientCanvas'); // eslint-disable-line testing-library/no-container

			expect(colorPicker).toBeInTheDocument();
			expect(canvas).toBeInTheDocument();
		});

		test('should render Spectrum Color Picker', () => {
			const color = "#eb4034";
			const {container} = render(<SpectrumColorPicker selectedColor={color} />);
			const canvas = container.querySelector('.gradientCanvas'); // eslint-disable-line testing-library/no-container

			expect(canvas).toBeInTheDocument();
		});

		it('should call selectedColorHandler when clicking the canvas', async () => {
			const color = "#eb4034";
			const selectedColorHandler = jest.fn();
			const {container} = render(<SpectrumColorPicker selectedColor={color} selectedColorHandler={selectedColorHandler} />);

			const canvas = container.querySelector('.gradientCanvas'); // eslint-disable-line testing-library/no-container
			const user = userEvent.setup();
			await user.click(canvas);

			expect(selectedColorHandler).toHaveBeenCalled();
		});

		test('should emit a selectedColorHandler event when changing indicator position with 5-way keys', async () => {
			const color = "#eb4034";
			const selectedColorHandler = jest.fn();
			const {container} = render(<SpectrumColorPicker selectedColor={color} selectedColorHandler={selectedColorHandler} />);
			const indicator = container.querySelector('.circleIndicator'); // eslint-disable-line testing-library/no-container

			// await activate(indicator);
			await fireEvent.keyDown(indicator, {keyCode: 39});
			await fireEvent.keyUp(indicator, {keyCode: 39});
			await fireEvent.keyDown(indicator, {keyCode: 40});
			await fireEvent.keyUp(indicator, {keyCode: 40});
			await fireEvent.keyDown(indicator, {keyCode: 37});
			await fireEvent.keyUp(indicator, {keyCode: 37});
			await fireEvent.keyDown(indicator, {keyCode: 38});
			await fireEvent.keyUp(indicator, {keyCode: 38});

			expect(selectedColorHandler).toHaveBeenCalled();
		});
	});

	describe('Slider ColorPicker', () => {
		const activate = (slider) => fireEvent.keyUp(slider, {keyCode: 13});
		const changeSliderValueByKey = async (element, steps, decrease) => {
			const keyCode = decrease ? 37 : 39;
			activate(element);

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

		test('should render an RGB Slider Color Picker', () => {
			const color = "#eb4034";
			render(<SliderColorPicker selectedColor={color} />);
			const sliders = screen.getAllByRole('slider');
			const [redSlider, greenSlider, blueSlider] = sliders;

			expect(redSlider).toBeInTheDocument();
			expect(greenSlider).toBeInTheDocument();
			expect(blueSlider).toBeInTheDocument();
		});

		test('should change the value of red/green/blue sliders', async () => {
			const color = "#eb4034";
			const selectedColorHandler = jest.fn();

			render(<SliderColorPicker selectedColor={color} selectedColorHandler={selectedColorHandler} />);
			const sliders = screen.getAllByRole('slider');
			const [red, green, blue] = sliderValues(sliders);

			await changeSliderValueByKey(sliders[0], 30);
			fireEvent.blur(sliders[0]);
			await changeSliderValueByKey(sliders[1], 30, true);
			fireEvent.blur(sliders[1]);
			await changeSliderValueByKey(sliders[2], 30, true);
			fireEvent.blur(sliders[2]);

			const [changedRed, changedGreen, changedBlue] = sliderValues(sliders);

			expect(red).not.toEqual(changedRed);
			expect(green).not.toEqual(changedGreen);
			expect(blue).not.toEqual(changedBlue);
		});

		test('should emit a selectedColorHandler event when changing RGB sliders value', async () => {
			const color = "#eb4034";
			const selectedColorHandler = jest.fn();

			render(<SliderColorPicker selectedColor={color} selectedColorHandler={selectedColorHandler} />);
			const sliders = screen.getAllByRole('slider');

			await changeSliderValueByKey(sliders[0], 30);
			fireEvent.blur(sliders[0]);
			expect(selectedColorHandler).toHaveBeenCalled();

			await changeSliderValueByKey(sliders[1], 30, true);
			fireEvent.blur(sliders[1]);
			expect(selectedColorHandler).toHaveBeenCalled();

			await changeSliderValueByKey(sliders[2], 30, true);
			fireEvent.blur(sliders[2]);
			expect(selectedColorHandler).toHaveBeenCalled();
		});

		test('should render an HSL Slider Color Picker', () => {
			const color = "#eb4034";
			render(<SliderColorPicker selectedColor={color} type="HSL" />);
			const sliders = screen.getAllByRole('slider');
			const [hue, saturation, lightness] = sliders;

			expect(hue).toBeInTheDocument();
			expect(saturation).toBeInTheDocument();
			expect(lightness).toBeInTheDocument();
		});

		test('should change the value of hue/saturation/lightness sliders', async () => {
			const color = "#eb4034";
			const selectedColorHandler = jest.fn();

			render(<SliderColorPicker selectedColor={color} selectedColorHandler={selectedColorHandler} type="HSL" />);
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

		test('should emit a selectedColorHandler event when changing HSL sliders value', async () => {
			const color = "#eb4034";
			const selectedColorHandler = jest.fn();

			render(<SliderColorPicker selectedColor={color} selectedColorHandler={selectedColorHandler} type="HSL" />);
			const sliders = screen.getAllByRole('slider');

			await changeSliderValueByKey(sliders[0], 30);
			fireEvent.blur(sliders[0]);
			expect(selectedColorHandler).toHaveBeenCalled();

			await changeSliderValueByKey(sliders[1], 30, true);
			fireEvent.blur(sliders[1]);
			expect(selectedColorHandler).toHaveBeenCalled();

			await changeSliderValueByKey(sliders[2], 30, true);
			fireEvent.blur(sliders[2]);
			expect(selectedColorHandler).toHaveBeenCalled();
		});
	});

	describe('utils', () => {
		test('should return hsl from hex color', () => {
			const hexBlueColor = '#0000FF';
			const hexGreenColor = '#00FF00';
			const hexRedColor = '#FF0000';

			const hslBlueColor = hexToHSL(hexBlueColor);
			const hslGreenColor = hexToHSL(hexGreenColor);
			const hslRedColor = hexToHSL(hexRedColor);

			const expectedBlue = {h: 240, s: 100, l: 50};
			const expectedGreen = {h: 120, s: 100, l: 50};
			const expectedRed = {h: 0, s: 100, l: 50};

			expect(hslBlueColor).toEqual(expectedBlue);
			expect(hslGreenColor).toEqual(expectedGreen);
			expect(hslRedColor).toEqual(expectedRed);
		});

		test('should return hex from hsl color', () => {
			const hslAquaColor = hslToHex({h: 180, s: 100, l: 50});
			const hslBlueColor = hslToHex({h: 240, s: 100, l: 50});
			const hslFuchsiaColor = hslToHex({h: 300, s: 100, l: 50});
			const hslRedColor = hslToHex({h: 0, s: 100, l: 50});
			const hslYellowColor = hslToHex({h: 60, s: 100, l: 50});

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
});
