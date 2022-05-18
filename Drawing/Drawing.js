/* eslint-disable react-hooks/rules-of-hooks, babel/no-unused-expressions, react-hooks/exhaustive-deps */

/**
 * Sandstone styled drawing components and behaviors.
 *
 * @example
 * <Drawing />
 *
 * @module sandstone/Drawing
 * @exports Drawing
 * @exports DrawingBase
 * @exports DrawingDecorator
 */

import kind from '@enact/core/kind';
import EnactPropTypes from '@enact/core/internal/prop-types';
import ComponentOverride from '@enact/ui/ComponentOverride';
import {Drawing as UiDrawing} from '@enact/ui/Drawing';
import {Cell, Column, Layout, Row} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useRef, useState} from 'react';

import Scroller from '../Scroller';
import Skinnable from '../Skinnable';

import DrawingControls from './DrawingControls';
import DrawingUtils from './DrawingUtils';

import css from './Drawing.module.less';

/**
 * A drawing component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [Drawing]{@link sandstone/Drawing.Drawing}.
 *
 * @class DrawingBase
 * @memberof sandstone/Drawing
 * @extends ui/Drawing.DrawingBase
 * @ui
 * @public
 */
const DrawingBase = kind({
	name: 'Drawing',

	functional: true,

	propTypes: /** @lends sandstone/Drawing.DrawingBase.prototype */ {
		/**
		 * Sets the color of brush.
		 *
		 * @type {String}
		 * @default #545BCC
		 * @public
		 */
		brushColor: PropTypes.string,

		/**
		 * Sets the size of brush.
		 *
		 * @type {Number}
		 * @default 5
		 * @public
		 */
		brushSize: PropTypes.number,

		/**
		 * Sets the color of canvas.
		 *
		 * @type {String}
		 * @default #FFFFFF
		 * @public
		 */
		canvasColor: PropTypes.string,

		/**
		 * Sets the height of canvas.
		 *
		 * @type {Number}
		 * @default 800
		 * @public
		 */
		canvasHeight: PropTypes.number,

		/**
		 * Sets the width of canvas.
		 *
		 * @type {Number}
		 * @default 1200
		 * @public
		 */
		canvasWidth: PropTypes.number,

		/**
		 * Applies the `disabled` class.
		 *
		 * When `true`, the canvas is shown as disabled.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Overrides the default Drawing control component to support customized behaviors.
		 *
		 * The provided component will receive the following props from `Drawing`:
		 *
		 * * `brushColor` - Color used for brush
		 * * `brushSize` - Value used for brush size
		 * * `canvasColor` - Color of canvas
		 * * `disabled` - Disables drawing controls
		 * * `fillColor` - Color used when `drawingTool=fill`
		 * * `setBrushColor` - Called when `brushColor` is changed
		 * * `setBrushSize` - Called when `brushSize` is changed
		 * * `setDrawingTool` - Called when `drawingTool` is changed
		 * * `setFillColor` - Called when `fillColor` is changed
		 *
		 * @type {Component|Element}
		 * @default sandstone/Drawing.DrawingControls
		 * @public
		 */
		drawingControlsComponent: EnactPropTypes.componentOverride,

		/**
		 * Sets the tool of drawing.
		 *
		 * Accepts one of the following drawing tools: `'brush'`, `'fill'`, `'triangle'`, `'rectangle'`, `'circle'`, `'erase'`.
		 *
		 * @type {('brush'|'fill'|'triangle'|'rectangle'|'circle'|'erase')}
		 * @default brush
		 * @public
		 */
		drawingTool: PropTypes.oneOf(['brush', 'fill', 'triangle', 'rectangle', 'circle', 'erase']),

		/**
		 * Overrides the default Drawing utils component to support customized behaviors.
		 *
		 * The provided component will receive the following props from `Drawing`:
		 *
		 * * `backgroundImage` - Sets an image as canvas background
		 * * `disabled` - Disables drawing utils
		 * * `drawingRef` - Reference of drawing
		 * * `fileInputHandler` - Called when user selects an image as canvas background
		 * * `setBackgroundImage` - Called when the background of canvas is changed
		 *
		 * @type {Component|Element}
		 * @default sandstone/Drawing.DrawingUtils
		 * @public
		 */
		drawingUtilsComponent: EnactPropTypes.componentOverride,

		/**
		 * Sets the color of fill.
		 *
		 * @type {String}
		 * @default #D0BB22
		 * @public
		 */
		fillColor: PropTypes.string,

		/**
		 * Displays the drawing controls.
		 *
		 * When `true`, the drawing controls is displayed.
		 *
		 * @type {Boolean}
		 * @default true
		 * @public
		 */
		showDrawingControls: PropTypes.bool,

		/**
		 * Displays the drawing utils.
		 *
		 * When `true`, the drawing utils is displayed.
		 *
		 * @type {Boolean}
		 * @default true
		 * @public
		 */
		showDrawingUtils: PropTypes.bool
	},

	defaultProps: {
		brushColor: '#545BCC',
		brushSize: 5,
		canvasColor: '#FFFFFF',
		canvasHeight: 800,
		canvasWidth: 1200,
		disabled: false,
		drawingControlsComponent: DrawingControls,
		drawingTool: 'brush',
		drawingUtilsComponent: DrawingUtils,
		fillColor: '#D0BB22',
		showDrawingControls: true,
		showDrawingUtils: true
	},

	handlers: {
		fileInputHandler: async ({backgroundImage, ev, setBackgroundImage}) => {
			const imageTypes = ['image/gif', 'image/jpeg', 'image/png'];
			const file = ev.target.files[0];
			const fileReader = new window.FileReader();
			const fileIsImage = file && imageTypes.includes(file['type']);

			fileReader.onload = async () => {
				if (!fileIsImage || ev.target.files.length === 0) return backgroundImage;
				setBackgroundImage(fileReader.result);
			};

			try {
				fileReader.readAsDataURL(file);
			} catch (err) {
				// failing silently
			}
		}
	},

	computed: {
		className: ({disabled, styler}) => styler.append({disabled})
	},

	styles: {
		css,
		className: 'drawing',
		publicClassNames: true
	},

	render: ({
		brushColor,
		brushSize,
		canvasColor,
		canvasHeight,
		canvasWidth,
		disabled,
		drawingControlsComponent,
		drawingTool,
		drawingUtilsComponent,
		fillColor,
		fileInputHandler,
		showDrawingControls,
		showDrawingUtils,
		...rest
	}) => {
		const [backgroundImage, setBackgroundImage] = useState(null);
		const [brushColorIndex, setBrushColorIndex] = useState(null);
		const [brushColorValue, setBrushColorValue] = useState(brushColor);
		const [brushSizeValue, setBrushSizeValue] = useState(brushSize);
		const [canvasColorIndex, setCanvasColorIndex] = useState(null);
		const [canvasColorValue, setCanvasColorValue] = useState(canvasColor);
		const [drawingToolValue, setDrawingToolValue] = useState(drawingTool);
		const [fillColorIndex, setFillColorIndex] = useState(null);
		const [fillColorValue, setFillColorValue] = useState(fillColor);
		const drawingRef = useRef();

		useEffect(() => {
			setBrushColorValue(brushColor);
			!showDrawingControls && window.localStorage.setItem('lastBrushColor', JSON.stringify(brushColor));
		}, [brushColor]);

		useEffect(() => {
			setBrushSizeValue(brushSize);
		}, [brushSize]);

		useEffect(() => {
			setDrawingToolValue(drawingTool);
		}, [drawingTool]);

		useEffect(() => {
			setFillColorValue(fillColor);
			!showDrawingControls && window.localStorage.setItem('lastFillColor', JSON.stringify(fillColor));
		}, [fillColor]);

		useEffect(() => {
			setCanvasColorValue(canvasColor);
			!showDrawingControls && window.localStorage.setItem('lastCanvasColor', JSON.stringify(canvasColor));
		}, [canvasColor]);

		useEffect(() => {
			const storedBrushColors = JSON.parse(window.localStorage.getItem('brushColors'));
			const storedCanvasColors = JSON.parse(window.localStorage.getItem('canvasColors'));
			const storedFillColors = JSON.parse(window.localStorage.getItem('fillColors'));
			const defaultColors = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF'];

			if (!storedBrushColors) {
				window.localStorage.setItem('brushColors', JSON.stringify(defaultColors));
			}
			if (!storedCanvasColors) {
				window.localStorage.setItem('canvasColors', JSON.stringify(defaultColors));
			}
			if (!storedFillColors) {
				window.localStorage.setItem('fillColors', JSON.stringify(defaultColors));
			}
		}, []);

		useEffect(() => {
			const lastBrushColor = JSON.parse(window.localStorage.getItem('lastBrushColor'));
			const lastCanvasColor = JSON.parse(window.localStorage.getItem('lastCanvasColor'));
			const lastFillColor = JSON.parse(window.localStorage.getItem('lastFillColor'));

			if (!lastBrushColor) {
				window.localStorage.setItem('lastBrushColor', JSON.stringify(brushColor));
			}

			if (!lastCanvasColor) {
				window.localStorage.setItem('lastCanvasColor', JSON.stringify(canvasColor));
			}

			if (!lastFillColor) {
				window.localStorage.setItem('lastFillColor', JSON.stringify(fillColor));
			}

			if (lastBrushColor && lastFillColor && lastCanvasColor) {
				setBrushColorValue(lastBrushColor);
				setCanvasColorValue(lastCanvasColor);
				setFillColorValue(lastFillColor);
			}
		}, [brushColor, canvasColor, fillColor]);

		const setBrushColorAndIndex = useCallback((color, index) => {
			setBrushColorValue(color);
			setBrushColorIndex(index);
			window.localStorage.setItem('lastBrushColor', JSON.stringify(color));
		}, []);

		const setCanvasColorAndIndex = useCallback((color, index) => {
			setCanvasColorValue(color);
			setCanvasColorIndex(index);
			window.localStorage.setItem('lastCanvasColor', JSON.stringify(color));
		}, []);

		const setFillColorAndIndex = useCallback((color, index) => {
			setFillColorValue(color);
			setFillColorIndex(index);
			window.localStorage.setItem('lastFillColor', JSON.stringify(color));
		}, []);

		return (
			<Scroller>
				<Layout {...rest}>
					<Cell className={css.toolbar} shrink size="15%">
						{showDrawingControls ? (
							<ComponentOverride
								brushColor={brushColorValue}
								brushColorIndex={brushColorIndex}
								brushSize={brushSizeValue}
								canvasColor={canvasColorValue}
								canvasColorIndex={canvasColorIndex}
								component={drawingControlsComponent}
								disabled={disabled}
								fillColor={fillColorValue}
								fillColorIndex={fillColorIndex}
								setBrushColorAndIndex={setBrushColorAndIndex}
								setBrushSize={setBrushSizeValue}
								setCanvasColorAndIndex={setCanvasColorAndIndex}
								setDrawingTool={setDrawingToolValue}
								setFillColorAndIndex={setFillColorAndIndex}
							/>
						) :
							null
						}
					</Cell>
					<Cell>
						<Row>
							<UiDrawing
								{...rest}
								backgroundImage={backgroundImage}
								brushColor={brushColorValue}
								brushSize={brushSizeValue}
								canvasColor={canvasColorValue}
								canvasHeight={canvasHeight}
								canvasWidth={canvasWidth}
								disabled={disabled}
								drawingTool={drawingToolValue}
								fillColor={fillColorValue}
								ref={drawingRef}
							/>
						</Row>
					</Cell>
					<Cell shrink size="10%">
						<Column align="center space-between" className={css.canvasOptions}>
							{showDrawingUtils ? (
								<ComponentOverride
									backgroundImage={backgroundImage}
									component={drawingUtilsComponent}
									disabled={disabled}
									drawingRef={drawingRef}
									fileInputHandler={fileInputHandler}
									setBackgroundImage={setBackgroundImage}
								/>
							) :
								null
							}
						</Column>
					</Cell>
				</Layout>
			</Scroller>
		);
	}
});

/**
 * A drawing component, ready to use in Sandstone applications.
 *
 * Usage:
 * ```
 * <Drawing
 * 	brushColor="#545BCC"
 * 	brushSize={5}
 * 	canvasColor="#FFFFFF"
 * 	canvasHeight={800}
 * 	canvasWidth={1200}
 * 	drawingTool="brush"
 * />
 * ```
 *
 * @class Drawing
 * @memberof sandstone/Drawing
 * @extends sandstone/Drawing.DrawingBase
 * @mixes sandstone/Skinnable.Skinnable
 * @ui
 * @public
 */
const Drawing = Skinnable(DrawingBase);

export default Drawing;
export {
	Drawing,
	DrawingBase
};
