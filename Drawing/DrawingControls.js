import kind from '@enact/core/kind';
import PropTypes from 'prop-types';

import Button from '../Button';
import {Cell} from "../../enact/packages/ui/Layout/Cell";
import BodyText from "../BodyText";
import css from "./Drawing.module.less";
import Group from "../../enact/packages/ui/Group";
import Slider from "../Slider";
import ColorPicker from "./ColorPicker";

const DrawingControls = kind({
	name: 'DrawingControls',

	propTypes: {
		disabled: PropTypes.bool,
		brushSize: PropTypes.number,
		setBrushSize: PropTypes.func,
		setDrawingTool: PropTypes.func,
		drawingTools: PropTypes.object,
		brushColor: PropTypes.string,
		setBrushColor: PropTypes.func,
		brushColors: PropTypes.array,
		fillColor: PropTypes.string,
		setFillColor: PropTypes.func,
		fillColors: PropTypes.array,
		canvasColor: PropTypes.string,
		setCanvasColor: PropTypes.func,
		canvasColors: PropTypes.array
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
		brushColors,
		fillColor,
		setFillColor,
		setBrushColor,
		fillColors,
		brushSize,
		disabled,
		drawingTools,
		handleSelect,
		setDrawingTool,
		setBrushSize,
		canvasColor,
		setCanvasColor,
		canvasColors,
		...rest
	}) => {

		return (
			<div>
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
			</div>
		)
	}
});

export default DrawingControls;
