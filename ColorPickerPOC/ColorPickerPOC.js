import Spottable from '@enact/spotlight/Spottable';
import {Cell, Column, Row} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {useCallback, useEffect, useRef, useState} from 'react';

import {ButtonBase} from '../Button';
import Icon from '../Icon';
import Popup from '../Popup';
import Skinnable from '../Skinnable';
import TabLayout, {Tab} from '../TabLayout';

import ColorPickerGrid from './ColorPickerGrid';
import ColorPickerSlider, {ColorPickerSliderHSL} from './ColorPickerSlider'; // eslint-disable-line no-unused-vars
import ColorPickerSpectrum from './ColorPickerSpectrum';
import {generateOppositeColor} from './utils';

import componentsCss from './ColorPickerPOC.module.less';

const SpottableButton = Spottable(ButtonBase);

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
		const target = ev.target.id ? ev.target : ev.target.offsetParent;

		shakeEffectRef.current = setTimeout(() => {
			target.classList.add(componentsCss.shakeFavoriteColor);
		}, 300);

		timerRef.current = setTimeout(() => {
			setEditEnabled(true);
			setClickEnabled(false);
			target.classList.remove(componentsCss.shakeFavoriteColor);
		}, 1000);
	}, [editEnabled]);

	const onReleaseHandler = useCallback((ev) => {
		const target = ev.target.id ? ev.target : ev.target.offsetParent;
		target.classList.remove(componentsCss.shakeFavoriteColor);

		clearTimeout(shakeEffectRef.current);
		clearTimeout(timerRef.current);
		setTimeout(() => {
			setClickEnabled(true);
		}, 100);
	}, []);

	return (
		<div>
			<Row className={componentsCss.favoriteColorsRow}>
				<Cell align="end">
					{favoriteColors.slice(4, 8).map((color, index) => {
						return (
							<SpottableButton
								className={componentsCss.favoriteColor}
								id={`${color}-${index + 4}`}
								key={`${color}_${index + 4}`}
								minWidth={false}
								onClick={onSelectFavoriteColor}
								onPointerDown={onPressHandler}
								onPointerUp={onReleaseHandler}
								size="small"
								style={{
									backgroundColor: color,
									borderColor: generateOppositeColor(color),
									color: generateOppositeColor(color)
								}}
							>
								{editEnabled && <Icon className={componentsCss.deleteButton} size={'tiny'}>trash</Icon>}
							</SpottableButton>
						);
					})}
				</Cell>
				<Cell align="end">
					{favoriteColors.slice(0, 4).map((color, index) => {
						return (
							<SpottableButton
								className={componentsCss.favoriteColor}
								id={`${color}-${index}`}
								key={`${color}_${index}`}
								minWidth={false}
								onClick={onSelectFavoriteColor}
								onPointerDown={onPressHandler}
								onPointerUp={onReleaseHandler}
								size="small"
								style={{
									backgroundColor: color,
									borderColor: generateOppositeColor(color),
									color: generateOppositeColor(color)
								}}
							>
								{editEnabled && <Icon className={componentsCss.deleteButton} size={'tiny'}>trash</Icon>}
							</SpottableButton>
						);
					})}
				</Cell>
			</Row>
			<Column align="center" className={componentsCss.selectedColorColumn}>
				<SpottableButton
					className={componentsCss.selectedColor}
					minWidth={false}
					onClick={onAddNewFavoriteColor}
					style={{
						backgroundColor: selectedColor,
						borderColor: generateOppositeColor(selectedColor),
						color: generateOppositeColor(selectedColor)
					}}
				>
					<Icon className={componentsCss.selectedColorIcon} size="large">{editEnabled ? 'check' : 'plus'}</Icon>
				</SpottableButton>
			</Column>
		</div>
	);
};

FavoriteColors.propTypes = {
	colorHandler: PropTypes.func,
	colors: PropTypes.array,
	css: PropTypes.object,
	favoriteColors: PropTypes.array,
	favoriteColorsHandler: PropTypes.func,
	selectedColor: PropTypes.string,
	selectedColorHandler: PropTypes.func
};


const ColorPickerPOCBase = ({color = '#eb4034', colors = [], css, onChangeColor, open, ...rest}) => {
	const [favoriteColors, setFavoriteColors] = useState(colors);
	const [selectedColor, setSelectedColor] = useState(color);

	// useEffect(() => {
	// 	setSelectedColor(color);
	// 	setFavoriteColors(colors);
	// }, [color, colors]);

	useEffect(() => {
		if (selectedColor || favoriteColors) {
			onChangeColor({selectedColor, favoriteColors});
		}
	}, [favoriteColors, onChangeColor, selectedColor]);

	return (
		<Popup open={open} position={'center'} {...rest}>
			<Row>
				<Cell size={'75%'}>
					<TabLayout css={css} orientation={'horizontal'}>
						<Tab style={{width: ri.scaleToRem(400)}} title={'Grid'}>
							<div className={componentsCss.colorPicker}>
								<ColorPickerGrid selectedColorHandler={setSelectedColor} />
							</div>
						</Tab>
						<Tab style={{width: ri.scaleToRem(400)}} title={'Spectrum'}>
							<div className={componentsCss.colorPicker}>
								<ColorPickerSpectrum selectedColor={selectedColor} selectedColorHandler={setSelectedColor} />
							</div>
						</Tab>
						<Tab style={{width: ri.scaleToRem(400)}} title={'Sliders'}>
							<div className={componentsCss.colorPicker}>
								<ColorPickerSlider selectedColor={selectedColor} selectedColorHandler={setSelectedColor} />
								{/* <ColorPickerSliderHSL selectedColor={selectedColor} selectedColorHandler={setSelectedColor} />*/}
							</div>
						</Tab>
					</TabLayout>
				</Cell>
				<Cell align={'end'} size={'25%'}>
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

ColorPickerPOCBase.displayName = 'ColorPickerPOC';
ColorPickerPOCBase.propTypes = {
	color: PropTypes.string,
	colors: PropTypes.array,
	css: PropTypes.object,
	onChangeColor: PropTypes.func,
	open: PropTypes.bool
};

const ColorPickerPOCDecorator = compose(
	Skinnable
);

const ColorPickerPOC = ColorPickerPOCDecorator(ColorPickerPOCBase);

export default ColorPickerPOC;
export {
	ColorPickerPOC,
	ColorPickerPOCBase,
	ColorPickerPOCDecorator
};
