/* eslint-disable react-hooks/rules-of-hooks */

import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import {Cell, Column, Row} from '@enact/ui/Layout';
import Toggleable from '@enact/ui/Toggleable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {useCallback, useEffect, useState} from 'react';

import BodyText from '../BodyText';
import Button, {ButtonBase} from '../Button';
import Icon from '../Icon';
import Popup from '../Popup';
import Skinnable from '../Skinnable';
import Slider from '../Slider';

import componentCss from './ColorPicker.module.less';

const checkHex = (hex) => {
	if (/^#[0-9A-F]{6}$/i.test(hex)) return hex;
	return '#000000';
};
const hexToHSL = (hexColor) => {
	const hex = checkHex(hexColor);
	// Convert hex to RGB first
	let r = 0, g = 0, b = 0;
	if (hex.length === 4) {
		r = parseInt(hex[1] + hex[1], 16);
		g = parseInt(hex[2] + hex[2], 16);
		b = parseInt(hex[3] + hex[3], 16);
	} else if (hex.length === 7) {
		r = parseInt(hex.slice(1, 3), 16);
		g = parseInt(hex.slice(3, 5), 16);
		b = parseInt(hex.slice(5), 16);
	}

	// Then convert RGB to HSL
	r /= 255;
	g /= 255;
	b /= 255;
	let cmin = Math.min(r, g, b),
		cmax = Math.max(r, g, b),
		delta = cmax - cmin,
		h, s, l;

	if (delta === 0) {
		h = 0;
	} else if (cmax === r) {
		h = ((g - b) / delta) % 6;
	} else if (cmax === g) {
		h = (b - r) / delta + 2;
	} else {
		h = (r - g) / delta + 4;
	}

	h = Math.round(h * 60);

	if (h < 0) {
		h += 360;
	}

	l = (cmax + cmin) / 2;
	s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);

	return {h: Math.round(h), s: Math.round(s), l: Math.round(l)};
};

const HSLToHex = (h, s, l) => {
	s /= 100;
	l /= 100;

	let c = (1 - Math.abs(2 * l - 1)) * s,
		x = c * (1 - Math.abs((h / 60) % 2 - 1)),
		m = l - c / 2,
		r = 0,
		g = 0,
		b = 0;

	if (0 <= h && h < 60) {
		r = c; g = x; b = 0;
	} else if (60 <= h && h < 120) {
		r = x; g = c; b = 0;
	} else if (120 <= h && h < 180) {
		r = 0; g = c; b = x;
	} else if (180 <= h && h < 240) {
		r = 0; g = x; b = c;
	} else if (240 <= h && h < 300) {
		r = x; g = 0; b = c;
	} else if (300 <= h && h < 360) {
		r = c; g = 0; b = x;
	}
	// Having obtained RGB, convert channels to hex
	r = Math.round((r + m) * 255).toString(16);
	g = Math.round((g + m) * 255).toString(16);
	b = Math.round((b + m) * 255).toString(16);

	// Prepend 0s, if necessary
	if (r.length === 1) {
		r = "0" + r;
	}

	if (g.length === 1) {
		g = "0" + g;
	}

	if (b.length === 1) {
		b = "0" + b;
	}

	return "#" + r + g + b;
};

const SpottableButton = Spottable(ButtonBase);

/**
 * Component that contains the content for the [ColorPicker]{@link sandstone/ColorPicker} popup.
 *
 * @class PopupContent
 * @memberof sandstone/ColorPicker.ColorPickerBase
 * @ui
 * @private
 */
