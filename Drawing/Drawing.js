/* eslint-disable react-hooks/rules-of-hooks, react/jsx-no-bind */

import kind from '@enact/core/kind';
import {Drawing as UiDrawing} from '@enact/ui/Drawing';
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
		className: ({disabled, styler}) => styler.append({disabled})
	},

	styles: {
		css,
		publicClassNames: true
	},

	render: ({disabled, isErasing, onSetErasing, ...rest}) => {
		const [brushColor, setBrushColor] = useState('#333333');
		const [brushSize, setBrushSize] = useState(5);
		const [canvasColor, setCanvasColor] = useState('#FFFFFF');
		const drawingRef = useRef();

		const brushColors = ['#333333', '#FFFFFF', '#FF0000', '#00FF00'];
		const canvasColors = ['#FFFFFF', '#000000'];

		return (
			<Column {...rest}>
				<Row>
					<Cell>
						<Heading marqueeDisabled size="tiny">
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
						<Heading marqueeDisabled size="tiny">
							<ColorPicker
								color={brushColor}
								colorHandler={setBrushColor}
								presetColors={brushColors}
								text={'Brush color'}
							/>
						</Heading>
					</Cell>
					<Cell>
						<Heading marqueeDisabled size="tiny">
							<ColorPicker
								color={canvasColor}
								colorHandler={setCanvasColor}
								presetColors={canvasColors}
								text={'Canvas color'}
							/>
						</Heading>
					</Cell>
					<Cell>
						<Heading marqueeDisabled size="tiny">
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
					<UiDrawing
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
	Toggleable({prop: 'isErasing', toggle: 'onSetErasing'}),
	Skinnable
);

const Drawing = DrawingDecorator(DrawingBase);

export default Drawing;
export {
	Drawing,
	DrawingBase,
	DrawingDecorator
};
