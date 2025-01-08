/**
 * Sandstone component that allows the user to choose a color by using an RGB or an HSL color slider.
 *
 * @example
 * <ColorPickerSlider
 *	 selectedColor="#FF00FF"
 *	 selectedColorHandler={setSelectedColor}
 * />
 *
 * @exports ColorPickerSlider
 * @exports ColorPickerSliderRGB
 * @exports ColorPickerSliderHSL
 * @private
 */
import Layout, {Cell, Row} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useState} from 'react';

import Dropdown from '../Dropdown';
import {InputField} from '../Input';
import Slider from '../Slider';

import {checkHex, generateOppositeColor, hexToHSL, hexToRGB, hslToHex, hslToRGBString, rgbObjectToHex} from './utils';

import componentCss from './ColorPickerSlider.module.less';

const hueGradient = (saturation, lightness) => {
	return `linear-gradient(to right, 
	hsla(0, ${saturation}%, ${lightness}%, 1),
	hsla(10, ${saturation}%, ${lightness}%, 1),
	hsla(20, ${saturation}%, ${lightness}%, 1),
	hsla(30, ${saturation}%, ${lightness}%, 1),
	hsla(40, ${saturation}%, ${lightness}%, 1),
	hsla(50, ${saturation}%, ${lightness}%, 1),
	hsla(60, ${saturation}%, ${lightness}%, 1),
	hsla(70, ${saturation}%, ${lightness}%, 1),
	hsla(80, ${saturation}%, ${lightness}%, 1),
	hsla(90, ${saturation}%, ${lightness}%, 1),
	hsla(100, ${saturation}%, ${lightness}%, 1),
	hsla(110, ${saturation}%, ${lightness}%, 1),
	hsla(120, ${saturation}%, ${lightness}%, 1),
	hsla(130, ${saturation}%, ${lightness}%, 1),
	hsla(140, ${saturation}%, ${lightness}%, 1),
	hsla(150, ${saturation}%, ${lightness}%, 1),
	hsla(160, ${saturation}%, ${lightness}%, 1),
	hsla(170, ${saturation}%, ${lightness}%, 1),
	hsla(180, ${saturation}%, ${lightness}%, 1),
	hsla(190, ${saturation}%, ${lightness}%, 1),
	hsla(200, ${saturation}%, ${lightness}%, 1),
	hsla(210, ${saturation}%, ${lightness}%, 1),
	hsla(220, ${saturation}%, ${lightness}%, 1),
	hsla(230, ${saturation}%, ${lightness}%, 1),
	hsla(240, ${saturation}%, ${lightness}%, 1),
	hsla(250, ${saturation}%, ${lightness}%, 1),
	hsla(260, ${saturation}%, ${lightness}%, 1),
	hsla(270, ${saturation}%, ${lightness}%, 1),
	hsla(280, ${saturation}%, ${lightness}%, 1),
	hsla(290, ${saturation}%, ${lightness}%, 1),
	hsla(300, ${saturation}%, ${lightness}%, 1),
	hsla(310, ${saturation}%, ${lightness}%, 1),
	hsla(320, ${saturation}%, ${lightness}%, 1),
	hsla(330, ${saturation}%, ${lightness}%, 1),
	hsla(340, ${saturation}%, ${lightness}%, 1),
	hsla(350, ${saturation}%, ${lightness}%, 1),
	hsla(360, ${saturation}%, ${lightness}%, 1))`;
};

const lightnessGradient = (hue, saturation) => {
	return `linear-gradient(to right, 
	hsla(${hue}, ${saturation}%, 0%, 1),
	hsla(${hue}, ${saturation}%, 20%, 1),
	hsla(${hue}, ${saturation}%, 40%, 1),
	hsla(${hue}, ${saturation}%, 60%, 1),
	hsla(${hue}, ${saturation}%, 80%, 1),
	hsla(${hue}, ${saturation}%, 100%, 1))`;
};

/**
 * A color picker component that allows the user to choose a color by using an RGB color slider.
 *
 * @class ColorPickerSliderRGB
 * @memberof sandstone/ColorPicker
 * @ui
 * @private
 */
