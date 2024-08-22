import Alert, {AlertImage}  from '../../../../Alert';
import Button from '../../../../Button';
import Checkbox from '../../../../Checkbox';
import CheckboxItem from '../../../../CheckboxItem';
import FormCheckBoxItem from '../../../../FormCheckboxItem';
import Item from '../../../../Item';
import ProgressBar from '@enact/sandstone/ProgressBar';
import Scroller from '../../../../Scroller';

import img from '../../images/300x300.png';

import {withConfig, withProps, LoremString} from './utils';

import css from './Alert.module.less';

// Only type: 'fullscreen' supports title prop
const fullscreenTests = [
	<Alert open title="Title" />,
	<Alert open>Alert!</Alert>,
	<Alert open>{LoremString}</Alert>,
	<Alert open title="Loooooooooooooooooooooong title with custom width" css={css}>{LoremString}</Alert>
];

// Only type: 'overlay' supports children
const overlayTests = [
	<Alert open>Alert!</Alert>,
	<Alert open>{LoremString}</Alert>
];

// Overlay color test
const overlayColorTests = [
	<Alert open title="With Checkbox">
		<div>
			<div>This is Checkbox</div>
			<Checkbox />
		</div>
	</Alert>,
	<Alert open title="With selectedCheckbox">
		<div>
			<div>This is Selected Checkbox</div>
			<Checkbox selected />
		</div>
	</Alert>,
	<Alert open title="With disabledCheckbox">
		<div>
			<div>This is disabled Checkbox</div>
			<Checkbox disabled />
		</div>
	</Alert>,
	<Alert open title="With disabled-selected Checkbox">
		<div>
			<div>This is disabled-selected Checkbox</div>
			<Checkbox disabled selected />
		</div>
	</Alert>,
	<Alert open title="With FormCheckboxItem">
		<div>
			<div>This is FormCheckboxItem</div>
			<FormCheckBoxItem>FormCheckboxItem</FormCheckBoxItem>
		</div>
	</Alert>,
	<Alert open title="With focusedFormCheckboxItem">
		<div>
			<div>This is focused FormCheckboxItem</div>
			<FormCheckBoxItem focused>focused FormCheckboxItem</FormCheckBoxItem>
		</div>
	</Alert>,
	<Alert open title="With focused-selected FormCheckboxItem">
		<div>
			<div>This is focused-selected FormCheckboxItem</div>
			<FormCheckBoxItem focused selected>focused-selected FormCheckboxItem</FormCheckBoxItem>
		</div>
	</Alert>,
	<Alert open title="With diabledItem">
		<div>
			<div>This is disabledItem</div>
			<Item disabled>Disabled Item</Item>
		</div>
	</Alert>,
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
	</Alert>,
	// QWTC-2603
	<Alert open title="With different types of Components">
		<AlertImage
			src={img}
			type="icon"
		/>
		<Button size="small">Yes</Button>
		<Button size="small">No</Button>
		<div>
			<div>This is progressbar</div>
			<ProgressBar progress={0.5} />
		</div>
		<div>
			<CheckboxItem>This is CheckboxItem</CheckboxItem>
			<CheckboxItem selected>This is Selected CheckboxItem</CheckboxItem>
		</div>
		<div>
			<Scroller style={{height:'300px'}} focusableScrollbar="byEnter">
				<div style={{height:'1000px'}}>
					{LoremString}
				</div>
			</Scroller>
		</div>
	</Alert>
];

const dropIn = {
	iconImage: (
		<AlertImage
			src={img}
			type="icon"
		/>
	),
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
	],
	twoDisabledButton: [
		<Button key="yes" disabled>Yes</Button>,
		<Button key="no" disabled>No</Button>
	]
};

const LtrTests = [
	// Initial
	...withProps({type: 'fullscreen'}, fullscreenTests),
	...withProps({type: 'overlay'}, overlayTests),

	// With Buttons
	...withProps({type: 'fullscreen', buttons: dropIn.oneButton}, fullscreenTests),
	...withProps({type: 'fullscreen', buttons: dropIn.twoButtons}, fullscreenTests),
	...withProps({type: 'fullscreen', buttons: dropIn.twoDisabledButton}, fullscreenTests),
	...withProps({type: 'overlay', buttons: dropIn.oneButton}, overlayTests),
	...withProps({type: 'overlay', buttons: dropIn.twoButtons}, overlayTests),
	...withProps({type: 'overlay', buttons: dropIn.twoDisabledButton}, overlayTests),

	// With image
	// QWTC-1928 start.
	...withProps({type: 'fullscreen', image: dropIn.iconImage}, fullscreenTests),
	...withProps({type: 'fullscreen', image: dropIn.image}, fullscreenTests),
	// QWTC-1928 end.
	// QWTC-1929 start.
	...withProps({type: 'overlay', image: dropIn.iconImage}, overlayTests),
	...withProps({type: 'overlay', image: dropIn.image}, overlayTests),
	// QWTC-1929 end.

	// With image and button
	...withProps({type: 'fullscreen', buttons: dropIn.oneButton, image: dropIn.image}, fullscreenTests),
	...withProps({type: 'fullscreen', buttons: dropIn.twoButtons, image: dropIn.image}, fullscreenTests),
	...withProps({type: 'overlay', buttons: dropIn.oneButton, image: dropIn.image}, overlayTests),
	...withProps({type: 'overlay', buttons: dropIn.twoButtons, image: dropIn.image}, overlayTests),

	// With other components
	...withProps({type: 'overlay'}, overlayColorTests),
	...withProps({type: 'fullscreen'}, overlayColorTests)
];

const AlertTests = [
	...LtrTests,
	...withConfig({locale: 'vi-VN'}, LtrTests),  // Tallglyph validation
	...withConfig({locale: 'ar-SA'}, LtrTests)
];

export default AlertTests;
