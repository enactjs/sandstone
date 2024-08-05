import {is} from '@enact/core/keymap';
import Spottable from '@enact/spotlight/Spottable';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import spotlight from '@enact/spotlight';
import compose from 'ramda/src/compose';
import {useEffect, useState} from 'react';

import css from './ColorPickerSpectrum.module.less';

const SpottableDiv = Spottable('div');

const CircleIndicatorBase = ({bgColor, canvasRef, isIndicatorActive, setIsIndicatorActive, setIndicatorX, setIndicatorY, x, y}) => {
	const [xIndicator, setXIndicator] = useState(x);
	const [yIndicator, setYIndicator] = useState(y);

	useEffect(() => {
		setXIndicator(x);
		setYIndicator(y);
	}, [x, y])

	// resume spotlight when indicator is not active
	useEffect(() => {
		if (!isIndicatorActive) {
			spotlight.resume();
		}
	}, [isIndicatorActive]);

	// set indicator in active state and pause spotlight so no other containers get focus when selecting a color with 5-way
	const handleOnKeyDown = ({keyCode}) => {
		if (is('enter', keyCode)) {
			setIsIndicatorActive(!isIndicatorActive);
			spotlight.pause();
		}
	};

	const handleSpotlightDown = () => {
		if (isIndicatorActive && yIndicator < canvasRef.current.clientHeight) {
			setYIndicator(y++);
			setIndicatorY(y++);
		}
	};

	const handleSpotlightLeft = () => {
		if (isIndicatorActive && xIndicator >= 0) {
			setXIndicator(x--);
			setIndicatorX(x--);
		}
	};

	const handleSpotlightRight = () => {
		if (isIndicatorActive && xIndicator < canvasRef.current.clientWidth) {
			setXIndicator(x++);
			setIndicatorX(x++);
		}
	};

	const handleSpotlightUp = () => {
		if (isIndicatorActive && yIndicator >= 0) {
			setYIndicator(y--);
			setIndicatorY(y--);
		}
	};

	return (
		<SpottableDiv className={css.circleIndicator}
			onKeyDown={handleOnKeyDown}
			onSpotlightDown={handleSpotlightDown}
			onSpotlightLeft={handleSpotlightLeft}
			onSpotlightRight={handleSpotlightRight}
			onSpotlightUp={handleSpotlightUp}
			style={{
				left: xIndicator - 11,
				top: yIndicator - 11,
				backgroundColor: bgColor,
				transform: isIndicatorActive ? 'scale(1.2)' : null
			}}
		/>
	);
};

const CircleIndicatorDecorator = compose(
	SpotlightContainerDecorator
);

const CircleIndicator = CircleIndicatorDecorator(CircleIndicatorBase);

export default CircleIndicator;
