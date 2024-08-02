import Spottable from '@enact/spotlight/Spottable';
import {Cell, Row} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {useCallback, useEffect, useRef, useState} from 'react';

import {Button, ButtonBase} from '../Button';
import Icon from '../Icon';
import Popup from '../Popup';
import Skinnable from '../Skinnable';
import TabLayout, {Tab} from '../TabLayout';

import ColorPickerGrid from './ColorPickerGrid';

import componentsCss from './ColorPickerPOC.module.less';

const SpottableButton = Spottable(ButtonBase);

const FavoriteColors = ({colorHandler, colors = [], selectedColor = '#3455eb', selectedColorHandler}) => {
	const [favoriteColors, setFavoriteColors] = useState(colors);
	const [editMode, setEditMode] = useState(false);
	const timerRef = useRef(null);

	const onSelectFavoriteColor = useCallback((ev) => {
		if (editMode) {
			const target = ev.target.offsetParent.id;
			const [buttonColor, buttonIndex] = target.split('-');
			setFavoriteColors(prevState =>
				prevState.filter((stateColor, index) =>
					!(stateColor === buttonColor && index === Number(favoriteColors.length - buttonIndex - 1))));
			return;
		}
		const color = ev.target.offsetParent.id;
		selectedColorHandler(color);
		colorHandler({currentColor: color, favoriteColors});
	}, [colorHandler, editMode, favoriteColors, selectedColorHandler]);

	const addNewFavoriteColor = useCallback(() => {
		if (favoriteColors.length > 6) favoriteColors.shift();

		setFavoriteColors(prevState => {
			const colorsState = [...prevState, selectedColor];
			colorHandler({selectedColor, favoriteColors: colorsState});

			return colorsState;
		});
	}, [colorHandler, favoriteColors, selectedColor]);

	const onAddNewFavoriteColor = useCallback(() => {
		if (editMode) {
			setEditMode(false);
			return;
		}
		if (!document.startViewTransition) {
			addNewFavoriteColor();
			return;
		}

		document.startViewTransition(() => {
			addNewFavoriteColor();
		});
	}, [addNewFavoriteColor, editMode]);

	const onMouseDown = useCallback(() => {
		timerRef.current = setTimeout(() => {
			setEditMode(true);
		}, 1000);

	}, [timerRef]);

	const onMouseUp = useCallback(() => {
		clearTimeout(timerRef.current);
	}, []);

	return (
		<div>
			<Row className={componentsCss.presetColorsRow}>
				<Cell align={'end'}>
					{favoriteColors.length >= 4 && <Button backgroundOpacity={'opaque'} className={componentsCss.addButton} onClick={onAddNewFavoriteColor} size={'small'} style={{marginInline: 0}} roundBorder icon={'plus'} />}
					{favoriteColors.slice(4, 8).map((color, index) => {
						return (
							<SpottableButton
								className={componentsCss.presetColor}
								id={`${color}-${index}`}
								onMouseDown={onMouseDown}
								onMouseUp={onMouseUp}
								key={`${color}_${index}`}
								minWidth={false}
								onClick={onSelectFavoriteColor}
								size={'small'}
								style={{backgroundColor: color, marginInline: 0}}
							>
								{editMode && <Icon className={componentsCss.deleteButton} size={'tiny'}>trash</Icon>}
							</SpottableButton>
						);
					})}
				</Cell>
				<Cell align={'end'}>
					{favoriteColors.length < 6 &&
						<Button
							backgroundOpacity={'opaque'}
							className={componentsCss.addButton}
							icon={editMode ? 'check' : 'plus'}
							onClick={onAddNewFavoriteColor}
							roundBorder
							size={'small'}
							style={{marginInline: 0}}
						/>
					}
					{favoriteColors.slice(0, 4).reverse().map((color, index) => {
						return (
							<SpottableButton
								className={componentsCss.presetColor}
								id={`${color}-${index}`}
								onMouseDown={onMouseDown}
								onMouseUp={onMouseUp}
								key={`${color}_${index}`}
								minWidth={false}
								onClick={onSelectFavoriteColor}
								size={'small'}
								style={{backgroundColor: color, marginInline: 0}}
							>
								{editMode && <Icon className={css.deleteButton} size={'tiny'}>trash</Icon>}
							</SpottableButton>
						);
					})}
				</Cell>
			</Row>
			<Row className={componentsCss.presetColorsRow}>
				<Cell>
					<SpottableButton minWidth={false} className={componentsCss.currentColor} style={{backgroundColor: selectedColor, marginInline: 0}} />
				</Cell>
			</Row>
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


const ColorPickerPOCBase = ({color, colors = [], css, onChangeColor, open, ...rest}) => {
	const [selectedColor, setSelectedColor] = useState(color);

	useEffect(() => {
		if (selectedColor) {
			onChangeColor({currentColor: selectedColor});
		}
	}, [onChangeColor, selectedColor]);

	return (
		<Popup open={open} position={'center'} {...rest}>
			<Row>
				<Cell size={'80%'}>
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
				<Cell align={'end'} size={'20%'}>
					<FavoriteColors colors={colors} css={css} selectedColor={selectedColor} selectedColorHandler={setSelectedColor} colorHandler={onChangeColor} />
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
