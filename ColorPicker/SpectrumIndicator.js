import {is} from '@enact/core/keymap';
import spotlight from '@enact/spotlight';
import Spottable from '@enact/spotlight/Spottable';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useState} from 'react';

import {getHexColorFromGradient} from './utils';

import css from './ColorPickerSpectrum.module.less';

const SpottableDiv = Spottable('div');

/**
 * The circle indicator component used in spectrum color picker.
 *
 * @class CircleIndicator
 * @memberof sandstone/ColorPicker
 * @ui
 * @private
 */
const CircleIndicator = ({bgColor, canvasRef, disabled, isIndicatorActive, selectedColorHandler, setIsIndicatorActive, setIndicatorBgColor, setX, setY, x, y}) => {
	const [holding, setHolding] = useState(false);
	const [prevKey, setPrevKey] = useState('');
	const [stepValue, setStepValue] = useState(1);

	// resume spotlight when indicator is not active
	useEffect(() => {
		if (!isIndicatorActive) {
			spotlight.resume();
		}
	}, [isIndicatorActive]);

	const handleOnKeyDown = useCallback(({keyCode}) => {
		if (disabled) return;
		if (is('enter', keyCode)) { // set indicator in active state and pause spotlight so no other containers get focus when selecting a color with 5-way
			setIsIndicatorActive(!isIndicatorActive);
			spotlight.pause();
		} else if (is('down', keyCode)) {
			const hexColor = getHexColorFromGradient(canvasRef, x, y);
			setIndicatorBgColor(hexColor);
		} else if (is('up', keyCode)) {
			const hexColor = getHexColorFromGradient(canvasRef, x, y);
			setIndicatorBgColor(hexColor);
		} else if (is('left', keyCode)) {
			const hexColor = getHexColorFromGradient(canvasRef, x, y);
			setIndicatorBgColor(hexColor);
		} else if (is('right', keyCode)) {
			const hexColor = getHexColorFromGradient(canvasRef, x, y);
			setIndicatorBgColor(hexColor);
		}

		if (isIndicatorActive) {
			if (holding) {
				if (prevKey === keyCode) {
					if (stepValue < 10) {
						setStepValue(prevValue => prevValue + 1);
					}
				} else {
					setStepValue(1);
				}
			} else {
				setHolding(true);
				setPrevKey(keyCode);
			}
		}
	}, [canvasRef, holding, isIndicatorActive, prevKey, setIndicatorBgColor, setIsIndicatorActive, stepValue, x, y]);

	const handleOnKeyUp = useCallback(({keyCode}) => {
		if (is('down', keyCode)) {
			const hexColor = getHexColorFromGradient(canvasRef, x, y);
			selectedColorHandler(hexColor);
		} else if (is('up', keyCode)) {
			const hexColor = getHexColorFromGradient(canvasRef, x, y);
			selectedColorHandler(hexColor);
		} else if (is('left', keyCode)) {
			const hexColor = getHexColorFromGradient(canvasRef, x, y);
			selectedColorHandler(hexColor);
		} else if (is('right', keyCode)) {
			const hexColor = getHexColorFromGradient(canvasRef, x, y);
			selectedColorHandler(hexColor);
		}

		setHolding(false);
		setPrevKey('');
		setStepValue(1);
	}, [canvasRef, selectedColorHandler, x, y]);

	const handleSpotlightDown = useCallback(() => {
		if (isIndicatorActive && y + stepValue <= canvasRef.current.clientHeight - 1) {
			setY(y + stepValue);
		}
	}, [canvasRef, isIndicatorActive, setY, stepValue, y]);

	const handleSpotlightLeft = useCallback(() => {
		if (isIndicatorActive && x - stepValue >= 0) {
			setX(x - stepValue);
		}
	}, [isIndicatorActive, setX, stepValue, x]);

	const handleSpotlightRight = useCallback(() => {
		if (isIndicatorActive && x + stepValue <= canvasRef.current.clientWidth) {
			setX(x + stepValue);
		}
	}, [canvasRef, isIndicatorActive, setX, stepValue, x]);

	const handleSpotlightUp = useCallback(() => {
		if (isIndicatorActive && y - stepValue >= 0) {
			setY(y - stepValue);
		}
	}, [isIndicatorActive, setY, stepValue, y]);

	return (
		<SpottableDiv
			className={css.circleIndicator}
			onKeyDown={handleOnKeyDown}
			onKeyUp={handleOnKeyUp}
			onSpotlightDown={handleSpotlightDown}
			onSpotlightLeft={handleSpotlightLeft}
			onSpotlightRight={handleSpotlightRight}
			onSpotlightUp={handleSpotlightUp}
			spotlightDisabled={disabled}
			style={{
				left: x - 11,
				top: y - 11,
				backgroundColor: bgColor,
				transform: isIndicatorActive ? 'scale(1.2)' : null
			}}
		/>
	);
};

CircleIndicator.displayName = 'CircleIndicator';

CircleIndicator.propTypes = {
	/**
	 * Indicates the background color of the circle indicator.
	 *
	 * @type {String}
	 * @private
	 */
	bgColor: PropTypes.string,

	/**
	 * The canvas reference from the parent component.
	 * Used to extract HEX color from canvas.
	 *
	 * @type {Node}
	 * @private
	 */
	canvasRef: PropTypes.any,

	/**
	 * Applies a disabled style and prevents interacting with the component.
	 *
	 * @type {Boolean}
	 * @default false
	 * @private
	 */
	disabled: PropTypes.bool,

	/**
	 * Indicates whether the circle indicator is active.
	 *
	 * @type {Boolean}
	 * @private
	 */
	isIndicatorActive: PropTypes.bool,

	/**
	 * Called when the selected color is modified.
	 *
	 * @type {Function}
	 * @private
	 */
	selectedColorHandler: PropTypes.func,

	/**
	 * Called when bgColor is modified.
	 *
	 * @type {Function}
	 * @private
	 */
	setIndicatorBgColor: PropTypes.func,

	/**
	 * Called when indicator active status is modified.
	 *
	 * @type {Function}
	 * @private
	 */
	setIsIndicatorActive: PropTypes.func,

	/**
	 * Called when x coordinate of the indicator is modified.
	 *
	 * @type {Function}
	 * @private
	 */
	setX: PropTypes.func,

	/**
	 * Called when y coordinate of the indicator is modified.
	 *
	 * @type {Function}
	 * @private
	 */
	setY: PropTypes.func,

	/**
	 * Indicator's x-axis coordinate relative to the canvas.
	 *
	 * @type {Number}
	 * @private
	 */
	x: PropTypes.number,

	/**
	 * Indicator's y-axis coordinate relative to the canvas.
	 *
	 * @type {Number}
	 * @private
	 */
	y: PropTypes.number
};

export default CircleIndicator;
