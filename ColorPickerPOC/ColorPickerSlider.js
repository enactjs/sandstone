import {Cell, Row} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import {useCallback} from 'react';

import Slider from '../Slider';

import {generateOppositeColor, hexToHSL, hexToRGB, hslToHex, rgbObjectToHex} from './utils';

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

	const changeValueRed = useCallback((ev) => {
		selectedColorHandler(rgbObjectToHex({red: ev.value, green, blue}));
	}, [blue, green, selectedColorHandler]);

	const changeValueGreen = useCallback((ev) => {
		selectedColorHandler(rgbObjectToHex({red, green: ev.value, blue}));
	}, [blue, red, selectedColorHandler]);

	const changeValueBlue = useCallback((ev) => {
		selectedColorHandler(rgbObjectToHex({red, green, blue: ev.value}));
	}, [green, red, selectedColorHandler]);

	return (
		<div {...props} className={componentCss.sliderContainer}>
			<Cell>
				<Cell className={componentCss.labelText}>Red</Cell>
				<Row>
					<Cell
						className={componentCss.sliderCell}
						size="80%"
						style={{backgroundImage: `linear-gradient(to right, rgb(0,${green},${blue}), rgb(255,${green},${blue}))`}}
					>
						<Slider
							css={componentCss}
							max={255}
							min={0}
							noFill
							onChange={changeValueRed}
							style={{
								'--sand-slider-knob-border-color': generateOppositeColor(selectedColor),
								'--sand-focus-bg-color-rgb': `${red},${green},${blue}`,
								'--sand-progress-slider-color': selectedColor
							}}
							value={red}
						/>
					</Cell>
					<Cell
						className={componentCss.outputText}
					>{red}</Cell>
				</Row>
			</Cell>
			<Cell className={componentCss.cellElement}>
				<Cell className={componentCss.labelText}>Green</Cell>
				<Row>
					<Cell
						className={componentCss.sliderCell}
						size="80%"
						style={{backgroundImage: `linear-gradient(to right, rgb(${red},0,${blue}), rgb(${red},255,${blue}))`}}
					>
						<Slider
							css={componentCss}
							max={255}
							min={0}
							noFill
							onChange={changeValueGreen}
							style={{
								'--sand-slider-knob-border-color': generateOppositeColor(selectedColor),
								'--sand-focus-bg-color-rgb': `${red},${green},${blue}`,
								'--sand-progress-slider-color': selectedColor
							}}
							value={green}
						/>
					</Cell>
					<Cell className={componentCss.outputText}>{green}</Cell>
				</Row>
			</Cell>
			<Cell className={componentCss.cellElement}>
				<Cell className={componentCss.labelText}>Blue</Cell>
				<Row>
					<Cell
						className={componentCss.sliderCell}
						size="80%"
						style={{backgroundImage: `linear-gradient(to right, rgb(${red},${green},0), rgb(${red},${green},255))`}}
					>
						<Slider
							css={componentCss}
							max={255}
							min={0}
							noFill
							onChange={changeValueBlue}
							style={{
								'--sand-slider-knob-border-color': generateOppositeColor(selectedColor),
								'--sand-focus-bg-color-rgb': `${red},${green},${blue}`,
								'--sand-progress-slider-color': selectedColor
							}}
							value={blue}
						/>
					</Cell>
					<Cell className={componentCss.outputText}>{blue}</Cell>
				</Row>
			</Cell>
		</div>
	);
};

const ColorPickerSliderHSL = ({selectedColor, selectedColorHandler, ...props}) => {
	const {h: hue, s: saturation, l: lightness} = hexToHSL(selectedColor);
	const {red, green, blue} = hexToRGB(selectedColor);

	const changeValueHue = useCallback((ev) => {
		selectedColorHandler(hslToHex({h: ev.value, s: saturation, l: lightness}));
	}, [saturation, lightness, selectedColorHandler]);

	const changeValueSaturation = useCallback((ev) => {
		selectedColorHandler(hslToHex({h: hue, s: ev.value, l: lightness}));
	}, [hue, lightness, selectedColorHandler]);

	const changeValueLightness = useCallback((ev) => {
		selectedColorHandler(hslToHex({h: hue, s: saturation, l: ev.value}));
	}, [hue, saturation, selectedColorHandler]);

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
							onChange={changeValueHue}
							style={{
								'--sand-slider-knob-border-color': generateOppositeColor(selectedColor),
								'--sand-focus-bg-color-rgb': `${red},${green},${blue}`,
								'--sand-progress-slider-color': selectedColor
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
							onChange={changeValueSaturation}
							style={{
								'--sand-slider-knob-border-color': generateOppositeColor(selectedColor),
								'--sand-focus-bg-color-rgb': `${red},${green},${blue}`,
								'--sand-progress-slider-color': selectedColor
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
							onChange={changeValueLightness}
							style={{
								'--sand-slider-knob-border-color': generateOppositeColor(selectedColor),
								'--sand-focus-bg-color-rgb': `${red},${green},${blue}`,
								'--sand-progress-slider-color': selectedColor
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
