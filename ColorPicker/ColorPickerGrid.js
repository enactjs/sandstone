/**
 * Sandstone component to allow the user to choose a color from a grid.
 *
 * @example
 * <ColorPickerGrid
 * 	 selectedColorHandler={setSelectedColor}
 * />
 *
 * @module sandstone/ColorPicker
 * @exports ColorPickerGrid
 * @exports ColorPickerGridBase
 * @private
 */
import Spottable from '@enact/spotlight/Spottable';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {useCallback} from 'react';

import Skinnable from '../Skinnable';

import {generateOppositeColor, rgbStringToHex} from './utils';

import componentCss from './ColorPickerGrid.module.less';

const SpottableDiv = Spottable('div');

const colors = [
	['#ffffff', '#00374a', '#004d65', '#016e8f', '#008cb4', '#00a1d8', '#01c7fc', '#52d6fc', '#93e3fd', '#cbf0ff'],
	['#ebebeb', '#011d57', '#012f7b', '#0042a9', '#0056d6', '#0061fe', '#3a87fe', '#74a7ff', '#a7c6ff', '#d3e2ff'],
	['#d6d6d6', '#11053b', '#1a0a52', '#2c0977', '#371a94', '#4d22b2', '#5e30eb', '#864ffe', '#b18cfe', '#d9c9fe'],
	['#c2c2c2', '#2e063d', '#450d59', '#61187c', '#7a219e', '#982abc', '#be38f3', '#d357fe', '#e292fe', '#efcaff'],
	['#adadad', '#3c071b', '#551029', '#791a3d', '#99244f', '#b92d5d', '#e63b7a', '#ee719e', '#f4a4c0', '#f9d3e0'],
	['#999999', '#5c0701', '#831100', '#b51a00', '#e22400', '#ff4015', '#ff6250', '#ff8c82', '#ffb5af', '#ffdbd8'],
	['#858585', '#5a1c00', '#7b2900', '#ad3e00', '#da5100', '#ff6a00', '#ff8648', '#ffa57d', '#ffc5ab', '#ffe2d6'],
	['#707070', '#583300', '#7a4a00', '#a96800', '#d38301', '#ffab01', '#feb43f', '#ffc777', '#ffd9a8', '#ffecd4'],
	['#5c5c5c', '#563d00', '#785800', '#a67b01', '#d19d01', '#fdc700', '#fecb3e', '#ffd977', '#fee4a8', '#fff2d5'],
	['#474747', '#666100', '#8d8602', '#c4bc00', '#f5ec00', '#fefb41', '#fff76b', '#fff994', '#fffbb9', '#fefcdd'],
	['#333333', '#4f5504', '#6f760a', '#9ba50e', '#c3d117', '#d9ec37', '#e4ef65', '#eaf28f', '#f2f7b7', '#f7fadb'],
	['#000000', '#263e0f', '#38571a', '#4e7a27', '#669d34', '#76bb40', '#96d35f', '#b1dd8b', '#cde8b5', '#dfeed4']
];

/**
 * The color picker base component which sets-up the component's structure.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within {@link sandstone/ColorPickerGrid|ColorPickerGrid}.
 *
 * @class ColorPickerGridBase
 * @memberof sandstone/ColorPicker
 * @ui
 * @private
 */
const ColorPickerGridBase = (props) => {
	const {className, selectedColorHandler, ...rest} = props;

	const handleClick = useCallback((e) => {
		selectedColorHandler(rgbStringToHex(e.target.style.backgroundColor));
	}, [selectedColorHandler]);

	return (
		<div className={classnames(componentCss.colorPicker, className)} {...rest} >
			{
				colors.map((row, rowIndex) => {
					return (
						<div key={rowIndex}>
							{
								colors[rowIndex].map((color, colorIndex) => {
									return <SpottableDiv className={componentCss.colorBlock} onClick={handleClick} style={{backgroundColor: color, '--sand-colorpicker-grid-focus-border-color': generateOppositeColor(color)}} key={colorIndex} />;
								})
							}
						</div>
					);
				})
			}
		</div>
	);
};

ColorPickerGridBase.displayName = 'ColorPickerGridBase';

ColorPickerGridBase.propTypes = {/** @lends sandstone/ColorPickerGrid.ColorPickerGridBase.prototype */
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
	 * A function to run when the current color changes.
	 *
	 * @type {Function}
	 * @public
	 */
	selectedColorHandler: PropTypes.func
};

/**
 * A color picker component, ready to use in Sandstone applications.
 *
 * @class ColorPickerGrid
 * @memberof sandstone/ColorPicker
 * @extends sandstone/ColorPicker.ColorPickerGridBase
 * @ui
 * @private
 */
const ColorPickerGrid = Skinnable(ColorPickerGridBase);

export default ColorPickerGrid;
export {
	ColorPickerGrid,
	ColorPickerGridBase
};
