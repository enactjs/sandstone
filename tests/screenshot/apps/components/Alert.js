import Alert, {AlertImage}  from '../../../../Alert';
import Button from '../../../../Button';
import React from 'react';
import {withConfig, withProps} from './utils';

const baseTests = [
	<Alert open>Alert!</Alert>,
	<Alert open title="Title" />,
	<Alert open title="Title Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut nunc dolor." />,
	<Alert open title="Title" subtitle="Subtitle" />,
	<Alert open title="Title Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut nunc dolor." subtitle="Subtitle Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut nunc dolor." />
];

const dropIn = {
	image: (
		<AlertImage
			src="https://via.placeholder.com/240.png?text=image"
			type="thumbnail"
		/>
	),
	oneButton: (
		<React.Fragment>
			<buttons>
				<Button>Yes</Button>
			</buttons>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut nunc dolor.
		</React.Fragment>
	),
	twoButtons: (
		<React.Fragment>
			<buttons>
				<Button>Yes</Button>
				<Button>No</Button>
			</buttons>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut nunc dolor.
		</React.Fragment>
	)
};

const LtrTests = [
	// Initial
	...withProps({type: 'fullscreen'}, baseTests),
	...withProps({type: 'overlay'}, baseTests),

	// With Buttons
	...withProps({type: 'fullscreen', children: dropIn.oneButton}, baseTests),
	...withProps({type: 'fullscreen', children: dropIn.twoButtons}, baseTests),
	...withProps({type: 'overlay', children: dropIn.oneButton}, baseTests),
	...withProps({type: 'overlay', children: dropIn.twoButtons}, baseTests),

	// With image
	...withProps({type: 'fullscreen', image: dropIn.image}, baseTests),
	...withProps({type: 'overlay', image: dropIn.image}, baseTests),

	// With image and button
	...withProps({type: 'fullscreen', children: dropIn.oneButton, image: dropIn.image}, baseTests),
	...withProps({type: 'fullscreen', children: dropIn.twoButtons, image: dropIn.image}, baseTests),
	...withProps({type: 'overlay', children: dropIn.oneButton, image: dropIn.image}, baseTests),
	...withProps({type: 'overlay', children: dropIn.twoButtons, image: dropIn.image}, baseTests)
];

const AlertTests = [
	...LtrTests,
	...withConfig({locale: 'ar-SA'}, LtrTests)
];

export default AlertTests;
