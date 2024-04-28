// this component has been added as an alternative of built-in HTML color picker which does not work in webos environment
import React, {useCallback} from 'react';

import {ColorPicker as SandstoneColorPicker} from '../../../ColorPicker';
import Scroller from '../../../Scroller';

import css from './CustomStoryDecorator.module.less'

export const CustomStoryDecorator = () => {
	const handleComponentBgColor = useCallback(() => {
		console.log('handleComponentBgColor changed')
	}, []);
	const handleFocusBgColor = useCallback(() => {
		console.log('handleFocusBgColor changed')
	}, []);
	const handlePopupBgColor = useCallback(() => {
		console.log('handlePopupBgColor changed')
	}, []);
	const handleTextColor = useCallback(() => {
		console.log('handleTextColor changed')
	}, []);
	const handleSubTextColor = useCallback(() => {
		console.log('handleSubTextColor changed')
	}, []);

	return (
		<div className={css.colorPickerBlock}>
			<Scroller>
				<SandstoneColorPicker
					css={css}
					color="#ff00ff"
					colorHandler={handleComponentBgColor}
					text="Component Background Color"
				/>
				<SandstoneColorPicker
					css={css}
					color="#ff0000"
					colorHandler={handleFocusBgColor}
					text="Focus Background Color"
				/>
				<SandstoneColorPicker
					css={css}
					color="#0000ff"
					colorHandler={handlePopupBgColor}
					text="Popup Background Color"
				/>
				<SandstoneColorPicker
					css={css}
					color="#0000ff"
					colorHandler={handleTextColor}
					text="Text Color"
				/>
				<SandstoneColorPicker
					css={css}
					color="#0000ff"
					colorHandler={handleSubTextColor}
					text="Subtitle Text Color"
				/>
			</Scroller>
		</div>
	);
}
