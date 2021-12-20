import Button from '@enact/sandstone/Button';
import ri from '@enact/ui/resolution';
import {Fragment} from 'react';

import icons from '../../helper/icons';

export const iconNames = ['', ...icons];

export const divMargin = {margin: ri.scaleToRem(24)};

// Work around a storybook control rendering issue.
export const buttons = {
	'no buttons': null,
	'one button': (<Button>Single Button</Button>),
	'two buttons': (
		<Fragment>
			<Button>Button One of Two</Button>
			<Button>Button Two of Two</Button>
		</Fragment>
	)
};

export const propOptions = {
	fieldTypes: ['text', 'number', 'password', 'url'],
	numberTypes: ['number', 'passwordnumber'],
	popupTypes: ['fullscreen', 'overlay'],
	size: ['small', 'large'],
	textTypes: ['text', 'password', 'url'],
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
	longInvalidTooltip: 'You\'ve entered an invalid value. Please check the value you entered. By the way, this is a long text that can be guided when an invalid value is entered; There would be some filter to validate a value!',
	tallText: ['नरेंद्र मोदी', 'ฟิ้  ไั  ஒ  து', 'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ', 'តន្ត្រី'],
	initialValue: 'Example value',
	rtlAndLtr: 'abcdeشلاؤيث'
};
