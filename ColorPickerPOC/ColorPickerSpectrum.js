// import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import compose from 'ramda/src/compose';
import {useCallback, useEffect, useRef, useState} from 'react';

import {spectrumRgbToHex} from './utils';
import SpectrumIndicator from './SpectrumIndicator';

import css from './ColorPickerSpectrum.module.less';

const SpectrumColorPickerBase = (props) => {
	const {selectedColor, selectedColorHandler} = props;
	const canvasRef = useRef(null);
	const [indicatorX, setIndicatorX] = useState(0);
	const [indicatorY, setIndicatorY] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const [indicatorBgColor, setIndicatorBgColor] = useState('transparent');
	const [isIndicatorActive, setIsIndicatorActive] = useState(false);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		const createColorGradient = (canvas, ctx) => {
			for(let i = 0; i < canvas.width; i++) {
				const luminosity = 1 - (i / canvas.width); // Max luminosity on the left, min luminosity on the right
				const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
				gradient.addColorStop(0, `hsl(0, 100%, ${luminosity * 100}%)`); // Red
				gradient.addColorStop(1/6, `hsl(30, 100%, ${luminosity * 100}%)`); // Orange
				gradient.addColorStop(2/6, `hsl(60, 100%, ${luminosity * 100}%)`); // Yellow
				gradient.addColorStop(3/6, `hsl(120, 100%, ${luminosity * 100}%)`); // Green
				gradient.addColorStop(4/6, `hsl(180, 100%, ${luminosity * 100}%)`); // Blue
				gradient.addColorStop(5/6, `hsl(240, 100%, ${luminosity * 100}%)`); // Indigo
				gradient.addColorStop(1, `hsl(269, 100%, ${luminosity * 100}%)`); // Violet
				ctx.fillStyle = gradient;
				ctx.fillRect(i, 0, 1, canvas.height);
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
	}, []);

	const handleCanvasPointerDown = useCallback((e) => {
		const canvas = canvasRef.current;
		const rect = canvas.getBoundingClientRect();
		let x = e.clientX - rect.left;
		let y = e.clientY - rect.top;

		setIndicatorX(x);
		setIndicatorY(y);
		setIsDragging(true);

		const ctx = canvas.getContext('2d');
		const imageData = ctx.getImageData(x, y, 1, 1);
		const hexColor = spectrumRgbToHex(imageData.data[0], imageData.data[1], imageData.data[2]);
		setIndicatorBgColor(hexColor);
		setIsIndicatorActive(false);
	}, [canvasRef, setIndicatorX, setIndicatorY, setIsDragging, spectrumRgbToHex]);

	const handleCanvasPointerLeave = useCallback((e) => {
		setIsDragging(false);

		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		const imageData = ctx.getImageData(indicatorX, indicatorY, 1, 1);
		const hexColor = spectrumRgbToHex(imageData.data[0], imageData.data[1], imageData.data[2]);
		selectedColorHandler(hexColor);
		setIndicatorBgColor(hexColor);
	}, [canvasRef, indicatorX, indicatorY, setIsDragging, selectedColorHandler, spectrumRgbToHex]);

	const handleCanvasPointerMove = useCallback((e) => {
		if (isDragging) {
			const canvas = canvasRef.current;
			const rect = canvas.getBoundingClientRect();
			let x = e.clientX - rect.left;
			let y = e.clientY - rect.top;

			setIndicatorX(x);
			setIndicatorY(y);

			const ctx = canvas.getContext('2d');
			const imageData = ctx.getImageData(indicatorX, indicatorY, 1, 1);
			const hexColor = spectrumRgbToHex(imageData.data[0], imageData.data[1], imageData.data[2]);
			setIndicatorBgColor(hexColor);
		}
	}, [canvasRef, indicatorX, indicatorY, isDragging, selectedColorHandler, spectrumRgbToHex]);

	const handleCanvasPointerUp = useCallback(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		const imageData = ctx.getImageData(indicatorX, indicatorY, 1, 1);
		const hexColor = spectrumRgbToHex(imageData.data[0], imageData.data[1], imageData.data[2]);
		selectedColorHandler(hexColor);
		setIndicatorBgColor(hexColor);
		setIsDragging(false);
	}, [canvasRef, indicatorX, indicatorY, setIsDragging, selectedColorHandler, spectrumRgbToHex]);

	return (
		<div className={css.colorPicker}>
			<canvas
				ref={canvasRef}
				height={400}
				onPointerDown={handleCanvasPointerDown}
				onPointerLeave={handleCanvasPointerLeave}
				onPointerMove={handleCanvasPointerMove}
				onPointerUp={handleCanvasPointerUp}
				style={{touchAction: 'none'}}
				width={400}
			/>
			<SpectrumIndicator
				bgColor={indicatorBgColor}
				canvasRef={canvasRef}
				isIndicatorActive={isIndicatorActive}
				setIsIndicatorActive={setIsIndicatorActive}
				setIndicatorX={setIndicatorX}
				setIndicatorY={setIndicatorY}
				x={indicatorX}
				y={indicatorY}
			/>
		</div>
	);
};

// const SpectrumColorPickerDecorator = compose(
// 	// SpotlightContainerDecorator
// );
//
// const SpectrumColorPicker = SpectrumColorPickerDecorator(SpectrumColorPickerBase);

export default SpectrumColorPickerBase;
