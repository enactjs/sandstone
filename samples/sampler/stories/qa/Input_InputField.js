import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {action} from '@enact/storybook-utils/addons/actions';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {InputField, InputFieldBase} from '@enact/sandstone/Input';

import {iconNames, divMargin, propOptions, inputData} from './common/Input_Common';

InputField.displayName = 'InputField';
const FieldConfig = mergeComponentMetadata('InputField', InputFieldBase, InputField);

export default {
	title: 'Sandstone/Input/InputField',
	component: 'InputField'
};

export const WithLongText = () => (
	<InputField
		disabled={boolean('disabled', FieldConfig)}
		iconAfter={select('iconAfter', iconNames, FieldConfig)}
		iconBefore={select('iconBefore', iconNames, FieldConfig)}
		size={select('size', propOptions.size, FieldConfig)}
		type={select('type', propOptions.fieldTypes, FieldConfig)}
		defaultValue={inputData.longText}
	/>
);

WithLongText.storyName = 'with long text';

export const WithLongPlaceholder = () => (
	<InputField
		disabled={boolean('disabled', FieldConfig)}
		iconAfter={select('iconAfter', iconNames, FieldConfig)}
		iconBefore={select('iconBefore', iconNames, FieldConfig)}
		placeholder={text('placeholder', FieldConfig, inputData.longPlaceHolder)}
		type={select('type', propOptions.fieldTypes, FieldConfig)}
		size={select('size', propOptions.size, FieldConfig)}
	/>
);

WithLongPlaceholder.storyName = 'with long placeholder';

export const MarkedInvalid = () => (
	<InputField
		disabled={boolean('disabled', FieldConfig)}
		iconAfter={select('iconAfter', iconNames, FieldConfig)}
		iconBefore={select('iconBefore', iconNames, FieldConfig)}
		invalid={boolean('invalid', FieldConfig, true)}
		invalidMessage={text('invalidMessage', FieldConfig)}
		placeholder={text('placeholder', FieldConfig, inputData.shortPlaceholder)}
		size={select('size', propOptions.size, FieldConfig)}
		defaultValue={inputData.longText}
	/>
);

MarkedInvalid.storyName = 'marked invalid';
MarkedInvalid.parameters = {
	info: {
		text: 'An invalidated field should appear different from a normal field.'
	}
};

export const WithRtlAndLtrTextTogether = () => (
	<InputField
		iconAfter={select('iconAfter', iconNames, FieldConfig)}
		iconBefore={select('iconBefore', iconNames, FieldConfig)}
		size={select('size', propOptions.size, FieldConfig)}
		defaultValue={inputData.rtlAndLtr}
	/>
);

WithRtlAndLtrTextTogether.storyName = 'with RTL and LTR text together';

export const _5WayTest = () => {
	const disable1 = boolean('disable field one', FieldConfig);
	const disable2 = boolean('disable field two', FieldConfig);
	const disable3 = boolean('disable field three', FieldConfig);
	const disable4 = boolean('disable field four', FieldConfig);
	return (
		<div>
			<div style={divMargin}>
				<InputField
					autoFocus={boolean('autoFocus', FieldConfig)}
					disabled={disable1}
					onChange={action('onChange')}
					size={select('size', propOptions.size, FieldConfig)}
					defaultValue={inputData.initialValue + ' one'}
				/>
				<InputField
					autoFocus={boolean('autoFocus', FieldConfig)}
					disabled={disable2}
					onChange={action('onChange')}
					size={select('size', propOptions.size, FieldConfig)}
					defaultValue={inputData.initialValue + ' two'}
				/>
			</div>
			<div style={divMargin}>
				<InputField
					autoFocus={boolean('autoFocus', FieldConfig)}
					disabled={disable3}
					onChange={action('onChange')}
					size={select('size', propOptions.size, FieldConfig)}
					defaultValue={inputData.initialValue + ' three'}
				/>
				<InputField
					autoFocus={boolean('autoFocus', FieldConfig)}
					disabled={disable4}
					onChange={action('onChange')}
					size={select('size', propOptions.size, FieldConfig)}
					defaultValue={inputData.initialValue + ' four'}
				/>
			</div>
		</div>
	);
};

_5WayTest.storyName = '5 way test';
_5WayTest.parameters = {
	info: {
		text: 'Observe the way spotlight interaction works with InputFields.'
	}
};

export const WithANumber = () => (
	<InputField
		onChange={action('onChange')}
		type="number"
		size={select('size', propOptions.size, FieldConfig)}
		defaultValue={0}
	/>
);

WithANumber.storyName = 'with a number';