const ColorPickerSliderRGB = ({disabled, selectedColor, selectedColorHandler, ...props}) => {
	const {red, green, blue} = hexToRGB(selectedColor);
	const [localRed, setLocalRed] = useState(red);
	const [localGreen, setLocalGreen] = useState(green);
	const [localBlue, setLocalBlue] = useState(blue);

	useEffect(() => {
		setLocalRed(red);
		setLocalGreen(green);
		setLocalBlue(blue);
	}, [blue, green, red]);

	const changeValueRed = useCallback((ev) => {
		setLocalRed(ev.value);
	}, []);

	const changeValueGreen = useCallback((ev) => {
		setLocalGreen(ev.value);
	}, []);

	const changeValueBlue = useCallback((ev) => {
		setLocalBlue(ev.value);
	}, []);

	const changeSelectedColor = useCallback(() => {
		selectedColorHandler(rgbObjectToHex({red: localRed, green: localGreen, blue: localBlue}));
	}, [localBlue, localGreen, localRed, selectedColorHandler]);

	return (
		<Layout {...props} className={componentCss.slidersContainer}>
			<Cell>
				<Cell className={componentCss.labelText}>Red</Cell>
				<Row>
					<Cell
						className={componentCss.sliderCell}
						size="70%"
						style={{backgroundImage: `linear-gradient(to right, rgb(0,${localGreen},${localBlue}), rgb(255,${localGreen},${localBlue}))`}}
					>
						<Slider
							activateOnSelect
							css={componentCss}
							disabled={disabled}
							max={255}
							min={0}
							noFill
							onBlur={changeSelectedColor}
							onChange={changeValueRed}
							onKeyUp={changeSelectedColor}
							onPointerUp={changeSelectedColor}
							spotlightDisabled={disabled}
							style={{
								'--sand-slider-knob-border-color': generateOppositeColor(rgbObjectToHex({red: localRed, green: localGreen, blue: localBlue})),
								'--sand-focus-bg-color-rgb': `${localRed},${localGreen},${localBlue}`,
								'--sand-progress-slider-color': rgbObjectToHex({red: localRed, green: localGreen, blue: localBlue})
							}}
							value={localRed}
						/>
					</Cell>
					<Cell className={componentCss.outputText} size="20%">{localRed}</Cell>
				</Row>
				<Cell className={componentCss.labelText}>Green</Cell>
				<Row>
					<Cell
						className={componentCss.sliderCell}
						size="70%"
						style={{backgroundImage: `linear-gradient(to right, rgb(${localRed},0,${localBlue}), rgb(${localRed},255,${localBlue}))`}}
					>
						<Slider
							activateOnSelect
							css={componentCss}
							disabled={disabled}
							max={255}
							min={0}
							noFill
							onBlur={changeSelectedColor}
							onChange={changeValueGreen}
							onKeyUp={changeSelectedColor}
							onPointerUp={changeSelectedColor}
							spotlightDisabled={disabled}
							style={{
								'--sand-slider-knob-border-color': generateOppositeColor(rgbObjectToHex({red: localRed, green: localGreen, blue: localBlue})),
								'--sand-focus-bg-color-rgb': `${localRed},${localGreen},${localBlue}`,
								'--sand-progress-slider-color': rgbObjectToHex({red: localRed, green: localGreen, blue: localBlue})
							}}
							value={localGreen}
						/>
					</Cell>
					<Cell className={componentCss.outputText} size="20%">{localGreen}</Cell>
				</Row>
				<Cell className={componentCss.labelText}>Blue</Cell>
				<Row>
					<Cell
						className={componentCss.sliderCell}
						size="70%"
						style={{backgroundImage: `linear-gradient(to right, rgb(${localRed},${localGreen},0), rgb(${localRed},${localGreen},255))`}}
					>
						<Slider
							activateOnSelect
							css={componentCss}
							disabled={disabled}
							max={255}
							min={0}
							noFill
							onBlur={changeSelectedColor}
							onChange={changeValueBlue}
							onKeyUp={changeSelectedColor}
							onPointerUp={changeSelectedColor}
							spotlightDisabled={disabled}
							style={{
								'--sand-slider-knob-border-color': generateOppositeColor(rgbObjectToHex({red: localRed, green: localGreen, blue: localBlue})),
								'--sand-focus-bg-color-rgb': `${localRed},${localGreen},${localBlue}`,
								'--sand-progress-slider-color': rgbObjectToHex({red: localRed, green: localGreen, blue: localBlue})
							}}
							value={localBlue}
						/>
					</Cell>
					<Cell className={componentCss.outputText} size="20%">{localBlue}</Cell>
				</Row>
			</Cell>
		</Layout>
	);
};

ColorPickerSliderRGB.displayName = 'ColorPickerSliderRGB';

