import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import {Cell, Row} from '@enact/ui/Layout';
import Toggleable from '@enact/ui/Toggleable';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {useCallback, useState} from 'react';

import {Button, ButtonBase} from '../Button';
import Popup from '../Popup';
import Skinnable from '../Skinnable';
import TabLayout, {Tab} from '../TabLayout';

import componentsCss from './ColorPickerPOC.module.less';

const SpottableButton = Spottable(ButtonBase);

const FavoriteColors = ({colorHandler, colors = [], css, selectedColor = '#3455eb'}) => {
	const [currentColor, setCurrentColor] = useState(selectedColor);
	const [favoriteColors, setFavoriteColors] = useState(colors);

	const onSelectFavoriteColor = useCallback((ev) => {
		const color = ev.target.offsetParent.id;
		setCurrentColor(color);

		colorHandler({currentColor: color, favoriteColors});
	}, [colorHandler, favoriteColors]);

	const addNewFavoriteColor = useCallback(() => {
		if (favoriteColors.length > 6) favoriteColors.shift();

		setFavoriteColors(prevState => {
			const colorsState = [...prevState, selectedColor];
			colorHandler({currentColor, favoriteColors: colorsState});

			return colorsState;
		});
	}, [colorHandler, currentColor, favoriteColors, selectedColor]);

	const onAddNewFavoriteColor = useCallback(() => {
		if (!document.startViewTransition) {
			addNewFavoriteColor();
			return;
		}

		document.startViewTransition(() => {
			addNewFavoriteColor();
		});
	}, [addNewFavoriteColor]);

	return (
		<div>
			<Row className={css.presetColorsRow}>
				<Cell align={'end'}>
					{favoriteColors.length >= 4 && <Button backgroundOpacity={'opaque'} className={css.addButton} onClick={onAddNewFavoriteColor} size={'small'} style={{marginInline: 0}} roundBorder icon={'plus'} />}
					{favoriteColors.slice(4, 8).map((color, index) => {
						return (
							<SpottableButton key={color + '_' + index} id={color} minWidth={false} onClick={onSelectFavoriteColor} className={css.presetColor} size={'small'} style={{backgroundColor: color, marginInline: 0}} />
						);
					})}
				</Cell>
				<Cell align={'end'}>
					{favoriteColors.length < 4 && <Button backgroundOpacity={'opaque'} className={css.addButton} onClick={onAddNewFavoriteColor} size={'small'} style={{marginInline: 0}} roundBorder icon={'plus'} />}
					{favoriteColors.slice(0, 4).reverse().map((color, index) => {
						return (
							<SpottableButton key={color + '_' + index} id={color} minWidth={false} onClick={onSelectFavoriteColor} className={css.presetColor} size={'small'} style={{backgroundColor: color, marginInline: 0}} />
						);
					})}
				</Cell>
			</Row>
			<Row className={css.presetColorsRow}>
				<Cell>
					<SpottableButton minWidth={false} className={css.currentColor} style={{backgroundColor: currentColor, marginInline: 0}} />
				</Cell>
			</Row>
		</div>
	);
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

	render: ({color, open, colors, css, onChangeColor, ...rest}) => {

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
