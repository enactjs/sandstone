/* eslint-disable react-hooks/rules-of-hooks, react/jsx-no-bind */

import kind from '@enact/core/kind';
import DrawingCanvas from '@enact/ui/DrawingCanvas';
import { Cell, Column, Row } from '@enact/ui/Layout';
import Toggleable from '@enact/ui/Toggleable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import { useRef, useState } from 'react';
import Button from '../Button';
import Heading from '../Heading';
import Skinnable from '../Skinnable';
import Slider from '../Slider';
import Switch from '../Switch';

import css from './Drawing.module.less';

const DrawingBase = kind({
	name: 'Drawing',

	functional: true,

	propTypes: {
		disabled: PropTypes.bool,
		isErasing: PropTypes.bool,
		onSetErasing: PropTypes.func
	},

	defaultProps: {
		isErasing: false
	},

	computed: {
		className: ({ disabled, styler }) => styler.append({ disabled })
	},

	styles: {
		css,
		publicClassNames: true
	},

	render: ({ disabled, isErasing, onSetErasing, ...rest }) => {
		const [brushSize, setBrushSize] = useState(5);
		const [brushColor, setBrushColor] = useState('green');
		const [canvasColor, setCanvasColor] = useState('#fff');
		const drawingRef = useRef();

		delete rest.brushColor;
		delete rest.brushSize;
		delete rest.canvasColor;

		return (
			<Column {...rest}>
				<Row>
					<Cell>
						<Heading size="tiny" marqueeDisabled>
							<Slider
								backgroundProgress={0}
								defaultValue={brushSize}
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
						<Heading size="tiny" marqueeDisabled>
							Brush color
							<input
								defaultValue="#333333"
								onChange={(e) => {
									setBrushColor(e.target.value);
								}}
								type="color"
							/>
						</Heading>
					</Cell>
					<Cell>
						<Heading size="tiny" marqueeDisabled>
							Canvas color{' '}
							<input
								defaultValue="#FFFFFF"
								onChange={(e) => {
									setCanvasColor(e.target.value);
								}}
								type="color"
							/>
						</Heading>

					</Cell>
					<Cell>
						<Heading size="tiny" marqueeDisabled>
							Erase
							<Switch disabled={disabled} onClick={onSetErasing} />
						</Heading>
					</Cell>
					<Cell>
						<Heading size="tiny" marqueeDisabled>
							<Button disabled={disabled} onClick={() => drawingRef.current.clearCanvas()} size="small">Clear all</Button>
						</Heading>
					</Cell>
				</Row>
				<Row>
					<DrawingCanvas
						{...rest}
						brushColor={brushColor}
						brushSize={brushSize}
						canvasColor={canvasColor}
						disabled={disabled}
						isErasing={isErasing}
						ref={drawingRef}
					/>
				</Row>
			</Column>
		);
	}
});
const DrawingDecorator = compose(
	Toggleable({ prop: 'isErasing', toggle: 'onSetErasing' }),
	Skinnable
);
const Drawing = DrawingDecorator(DrawingBase)
export default Drawing;
export { Drawing, DrawingBase, DrawingDecorator }
