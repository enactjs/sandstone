import {Cell, Row} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import {useCallback, useState} from 'react';

import Slider from '../Slider';

import {generateOppositeColor, hexToHSL, hexToRGB, hslToHex, hslToRGBString, rgbObjectToHex} from './utils';

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

const ColorPickerSlider = ({selectedColor, selectedColorHandler, ...props}) => {
	const {red, green, blue} = hexToRGB(selectedColor);
	const [localRed, setLocalRed] = useState(red);
	const [localGreen, setLocalGreen] = useState(green);
	const [localBlue, setLocalBlue] = useState(blue);

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
		<div {...props} className={componentCss.sliderContainer}>
			<Cell>
				<Cell className={componentCss.labelText}>Red</Cell>
				<Row>
					<Cell
						className={componentCss.sliderCell}
						size="80%"
						style={{backgroundImage: `linear-gradient(to right, rgb(0,${localGreen},${localBlue}), rgb(255,${localGreen},${localBlue}))`}}
					>
						<Slider
							css={componentCss}
							max={255}
							min={0}
							noFill
							onBlur={changeSelectedColor}
							onChange={changeValueRed}
							onPointerUp={changeSelectedColor}
							style={{
								'--sand-slider-knob-border-color': generateOppositeColor(rgbObjectToHex({red: localRed, green: localGreen, blue: localBlue})),
								'--sand-focus-bg-color-rgb': `${localRed},${localGreen},${localBlue}`,
								'--sand-progress-slider-color': rgbObjectToHex({red: localRed, green: localGreen, blue: localBlue})
							}}
							value={localRed}
						/>
					</Cell>
					<Cell
						className={componentCss.outputText}
					>{localRed}</Cell>
				</Row>
			</Cell>
			<Cell className={componentCss.cellElement}>
				<Cell className={componentCss.labelText}>Green</Cell>
				<Row>
					<Cell
						className={componentCss.sliderCell}
						size="80%"
						style={{backgroundImage: `linear-gradient(to right, rgb(${localRed},0,${localBlue}), rgb(${localRed},255,${localBlue}))`}}
					>
						<Slider
							css={componentCss}
							max={255}
							min={0}
							noFill
							onBlur={changeSelectedColor}
							onChange={changeValueGreen}
							onPointerUp={changeSelectedColor}
							style={{
								'--sand-slider-knob-border-color': generateOppositeColor(rgbObjectToHex({red: localRed, green: localGreen, blue: localBlue})),
								'--sand-focus-bg-color-rgb': `${localRed},${localGreen},${localBlue}`,
								'--sand-progress-slider-color': rgbObjectToHex({red: localRed, green: localGreen, blue: localBlue})
							}}
							value={localGreen}
						/>
					</Cell>
					<Cell className={componentCss.outputText}>{localGreen}</Cell>
				</Row>
			</Cell>
			<Cell className={componentCss.cellElement}>
				<Cell className={componentCss.labelText}>Blue</Cell>
				<Row>
					<Cell
						className={componentCss.sliderCell}
						size="80%"
						style={{backgroundImage: `linear-gradient(to right, rgb(${localRed},${localGreen},0), rgb(${localRed},${localGreen},255))`}}
					>
						<Slider
							css={componentCss}
							max={255}
							min={0}
							noFill
							onBlur={changeSelectedColor}
							onChange={changeValueBlue}
							onPointerUp={changeSelectedColor}
							style={{
								'--sand-slider-knob-border-color': generateOppositeColor(rgbObjectToHex({red: localRed, green: localGreen, blue: localBlue})),
								'--sand-focus-bg-color-rgb': `${localRed},${localGreen},${localBlue}`,
								'--sand-progress-slider-color': rgbObjectToHex({red: localRed, green: localGreen, blue: localBlue})
							}}
							value={localBlue}
						/>
					</Cell>
					<Cell className={componentCss.outputText}>{localBlue}</Cell>
				</Row>
			</Cell>
		</div>
	);
};

