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
import {useRef, useState} from 'react';

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

	render: ({disabled, fileInputHandler, handleSelect, ...rest}) => {
		const [backgroundImage, setBackgroundImage] = useState(null);
		const [brushColor, setBrushColor] = useState('#545BCC');
		const [brushSize, setBrushSize] = useState(5);
		const [canvasColor, setCanvasColor] = useState('#FFFFFF');
		const [drawingTool, setDrawingTool] = useState('brush');
		const [fillColor, setFillColor] = useState('#D0BB22');
		const drawingRef = useRef();

		const brushColors = ['#000000', '#FFFFFF', '#FF0000', '#00FF00'];
		const canvasColors = ['#000000', '#FFFFFF', '#FF0000', '#00FF00'];
		const drawingTools = [
			{icon: 'edit', key: 1, tooltipText: 'brush'},
			{icon: 'heart', key: 2, tooltipText: 'fill'},
			{icon: 'heartblack', key: 3, tooltipText: 'line'},
			{icon: 'popupscale', key: 4, tooltipText: 'rectangle'},
			{icon: 'newfeature', key: 5, tooltipText: 'circle'},
			{icon: 'square', key: 6, tooltipText: 'erase'}
		];
		const fillColors = ['#000000', '#FFFFFF', '#FF0000', '#00FF00'];

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
							<BodyText css={css}>Brush size</BodyText>
							<Slider
								backgroundProgress={0}
								css={css}
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
						</Cell>
						<Cell className={css.colors}>
							<BodyText css={css} disabled={disabled}>Colors</BodyText>
							<ColorPicker
								color={brushColor}
								colorHandler={setBrushColor}
								disabled={disabled}
								presetColors={brushColors}
								text="Brush"
							/>
							<ColorPicker
								color={fillColor}
								colorHandler={setFillColor}
								disabled={disabled}
								presetColors={fillColors}
								text="Fill"
							/>
							<ColorPicker
								color={canvasColor}
								colorHandler={setCanvasColor}
								disabled={disabled}
								presetColors={canvasColors}
								text="Canvas"
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
								disabled={disabled}
								drawingTool={drawingTool}
								fillColor={fillColor}
								onChangeDrawingTool={setDrawingTool}
								ref={drawingRef}
							/>
						</Row>
					</Cell>
					<Cell shrink size="10%">
						<Column align="center space-between" className={css.canvasOptions}>
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
