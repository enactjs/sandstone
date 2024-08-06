import {Cell, Row} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import {useCallback} from 'react';

import Slider from '../Slider';

import {generateOppositeColor, hexToRGB, rgbObjectToHex} from './utils';

import componentCss from './ColorPickerSlider.module.less';

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
					<Cell size="83%">
						<Slider
							className={componentCss.slider}
							max={255}
							min={0}
							noFill
							onChange={changeValueRed}
							style={{
								'--sand-slider-knob-border-color': generateOppositeColor(selectedColor),
								backgroundImage: `linear-gradient(to right, rgb(0,${green},${blue}), rgb(255,${green},${blue}))`
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
					<Cell size="83%">
						<Slider
							className={componentCss.slider}
							max={255}
							min={0}
							noFill
							onChange={changeValueGreen}
							style={{
								'--sand-slider-knob-border-color': generateOppositeColor(selectedColor),
								backgroundImage: `linear-gradient(to right, rgb(${red},0,${blue}), rgb(${red},255,${blue}))`
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
					<Cell size="83%">
						<Slider
							className={componentCss.slider}
							max={255}
							min={0}
							noFill
							onChange={changeValueBlue}
							style={{
								'--sand-slider-knob-border-color': generateOppositeColor(selectedColor),
								backgroundImage: `linear-gradient(to right, rgb(${red},${green},0), rgb(${red},${green},255))`
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

ColorPickerSlider.propTypes = {
	selectedColor: PropTypes.string,
	selectedColorHandler: PropTypes.func
};

export default ColorPickerSlider;