const PopupContent = ({color, colorHandler, css, presetColors}) => {
	const [hue, setHue] = useState(0);
	const [saturation, setSaturation] = useState(0);
	const [lightness, setLightness] = useState(0);

	useEffect(() => {
		let {h, s, l} = hexToHSL(color);

		setHue(h);
		setSaturation(s);
		setLightness(l);
	}, [color]);

	const changeHue = useCallback((ev) => {
		setHue(ev.value);
	}, []);

	const changeLightness = useCallback((ev) => {
		setLightness(ev.value);
	}, []);

	const changeSaturation = useCallback((ev) => {
		setSaturation(ev.value);
	}, []);

	const handleClick = useCallback((ev) => {
		colorHandler(ev.target.offsetParent.id);
	}, [colorHandler]);

	const onSliderValueChange = useCallback(() => {
		colorHandler(HSLToHex(hue, saturation, lightness));
	}, [colorHandler, hue, lightness, saturation]);

	return (
		<Cell className={css.colorPicker}>
			<Row className={css.colorsRow} wrap>
				{presetColors?.map((presetColor, presetColorIndex) => {

					return (
						<Cell key={presetColor + '-' + presetColorIndex} size="25%">
							<SpottableButton
								id={presetColor}
								className={css.coloredButton}
								minWidth={false}
								onClick={handleClick}
								style={{backgroundColor: presetColor}}
								type="color"
							/>
						</Cell>
					);
				})}
			</Row>
			<div>
				<Column className={css.colorPickerSliders}>
					<BodyText className={css.colorSliderText} css={css}>Hue {hue}</BodyText>
					<Slider
						className={css.colorSlider}
						max={356}
						min={0}
						onBlur={onSliderValueChange}
						onClick={onSliderValueChange}
						onChange={changeHue}
						value={hue}
					/>
					<BodyText className={css.colorSliderText} css={css}>Saturation %{saturation}</BodyText>
					<Slider
						className={css.colorSlider}
						max={100}
						min={0}
						onBlur={onSliderValueChange}
						onClick={onSliderValueChange}
						onChange={changeSaturation}
						value={saturation}
					/>
					<BodyText className={css.colorSliderText} css={css}>Lightness %{lightness}</BodyText>
					<Slider
						className={css.colorSlider}
						max={100}
						min={0}
						onBlur={onSliderValueChange}
						onClick={onSliderValueChange}
						onChange={changeLightness}
						value={lightness}
					/>
				</Column>
				<div className={css.coloredDiv} style={{backgroundColor: `hsl(${hue} ,${saturation}%, ${lightness}%)`}} />
			</div>
		</Cell>
	);
};

PopupContent.propTypes = {
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
	 * Contains an array with a couple of possible preset colors.
	 *
	 * @type {Array}
	 * @public
	 */
	presetColors: PropTypes.array
};

/**
 * A color picker component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [ColorPicker]{@link sandstone/ColorPicker}.
 *
 * @class ColorPickerBase
 * @memberof sandstone/ColorPicker
 * @ui
 * @private
 */
const ColorPickerBase = kind({
	name: 'ColorPicker',

	functional: true,

	propTypes: /** @lends sandstone/ColorPicker.ColorPickerBase.prototype */ {
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

	defaultProps: {
		disabled: false,
		popupOpen: false
	},

	handlers: {
		handleClosePopup: (ev, {onTogglePopup}) => {
			onTogglePopup();
		},
		handleOpenPopup: (ev, {disabled, onTogglePopup}) => {
			if (!disabled) {
				onTogglePopup();
			}
		}
	},

	styles: {
		css: componentCss,
		publicClassNames: true
	},

	render: ({color, colorHandler, css, disabled, handleClosePopup, handleOpenPopup, popupOpen, presetColors, text}) => {
		const CloseIcon = useCallback((props) => <Icon {...props} css={css} />, [css]);

		return (
			<Cell shrink className={css.colorPicker}>
				<BodyText className={css.colorBodyText} disabled={disabled} noWrap>{text}</BodyText>
				<SpottableButton
					className={css.coloredButton}
					disabled={disabled}
					onClick={handleOpenPopup}
					style={{backgroundColor: color}}
					type="color"
				/>
				<Popup
					className={css.colorPopup}
					css={css}
					onClose={handleClosePopup}
					open={disabled ? false : popupOpen}
					position="left"
					scrimType="transparent"
				>
					<Row>
						<Cell align="center">
							<BodyText className={css.colorPopupHeader} css={css} noWrap>{text}</BodyText>
						</Cell>
						<Cell align="right" shrink>
							<Button className={css.closeButton} css={css} iconComponent={CloseIcon} icon="closex" onClick={handleClosePopup} size="small" />
						</Cell>
					</Row>
					<PopupContent color={color} colorHandler={colorHandler} css={css} presetColors={presetColors} />
				</Popup>
			</Cell>
		);
	}
});


/**
 * Applies Sandstone specific behaviors to [ColorPicker]{@link sandstone/ColorPicker.ColorPickerBase} components.
 *
 * @hoc
 * @memberof sandstone/ColorPicker
 * @mixes sandstone/Skinnable.Skinnable
 * @mixes ui/Toggleable.Toggleable
 * @private
 */
const ColorPickerDecorator = compose(
	Skinnable,
	Toggleable({prop: 'popupOpen', toggle: 'onTogglePopup'})
);

/**
 * A color picker component, ready to use in Sandstone applications.
 *
 * @class ColorPicker
 * @memberof sandstone/ColorPicker
 * @extends sandstone/ColorPicker.ColorPickerBase
 * @mixes sandstone/ColorPicker.ColorPickerDecorator
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
