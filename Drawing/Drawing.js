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
import {Drawing as UiDrawing} from '@enact/ui/Drawing';
import Group from '@enact/ui/Group';
import {Cell, Column, Row} from '@enact/ui/Layout';
import Toggleable from '@enact/ui/Toggleable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {useRef, useState} from 'react';

import Button from '../Button';
import Heading from '../Heading';
import Skinnable from '../Skinnable';
import Slider from '../Slider';
import Switch from '../Switch';

import ColorPicker from './ColorPicker';

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
		 * Indicates if the drawing is in erasing mode.
		 *
		 * When `true`, the canvas' globalCompositeOperation property will be 'destination-out'.
		 *
		 * @type {Boolean}
		 * @default false
		 * @private
		 */
		isErasing: PropTypes.bool,

		/**
		 * Called when the drawing's erasing mode is modified.
		 *
		 * @type {Function}
		 * @public
		 */
		onSetErasing: PropTypes.func
	},

	defaultProps: {
		disabled: false,
		isErasing: false
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

	render: ({disabled, fileInputHandler, isErasing, onSetErasing, ...rest}) => {
		const [backgroundImage, setBackgroundImage] = useState(null);
		const [brushColor, setBrushColor] = useState('#333333');
		const [brushSize, setBrushSize] = useState(5);
		const [canvasColor, setCanvasColor] = useState('#FFFFFF');
		const [drawingTool, setDrawingTool] = useState('brush');
		const [fillColor, setFillColor] = useState('#FF0000');
		const drawingRef = useRef();

		const brushColors = ['#333333', '#FFFFFF', '#FF0000', '#00FF00'];
		const canvasColors = ['#FFFFFF', '#000000'];
		const fillColors = ['#FF0000', '#00FF00', '#0000FF'];

		return (
			<Column {...rest}>
				<Row>
					<Cell>
						<Heading marqueeDisabled size="tiny">
							<Slider
								backgroundProgress={0}
								defaultValue={brushSize}
								disabled={disabled}
								max={30}
								min={0}
								onChange={(e) => {
									setBrushSize(e.value);
								}}
								step={1}
								tooltip={false}
							/>
						</Heading>
					</Cell>
					<Cell>
						<Heading marqueeDisabled size="tiny">
							<ColorPicker
								color={brushColor}
								colorHandler={setBrushColor}
								disabled={disabled}
								presetColors={brushColors}
								text="Brush color"
							/>
						</Heading>
					</Cell>
					<Cell>
						<Heading marqueeDisabled size="tiny">
							<ColorPicker
								color={fillColor}
								colorHandler={setFillColor}
								disabled={disabled}
								presetColors={fillColors}
								text="Fill color"
							/>
						</Heading>
					</Cell>
					<Cell>
						<Heading disabled={disabled} marqueeDisabled size="tiny">
							Drawing tool
							<Group
								childComponent={Button}
								defaultSelected={0}
								itemProps={{size: 'small'}}
								onSelect={(e) => {
									setDrawingTool(e.data);
								}}
								select={'radio'}
								selectedProp="selected"
							>
								{['brush', 'fill']}
							</Group>
						</Heading>
					</Cell>
					<Cell>
						<Heading marqueeDisabled size="tiny">
							<ColorPicker
								color={canvasColor}
								colorHandler={setCanvasColor}
								disabled={disabled}
								presetColors={canvasColors}
								text="Canvas color"
							/>
						</Heading>
					</Cell>
					<Cell>
						<Heading disabled={disabled} marqueeDisabled size="tiny">
							Erase
							<Switch disabled={disabled} onClick={onSetErasing} />
						</Heading>
					</Cell>
					<Cell>
						<Heading size="tiny" marqueeDisabled>
							<Button disabled={disabled} onClick={() => drawingRef.current.clearCanvas()} size="small">Clear all</Button>
						</Heading>
					</Cell>
					<Cell>
						<Heading size="tiny" marqueeDisabled>
							<Button disabled={disabled} onClick={() => document.getElementById('fileInput').click()} size="small">Import image</Button>
							<input
								accept="image/*"
								className={css.inputFile}
								id="fileInput"
								onChange={(ev) => fileInputHandler({backgroundImage, ev, setBackgroundImage})}
								onClick={(e) => {
									e.target.value = null;
								}}
								type="file"
							/>
							<Button disabled={disabled} onClick={() => setBackgroundImage(null)} size="small">Clear image</Button>
						</Heading>
					</Cell>
				</Row>
				<Row>
					<UiDrawing
						{...rest}
						backgroundImage={backgroundImage}
						brushColor={brushColor}
						brushSize={brushSize}
						canvasColor={canvasColor}
						disabled={disabled}
						drawingTool={drawingTool}
						fillColor={fillColor}
						isErasing={isErasing}
						ref={drawingRef}
					/>
				</Row>
			</Column>
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
	Toggleable({prop: 'isErasing', toggle: 'onSetErasing'}),
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
