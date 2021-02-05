import Button from '@enact/sandstone/Button';
import ri from '@enact/ui/resolution';
import React from 'react';

import icons from '../../helper/icons';

export const iconNames = ['', ...icons];

export const divMargin = {margin: ri.scaleToRem(24)};

// Work around a storybook knob rendering issue.
export const buttons = {
	'no buttons': null,
	'one button': (<Button>Single Button</Button>),
	'two buttons': (<React.Fragment>
		<Button>Button One of Two</Button>
		<Button>Button Two of Two</Button>
	</React.Fragment>)
};

export const props = {
	fieldTypes: ['text', 'number', 'password'],
	numberTypes: ['number', 'passwordnumber'],
	popupTypes: ['fullscreen', 'overlay'],
	size: ['small', 'large'],
	textTypes: ['text', 'password'],
	buttons: Object.keys(buttons),
	lengths: {
		'2 (separate)': 2,
		'4 (separate)': 4,
		'6 (separate)': 6,
		'10 (combined)': 10
	}
};

export const inputData = {
	textSubtitle: 'An InputField component inside a popup',
	numberSubtitle: 'This will auto-close when the length has been reached',
	shortText: 'Text string',
	shortPlaceholder: 'Placeholder string',
	longText: 'What could we do with such a very long text string? We could write that novel we\'ve always talked about, or travel the world, or hike a great mountain; the sky\'s the limit!',
	longPlaceHolder: 'Placeholder - What could we do with such a very long placeholder string? We could write that novel we\'ve always talked about, or travel the world, or hike a great mountain; the sky\'s the limit!',
	tallText: ['नरेंद्र मोदी', 'ฟิ้  ไั  ஒ  து', 'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ', 'តន្ត្រី'],
	initialValue: 'Example value',
	rtlAndLtr: 'abcdeشلاؤيث'
};
