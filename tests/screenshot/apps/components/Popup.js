import Popup from '../../../../Popup';
import React from 'react';
import {withConfig} from './utils';

const PopupTests = [
	<Popup open>Popup!</Popup>,

	// [GT-28270]
	<Popup open position="fullscreen">Fullscreen Popup!</Popup>,
	<Popup open position="center">Center Popup!</Popup>,
	<Popup open position="left">Left Popup!</Popup>,
	<Popup open position="right">Right Popup!</Popup>,
	<Popup open position="top">Top Popup!</Popup>,
	// End of [GT-28270]

	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************
	// [GT-28262]
	{
		locale: 'ar-SA',
		component: <Popup open>Popup!</Popup>
	}
];

export default withConfig({wrapper: {full: true}}, PopupTests);
