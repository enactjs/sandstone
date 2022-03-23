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
import {Cell, Column, Layout, Row} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {useEffect, useRef, useState} from 'react';

import BodyText from '../BodyText';
import Button from '../Button';
import Scroller from '../Scroller';
import Skinnable from '../Skinnable';
import Slider from '../Slider';

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
		disabled: PropTypes.bool
	},

	defaultProps: {
		canvasHeight: 800,
		canvasWidth: 1200,
		disabled: false
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
		},

		handleSelect: (ev) => {
			const e = ev?.event;
			const setDrawingTool = ev?.setDrawingTool;
			setDrawingTool(e.data);
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

	render: ({canvasHeight, canvasWidth, disabled, fileInputHandler, handleSelect, ...rest}) => {
		const [backgroundImage, setBackgroundImage] = useState(null);
		const [brushColor, setBrushColor] = useState('#545BCC');
		const [brushColorIndex, setBrushColorIndex] = useState(null);
		const [brushSize, setBrushSize] = useState(5);
		const [canvasColor, setCanvasColor] = useState('#FFFFFF');
		const [canvasColorIndex, setCanvasColorIndex] = useState(null);
		const [drawingTool, setDrawingTool] = useState('brush');
		const [fillColor, setFillColor] = useState('#D0BB22');
		const [fillColorIndex, setFillColorIndex] = useState(null);
		const drawingRef = useRef();
		const drawingTools = [
			{icon: 'edit', key: 1, tooltipText: 'brush'},
			{icon: 'heart', key: 2, tooltipText: 'fill'},
			{icon: 'play', key: 3, tooltipText: 'triangle'},
			{icon: 'popupscale', key: 4, tooltipText: 'rectangle'},
			{icon: 'newfeature', key: 5, tooltipText: 'circle'},
			{icon: 'square', key: 6, tooltipText: 'erase'}
		];

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
				setBrushColor(lastBrushColor);
				setCanvasColor(lastCanvasColor);
				setFillColor(lastFillColor);
			}
		}, [brushColor, canvasColor, fillColor]);

		function setBrushColorAndIndex (color, index) {
			setBrushColor(color);
			setBrushColorIndex(index);
			window.localStorage.setItem('lastBrushColor', JSON.stringify(color));
		}

		function setCanvasColorAndIndex (color, index) {
			setCanvasColor(color);
			setCanvasColorIndex(index);
			window.localStorage.setItem('lastCanvasColor', JSON.stringify(color));
		}

		function setFillColorAndIndex (color, index) {
			setFillColor(color);
			setFillColorIndex(index);
			window.localStorage.setItem('lastFillColor', JSON.stringify(color));
		}

		return (
			<Scroller>
				<Layout {...rest}>
					<Cell className={css.toolbar} shrink size="15%">
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
					</Cell>
					<Cell>
						<Row>
							<UiDrawing
								{...rest}
								backgroundImage={backgroundImage}
								brushColor={brushColor}
								brushSize={brushSize}
								canvasColor={canvasColor}
								canvasHeight={canvasHeight}
								canvasWidth={canvasWidth}
								disabled={disabled}
								drawingTool={drawingTool}
								fillColor={fillColor}
								ref={drawingRef}
							/>
						</Row>
					</Cell>
					<Cell shrink size="10%">
						<Column align="center space-between" className={css.canvasOptions}>
							<Button css={css} disabled={disabled} icon="arrowhookleft" onClick={() => drawingRef.current.undo()} size="small" tooltipText="Undo" />
							<Button css={css} disabled={disabled} icon="arrowhookright" onClick={() => drawingRef.current.redo()} size="small" tooltipText="Redo" />
							<Button css={css} disabled={disabled} icon="refresh" onClick={() => drawingRef.current.clearCanvas()} size="small" tooltipText="Clear all" />
							<Button css={css} disabled={disabled} icon="plus" onClick={() => document.getElementById('fileInput').click()} size="small" tooltipText="Import image" />
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
							<Button css={css} disabled={disabled} icon="trash" onClick={() => setBackgroundImage(null)} size="small" tooltipText="Clear image" />
							<Button css={css} disabled={disabled} icon="download" onClick={() => drawingRef.current.saveCanvas()} size="small" tooltipText="Save canvas" />
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
