import {is} from '@enact/core/keymap';
import spotlight from '@enact/spotlight';
import Spottable from '@enact/spotlight/Spottable';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useState} from 'react';

import {getHexColorFromGradient} from './utils';

import css from './ColorPickerSpectrum.module.less';

const SpottableDiv = Spottable('div');

const CircleIndicator = ({bgColor, canvasRef, isIndicatorActive, selectedColorHandler, setIsIndicatorActive, setIndicatorBgColor, setX, setY, x, y}) => {
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
