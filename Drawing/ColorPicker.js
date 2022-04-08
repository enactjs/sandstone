/* eslint-disable react/jsx-no-bind, react-hooks/rules-of-hooks */

import kind from '@enact/core/kind';
import platform from '@enact/core/platform';
import Spottable from '@enact/spotlight/Spottable';
import {Cell, Column, Row} from '@enact/ui/Layout';
import Toggleable from '@enact/ui/Toggleable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {useEffect, useState} from 'react';

import BodyText from '../BodyText';
import Button, {ButtonBase} from '../Button';
import Icon from '../Icon';
import Popup from '../Popup';
import Skinnable from '../Skinnable';
import Slider from '../Slider';

import componentCss from './ColorPicker.module.less';

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

const SpottableButton = Spottable(ButtonBase);

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

	functional: true,

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
		 * The index of the color in the color picker.
		 *
		 * @type {Number}
		 * @public
		 */
		index: PropTypes.number,

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

	computed: {
		renderComponent: ({color, colorHandler, css, index, text}) => {
			const [red, setRed] = useState('');
			const [green, setGreen] = useState('');
			const [blue, setBlue] = useState('');
			const [inputColor, setInputColor] = useState('');
			const presetColors = JSON.parse(window.localStorage.getItem(`${text}Colors`));

			function setInputColorToStorage (selectedColor) {
				setInputColor(selectedColor);
				colorHandler(selectedColor, index);

				let colors = JSON.parse(window.localStorage.getItem(`${text}Colors`));
				colors[index] = selectedColor;

				window.localStorage.setItem(`${text}Colors`, JSON.stringify(colors));
			}

			useEffect(() => {
				if (color[0] !== '#') return;

				let {r, g, b} = hexToRgb(color);

				setInputColor(color);
				setRed(r);
				setGreen(g);
				setBlue(b);
			}, [color]);

			useEffect(() => {
				const hexColor = rgbToHex(red, green, blue);
				let colors = JSON.parse(window.localStorage.getItem(`${text}Colors`));

				if (colors) {
					colors[index] = hexColor;
				}

				window.localStorage.setItem(`${text}Colors`, JSON.stringify(colors));
				// eslint-disable-next-line react-hooks/exhaustive-deps
			}, [red, green, blue]);

			const onSliderValueChange = () => {
				colorHandler(rgbToHex(red, green, blue), index);
			};

			return (
				<Cell className={css.colorPicker}>
					<Row className={css.colorsRow} wrap>
						{presetColors?.map((presetColor, presetColorIndex) => (
							<Cell key={presetColor + '-' + presetColorIndex} size="25%">
								<SpottableButton
									className={css.coloredButton}
									minWidth={false}
									onClick={() => {
										colorHandler(presetColor, presetColorIndex);
									}}
									style={{backgroundColor: presetColor}}
									type="color"
								/>
							</Cell>
						))}
					</Row>
					{platform.webos !== undefined ?	// eslint-disable-line no-undefined
						<div>
							<Column className={css.colorPickerSliders}>
								<BodyText className={componentCss.colorSliderText} css={css}>{red} Red</BodyText>
								<Slider
									className={componentCss.colorSlider}
									max={255}
									min={0}
									onBlur={onSliderValueChange}
									onClick={onSliderValueChange}
									onChange={(ev) => setRed(ev.value)}
									value={red}
								/>
								<BodyText className={componentCss.colorSliderText} css={css}>{green} Green</BodyText>
								<Slider
									className={componentCss.colorSlider}
									max={255}
									min={0}
									onBlur={onSliderValueChange}
									onClick={onSliderValueChange}
									onChange={(ev) => setGreen(ev.value)}
									value={green}
								/>
								<BodyText className={componentCss.colorSliderText} css={css}>{blue} Blue</BodyText>
								<Slider
									className={componentCss.colorSlider}
									max={255}
									min={0}
									onBlur={onSliderValueChange}
									onClick={onSliderValueChange}
									onChange={(ev) => setBlue(ev.value)}
									value={blue}
								/>
							</Column>
							<div className={componentCss.coloredDiv} style={{backgroundColor: `rgb(${red} ,${green}, ${blue})`}} />
						</div> :
						<SpottableButton
							className={componentCss.coloredDiv}
							css={css}
							minWidth={false}
							onClick={() => document.getElementById('inputColorPicker').click()}
							style={{backgroundColor: `${inputColor}`}}
						>
							<Cell>
								<input
									className={componentCss.coloredInput}
									id="inputColorPicker"
									onChange={(ev) => setInputColorToStorage(ev.target.value)}
									type="color"
									value={inputColor}
								/>
							</Cell>
						</SpottableButton>
					}
				</Cell>
			);
		}
	},

	styles: {
		css: componentCss,
		publicClassNames: true
	},

	render: ({color, css, disabled, handleClosePopup, handleOpenPopup, popupOpen, renderComponent, text}) => {
		const CloseIcon = (props) => <Icon {...props} css={css} />;

		return (
			<Row className={css.colorPicker}>
				<BodyText className={css.colorBodyText} disabled={disabled}>{text}</BodyText>
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
					open={popupOpen}
					position="left"
					scrimType="transparent"
				>
					<Row>
						<Cell align="center">
							<BodyText className={css.colorPopupHeader} css={css}>{text}</BodyText>
						</Cell>
						<Cell align="right" shrink>
							<Button className={css.closeButton} css={css} iconComponent={CloseIcon} icon="closex" onClick={handleClosePopup} size="small" />
						</Cell>
					</Row>
					{renderComponent}
				</Popup>
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
