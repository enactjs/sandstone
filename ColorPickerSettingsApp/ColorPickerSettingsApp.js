/* eslint-disable react-hooks/rules-of-hooks */
/**
 * Sandstone component used in Settings App, that allows the user to choose a color.
 *
 * @example
 * <ColorPickerSettingsApp
 *	 color={'#FF00FF'}
 *	 colorHandler={setColor}
 *	 presetColors={['#FF0000', '#00FF00', '#0000FF']}
 *	 text={'Color Picker'}
 * />
 *
 * @module sandstone/ColorPickerSettingsApp
 * @exports ColorPickerSettingsApp
 * @exports ColorPickerSettingsAppBase
 * @exports ColorPickerSettingsAppDecorator
 * @private
 */

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
import Item from '../Item';
import Popup from '../Popup';
import Skinnable from '../Skinnable';
import Slider from '../Slider';

import {hexToHSL, HSLToHex} from './utils';

import componentCss from './ColorPickerSettingsApp.module.less';

const SpottableButton = Spottable(ButtonBase);

/**
 * A component that contains the content for the {@link sandstone/ColorPickerSettingsApp|ColorPickerSettingsApp} popup.
 *
 * @class PopupContent
 * @memberof sandstone/ColorPickerSettingsApp
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
								className={css.coloredButton}
								id={presetColor}
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
					<BodyText className={css.colorSliderText} css={css}>Saturation {saturation}%</BodyText>
					<Slider
						className={css.colorSlider}
						max={100}
						min={0}
						onBlur={onSliderValueChange}
						onClick={onSliderValueChange}
						onChange={changeSaturation}
						value={saturation}
					/>
					<BodyText className={css.colorSliderText} css={css}>Lightness {lightness}%</BodyText>
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
	 * @private
	 */
	color: PropTypes.string,

	/**
	 * Called when color is modified.
	 *
	 * @type {Function}
	 * @private
	 */
	colorHandler: PropTypes.func,

	/**
	 * Customizes the component by mapping the supplied collection of CSS class names to the
	 * corresponding internal elements and states of this component.
	 *
	 * The following classes are supported:
	 *
	 * `colorPickerSettingsApp` - The root class name
	 * `coloredDiv`  - A class name used for a single div
	 *
	 * @type {Object}
	 * @private
	 */
	css: PropTypes.object,

	/**
	 * Contains an array with a couple of possible preset colors.
	 *
	 * @type {Array}
	 * @private
	 */
	presetColors: PropTypes.array
};

/**
 * The color picker base component which sets-up the component's structure.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within {@link sandstone/ColorPickerSettingsApp|ColorPickerSettingsApp}.
 *
 * @class ColorPickerSettingsAppBase
 * @memberof sandstone/ColorPickerSettingsApp
 * @ui
 * @private
 */
const ColorPickerSettingsAppBase = kind({
	name: 'ColorPickerSettingsAppBase',

	functional: true,

	propTypes: /** @lends sandstone/ColorPickerSettingsApp.ColorPickerSettingsAppBase.prototype */ {
		/**
		 * Indicates the color.
		 *
		 * @type {String}
		 * @public
		 */
		color: PropTypes.string,

		/**
		 * Called when the color is modified.
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
		 * `colorPickerSettingsApp` - The root class name
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

	render: ({color, colorHandler, css, disabled = false, handleClosePopup, handleOpenPopup, popupOpen = false, presetColors, text, ...rest}) => {
		delete rest.onTogglePopup;

		const CloseIcon = useCallback((props) => <Icon {...props} css={css} />, [css]);
		const slotAfter = <SpottableButton
			className={css.coloredButton}
			disabled={disabled}
			onClick={handleOpenPopup}
			style={{backgroundColor: color}}
			type="color"
		/>;

		return (
			<Cell shrink className={css.colorPicker}>
				<Item disabled={disabled} onClick={handleOpenPopup} slotAfter={slotAfter} {...rest}>
					{text}
				</Item>
				<Popup
					className={css.colorPopup}
					css={css}
					noAnimation
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
 * Applies Sandstone specific behaviors to {@link sandstone/ColorPickerSettingsApp.ColorPickerSettingsAppBase|ColorPickerSettingsApp} components.
 *
 * @hoc
 * @memberof sandstone/ColorPickerSettingsApp
 * @mixes sandstone/Skinnable.Skinnable
 * @mixes ui/Toggleable.Toggleable
 * @private
 */
const ColorPickerSettingsAppDecorator = compose(
	Skinnable,
	Toggleable({prop: 'popupOpen', toggle: 'onTogglePopup'})
);

/**
 * A color picker component, ready to use in Settings App.
 *
 * @class ColorPickerSettingsApp
 * @memberof sandstone/ColorPickerSettingsApp
 * @extends sandstone/ColorPickerSettingsApp.ColorPickerSettingsAppBase
 * @mixes sandstone/ColorPickerSettingsApp.ColorPickerSettingsAppDecorator
 * @ui
 * @private
 */
const ColorPickerSettingsApp = ColorPickerSettingsAppDecorator(ColorPickerSettingsAppBase);

export default ColorPickerSettingsApp;
export {
	ColorPickerSettingsApp,
	ColorPickerSettingsAppBase,
	ColorPickerSettingsAppDecorator
};
