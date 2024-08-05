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
import {generateOppositeColor} from './utils';

import componentsCss from './ColorPickerPOC.module.less';

const SpottableButton = Spottable(ButtonBase);

const FavoriteColors = ({colorHandler, colors = [], selectedColor = '#3455eb', selectedColorHandler}) => {
	const [clickEnabled, setClickEnabled] = useState(true);
	const [editMode, setEditMode] = useState(false);
	const [favoriteColors, setFavoriteColors] = useState(colors);

	const timerRef = useRef(null);

	const addNewFavoriteColor = useCallback(() => {
		if (favoriteColors.includes(selectedColor)) return;
		setFavoriteColors(prevState => {
			const colorsState = [...prevState, selectedColor];
			if (colorsState.length > 8) colorsState.shift();
			colorHandler({selectedColor, favoriteColors: colorsState});

			return colorsState;
		});
	}, [colorHandler, favoriteColors, selectedColor]);

	const onAddNewFavoriteColor = useCallback(() => {
		if (editMode) {
			setEditMode(false);
			return;
		}
		addNewFavoriteColor();
	}, [addNewFavoriteColor, editMode]);

	const onSelectFavoriteColor = useCallback((ev) => {
		if (!clickEnabled) return;
		const target = ev.target.offsetParent.id || ev.target.id;
		const [buttonColor, buttonIndex] = target.split('-');
		if (editMode && clickEnabled) {
			setFavoriteColors(prevState =>
				prevState.filter((stateColor, index) => {
					return 	!(stateColor === buttonColor && index === Number(buttonIndex))
				}))
			return;
		}
		selectedColorHandler(buttonColor);
		colorHandler({currentColor: buttonColor, favoriteColors});
	}, [clickEnabled, colorHandler, editMode, favoriteColors, selectedColorHandler]);

	const onMouseDown = useCallback(() => {
		timerRef.current = setTimeout(() => {
			setEditMode(true);
			setClickEnabled(false);
		}, 1000);
	}, []);

	const onMouseUp = useCallback(() => {
		clearTimeout(timerRef.current);
		setTimeout(() => {
			setClickEnabled(true);
		}, 100);
	}, []);

	return (
		<div>
			<Row className={componentsCss.favoriteColorsRow}>
				<Cell align={'end'}>
					{favoriteColors.slice(4, 8).map((color, index) => {
						return (
							<SpottableButton
								className={componentsCss.favoriteColor}
								id={`${color}-${index + 4}`}
								key={`${color}_${index + 4}`}
								minWidth={false}
								onClick={onSelectFavoriteColor}
								onMouseDown={onMouseDown}
								onMouseUp={onMouseUp}
								onSpotlightDown={onSelectFavoriteColor}
								size={'small'}
								style={{
									backgroundColor: color,
									borderColor: generateOppositeColor(color),
									color: generateOppositeColor(color)
								}}
							>
								{editMode && <Icon className={componentsCss.deleteButton} size={'tiny'}>trash</Icon>}
							</SpottableButton>
						);
					})}
				</Cell>
				<Cell align={'end'}>
					{favoriteColors.slice(0, 4).map((color, index) => {
						return (
							<SpottableButton
								className={componentsCss.favoriteColor}
								id={`${color}-${index}`}
								key={`${color}_${index}`}
								minWidth={false}
								onClick={onSelectFavoriteColor}
								onMouseDown={onMouseDown}
								onMouseUp={onMouseUp}
								size={'small'}
								style={{
									backgroundColor: color,
									borderColor: generateOppositeColor(color),
									color: generateOppositeColor(color)
								}}
							>
								{editMode && <Icon className={componentsCss.deleteButton} size={'tiny'}>trash</Icon>}
							</SpottableButton>
						);
					})}
				</Cell>
			</Row>
			<Column align={'center'}>
				<SpottableButton
					className={componentsCss.currentColor}
					minWidth={false}
					onClick={onAddNewFavoriteColor}
					onSpotlightDown={onAddNewFavoriteColor}
					style={{
						backgroundColor: selectedColor,
						borderColor: generateOppositeColor(selectedColor),
						color: generateOppositeColor(selectedColor)
					}}
				>
					<Icon size={'large'}>{editMode ? 'check' : 'plus'}</Icon>
				</SpottableButton>
			</Column>
		</div>
	);
};

FavoriteColors.propTypes = {
	colorHandler: PropTypes.func,
	colors: PropTypes.array,
	css: PropTypes.object,
	selectedColor: PropTypes.string,
	selectedColorHandler: PropTypes.func
};


const ColorPickerPOCBase = ({color = '#eb4034', colors = [], css, onChangeColor, open, ...rest}) => {
	const [selectedColor, setSelectedColor] = useState(color);

	useEffect(() => {
		if (selectedColor) {
			onChangeColor({currentColor: selectedColor});
		}
	}, [onChangeColor, selectedColor]);

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
								Spectrum
							</div>
						</Tab>
						<Tab style={{width: ri.scaleToRem(400)}} title={'Sliders'}>
							<div className={componentsCss.colorPicker}>
								Sliders
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
