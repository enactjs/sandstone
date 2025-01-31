/**
 * Sandstone component that allows the user to choose a color
 * either from a grid, a spectrum, or RGB/HSL color sliders.
 *
 * @example
 * <ColorPicker
 *     open
 * />
 *
 * @module sandstone/ColorPicker
 * @exports ColorPicker
 * @exports ColorPickerBase
 * @public
 */
import Spottable from '@enact/spotlight/Spottable';
import {Cell, Row} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useRef, useState} from 'react';

import {ButtonBase} from '../Button';
import Icon from '../Icon';
import Popup from '../Popup';
import Skinnable from '../Skinnable';
import TabGroup from '../TabLayout/TabGroup';

import ColorPickerGrid from './ColorPickerGrid';
import ColorPickerSlider from './ColorPickerSlider';
import ColorPickerSpectrum from './ColorPickerSpectrum';
import {generateOppositeColor} from './utils';

import componentCss from './ColorPicker.module.less';

const SpottableButton = Spottable(ButtonBase);

const defaultColors = ['#eb4034', '#32a852', '#3455eb'];

/**
 * The favorite colors component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within {@link sandstone/ColorPicker|ColorPicker}.
 *
 * @class FavoriteColors
 * @memberof sandstone/ColorPicker
 * @ui
 * @private
 */
const FavoriteColors = ({disabled, favoriteColors = [], favoriteColorsHandler, selectedColor = '#3455eb', selectedColorHandler}) => {
	const [clickEnabled, setClickEnabled] = useState(true);
	const [editEnabled, setEditEnabled] = useState(false);

	const shakeEffectRef = useRef(null);
	const timerRef = useRef(null);

	const addNewFavoriteColor = useCallback(() => {
		if (disabled) return;
		if (favoriteColors.includes(selectedColor)) return;
		favoriteColorsHandler(() => {
			const colorsState = [...favoriteColors, selectedColor];
			if (colorsState.length > 8) colorsState.shift();

			return colorsState;
		});
	}, [disabled, favoriteColors, favoriteColorsHandler, selectedColor]);

	const onAddNewFavoriteColor = useCallback(() => {
		if (disabled) return;
		if (editEnabled) {
			setEditEnabled(false);
			return;
		}
		addNewFavoriteColor();
	}, [addNewFavoriteColor, disabled, editEnabled]);

	const onSelectFavoriteColor = useCallback((ev) => {
		if (disabled) return;
		if (!clickEnabled) return;
		const targetId = ev.target.offsetParent.id || ev.target.id;
		const [buttonColor, buttonIndex] = targetId.split('-');

		if (editEnabled && clickEnabled) {
			const filteredColors = favoriteColors.filter((color, index) => {
				return 	!(color === buttonColor && index === Number(buttonIndex));
			});

			favoriteColorsHandler(filteredColors);
			selectedColorHandler(selectedColor);
			return;
		}

		favoriteColorsHandler(favoriteColors);
		selectedColorHandler(buttonColor);
	}, [clickEnabled, disabled, editEnabled, favoriteColors, favoriteColorsHandler, selectedColor, selectedColorHandler]);

	const onPressHandler = useCallback((ev) => {
		if (disabled) return;
		if (editEnabled) return;
		if (ev.type === 'pointerdown' || (ev.type === 'keydown' && ev.keyCode === 13)) {
			const target = ev.target.id ? ev.target : ev.target.offsetParent;

			shakeEffectRef.current = setTimeout(() => {
				target.classList.add(componentCss.shakeFavoriteColor);
			}, 300);

			timerRef.current = setTimeout(() => {
				setEditEnabled(true);
				setClickEnabled(false);
				target.classList.remove(componentCss.shakeFavoriteColor);
			}, 1000);
		}
	}, [disabled, editEnabled]);

	const onReleaseHandler = useCallback((ev) => {
		const target = ev.target.id ? ev.target : ev.target.offsetParent;
		target.classList.remove(componentCss.shakeFavoriteColor);

		clearTimeout(shakeEffectRef.current);
		clearTimeout(timerRef.current);
		setTimeout(() => {
			setClickEnabled(true);
		}, 100);
	}, []);

	return (
		<div>
			<Row className={componentCss.favoriteColorsRow}>
				<Cell align="end">
					{favoriteColors.slice(4, 8).map((color, index) => {
						return (
							<SpottableButton
								className={componentCss.favoriteColor}
								id={`${color}-${index + 4}`}
								key={`${color}_${index + 4}`}
								minWidth={false}
								onClick={onSelectFavoriteColor}
								onKeyDown={onPressHandler}
								onKeyUp={onReleaseHandler}
								onPointerDown={onPressHandler}
								onPointerUp={onReleaseHandler}
								size="small"
								spotlightDisabled={disabled}
								style={{
									backgroundColor: color,
									borderColor: generateOppositeColor(color),
									color: generateOppositeColor(color)
								}}
							>
								{editEnabled && <Icon className={componentCss.deleteButton} size="tiny">trash</Icon>}
							</SpottableButton>
						);
					})}
				</Cell>
				<Cell align="end">
					{favoriteColors.slice(0, 4).map((color, index) => {
						return (
							<SpottableButton
								className={componentCss.favoriteColor}
								id={`${color}-${index}`}
								key={`${color}_${index}`}
								minWidth={false}
								onClick={onSelectFavoriteColor}
								onKeyDown={onPressHandler}
								onKeyUp={onReleaseHandler}
								onPointerDown={onPressHandler}
								onPointerUp={onReleaseHandler}
								size="small"
								spotlightDisabled={disabled}
								style={{
									backgroundColor: color,
									borderColor: generateOppositeColor(color),
									color: generateOppositeColor(color)
								}}
							>
								{editEnabled && <Icon className={componentCss.deleteButton} size="tiny">trash</Icon>}
							</SpottableButton>
						);
					})}
				</Cell>
			</Row>
			<Row className={componentCss.selectedColorContainer}>
				<SpottableButton
					className={componentCss.selectedColor}
					minWidth={false}
					onClick={onAddNewFavoriteColor}
					spotlightDisabled={disabled}
					style={{
						backgroundColor: selectedColor,
						borderColor: generateOppositeColor(selectedColor),
						color: generateOppositeColor(selectedColor)
					}}
				>
					<Icon className={componentCss.selectedColorIcon} size="large">{editEnabled ? 'check' : 'plus'}</Icon>
				</SpottableButton>
			</Row>
		</div>
	);
};