ColorPickerSliderRGB.propTypes = {
	/**
	 * Applies a disabled style and prevents interacting with the component.
	 *
	 * @type {Boolean}
	 * @default false
	 * @private
	 */
	disabled: PropTypes.bool,

	/**
	 * Indicates the selected color.
	 *
	 * @type {String}
	 * @private
	 */
	selectedColor: PropTypes.string,

	/**
	 * Called when the selected color is modified.
	 *
	 * @type {Function}
	 * @private
	 */
	selectedColorHandler: PropTypes.func
};

/**
 * A color picker component that allows the user to choose a color by using an HSL color slider.
 *
 * @class ColorPickerSliderHSL
 * @memberof sandstone/ColorPicker
 * @ui
 * @private
 */
const ColorPickerSliderHSL = ({disabled, selectedColor, selectedColorHandler, ...props}) => {
	const {h, s, l} = hexToHSL(selectedColor);
	const [hue, setHue] = useState(h);
	const [saturation, setSaturation] = useState(s);
	const [lightness, setLightness] = useState(l);

	useEffect(() => {
		setHue(h);
		setSaturation(s);
		setLightness(l);
	}, [h, l, s]);

	const changeValueHue = useCallback((ev) => {
		setHue(ev.value);
	}, []);

	const changeValueSaturation = useCallback((ev) => {
		setSaturation(ev.value);
	}, []);

	const changeValueLightness = useCallback((ev) => {
		setLightness(ev.value);
	}, []);

	const changeSelectedColor = useCallback(() => {
		selectedColorHandler(hslToHex({h: hue, s: saturation, l: lightness}));
	}, [hue, saturation, lightness, selectedColorHandler]);

	return (
		<Layout {...props} className={componentCss.slidersContainer}>
			<Cell>
				<Cell>
					<Cell className={componentCss.labelText}>Hue</Cell>
					<Row>
						<Cell
							className={componentCss.sliderCell}
							size="70%"
							style={{backgroundImage: hueGradient(saturation, lightness)}}
						>
							<Slider
								activateOnSelect
								css={componentCss}
								disabled={disabled}
								max={360}
								min={0}
								noFill
								onBlur={changeSelectedColor}
								onChange={changeValueHue}
								onKeyUp={changeSelectedColor}
								onPointerUp={changeSelectedColor}
								spotlightDisabled={disabled}
								style={{
									'--sand-slider-knob-border-color': generateOppositeColor(hslToHex({h: hue, s: saturation, l: lightness})),
									'--sand-focus-bg-color-rgb': hslToRGBString({h: hue, s: saturation, l: lightness}),
									'--sand-progress-slider-color': hslToHex({h: hue, s: saturation, l: lightness})
								}}
								value={hue}
							/>
						</Cell>
						<Cell className={componentCss.outputText} size="20%">{hue}</Cell>
					</Row>
				</Cell>
				<Cell>
					<Cell className={componentCss.labelText}>Saturation</Cell>
					<Row>
						<Cell
							className={componentCss.sliderCell}
							size="70%"
							style={{backgroundImage: `linear-gradient(to right, hsl(${hue}, 0%, ${lightness}%), hsl(${hue}, 100%, ${lightness}%))`}}
						>
							<Slider
								activateOnSelect
								css={componentCss}
								disabled={disabled}
								max={100}
								min={0}
								noFill
								onBlur={changeSelectedColor}
								onChange={changeValueSaturation}
								onKeyUp={changeSelectedColor}
								onPointerUp={changeSelectedColor}
								spotlightDisabled={disabled}
								style={{
									'--sand-slider-knob-border-color': generateOppositeColor(hslToHex({h: hue, s: saturation, l: lightness})),
									'--sand-focus-bg-color-rgb': hslToRGBString({h: hue, s: saturation, l: lightness}),
									'--sand-progress-slider-color': hslToHex({h: hue, s: saturation, l: lightness})
								}}
								value={saturation}
							/>
						</Cell>
						<Cell className={componentCss.outputText} size="20%">{saturation}%</Cell>
					</Row>
				</Cell>
				<Cell>
					<Cell className={componentCss.labelText}>Lightness</Cell>
					<Row>
						<Cell
							className={componentCss.sliderCell}
							size="70%"
							style={{backgroundImage: lightnessGradient(hue, saturation)}}
						>
							<Slider
								activateOnSelect
								css={componentCss}
								disabled={disabled}
								max={100}
								min={0}
								noFill
								onBlur={changeSelectedColor}
								onChange={changeValueLightness}
								onKeyUp={changeSelectedColor}
								onPointerUp={changeSelectedColor}
								spotlightDisabled={disabled}
								style={{
									'--sand-slider-knob-border-color': generateOppositeColor(hslToHex({h: hue, s: saturation, l: lightness})),
									'--sand-focus-bg-color-rgb': hslToRGBString({h: hue, s: saturation, l: lightness}),
									'--sand-progress-slider-color': hslToHex({h: hue, s: saturation, l: lightness})
								}}
								value={lightness}
							/>
						</Cell>
						<Cell className={componentCss.outputText} size="20%">{lightness}%</Cell>
					</Row>
				</Cell>
			</Cell>
		</Layout>
	);
};

