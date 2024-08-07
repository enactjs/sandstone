import {is} from '@enact/core/keymap';
import Spottable from '@enact/spotlight/Spottable';
import spotlight from '@enact/spotlight';
import PropTypes from 'prop-types';
import {useCallback, useEffect} from 'react';

import {getHexColorFromGradient} from './utils';

import css from './ColorPickerSpectrum.module.less';

const SpottableDiv = Spottable('div');

const CircleIndicator = ({bgColor, canvasRef, isIndicatorActive, selectedColorHandler, setIsIndicatorActive, setIndicatorBgColor, setX, setY, x, y}) => {

	// resume spotlight when indicator is not active
	useEffect(() => {
		if (!isIndicatorActive) {
			spotlight.resume();
		}
	}, [isIndicatorActive]);

	const handleOnKeyDown = useCallback(({keyCode}) => {
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
	}, [canvasRef, x, y, isIndicatorActive, setIsIndicatorActive, setIndicatorBgColor]);

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
	}, [canvasRef, selectedColorHandler, x, y]);

	const handleSpotlightDown = useCallback(() => {
		if (isIndicatorActive && y < canvasRef.current.clientHeight - 1) {
			setY(y++);
		}
	}, [canvasRef, isIndicatorActive, setY, y]);

	const handleSpotlightLeft = useCallback(() => {
		if (isIndicatorActive && x > 0) {
			setX(x--);
		}
	}, [isIndicatorActive, setX, x]);

	const handleSpotlightRight = useCallback(() => {
		if (isIndicatorActive && x < canvasRef.current.clientWidth) {
			setX(x++);
		}
	}, [canvasRef, isIndicatorActive, setX, x]);

	const handleSpotlightUp = useCallback(() => {
		if (isIndicatorActive && y > 0) {
			setY(y--);
		}
	}, [isIndicatorActive, setY, y]);

	return (
		<SpottableDiv
			className={css.circleIndicator}
			onKeyDown={handleOnKeyDown}
			onKeyUp={handleOnKeyUp}
			onSpotlightDown={handleSpotlightDown}
			onSpotlightLeft={handleSpotlightLeft}
			onSpotlightRight={handleSpotlightRight}
			onSpotlightUp={handleSpotlightUp}
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
	bgColor: PropTypes.string,
	canvasRef: PropTypes.any,
	isIndicatorActive: PropTypes.bool,
	selectedColorHandler: PropTypes.func,
	setIndicatorBgColor: PropTypes.func,
	setIsIndicatorActive: PropTypes.func,
	setX: PropTypes.func,
	setY: PropTypes.func,
	x: PropTypes.number,
	y: PropTypes.number
};

export default CircleIndicator;
