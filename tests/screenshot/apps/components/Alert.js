import Alert, {AlertImage}  from '../../../../Alert';
import Button from '../../../../Button';
import React from 'react';

import img from '../../images/300x300.png';

import {withConfig, withProps, LoremString} from './utils';


// Only type: 'fullscreen' supports title and subtitle props
const fullscreenTests = [
	<Alert open title="Title" />,
	<Alert open>Alert!</Alert>,
	<Alert open>{LoremString}</Alert>
];

// Only type: 'overlay; supports children
const overlayTests = [
	<Alert open>Alert!</Alert>,
	<Alert open>{LoremString}</Alert>
];

const dropIn = {
	image: (
		<AlertImage
			src={img}
			type="thumbnail"
		/>
	),
	oneButton: (
		<Button>Yes</Button>
	),
	// we need an array here rather than a fragment due to the impl of Alert that maps over the
	// array of buttons and wraps them with Cell.
	twoButtons: [
		<Button key="yes">Yes</Button>,
		<Button key="no">No</Button>
	]
};

const LtrTests = [
	// Initial
	...withProps({type: 'fullscreen'}, fullscreenTests),
	...withProps({type: 'overlay'}, overlayTests),

	// With Buttons
	...withProps({type: 'fullscreen', buttons: dropIn.oneButton}, fullscreenTests),
	...withProps({type: 'fullscreen', buttons: dropIn.twoButtons}, fullscreenTests),
	...withProps({type: 'overlay', buttons: dropIn.oneButton}, overlayTests),
	...withProps({type: 'overlay', buttons: dropIn.twoButtons}, overlayTests),

	// With image
	...withProps({type: 'fullscreen', image: dropIn.image}, fullscreenTests),
	...withProps({type: 'overlay', image: dropIn.image}, overlayTests),

	// With image and button
	...withProps({type: 'fullscreen', buttons: dropIn.oneButton, image: dropIn.image}, fullscreenTests),
	...withProps({type: 'fullscreen', buttons: dropIn.twoButtons, image: dropIn.image}, fullscreenTests),
	...withProps({type: 'overlay', buttons: dropIn.oneButton, image: dropIn.image}, overlayTests),
	...withProps({type: 'overlay', buttons: dropIn.twoButtons, image: dropIn.image}, overlayTests)
];

const AlertTests = [
	...LtrTests,
	...withConfig({locale: 'ar-SA'}, LtrTests)
];

export default AlertTests;
