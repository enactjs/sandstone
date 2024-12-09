import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ColorPicker from '../ColorPicker';
import GridColorPicker from '../ColorPickerGrid';
import SliderColorPicker from '../ColorPickerSlider';
import SpectrumColorPicker from '../ColorPickerSpectrum';

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
			const colorsColumnDiv = container.querySelectorAll('.colorPicker'); // eslint-disable-line
			const secondColorBlock = colorsColumnDiv[0].querySelectorAll('.colorBlock')[0]; // eslint-disable-line

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
					data: new Uint8ClampedArray(800 * 600 * 4) // Mock image data with zeros
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
});
