import Popup from '../../../../Popup';
import React from 'react';

const PopupTests = [
	<Popup>Popup!</Popup>,
	<Popup open>Popup!</Popup>,
	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************
	// [GT-28262]
	{
		locale: 'ar-SA',
		component: <Popup open>Popup!</Popup>
	}
];
export default PopupTests;
