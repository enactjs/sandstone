// this component has been added as an alternative of built-in HTML color picker which does not work in webos environment
import Button from '@enact/sandstone/Button';
import {ColorPicker as SandstoneColorPicker} from '@enact/sandstone/ColorPicker';
import Scroller from '@enact/sandstone/Scroller';
import LS2Request from '@enact/webos/LS2Request';
import {useCallback, useContext} from 'react';

import {AppContext} from './constants';
import {generateStylesheet} from '../utils/generateStylesheet';

import css from './CustomStoryDecorator.module.less';

const request = new LS2Request();

export const CustomStoryDecorator = () => {
	const {context, setContext} = useContext(AppContext);
	const {componentBackgroundColor, focusBackgroundColor, popupBackgroundColor, subtitleTextColor, textColor} = context;

	const onColorChange = useCallback((color, newColor) => {
		// a copy of the context object is created
		const newContext = Object.assign({}, context);
		// update the color value on the newly created object with what gets received from `event` (handleBackgroundColor, handleFocusBgColor...)
		newContext[color] = newColor;
		// generate the new stylesheet based on the updated color
		newContext.colors = generateStylesheet(
			newContext.componentBackgroundColor,
			newContext.focusBackgroundColor,
			newContext.popupBackgroundColor,
			newContext.subtitleTextColor,
			newContext.textColor
		);
		setContext(newContext);

		request.send({
			service: 'luna://com.webos.service.settings/',
			method: 'setSystemSettings',
			parameters: {
				category: 'customUi',
				settings: {
					theme: JSON.stringify(newContext)
				}
			},
			onSuccess: () => {
				console.log('setSystemSettings onSuccess'); // eslint-disable-line no-console
			}
		});
	}, [context, setContext]);

	const handleComponentBgColor = useCallback((ev) => {
		onColorChange('componentBackgroundColor', ev);
	}, [onColorChange]);
	const handleFocusBgColor = useCallback((ev) => {
		onColorChange('focusBackgroundColor', ev);
	}, [onColorChange]);
	const handlePopupBgColor = useCallback((ev) => {
		onColorChange('popupBackgroundColor', ev);
	}, [onColorChange]);
	const handleTextColor = useCallback((ev) => {
		onColorChange('textColor', ev);
	}, [onColorChange]);
	const handleSubTextColor = useCallback((ev) => {
		onColorChange('subtitleTextColor', ev);
	}, [onColorChange]);

	const handleResetButton = useCallback(() => {
		// a copy of the context object is created
		const newContext = Object.assign({}, context);
		// generate the new stylesheet with default sandstone colors
		newContext.colors = generateStylesheet(
			newContext.componentBackgroundColor,
			newContext.focusBackgroundColor,
			newContext.popupBackgroundColor,
			newContext.subtitleTextColor,
			newContext.textColor
		);
		setContext(newContext);

		request.send({
			service: 'luna://com.webos.service.settings/',
			method: 'setSystemSettings',
			parameters: {
				category: 'customUi',
				settings: {
					theme: JSON.stringify(newContext)
				}
			},
			onSuccess: () => {
				console.log('setSystemSettings onSuccess'); // eslint-disable-line no-console
			}
		});
	}, []); // eslint-disable-line

	return (
		<div className={css.colorPickersBlock}>
			<Scroller className={css.scrollerColors}>
				<SandstoneColorPicker
					className={css.colorPicker}
					css={css}
					color={componentBackgroundColor}
					colorHandler={handleComponentBgColor}
					text="Component Background Color"
				/>
				<SandstoneColorPicker
					className={css.colorPicker}
					css={css}
					color={focusBackgroundColor}
					colorHandler={handleFocusBgColor}
					text="Focus Background Color"
				/>
				<SandstoneColorPicker
					className={css.colorPicker}
					css={css}
					color={popupBackgroundColor}
					colorHandler={handlePopupBgColor}
					text="Popup Background Color"
				/>
				<SandstoneColorPicker
					className={css.colorPicker}
					css={css}
					color={textColor}
					colorHandler={handleTextColor}
					text="Text Color"
				/>
				<SandstoneColorPicker
					className={css.colorPicker}
					css={css}
					color={subtitleTextColor}
					colorHandler={handleSubTextColor}
					text="Subtitle Text Color"
				/>
				<div className={css.resetButtonBlock}>
					<Button className={css.resetButton} css={css} onClick={handleResetButton}>Reset default colors</Button>
				</div>
			</Scroller>
		</div>
	);
};
