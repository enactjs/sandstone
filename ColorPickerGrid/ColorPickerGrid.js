/* eslint-disable react-hooks/rules-of-hooks */
/**
 * Sandstone component to allow the user to choose a color.
 *
 * @example
 * <ColorPickerGrid
 *	 color={'#FF00FF'}
 *	 colorHandler={setColor}
 *	 presetColors={['#FF0000', '#00FF00', '#0000FF']}
 *	 text={'Color Picker'}
 * />
 *
 * @module sandstone/ColorPickerGrid
 * @exports ColorPickerGrid
 * @exports ColorPickerGridBase
 * @exports ColorPickerGridDecorator
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

import componentCss from './ColorPickerGrid.module.less';

const SpottableButton = Spottable(ButtonBase);


const colors = [
	'#ffffff', '#00374a', '#004d65', '#016e8f', '#008cb4', '#00a1d8', '#01c7fc', '#52d6fc', '#93e3fd', '#cbf0ff',
	'#ebebeb', '#011d57', '#012f7b', '#0042a9', '#0056d6', '#0061fe', '#3a87fe', '#74a7ff', '#a7c6ff', '#d3e2ff',
	'#d6d6d6', '#11053b', '#1a0a52', '#2c0977', '#371a94', '#4d22b2', '#5e30eb', '#864ffe', '#b18cfe', '#d9c9fe',
	'#c2c2c2', '#2e063d', '#450d59', '#61187c', '#7a219e', '#982abc', '#be38f3', '#d357fe', '#e292fe', '#efcaff',
	'#adadad', '#3c071b', '#551029', '#791a3d', '#99244f', '#b92d5d', '#e63b7a', '#ee719e', '#f4a4c0', '#f9d3e0',
	'#999999', '#5c0701', '#831100', '#b51a00', '#e22400', '#ff4015', '#ff6250', '#ff8c82', '#ffb5af', '#ffdbd8',
	'#858585', '#5a1c00', '#7b2900', '#ad3e00', '#da5100', '#ff6a00', '#ff8648', '#ffa57d', '#ffc5ab', '#ffe2d6',
	'#707070', '#583300', '#7a4a00', '#a96800', '#d38301', '#ffab01', '#feb43f', '#ffc777', '#ffd9a8', '#ffecd4',
	'#5c5c5c', '#563d00', '#785800', '#a67b01', '#d19d01', '#fdc700', '#fecb3e', '#ffd977', '#fee4a8', '#fff2d5',
	'#474747', '#666100', '#8d8602', '#c4bc00', '#f5ec00', '#fefb41', '#fff76b', '#fff994', '#eaf28f', '#b1dd8b',
	'#333333', '#4f5504', '#6f760a', '#9ba50e', '#c3d117', '#d9ec37', '#e4ef65', '#fffbb9', '#f2f7b7', '#cde8b5',
	'#000000', '#263e0f', '#38571a', '#4e7a27', '#669d34', '#76bb40', '#96d35f', '#fefcdd', '#f7fadb', '#dfeed4'
]

/**
 * The color picker base component which sets-up the component's structure.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within {@link sandstone/ColorPickerGrid|ColorPickerGrid}.
 *
 * @class ColorPickerGridBase
 * @memberof sandstone/ColorPickerGrid
 * @ui
 * @private
 */
const ColorPickerGridBase = kind({
	name: 'ColorPickerGrid',

	functional: true,

	propTypes: /** @lends sandstone/ColorPickerGrid.ColorPickerGridBase.prototype */ {
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
 * Applies Sandstone specific behaviors to {@link sandstone/ColorPicker.ColorPickerBase|ColorPicker} components.
 *
 * @hoc
 * @memberof sandstone/ColorPickerGrid
 * @mixes sandstone/Skinnable.Skinnable
 * @mixes ui/Toggleable.Toggleable
 * @private
 */
const ColorPickerGridDecorator = compose(
	Skinnable,
	Toggleable({prop: 'popupOpen', toggle: 'onTogglePopup'})
);

/**
 * A color picker component, ready to use in Sandstone applications.
 *
 * @class ColorPickerGrid
 * @memberof sandstone/ColorPickerGrid
 * @extends sandstone/ColorPickerGrid.ColorPickerGridBase
 * @mixes sandstone/ColorPickerGrid.ColorPickerGridDecorator
 * @ui
 * @private
 */
const ColorPickerGrid = ColorPickerGridDecorator(ColorPickerGridBase);

export default ColorPickerGrid;
export {
	ColorPickerGrid,
	ColorPickerGridBase,
	ColorPickerGridDecorator
};
