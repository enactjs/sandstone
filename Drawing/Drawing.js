/* eslint-disable react-hooks/rules-of-hooks */

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
import compose from 'ramda/src/compose';
import {useEffect, useRef, useState} from 'react';

import DrawingControls from './DrawingControls';
import DrawingUtils from './DrawingUtils';
import Scroller from '../Scroller';
import Skinnable from '../Skinnable';

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
		 * @type {String}
		 * @default brush
		 * @public
		 */
		drawingTool: PropTypes.string,

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
		 * @default false
		 * @public
		 */
		showDrawingControls: PropTypes.bool,

		/**
		 * Displays the drawing utils.
		 *
		 * When `true`, the drawing utils is displayed.
		 *
		 * @type {Boolean}
		 * @default false
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
		showDrawingControls: false,
		showDrawingUtils: false
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
		const [brushColorValue, setBrushColorValue] = useState(brushColor);
		const [brushSizeValue, setBrushSizeValue] = useState(brushSize);
		const [canvasColorValue, setCanvasColorValue] = useState(canvasColor);
		const [drawingToolValue, setDrawingToolValue] = useState(drawingTool);
		const [fillColorValue, setFillColorValue] = useState(fillColor);
		const drawingRef = useRef();

		useEffect(() => {
			setBrushSizeValue(brushSize);
		}, [brushSize]);

		useEffect(() => {
			setDrawingToolValue(drawingTool);
		}, [drawingTool]);

		useEffect(() => {
			setBrushColorValue(brushColor);
		}, [brushColor]);

		useEffect(() => {
			setFillColorValue(fillColor);
		}, [fillColor]);

		useEffect(() => {
			setCanvasColorValue(canvasColor);
		}, [canvasColor]);

		return (
			<Scroller>
				<Layout {...rest}>
					<Cell className={css.toolbar} shrink size="15%">
						{showDrawingControls ? (
							<ComponentOverride
								brushColor={brushColor}
								brushSize={brushSizeValue}
								canvasColor={canvasColor}
								component={drawingControlsComponent}
								disabled={disabled}
								fillColor={fillColor}
								setBrushColor={setBrushColorValue}
								setBrushSize={setBrushSizeValue}
								setCanvasColor={setCanvasColorValue}
								setDrawingTool={setDrawingToolValue}
								setFillColor={setFillColorValue}
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
 * Applies Sandstone specific behaviors to [Drawing]{@link sandstone/Drawing.DrawingBase} components.
 *
 * @hoc
 * @memberof sandstone/Drawing
 * @mixes ui/Toggleable.Toggleable
 * @mixes sandstone/Skinnable.Skinnable
 * @public
 */
const DrawingDecorator = compose(
	Skinnable
);

/**
 * A drawing component, ready to use in Sandstone applications.
 *
 * Usage:
 * ```
 * <Drawing
 * 	brushColor="#545BCC"
 * 	brushSize={5}
 * 	canvasColor="#FFFFFF"
 * 	drawingTool="brush"
 * />
 * ```
 *
 * @class Drawing
 * @memberof sandstone/Drawing
 * @extends sandstone/Drawing.DrawingBase
 * @mixes sandstone/Drawing.DrawingDecorator
 * @ui
 * @public
 */
const Drawing = DrawingDecorator(DrawingBase);

export default Drawing;
export {
	Drawing,
	DrawingBase,
	DrawingDecorator
};
