import Popup from '../../../../Popup';
import {withConfig, withProps} from './utils';

const PopupBaseTests = [
	<Popup open>Popup!</Popup>,

	// [QWTC-1904]
	<Popup open position="fullscreen">Fullscreen Popup!</Popup>,
	<Popup open position="center">Center Popup!</Popup>,
	<Popup open position="left">Left Popup!</Popup>,
	<Popup open position="right">Right Popup!</Popup>,
	<Popup open position="top">Top Popup!</Popup>
	// End of [QWTC-1904]
];

const PopupTests = [
	...withProps({scrimType: 'translucent'}, PopupBaseTests),
	...withProps({scrimType: 'transparent'}, PopupBaseTests),
	...withProps({scrimType: 'none'}, PopupBaseTests),

	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************
	// [QWTC-1897]
	...withConfig({locale: 'ar-SA'}, [
		...withProps({scrimType: 'translucent'}, PopupBaseTests),
		...withProps({scrimType: 'transparent'}, PopupBaseTests),
		...withProps({scrimType: 'none'}, PopupBaseTests)
	])
];

export default withConfig({wrapper: {full: true}}, PopupTests);
