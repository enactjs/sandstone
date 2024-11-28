/**
 * Sandstone component that allows the user to choose a color
 * either from a grid, or a spectrum, or RGB/HSL color sliders.
 *
 * @example
 * <ColorPicker
 * 	 colorHandler={onChangeColor}
 * 	 colors=["#eb4034", "#32a852", "#3455eb"]
 * 	 open
 * 	 selectedColor="#eb4034"
 * />
 *
 * @module sandstone/ColorPicker
 * @exports ColorPicker
 * @exports ColorPickerBase
 * @private
 */
import Spottable from '@enact/spotlight/Spottable';
import {Cell, Column, Row} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useRef, useState} from 'react';

import {ButtonBase} from '../Button';
import Icon from '../Icon';
import Popup from '../Popup';
import Skinnable from '../Skinnable';
import TabLayout, {Tab} from '../TabLayout';

import ColorPickerGrid from './ColorPickerGrid';
import ColorPickerSlider from './ColorPickerSlider';
import ColorPickerSpectrum from './ColorPickerSpectrum';
import {generateOppositeColor} from './utils';

import componentCss from './ColorPicker.module.less';

const SpottableButton = Spottable(ButtonBase);

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
const FavoriteColors = ({favoriteColors = [], favoriteColorsHandler, selectedColor = '#3455eb', selectedColorHandler}) => {
	const [clickEnabled, setClickEnabled] = useState(true);
	const [editEnabled, setEditEnabled] = useState(false);

	const shakeEffectRef = useRef(null);
	const timerRef = useRef(null);

	const addNewFavoriteColor = useCallback(() => {
		if (favoriteColors.includes(selectedColor)) return;
		favoriteColorsHandler(() => {
			const colorsState = [...favoriteColors, selectedColor];
			if (colorsState.length > 8) colorsState.shift();

			return colorsState;
		});
	}, [favoriteColors, favoriteColorsHandler, selectedColor]);

	const onAddNewFavoriteColor = useCallback(() => {
		if (editEnabled) {
			setEditEnabled(false);
			return;
		}
		addNewFavoriteColor();
	}, [addNewFavoriteColor, editEnabled]);

	const onSelectFavoriteColor = useCallback((ev) => {
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
	}, [clickEnabled, editEnabled, favoriteColors, favoriteColorsHandler, selectedColor, selectedColorHandler]);

	const onPressHandler = useCallback((ev) => {
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
	}, [editEnabled]);

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
								style={{
									backgroundColor: color,
									borderColor: generateOppositeColor(color),
									color: generateOppositeColor(color)
								}}
							>
								{editEnabled && <Icon className={componentCss.deleteButton} size={'tiny'}>trash</Icon>}
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
								style={{
									backgroundColor: color,
									borderColor: generateOppositeColor(color),
									color: generateOppositeColor(color)
								}}
							>
								{editEnabled && <Icon className={componentCss.deleteButton} size={'tiny'}>trash</Icon>}
							</SpottableButton>
						);
					})}
				</Cell>
			</Row>
			<Column align="center" className={componentCss.selectedColorColumn}>
				<SpottableButton
					className={componentCss.selectedColor}
					minWidth={false}
					onClick={onAddNewFavoriteColor}
					style={{
						backgroundColor: selectedColor,
						borderColor: generateOppositeColor(selectedColor),
						color: generateOppositeColor(selectedColor)
					}}
				>
					<Icon className={componentCss.selectedColorIcon} size="large">{editEnabled ? 'check' : 'plus'}</Icon>
				</SpottableButton>
			</Column>
		</div>
	);
};

FavoriteColors.displayName = 'FavoriteColors';

FavoriteColors.propTypes = {
	/**
	 * Called when color is modified.
	 *
	 * @type {Function}
	 * @private
	 */
	colorHandler: PropTypes.func,

	/**
	 * Contains an array with colors.
	 *
	 * @type {Array}
	 * @public
	 */
	colors: PropTypes.array,

	/**
	 * Contains an array with the favorite colors.
	 *
	 * @type {Array}
	 * @public
	 */
	favoriteColors: PropTypes.array,

	/**
	 * Called when the favorite color is modified.
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
const ColorPickerBase = ({color = '#eb4034', colors = [], css, onChangeColor, open, ...rest}) => {
	const [favoriteColors, setFavoriteColors] = useState(colors);
	const [selectedColor, setSelectedColor] = useState(color);

	useEffect(() => {
		setFavoriteColors(colors);
		setSelectedColor(color);
	}, [color, colors]);

	useEffect(() => {
		if (selectedColor || favoriteColors) {
			onChangeColor({selectedColor, favoriteColors});
		}
	}, [favoriteColors, onChangeColor, selectedColor]);

	return (
		<Popup open={open} position="center" {...rest}>
			<Row>
				<Cell size="75%">
					<TabLayout className={componentCss.pickerTabLayout} css={css} orientation="horizontal">
						<Tab style={{width: ri.scaleToRem(400)}} title="Grid">
							<div className={componentCss.colorPicker}>
								<ColorPickerGrid selectedColorHandler={setSelectedColor} />
							</div>
						</Tab>
						<Tab style={{width: ri.scaleToRem(400)}} title="Spectrum">
							<div className={componentCss.colorPicker}>
								<ColorPickerSpectrum selectedColor={selectedColor} selectedColorHandler={setSelectedColor} />
							</div>
						</Tab>
						<Tab style={{width: ri.scaleToRem(400)}} title="Sliders">
							<div className={componentCss.colorPicker}>
								<ColorPickerSlider selectedColor={selectedColor} selectedColorHandler={setSelectedColor} />
							</div>
						</Tab>
					</TabLayout>
				</Cell>
				<Cell align="end" size="25%">
					<Column>
						<FavoriteColors
							colorHandler={onChangeColor}
							colors={colors}
							css={css}
							favoriteColors={favoriteColors}
							favoriteColorsHandler={setFavoriteColors}
							selectedColor={selectedColor}
							selectedColorHandler={setSelectedColor}
						/>
					</Column>
				</Cell>
			</Row>
		</Popup>
	);
};

ColorPickerBase.displayName = 'ColorPicker';

ColorPickerBase.propTypes = {/** @lends sandstone/ColorPicker.ColorPickerBase.prototype */
	/**
	 * Indicates the color.
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
	 * Customizes the component by mapping the supplied collection of CSS class names to the
	 * corresponding internal elements and states of this component.
	 *
	 * @type {Object}
	 * @public
	 */
	css: PropTypes.object,

	/**
	 * Called when color is modified.
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
	open: PropTypes.bool
};

const ColorPicker = Skinnable(ColorPickerBase);

export default ColorPicker;
export {
	ColorPicker,
	ColorPickerBase
};