ColorPickerSliderHSL.displayName = 'ColorPickerSliderHSL';

ColorPickerSliderHSL.propTypes = {
	/**
	 * Applies a disabled style and prevents interacting with the component.
	 *
	 * @type {Boolean}
	 * @default false
	 * @private
	 */
	disabled: PropTypes.bool,

	/**
	 * Indicates the selected color.
	 *
	 * @type {String}
	 * @private
	 */
	selectedColor: PropTypes.string,

	/**
	 * Called when the selected color is modified.
	 *
	 * @type {Function}
	 * @private
	 */
	selectedColorHandler: PropTypes.func
};

/**
 * A color picker component, ready to use in Sandstone applications.
 *
 * @class ColorPickerSlider
 * @memberof sandstone/ColorPicker
 * @ui
 * @private
 */
const ColorPickerSlider = ({disabled, selectedColor, selectedColorHandler, type = 'RGB', ...props}) => {
	const [pickerType, setPickerType] = useState('RGB');
	const [dropdownValue, setDropdownValue] = useState(0);

	useEffect(() => {
		if (type === 'RGB') {
			setDropdownValue(0);
			setPickerType('RGB');
		} else if (type === 'HSL') {
			setDropdownValue(1);
			setPickerType('HSL');
		}
	}, [type]);

	const handleBlur = useCallback(() => {
		if (checkHex(selectedColor)) selectedColorHandler('#000000');
	}, [selectedColor, selectedColorHandler]);

	const handleInputChange = useCallback((ev) => {
		if (ev.value.length > 7 || ev.value.length < 1) return;
		selectedColorHandler(ev.value);
	}, [selectedColorHandler]);

	const handleSelect = useCallback((ev) => {
		setPickerType(ev.data);
		if (ev.data === 'RGB') {
			setDropdownValue(0);
		} else if (ev.data === 'HSL') {
			setDropdownValue(1);
		}
	}, [setDropdownValue, setPickerType]);

	return (
		<Cell {...props} className={componentCss.sliderPickerContainer}>
			<Row className={componentCss.containerRow}>
				<Cell size="60%">
					<Dropdown
						className={componentCss.pickerSelect}
						disabled={disabled}
						onSelect={handleSelect}
						placeholder={pickerType}
						selected={dropdownValue}
						size="small"
						spotlightDisabled={disabled}
					>
						{['RGB', 'HSL']}
					</Dropdown>
				</Cell>
				<Cell size="40%">
					<InputField
						className={componentCss.hexInput}
						disabled={disabled}
						invalid={checkHex(selectedColor)}
						invalidMessage="Use a 6 characters hex code"
						onBlur={handleBlur}
						onChange={handleInputChange}
						spotlightDisabled={disabled}
						value={selectedColor.toUpperCase()}
					/>
				</Cell>
			</Row>
			{pickerType === 'HSL' ?
				<ColorPickerSliderHSL disabled={disabled} selectedColor={selectedColor} selectedColorHandler={selectedColorHandler} /> :
				<ColorPickerSliderRGB disabled={disabled} selectedColor={selectedColor} selectedColorHandler={selectedColorHandler} />
			}
		</Cell>
	);
};

ColorPickerSlider.displayName = 'ColorPickerSlider';

ColorPickerSlider.propTypes = {
	/**
	 * Applies a disabled style and prevents interacting with the component.
	 *
	 * @type {Boolean}
	 * @default false
	 * @private
	 */
	disabled: PropTypes.bool,

	/**
	 * Indicates the selected color.
	 *
	 * @type {String}
	 * @private
	 */
	selectedColor: PropTypes.string,

	/**
	 * Called when the selected color is modified.
	 *
	 * @type {Function}
	 * @private
	 */
	selectedColorHandler: PropTypes.func,

	/**
	 * Set the type of color picker to use.
	 *
	 * @type {('RGB'|'HSL')}
	 * @default 'RGB'
	 * @private
	 */
	type: PropTypes.string
};

export {
	ColorPickerSlider,
	ColorPickerSliderHSL,
	ColorPickerSliderRGB
};
export default ColorPickerSlider;