FavoriteColors.displayName = 'FavoriteColors';

FavoriteColors.propTypes = {
	/**
	 * Applies a disabled style and prevents interacting with the component.
	 *
	 * @type {Boolean}
	 * @default false
	 * @private
	 */
	disabled: PropTypes.bool,

	/**
	 * Contains an array with the favorite colors.
	 *
	 * @type {Array}
	 * @private
	 */
	favoriteColors: PropTypes.array,

	/**
	 * Called when the favorite colors array is modified.
	 *
	 * @type {Function}
	 * @private
	 */
	favoriteColorsHandler: PropTypes.func,

	/**
	 * Indicates the selected color.
	 *
	 * @type {String}
	 * @private
	 */
	selectedColor: PropTypes.string,

	/**
	 * Called when the selected color is modified.
	 *
	 * @type {Function}
	 * @private
	 */
	selectedColorHandler: PropTypes.func
};

/**
 * The color picker base component which sets-up the component's structure.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within {@link sandstone/ColorPicker|ColorPicker}.
 *
 * @class ColorPickerBase
 * @memberof sandstone/ColorPicker
 * @ui
 * @public
 */
const ColorPickerBase = ({color = '#eb4034', colors = defaultColors, disabled, onChangeColor, open, type = 'grid', ...rest}) => {
	const [favoriteColors, setFavoriteColors] = useState(colors);
	const [selectedColor, setSelectedColor] = useState(color);
	const [tabLayoutIndex, setTabLayoutIndex] = useState(0);

	useEffect(() => {
		setFavoriteColors(colors);
		setSelectedColor(color);

		switch (type) {
			case 'grid':
				setTabLayoutIndex(0);
				return;
			case 'spectrum':
				setTabLayoutIndex(1);
				return;
			case 'sliders':
				setTabLayoutIndex(2);
				return;
			default:
				setTabLayoutIndex(0);
		}
	}, [color, colors, type]);

	const handleFavouriteColors = useCallback(favColors => {
		const parameterType = typeof (favColors);
		let newFavouriteColors = {};

		switch (parameterType) {
			case 'function':
				newFavouriteColors = favColors();
				break;
			case 'object':
				newFavouriteColors = favColors;
				break;
			default:
				break;
		}

		setFavoriteColors(newFavouriteColors);
		if (onChangeColor) onChangeColor({selectedColor, favoriteColors: newFavouriteColors});
	}, [onChangeColor, selectedColor]);

	const handleGridClick = useCallback(() => {
		if (disabled) return;
		setTabLayoutIndex(0);
	}, [disabled, setTabLayoutIndex]);

	const handleSelectedColor = useCallback(newColor => {
		setSelectedColor((actualColor) => {
			if (actualColor === newColor)  return actualColor;
			if (onChangeColor) onChangeColor({selectedColor: newColor, favoriteColors});

			return newColor;
		});
	}, [onChangeColor, favoriteColors]);

	const handleSlidersClick = useCallback(() => {
		if (disabled) return;
		setTabLayoutIndex(2);
	}, [disabled, setTabLayoutIndex]);

	const handleSpectrumClick = useCallback(() => {
		if (disabled) return;
		setTabLayoutIndex(1);
	}, [disabled, setTabLayoutIndex]);

	const renderContent = () => {
		if (tabLayoutIndex === 0) {
			return (
				<ColorPickerGrid disabled={disabled} selectedColorHandler={handleSelectedColor} />
			);
		} else if (tabLayoutIndex === 1) {
			return (
				<ColorPickerSpectrum disabled={disabled} selectedColor={selectedColor} selectedColorHandler={handleSelectedColor} />
			);
		} else if (tabLayoutIndex === 2) {
			return (
				<ColorPickerSlider disabled={disabled} selectedColor={selectedColor} selectedColorHandler={handleSelectedColor} />
			);
		}
	};

	return (
		<Popup disabled={disabled} open={open} position="center" {...rest}>
			<Row>
				<Cell size="75%">
					<TabGroup
						className={componentCss.pickerTabGroup}
						tabs={[
							{title: 'Grid', onTabClick: handleGridClick},
							{title: 'Spectrum', onTabClick: handleSpectrumClick},
							{title: 'Sliders', onTabClick: handleSlidersClick}
						]}
						orientation="horizontal"
					/>
					<div className={componentCss.colorPicker}>
						{renderContent()}
					</div>
				</Cell>
				<Cell align="end" size="25%">
					<FavoriteColors
						disabled={disabled}
						favoriteColors={favoriteColors}
						favoriteColorsHandler={handleFavouriteColors}
						selectedColor={selectedColor}
						selectedColorHandler={handleSelectedColor}
					/>
				</Cell>
			</Row>
		</Popup>
	);
};

