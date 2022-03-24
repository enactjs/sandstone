/* eslint-disable react/jsx-no-bind */

import kind from '@enact/core/kind';
import Group from '@enact/ui/Group';
import {Cell} from '@enact/ui/Layout';
import PropTypes from 'prop-types';

import Button from '../Button';
import BodyText from '../BodyText';
import Slider from '../Slider';

import ColorPicker from './ColorPicker';

import css from './DrawingControls.module.less';

/**
 * A set of components for controlling drawing toolbar and rendering additional components.
 *
 * @class DrawingControls
 * @memberof sandstone/Drawing
 * @ui
 * @private
 */
const DrawingControls = kind({
	name: 'DrawingControls',

	propTypes: /** @lends sandstone/Drawing.DrawingControls.prototype */ {
		/**
		 * Sets the color of brush.
		 *
		 * @type {String}
		 */
		brushColor: PropTypes.string,

		/**
		 * Current index of brush color from local storage.
		 *
		 * @type {Number}
		 */
		brushColorIndex: PropTypes.number,

		/**
		 * Sets the size of brush.
		 *
		 * @type {Number}
		 */
		brushSize: PropTypes.number,

		/**
		 * Sets the color of canvas.
		 *
		 * @type {String}
		 */
		canvasColor: PropTypes.string,

		/**
		 * Current index of canvas color from local storage.
		 *
		 * @type {Number}
		 */
		canvasColorIndex: PropTypes.number,

		/**
		 * Applies the `disabled` class.
		 *
		 * When `true`, the canvas is shown as disabled.
		 *
		 * @type {Boolean}
		 */
		disabled: PropTypes.bool,

		/**
		 * Sets the color of fill.
		 *
		 * @type {String}
		 */
		fillColor: PropTypes.string,

		/**
		 * Current index of fill color from local storage.
		 *
		 * @type {Number}
		 */
		fillColorIndex: PropTypes.number,

		/**
		 * Called when a new brush color is saved to local storage.
		 *
		 * @type {Function}
		 */
		setBrushColorAndIndex: PropTypes.func,

		/**
		 * Called when `brushSize` changes.
		 *
		 * @type {Function}
		 */
		setBrushSize: PropTypes.func,

		/**
		 * Called when a new canvas color is saved to local storage.
		 *
		 * @type {Function}
		 */
		setCanvasColorAndIndex: PropTypes.func,

		/**
		 * Called when `drawingTool` changes.
		 *
		 * @type {Function}
		 */
		setDrawingTool: PropTypes.func,

		/**
		 * Called when a new fill color is saved to local storage.
		 *
		 * @type {Function}
		 */
		setFillColorAndIndex: PropTypes.func
	},

	styles: {
		css,
		className: 'drawingControls'
	},

	handlers: {
		handleSelect: (ev) => {
			const e = ev?.event;
			const setDrawingTool = ev?.setDrawingTool;
			setDrawingTool(e.data);
		}
	},

	render: ({
		brushColor,
		brushColorIndex,
		brushSize,
		canvasColor,
		canvasColorIndex,
		disabled,
		fillColor,
		fillColorIndex,
		handleSelect,
		setBrushColorAndIndex,
		setBrushSize,
		setCanvasColorAndIndex,
		setDrawingTool,
		setFillColorAndIndex,
		...rest
	}) => {
		const drawingTools = [
			{icon: 'edit', key: 1, tooltipText: 'brush'},
			{icon: 'heart', key: 2, tooltipText: 'fill'},
			{icon: 'play', key: 3, tooltipText: 'triangle'},
			{icon: 'popupscale', key: 4, tooltipText: 'rectangle'},
			{icon: 'newfeature', key: 5, tooltipText: 'circle'},
			{icon: 'square', key: 6, tooltipText: 'erase'}
		];

		return (
			<div {...rest}>
				<Cell>
					<BodyText css={css} disabled={disabled}>Drawing tools</BodyText>
					<Group
						childComponent={Button}
						childProp="tooltipText"
						className={css.drawingTools}
						defaultSelected={0}
						itemProps={{
							disabled: disabled,
							size: 'small'
						}}
						onSelect={(event) => handleSelect({event, setDrawingTool})}
						select={'radio'}
						selectedProp="selected"
					>
						{drawingTools}
					</Group>
				</Cell>
				<Cell>
					<BodyText css={css} disabled={disabled}>Brush size</BodyText>
					<Slider
						backgroundProgress={0}
						css={css}
						defaultValue={brushSize}
						disabled={disabled}
						max={30}
						min={1}
						onChange={(e) => {
							setBrushSize(e.value);
						}}
						step={1}
						tooltip={false}
					/>
				</Cell>
				<Cell className={css.colors}>
					<BodyText css={css} disabled={disabled}>Colors</BodyText>
					<ColorPicker
						color={brushColor}
						colorHandler={setBrushColorAndIndex}
						disabled={disabled}
						index={brushColorIndex}
						text="brush"
					/>
					<ColorPicker
						color={fillColor}
						colorHandler={setFillColorAndIndex}
						disabled={disabled}
						index={fillColorIndex}
						text="fill"
					/>
					<ColorPicker
						color={canvasColor}
						colorHandler={setCanvasColorAndIndex}
						disabled={disabled}
						index={canvasColorIndex}
						text="canvas"
					/>
				</Cell>
			</div>
		);
	}
});

export default DrawingControls;
