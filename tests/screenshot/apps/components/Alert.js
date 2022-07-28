import Alert, {AlertImage}  from '../../../../Alert';
import Button from '../../../../Button';
import ProgressBar from '@enact/sandstone/ProgressBar';
import Scroller from '../../../../Scroller';

import img from '../../images/300x300.png';

import {withConfig, withProps, LoremString} from './utils';


// Only type: 'fullscreen' supports title prop
const fullscreenTests = [
	<Alert open title="Title" />,
	<Alert open>Alert!</Alert>,
	<Alert open>{LoremString}</Alert>
];

// Only type: 'overlay' supports children
const overlayTests = [
	<Alert open>Alert!</Alert>,
	<Alert open>{LoremString}</Alert>
];

// Overlay color test
// TODO: Add tc for text / focus text / disabled boutton / checkbox / formcheckbox Item / item disabled
const overlayColorTests = [
	<Alert open title="With Progressbar">
		<div>
			<div>This is ProgressBar</div>
			<ProgressBar backgroundProgress={0.5} progress={0.25} />
		</div>
	</Alert>,
	<Alert open title="With disabled Progressbar">
		<div>
			<div>This is ProgressBar</div>
			<ProgressBar backgroundProgress={0.5} progress={0.25} disabled />
		</div>
	</Alert>,
	<Alert open title="With Scroller">
		<div>
			<div>This is Scroller</div>
			<Scroller style={{height:'300px'}} verticalScrollbar="visible">
				<div style={{height:'1000px'}}>
					ScrollerTest
				</div>
			</Scroller>
		</div>
	</Alert>,
	<Alert open title="With byEnter Scroller">
		<div>
			<div>This is focusableScrollbar=byEnter Scroller</div>
			<Scroller style={{height:'300px'}} focusableScrollbar="byEnter">
				<div style={{height:'1000px'}}>
					ScrollerTest
				</div>
			</Scroller>
		</div>
	</Alert>
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
	...withProps({type: 'overlay', buttons: dropIn.twoButtons, image: dropIn.image}, overlayTests),

	// // With other components
	...withProps({type: 'overlay'}, overlayColorTests),
	...withProps({type: 'fullscreen'}, overlayColorTests)
];

const AlertTests = [
	...LtrTests,
	...withConfig({locale: 'vi-VN'}, LtrTests),  // Tallglyph validation
	...withConfig({locale: 'ar-SA'}, LtrTests)
];

export default AlertTests;