ColorPickerBase.displayName = 'ColorPicker';

ColorPickerBase.propTypes = {/** @lends sandstone/ColorPicker.ColorPickerBase.prototype */
	/**
	 * Indicates the selected color.
	 *
	 * @type {String}
	 * @public
	 */
	color: PropTypes.string,

	/**
	 * Contains an array with colors.
	 *
	 * @type {Array}
	 * @public
	 */
	colors: PropTypes.array,

	/**
	 * Applies a disabled style and prevents interacting with the component.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	disabled: PropTypes.bool,

	/**
	 * Called when the selected color is modified.
	 *
	 * @type {Function}
	 * @public
	 */
	onChangeColor: PropTypes.func,

	/**
	 * Controls the visibility of the ColorPicker.
	 *
	 * By default, the ColorPicker and its contents are not rendered until `open`.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	open: PropTypes.bool,

	/**
	 * Set the type of color picker to use.
	 *
	 * @type {('grid'|'spectrum'|'sliders')}
	 * @default 'grid'
	 * @public
	 */
	type: PropTypes.oneOf(['grid', 'spectrum', 'sliders'])
};

/**
 * A color picker component, ready to use in Sandstone applications.
 *
 * @class ColorPicker
 * @memberof sandstone/ColorPicker
 * @extends sandstone/ColorPicker.ColorPickerBase
 * @ui
 * @public
 */
const ColorPicker = Skinnable(ColorPickerBase);

export default ColorPicker;
export {
	ColorPicker,
	ColorPickerBase,
	FavoriteColors
};
