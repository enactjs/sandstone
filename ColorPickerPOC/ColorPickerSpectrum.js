import ri from '@enact/ui/resolution';
import Spottable from '@enact/spotlight/Spottable';
import {useCallback, useEffect, useRef, useState} from 'react';

import css from './ColorPickerSpectrum.module.less';

const CircleIndicatorBase = ({bgColor, x, y}) => {
	return (
		<div className={css.circleIndicator}
			 style={{
				 position: 'absolute',
				 left: x-11,
				 top: y-11,
				 width: 21,
				 height: 21,
				 borderRadius: 99,
				 border: '2px solid #808080',
				 backgroundColor: bgColor,
				 pointerEvents: 'none',
			 }}
		/>
	);
};

const SpottableCircleIndicator = Spottable(CircleIndicatorBase);

const SpectrumColorPicker = (props) => {
	const {selectedColorHandler} = props;
	const canvasRef = useRef(null);
	const [indicatorX, setIndicatorX] = useState(0);
	const [indicatorY, setIndicatorY] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const [indicatorBgColor, setIndicatorBgColor] = useState('transparent');

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		const createColorGradient = (canvas, ctx) => {
			for(let i = 0; i < canvas.width; i+= 0.2) {
				const luminosity = 1 - (i / canvas.width); // Adjust the luminosity calculation
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
	}, []);

	const rgbToHex = useCallback((r, g, b) => '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join(''), []);

	const handleCanvasPointerDown = useCallback((e) => {
		const canvas = canvasRef.current;
		const rect = canvas.getBoundingClientRect();
		let x = e.clientX - rect.left;
		let y = e.clientY - rect.top;

		setIndicatorX(x);
		setIndicatorY(y);
		setIsDragging(true);
	}, [canvasRef, setIndicatorX, setIndicatorY, setIsDragging]);

	const handleCanvasPointerLeave = useCallback((e) => {
		setIsDragging(false);

		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		const imageData = ctx.getImageData(indicatorX, indicatorY, 1, 1);
		const hexColor = rgbToHex(imageData.data[0], imageData.data[1], imageData.data[2]);
		selectedColorHandler(hexColor);
	}, [canvasRef, indicatorX, indicatorY, setIsDragging, selectedColorHandler, rgbToHex]);

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
			const hexColor = rgbToHex(imageData.data[0], imageData.data[1], imageData.data[2]);
			setIndicatorBgColor(hexColor);
			// console.log('here');
			// selectedColorHandler(hexColor);
		}
	}, [canvasRef, indicatorX, indicatorY, isDragging, selectedColorHandler, rgbToHex]);

	const handleCanvasPointerUp = useCallback(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		const imageData = ctx.getImageData(indicatorX, indicatorY, 1, 1);
		console.log('x', indicatorX, 'y', indicatorY);
		const hexColor = rgbToHex(imageData.data[0], imageData.data[1], imageData.data[2]);
		console.log(hexColor)
		selectedColorHandler(hexColor);
		setIsDragging(false);
	}, [canvasRef, indicatorX, indicatorY, setIsDragging, selectedColorHandler, rgbToHex]);

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
			<SpottableCircleIndicator bgColor={indicatorBgColor} x={indicatorX} y={indicatorY} />
		</div>
	);
};

export default SpectrumColorPicker;
