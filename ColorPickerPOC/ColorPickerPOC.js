import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import {Cell, Row} from '@enact/ui/Layout';
import Toggleable from '@enact/ui/Toggleable';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {useCallback, useRef, useState} from 'react';

import {Button, ButtonBase} from '../Button';
import Icon from '../Icon';
import Popup from '../Popup';
import Skinnable from '../Skinnable';
import TabLayout, {Tab} from '../TabLayout';

import componentsCss from './ColorPickerPOC.module.less';

const SpottableButton = Spottable(ButtonBase);

const FavoriteColors = ({colorHandler, colors = [], css, selectedColor = '#3455eb'}) => {
	const [currentColor, setCurrentColor] = useState(selectedColor);
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
		setCurrentColor(color);

		colorHandler({currentColor: color, favoriteColors});
	}, [colorHandler, favoriteColors, editMode]);

	const addNewFavoriteColor = useCallback(() => {
		if (favoriteColors.length > 10) favoriteColors.shift();

		setFavoriteColors(prevState => {
			const colorsState = [...prevState, selectedColor];
			colorHandler({currentColor, favoriteColors: colorsState});

			return colorsState;
		});
	}, [colorHandler, currentColor, favoriteColors, selectedColor]);

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
			<Row className={css.presetColorsRow}>
				<Cell align={'end'}>
					{favoriteColors.slice(4, 8).map((color, index) => {
						return (
							<SpottableButton
								className={css.presetColor}
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
				<Cell align={'end'}>
					{favoriteColors.length < 6 &&
						<Button
							backgroundOpacity={'opaque'}
							className={css.addButton}
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
								className={css.presetColor}
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
			<Row className={css.presetColorsRow}>
				<Cell>
					<div
						className={css.currentColor}
						// minWidth={false}
						style={{backgroundColor: currentColor}}
					/>
				</Cell>
			</Row>
		</div>
	);
};

FavoriteColors.propTypes = {
	colorHandler: PropTypes.func,
	colors: PropTypes.array,
	css: PropTypes.object,
	selectedColor: PropTypes.string
};

const ColorPickerPOCBase = kind({
	name: 'ColorPickerPOC',

	functional: true,

	propTypes: {
		color: PropTypes.string,
		colors: PropTypes.array,
		css: PropTypes.object,
		favoriteColors: PropTypes.array,
		onChangeColor: PropTypes.func,
		onToggleColorPicker: PropTypes.func,
		open: PropTypes.bool
	},

	handlers: {
		handleOpenPopup: (ev, {onToggleColorPicker}) => {
			onToggleColorPicker();
		}
	},

	styles: {
		css: componentsCss
	},

	render: ({color, open, colors, css, onChangeColor}) => {

		return (
			<Popup open={open} position={'center'}>
				<Row>
					<Cell size={'80%'}>
						<TabLayout css={css} orientation={'horizontal'}>
							<Tab style={{width: ri.scaleToRem(400)}} title={'Grid'}>
								<div className={css.colorPicker}>
									Grid
								</div>
							</Tab>
							<Tab style={{width: ri.scaleToRem(400)}} title={'Spectrum'}>
								<div className={css.colorPicker}>
									Spectrum
								</div>
							</Tab>
							<Tab style={{width: ri.scaleToRem(400)}} title={'Sliders'}>
								<div className={css.colorPicker}>
									Sliders
								</div>
							</Tab>
						</TabLayout>
					</Cell>
					<Cell align={'end'} size={'20%'}>
						<FavoriteColors colors={colors} selectedColor={color} css={css} colorHandler={onChangeColor} />
					</Cell>
				</Row>
			</Popup>
		);
	}
});

const ColorPickerPOCDecorator = compose(
	Skinnable,
	Toggleable({prop: 'colorPickerOpen', toggle: 'onToggleColorPicker'})
);

const ColorPickerPOC = ColorPickerPOCDecorator(ColorPickerPOCBase);

export default ColorPickerPOC;
export {
	ColorPickerPOC,
	ColorPickerPOCBase,
	ColorPickerPOCDecorator
};
