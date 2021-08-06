import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select, text} from '@enact/storybook-utils/addons/knobs';
import Input, {InputBase, InputPopup, InputPopupBase} from '@enact/sandstone/Input';

Input.displayName = 'Input';
const Config = mergeComponentMetadata('Input', InputBase, Input);
const ConfigPopup = mergeComponentMetadata('InputPopup', InputPopupBase, InputPopup);

const prop = {
	numericKind: ['auto', 'joined', 'separated', 'field'],
	popupType: ['fullscreen', 'overlay'],
	size: ['small', 'large'],
	type: ['text', 'password', 'number', 'passwordnumber', 'url', 'tel', 'passwordtel'],
	backButtonAriaLabel: [null, 'Back']
};

export default {
	title: 'Sandstone/Input',
	component: 'Input'
};

export const _Input = () => {
	const propOptions = {
		// Actions
		onBeforeChange: action('onBeforeChange'),
		onChange: action('onChange'),
		onClose: action('onClose'),
		onComplete: action('onComplete'),
		onOpenPopup: action('onOpenPopup'),

		// Knobs
		type: select('type', prop.type, ConfigPopup),
		popupType: select('popupType', prop.popupType, ConfigPopup),
		size: select('size', prop.size, Config),
		invalid: boolean('invalid', ConfigPopup),
		invalidMessage: text('invalidMessage', ConfigPopup, 'This is a bad value'),
		placeholder: text('placeholder', Config, 'placeholder string'),
		subtitle: text('subtitle', ConfigPopup, 'Title Below Text'),
		title: text('title', ConfigPopup, 'Title Text'),
		disabled: boolean('disabled', Config),
		'aria-label': text('aria-label', ConfigPopup, ''),
		popupAriaLabel: text('popupAriaLabel', ConfigPopup, ''),
		noBackButton: boolean('noBackButton', ConfigPopup),
		noSubmitButton: boolean('noSubmitButton', ConfigPopup),
		backButtonAriaLabel: select('backButtonAriaLabel', prop.backButtonAriaLabel, ConfigPopup)
	};

	// Numeric specific props
	if (propOptions.type === 'number' || propOptions.type === 'passwordnumber') {
		propOptions.numberInputField = select('numberInputField', prop.numericKind, ConfigPopup);

		const minMax = boolean('customize min/max', ConfigPopup, false);
		if (minMax) {
			propOptions.maxLength = number('maxLength', ConfigPopup, {range: true, min: 0, max: 20}, 4);
			propOptions.minLength = number('minLength', ConfigPopup, {range: true, min: 0, max: 20}, 0);
		} else {
			propOptions.length = number('length', ConfigPopup, {range: true, min: 1, max: 20}, 4);
		}
	}

	// Modify a11y null strings
	if (!propOptions['aria-label']) {
		delete propOptions['aria-label'];
	} else if (!propOptions.popupAriaLabel) {
		delete propOptions.popupAriaLabel;
	}

	return (
		<div>
			<Input {...propOptions} />
		</div>
	);
};

_Input.storyName = 'Input';
_Input.parameters = {
	info: {
		text: 'Basic usage of Input'
	}
};
