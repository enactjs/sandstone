/* eslint-disable react-hooks/rules-of-hooks, react/jsx-no-bind */

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
import {useRef, useState, useEffect} from 'react';

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
		drawingControlsComponent: EnactPropTypes.componentOverride,
		showDrawingControls: PropTypes.bool,
		drawingUtilsComponent: EnactPropTypes.componentOverride,
		showDrawingUtils: PropTypes.bool,
		brushSize: PropTypes.number,
		drawingTool: PropTypes.string,
		brushColor: PropTypes.string,
		fillColor: PropTypes.string,
		canvasColor: PropTypes.string
	},

	defaultProps: {
		canvasHeight: 800,
		canvasWidth: 1200,
		disabled: false,
		drawingControlsComponent: DrawingControls,
		showDrawingControls: false,
		drawingUtilsComponent: DrawingUtils,
		showDrawingUtils: false,
		brushSize: 5,
		drawingTool: 'brush',
		brushColor: '#545BCC',
		fillColor: '#D0BB22',
		canvasColor: '#FFFFFF'
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
		drawingUtilsComponent,
		drawingTool,
		fileInputHandler,
		fillColor,
		handleSelect,
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
								component={drawingControlsComponent}
								disabled={disabled}
								brushSize={brushSizeValue}
								setBrushSize={setBrushSizeValue}
								setDrawingTool={setDrawingToolValue}
								brushColor={brushColor}
								setBrushColor={setBrushColorValue}
								fillColor={fillColor}
								setFillColor={setFillColorValue}
								canvasColor={canvasColor}
								setCanvasColor={setCanvasColorValue}
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
							{showDrawingUtils ?
								(
									<ComponentOverride
										component={drawingUtilsComponent}
										disabled={disabled}
										drawingRef={drawingRef}
										fileInputHandler={fileInputHandler}
										backgroundImage={backgroundImage}
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
 * <Drawing />
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
