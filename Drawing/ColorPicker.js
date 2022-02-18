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
			<Cell>
				<div className={componentCss.coloredDiv} style={{backgroundColor: `rgb(${red} ,${green}, ${blue})`}} />
			</Cell>
		</div>
	);
};

/**
 * A color picker component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [ColorPicker]{@link sandstone/Drawing.ColorPicker}.
 *
 * @class ColorPickerBase
 * @memberof sandstone/Drawing
 * @ui
 * @private
 */

const ColorPickerBase = kind({
	name: 'ColorPicker',

	propTypes: /** @lends sandstone/Drawing.ColorPickerBase.prototype */ {

		/**
		 * Indicates the color.
		 *
		 * @type {String}
		 * @public
		 */
		color: PropTypes.string,

		/**
		 * Called when color is modified.
		 *
		 * @type {Function}
		 * @public
		 */
		colorHandler: PropTypes.func,

		/**
		 * Indicates if the color picker sliders are open.
		 *
		 * When `true`, contextual popup opens.
		 *
		 * @type {Boolean}
		 * @default false
		 * @private
		 */
		colorPickerOpen: PropTypes.bool,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * `colorPicker` - The root class name
		 * `coloredDiv`  - A class name used for a single div
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Applies the `disabled` class.
		 *
		 * When `true`, the color picker is shown as disabled.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Called to open or close the color picker sliders.
		 *
		 * @type {Function}
		 * @public
		 */
		onToggleColorPicker: PropTypes.func,

		/**
		 * Called to open or close the color picker.
		 *
		 * @type {Function}
		 * @public
		 */
		onTogglePopup: PropTypes.func,

		/**
		 * Indicates if the color picker is open.
		 *
		 * When `true`, contextual popup opens.
		 *
		 * @type {Boolean}
		 * @default false
		 * @private
		 */
		popupOpen: PropTypes.bool,

		/**
		 * Contains an array with a couple of possible preset colors.
		 *
		 * @type {Array}
		 * @public
		 */
		presetColors: PropTypes.array,

		/**
		 * Contains the text that shows near color picker.
		 *
		 * @type {String}
		 * @public
		 */
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
					<Row className={css.sliderContextualButton}>
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
				<BodyText className={css.colorBodyText} disabled={disabled}>{text}</BodyText>
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


/**
 * Applies Sandstone specific behaviors to [Drawing]{@link sandstone/Drawing.ColorPickerBase} components.
 *
 * @hoc
 * @memberof sandstone/Drawing
 * @mixes sandstone/Skinnable.Skinnable
 * @mixes ui/Toggleable.Toggleable
 * @private
 */
const ColorPickerDecorator = compose(
	Skinnable,
	Toggleable({prop: 'colorPickerOpen', toggle: 'onToggleColorPicker'}),
	Toggleable({prop: 'popupOpen', toggle: 'onTogglePopup'})
);

/**
 * A color picker component, ready to use in Sandstone applications.
 *
 * @class ColorPicker
 * @memberof sandstone/Drawing
 * @extends sandstone/Drawing.ColorPickerBase
 * @mixes sandstone/Drawing.ColorPickerDecorator
 * @ui
 * @private
 */
const ColorPicker = ColorPickerDecorator(ColorPickerBase);

export default ColorPicker;
export {
	ColorPicker,
	ColorPickerBase,
	ColorPickerDecorator
};
