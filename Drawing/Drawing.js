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
				// eslint-disable-next-line
				console.log(err);
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
		const drawingRef = useRef();

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
						<Heading marqueeDisabled size="tiny">
							Canvas color
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
					<Cell>
						<Heading size="tiny" marqueeDisabled>
							{/* <Button disabled={disabled} onClick={() => document.getElementById('fileInput').click()} size="small">Import image</Button> */}
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
