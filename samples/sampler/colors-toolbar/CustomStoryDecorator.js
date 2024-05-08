// this component has been added as an alternative of built-in HTML color picker which does not work in webos environment
import LS2Request from '@enact/webos/LS2Request';
import {platform} from '@enact/webos/platform';
import React, {useCallback, useContext, useEffect, useState} from 'react';

import {ColorPicker as SandstoneColorPicker} from '../../../ColorPicker';
import {generateStylesheet} from '../utils/generateStylesheet';
import Scroller from '../../../Scroller';
import {AppContext} from './constants';

import css from './CustomStoryDecorator.module.less'

const request = new LS2Request();

let customColors = {
	activeTheme: 'defaultColorSet',
	componentBackgroundColor: '#7D848C',
	focusBackgroundColor: '#E6E6E6',
	popupBackgroundColor: '#575E66',
	subtitleTextColor: '#ABAEB3',
	textColor: '#E6E6E6'
};

export const CustomStoryDecorator = () => {
	const [parsedTheme, setParsedTheme] = useState(undefined);
	const {context, setContext} = useContext(AppContext);
	const {componentBackgroundColor, focusBackgroundColor, popupBackgroundColor, subtitleTextColor, textColor} = context;
	// const [componentBackgroundColor, setComponentBackgroundColor] = useState('#7D848C');
	// const [focusBackgroundColor, setFocusBackgroundColor] = useState('#E6E6E6');
	// const [popupBackgroundColor, setPopupBackgroundColor] = useState('#575E66');
	// const [subtitleTextColor, setSubtitleTextColor] = useState('#ABAEB3');
	// const [textColor, setTextColor] = useState('#E6E6E6');

	useEffect(() => {
		if (platform.tv) {
			request.send({
				service: 'luna://com.webos.service.settings/',
				method: 'getSystemSettings',
				parameters: {
					category: 'customUi',
					keys: ['theme']
				},
				onSuccess: (res) => {
					setParsedTheme(JSON.parse(res.settings.theme));
					// setComponentBackgroundColor(JSON.parse(res.settings.theme).componentBackgroundColor);
					// setFocusBackgroundColor(JSON.parse(res.settings.theme).focusBackgroundColor);
					// setPopupBackgroundColor(JSON.parse(res.settings.theme).popupBackgroundColor);
					// setSubtitleTextColor(JSON.parse(res.settings.theme).subtitleTextColor);
					// setTextColor(JSON.parse(res.settings.theme).textColor);
					if (res.settings.theme !== '') {
						setParsedTheme(JSON.parse(res.settings.theme));
					}
				}
			});
		}
	}, []);

	if (parsedTheme !== undefined) console.log(parsedTheme)

	const onColorChange = useCallback((color, newColor) => {
		// a copy of the context object is created
		const newContext = Object.assign({}, context);
		// update the color value on the newly created object with what gets received from `event` (handleBackgroundColor)
		newContext[color] = newColor;
		// generate the new stylesheet based on the updated color
		newContext.colors = generateStylesheet(
			newContext.backgroundColor,
			newContext.componentBackgroundColor,
			newContext.focusBackgroundColor,
			newContext.popupBackgroundColor,
			newContext.subtitleTextColor,
			newContext.textColor,
			newContext.preset
		);
		setContext(newContext)
		console.log(newContext);

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
				console.log('setSystemSettings onSuccess');
			}
		});
	}, [context, setContext]);

	const handleComponentBgColor = useCallback((ev) => {
		// setComponentBackgroundColor(ev);
		onColorChange('componentBackgroundColor', ev);
		console.log('handleComponentBgColor changed', ev)
	}, [onColorChange]);
	const handleFocusBgColor = useCallback((ev) => {
		// setFocusBackgroundColor(ev);
		onColorChange('focusBackgroundColor', ev);
		console.log('handleFocusBgColor changed')
	}, [onColorChange]);
	const handlePopupBgColor = useCallback((ev) => {
		// setPopupBackgroundColor(ev);
		onColorChange('popupBackgroundColor', ev);
		console.log('handlePopupBgColor changed')
	}, [onColorChange]);
	const handleTextColor = useCallback((ev) => {
		// setTextColor(ev);
		onColorChange('textColor', ev);
		console.log('handleTextColor changed')
	}, [onColorChange]);
	const handleSubTextColor = useCallback((ev) => {
		// setSubtitleTextColor(ev);
		onColorChange('subtitleTextColor', ev);
		console.log('handleSubTextColor changed')
	}, [onColorChange]);

	return (
		<div className={css.colorPickerBlock}>
			<Scroller>
				<SandstoneColorPicker
					css={css}
					color={componentBackgroundColor}
					colorHandler={handleComponentBgColor}
					text="Component Background Color"
				/>
				<SandstoneColorPicker
					css={css}
					color={focusBackgroundColor}
					colorHandler={handleFocusBgColor}
					text="Focus Background Color"
				/>
				<SandstoneColorPicker
					css={css}
					color={popupBackgroundColor}
					colorHandler={handlePopupBgColor}
					text="Popup Background Color"
				/>
				<SandstoneColorPicker
					css={css}
					color={textColor}
					colorHandler={handleTextColor}
					text="Text Color"
				/>
				<SandstoneColorPicker
					css={css}
					color={subtitleTextColor}
					colorHandler={handleSubTextColor}
					text="Subtitle Text Color"
				/>
			</Scroller>
		</div>
	);
};
