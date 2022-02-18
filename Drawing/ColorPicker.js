/* eslint-disable react/jsx-no-bind */

import kind from '@enact/core/kind';
import {Cell, Row} from '@enact/ui/Layout';
import Toggleable from '@enact/ui/Toggleable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {useState} from 'react';

import BodyText from '../BodyText';
import Button, {ButtonBase} from '../Button';
import {ContextualPopupDecorator} from '../ContextualPopupDecorator';
import Skinnable from '../Skinnable';
import Slider from '../Slider';

import componentCss from './ColorPicker.module.less';

const ContextualButton = ContextualPopupDecorator(Button);
const ContextualButtonBase = ContextualPopupDecorator(ButtonBase);

const componentToHex = (c) =>  {
	const hex = c.toString(16);
	return hex.length === 1 ? '0' + hex : hex;
};

const rgbToHex = (r, g, b) => {
	return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

const hexToRgb = (hex) => {
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
};

const RGBPicker = (props) => {
	const color = props?.color,
		changeColor = props?.changeColor;

	const {r, g, b} = hexToRgb(color);

	const [red, setRed] = useState(r);
	const [green, setGreen] = useState(g);
	const [blue, setBlue] = useState(b);

	const onSliderBlur = () => {
		changeColor(rgbToHex(red, green, blue));
	};

	return (
		<div>
			<Cell>
				<Slider
					max={255}
					min={0}
					onBlur={onSliderBlur}
					onChange={(ev) => setRed(ev.value)}
					value={red}
				/>
				<BodyText>{red} Red</BodyText>
			</Cell>
			<Cell>
				<Slider
					max={255}
					min={0}
					onBlur={onSliderBlur}
					onChange={(ev) => setGreen(ev.value)}
					value={green}
				/>
				<BodyText>{green} Green</BodyText>
			</Cell>
			<Cell>
				<Slider
					max={255}
					min={0}
					onBlur={onSliderBlur}
					onChange={(ev) => setBlue(ev.value)}
					value={blue}
				/>
				<BodyText>{blue} Blue</BodyText>
			</Cell>
			<Cell >
				<div className={componentCss.coloredDiv} style={{backgroundColor: `rgb(${red} ,${green}, ${blue})`}} />
			</Cell>
		</div>
	);
};

const ColorPickerBase = kind({
	name: 'ColorPicker',

	functional: true,

	propTypes: {
		color: PropTypes.string,
		colorHandler: PropTypes.func,
		colorPickerOpen: PropTypes.bool,
		css: PropTypes.object,
		disabled: PropTypes.bool,
		onToggleColorPicker: PropTypes.func,
		onTogglePopup: PropTypes.func,
		popupOpen: PropTypes.bool,
		presetColors: PropTypes.array,
		text: PropTypes.string
	},

	computed: {
		renderComponent: ({color, colorHandler, colorPickerOpen, css, onToggleColorPicker, onTogglePopup, presetColors}) => {
			return (
				<Cell className={css.colorPicker}>
					<Row>
						{presetColors?.map((presetColor) => (
							<ButtonBase
								className={css.coloredButton}
								key={presetColor}
								minWidth={false}
								onClick={() => {
									colorHandler(presetColor);
									onTogglePopup();
								}}
								style={{backgroundColor: presetColor}}
								type="color"
							/>
						))}
					</Row>
					<Row>
						<ContextualButton
							open={colorPickerOpen}
							onClick={onToggleColorPicker}
							popupComponent={() => <RGBPicker color={color} changeColor={colorHandler} />}
						>
							Select your own
						</ContextualButton>
					</Row>
				</Cell>
			);
		}
	},

	styles: {
		css: componentCss,
		publicClassNames: true
	},

	render: ({color, css, disabled, onTogglePopup, popupOpen, renderComponent, text}) => {
		return (
			<Row className={css.colorPicker}>
				<BodyText className={css.colorBodyText}>{text}</BodyText>
				<ContextualButtonBase
					className={css.coloredButton}
					disabled
					minWidth={false}
					onClick={() => {
						if (!disabled) {
							onTogglePopup();
						}
					}}
					open={popupOpen}
					popupComponent={() => renderComponent}
					style={{backgroundColor: color}}
					type="color"
				/>
			</Row>
		);
	}
});

const ColorPickerDecorator = compose(
	Skinnable,
	Toggleable({prop: 'colorPickerOpen', toggle: 'onToggleColorPicker'}),
	Toggleable({prop: 'popupOpen', toggle: 'onTogglePopup'})
);

const ColorPicker = ColorPickerDecorator(ColorPickerBase);

export default ColorPicker;

export {
	ColorPicker,
	ColorPickerBase,
	ColorPickerDecorator
};