const ColorPickerSliderHSL = ({selectedColor, selectedColorHandler, ...props}) => {
	const {h, s, l} = hexToHSL(selectedColor);

	const [hue, setHue] = useState(h);
	const [saturation, setSaturation] = useState(s);
	const [lightness, setLightness] = useState(l);

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
		<div {...props} className={componentCss.sliderContainer}>
			<Cell>
				<Cell className={componentCss.labelText}>Hue</Cell>
				<Row>
					<Cell
						className={componentCss.sliderCell}
						size="80%"
						style={{backgroundImage: hueGradient(saturation, lightness)}}
					>
						<Slider
							css={componentCss}
							max={359}
							min={0}
							noFill
							onBlur={changeSelectedColor}
							onChange={changeValueHue}
							onPointerUp={changeSelectedColor}
							style={{
								'--sand-slider-knob-border-color': generateOppositeColor(hslToHex({h: hue, s: saturation, l: lightness})),
								'--sand-focus-bg-color-rgb': hslToRGBString({h: hue, s: saturation, l: lightness}),
								'--sand-progress-slider-color': hslToHex({h: hue, s: saturation, l: lightness})
							}}
							value={hue}
						/>
					</Cell>
					<Cell
						className={componentCss.outputText}
					>{hue}</Cell>
				</Row>
			</Cell>
			<Cell className={componentCss.cellElement}>
				<Cell className={componentCss.labelText}>Saturation</Cell>
				<Row>
					<Cell
						className={componentCss.sliderCell}
						size="80%"
						style={{backgroundImage: `linear-gradient(to right, hsl(${hue}, 0%, ${lightness}%), hsl(${hue}, 100%, ${lightness}%))`}}
					>
						<Slider
							css={componentCss}
							max={100}
							min={0}
							noFill
							onBlur={changeSelectedColor}
							onChange={changeValueSaturation}
							onPointerUp={changeSelectedColor}
							style={{
								'--sand-slider-knob-border-color': generateOppositeColor(hslToHex({h: hue, s: saturation, l: lightness})),
								'--sand-focus-bg-color-rgb': hslToRGBString({h: hue, s: saturation, l: lightness}),
								'--sand-progress-slider-color': hslToHex({h: hue, s: saturation, l: lightness})
							}}
							value={saturation}
						/>
					</Cell>
					<Cell className={componentCss.outputTextPercent}>{saturation}%</Cell>
				</Row>
			</Cell>
			<Cell className={componentCss.cellElement}>
				<Cell className={componentCss.labelText}>Lightness</Cell>
				<Row>
					<Cell
						className={componentCss.sliderCell}
						size="80%"
						style={{backgroundImage: lightnessGradient(hue, saturation)}}
					>
						<Slider
							css={componentCss}
							max={100}
							min={0}
							noFill
							onBlur={changeSelectedColor}
							onChange={changeValueLightness}
							onPointerUp={changeSelectedColor}
							style={{
								'--sand-slider-knob-border-color': generateOppositeColor(hslToHex({h: hue, s: saturation, l: lightness})),
								'--sand-focus-bg-color-rgb': hslToRGBString({h: hue, s: saturation, l: lightness}),
								'--sand-progress-slider-color': hslToHex({h: hue, s: saturation, l: lightness})
							}}
							value={lightness}
						/>
					</Cell>
					<Cell className={componentCss.outputTextPercent}>{lightness}%</Cell>
				</Row>
			</Cell>
		</div>
	);
};

ColorPickerSlider.propTypes = {
	selectedColor: PropTypes.string,
	selectedColorHandler: PropTypes.func
};

ColorPickerSliderHSL.propTypes = {
	selectedColor: PropTypes.string,
	selectedColorHandler: PropTypes.func
};

export {
	ColorPickerSlider,
	ColorPickerSliderHSL
};
export default ColorPickerSlider;
