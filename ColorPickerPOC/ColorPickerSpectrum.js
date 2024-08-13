import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useRef, useState} from 'react';

import {getHexColorFromGradient} from './utils';
import SpectrumIndicator from './SpectrumIndicator';

import css from './ColorPickerSpectrum.module.less';

const SpectrumColorPicker = (props) => {
	const {selectedColor, selectedColorHandler} = props;
	const canvasRef = useRef(null);
	const [indicatorX, setIndicatorX] = useState(0);
	const [indicatorY, setIndicatorY] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const [indicatorBgColor, setIndicatorBgColor] = useState('transparent');
	const [isIndicatorActive, setIsIndicatorActive] = useState(false);
	const [canvasHeight, setCanvasHeight] = useState(ri.scale(660));
	const [canvasWidth, setCanvasWidth] = useState(ri.scale(800));

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		const createColorGradient = (canvasElement, context) => {
			for (let i = 0; i < canvasElement.width; i++) {
				const luminosity = 1 - (i / canvasElement.width); // Max luminosity on the left, min luminosity on the right
				const gradient = context.createLinearGradient(0, 0, 0, canvasElement.height);
				gradient.addColorStop(0, `hsl(0, 100%, ${luminosity * 100}%)`); // Red
				gradient.addColorStop(1 / 6, `hsl(30, 100%, ${luminosity * 100}%)`); // Orange
				gradient.addColorStop(2 / 6, `hsl(60, 100%, ${luminosity * 100}%)`); // Yellow
				gradient.addColorStop(3 / 6, `hsl(120, 100%, ${luminosity * 100}%)`); // Green
				gradient.addColorStop(4 / 6, `hsl(180, 100%, ${luminosity * 100}%)`); // Blue
				gradient.addColorStop(5 / 6, `hsl(240, 100%, ${luminosity * 100}%)`); // Indigo
				gradient.addColorStop(1, `hsl(269, 100%, ${luminosity * 100}%)`); // Violet
				context.fillStyle = gradient;
				context.fillRect(i, 0, 1, canvasElement.height);
			}
		};
		createColorGradient(canvas, ctx);

		// Position the indicator on the canvas based on the selected color
		const positionIndicator = () => {
			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			for (let x = 0; x < canvas.width; x++) {
				for (let y = 0; y < canvas.height; y++) {
					const pixelIndex = (y * canvas.width * 4) + (x * 4);
					const pixelColor = `#${imageData.data[pixelIndex].toString(16).padStart(2, '0')}${imageData.data[pixelIndex + 1].toString(16).padStart(2, '0')}${imageData.data[pixelIndex + 2].toString(16).padStart(2, '0')}`;
					if (pixelColor === selectedColor) {
						setIndicatorX(x);
						setIndicatorY(y);
						return;
					} else {
						// if the color is not found, position the indicator at the origin(0, 0) of the canvas
						setIndicatorX(0);
						setIndicatorY(0);
					}
				}
			}
		};
		positionIndicator();

		const handleResize = () => {
			setCanvasHeight(canvas.parentElement.clientHeight);
			setCanvasWidth(canvas.parentElement.clientWidth);
		};

		window.addEventListener('resize', handleResize);
		handleResize();
	}, [canvasWidth, canvasHeight]); // eslint-disable-line react-hooks/exhaustive-deps

	const handleCanvasPointerDown = useCallback((e) => {
		const canvas = canvasRef.current;
		const rect = canvas.getBoundingClientRect();
		let x = e.clientX - rect.left;
		let y = e.clientY - rect.top;

		setIndicatorX(x);
		setIndicatorY(y);
		setIsDragging(true);

		const hexColor = getHexColorFromGradient(canvasRef, indicatorX, indicatorY);
		setIndicatorBgColor(hexColor);
		setIsIndicatorActive(false);
	}, [canvasRef, indicatorX, indicatorY, setIndicatorX, setIndicatorY, setIsDragging]);

	const handleCanvasPointerLeave = useCallback(() => {
		setIsDragging(false);

		const hexColor = getHexColorFromGradient(canvasRef, indicatorX, indicatorY);
		selectedColorHandler(hexColor);
		setIndicatorBgColor(hexColor);
	}, [canvasRef, indicatorX, indicatorY, setIsDragging, selectedColorHandler]);

	const handleCanvasPointerMove = useCallback((e) => {
		if (isDragging) {
			const canvas = canvasRef.current;
			const rect = canvas.getBoundingClientRect();
			let x = e.clientX - rect.left;
			let y = e.clientY - rect.top;

			setIndicatorX(x);
			setIndicatorY(y);

			const hexColor = getHexColorFromGradient(canvasRef, indicatorX, indicatorY);
			setIndicatorBgColor(hexColor);
		}
	}, [canvasRef, indicatorX, indicatorY, isDragging]);

	const handleCanvasPointerUp = useCallback(() => {
		const hexColor = getHexColorFromGradient(canvasRef, indicatorX, indicatorY);
		selectedColorHandler(hexColor);
		setIndicatorBgColor(hexColor);
		setIsDragging(false);
	}, [canvasRef, indicatorX, indicatorY, setIsDragging, selectedColorHandler]);

	return (
		<div className={css.colorPicker}>
			<canvas
				className={css.gradientCanvas}
				id="canvas"
				ref={canvasRef}
				height={canvasHeight}
				onPointerDown={handleCanvasPointerDown}
				onPointerLeave={handleCanvasPointerLeave}
				onPointerMove={handleCanvasPointerMove}
				onPointerUp={handleCanvasPointerUp}
				width={canvasWidth}
			/>
			<SpectrumIndicator
				bgColor={indicatorBgColor}
				canvasRef={canvasRef}
				isIndicatorActive={isIndicatorActive}
				selectedColorHandler={selectedColorHandler}
				setIsIndicatorActive={setIsIndicatorActive}
				setIndicatorBgColor={setIndicatorBgColor}
				setX={setIndicatorX}
				setY={setIndicatorY}
				x={indicatorX}
				y={indicatorY}
			/>
		</div>
	);
};

SpectrumColorPicker.displayName = 'SpectrumColorPicker';
SpectrumColorPicker.propTypes = {
	selectedColor: PropTypes.string,
	selectedColorHandler: PropTypes.func
};

export default SpectrumColorPicker;
