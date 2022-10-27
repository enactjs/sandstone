import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {Primary, Stories, Title} from '@enact/storybook-utils/addons/docs';
import {action} from '@enact/storybook-utils/addons/actions';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {InputField, InputFieldBase} from '@enact/sandstone/Input';

import {iconNames, divMargin, propOptions, inputData} from './common/Input_Common';

InputField.displayName = 'InputField';
const FieldConfig = mergeComponentMetadata('InputField', InputFieldBase, InputField);

export default {
	title: 'Sandstone/Input/InputField',
	component: 'InputField',
	parameters: {
		docs: {
			page: () => (
				<>
					<Title />
					<Primary />
					<Stories />
				</>
			)
		}
	}
};

export const WithLongText = (args) => (
	<InputField
		disabled={args['disabled']}
		iconAfter={args['iconAfter']}
		iconBefore={args['iconBefore']}
		size={args['size']}
		type={args['type']}
		defaultValue={inputData.longText}
	/>
);

boolean('disabled', WithLongText, FieldConfig);
select('iconAfter', WithLongText, iconNames, FieldConfig);
select('iconBefore', WithLongText, iconNames, FieldConfig);
select('size', WithLongText, propOptions.size, FieldConfig);
select('type', WithLongText, propOptions.fieldTypes, FieldConfig);

WithLongText.storyName = 'with long text';

export const WithLongPlaceholder = (args) => (
	<InputField
		disabled={args['disabled']}
		iconAfter={args['iconAfter']}
		iconBefore={args['iconBefore']}
		placeholder={args['placeholder']}
		type={args['type']}
		size={args['size']}
	/>
);

boolean('disabled', WithLongPlaceholder, FieldConfig);
select('iconAfter', WithLongPlaceholder, iconNames, FieldConfig);
select('iconBefore', WithLongPlaceholder, iconNames, FieldConfig);
text('placeholder', WithLongPlaceholder, FieldConfig, inputData.longPlaceHolder);
select('type', WithLongPlaceholder, propOptions.fieldTypes, FieldConfig);
select('size', WithLongPlaceholder, propOptions.size, FieldConfig);

WithLongPlaceholder.storyName = 'with long placeholder';

export const MarkedInvalid = (args) => (
	<InputField
		disabled={args['disabled']}
		iconAfter={args['iconAfter']}
		iconBefore={args['iconBefore']}
		invalid={args['invalid']}
		invalidMessage={args['invalidMessage']}
		placeholder={args['placeholder']}
		size={args['size']}
		defaultValue={inputData.longText}
	/>
);

boolean('disabled', MarkedInvalid, FieldConfig);
select('iconAfter', MarkedInvalid, iconNames, FieldConfig);
select('iconBefore', MarkedInvalid, iconNames, FieldConfig);
boolean('invalid', MarkedInvalid, FieldConfig, true);
text('invalidMessage', MarkedInvalid, FieldConfig);
text('placeholder', MarkedInvalid, FieldConfig, inputData.longPlaceHolder);
select('size', MarkedInvalid, propOptions.size, FieldConfig);

MarkedInvalid.storyName = 'marked invalid';
MarkedInvalid.parameters = {
	info: {
		text: 'An invalidated field should appear different from a normal field.'
	}
};

export const WithTallCharacters = (args) => (
	<div>
		<InputField
			style={divMargin}
			size={args['size']}
			defaultValue={inputData.tallText[0]}
		/>
		<InputField
			style={divMargin}
			size={args['size']}
			defaultValue={inputData.tallText[1]}
		/>
		<InputField
			style={divMargin}
			size={args['size']}
			defaultValue={inputData.tallText[2]}
		/>
		<InputField
			style={divMargin}
			size={args['size']}
			defaultValue={inputData.tallText[3]}
		/>
	</div>
);

select('size', WithTallCharacters, propOptions.size, FieldConfig);

WithTallCharacters.storyName = 'with tall characters';
WithTallCharacters.parameters = {
	info: {
		text: 'Fields that include text which has historically required special handling.'
	}
};

export const WithRtlAndLtrTextTogether = (args) => (
	<InputField
		iconAfter={args['iconAfter']}
		iconBefore={args['iconBefore']}
		size={args['size']}
		defaultValue={inputData.rtlAndLtr}
	/>
);

select('iconAfter', WithRtlAndLtrTextTogether, iconNames, FieldConfig);
select('iconBefore', WithRtlAndLtrTextTogether, iconNames, FieldConfig);
select('size', WithRtlAndLtrTextTogether, propOptions.size, FieldConfig);

WithRtlAndLtrTextTogether.storyName = 'with RTL and LTR text together';

export const _5WayTest = (args) => {
	const disable1 = args['disable field one'];
	const disable2 = args['disable field two'];
	const disable3 = args['disable field three'];
	const disable4 = args['disable field four'];
	return (
		<div>
			<div style={divMargin}>
				<InputField
					autoFocus={args['autoFocus']}
					disabled={disable1}
					onChange={action('onChange')}
					size={args['size']}
					defaultValue={inputData.initialValue + ' one'}
				/>
				<InputField
					autoFocus={args['autoFocus']}
					disabled={disable2}
					onChange={action('onChange')}
					size={args['size']}
					defaultValue={inputData.initialValue + ' two'}
				/>
			</div>
			<div style={divMargin}>
				<InputField
					autoFocus={args['autoFocus']}
					disabled={disable3}
					onChange={action('onChange')}
					size={args['size']}
					defaultValue={inputData.initialValue + ' three'}
				/>
				<InputField
					autoFocus={args['autoFocus']}
					disabled={disable4}
					onChange={action('onChange')}
					size={args['size']}
					defaultValue={inputData.initialValue + ' four'}
				/>
			</div>
		</div>
	);
};

boolean('disable field one', _5WayTest, FieldConfig);
boolean('disable field two', _5WayTest, FieldConfig);
boolean('disable field three', _5WayTest, FieldConfig);
boolean('disable field four', _5WayTest, FieldConfig);
boolean('autoFocus', _5WayTest, FieldConfig);
select('size', _5WayTest, propOptions.size, FieldConfig);

_5WayTest.storyName = '5 way test';
_5WayTest.parameters = {
	info: {
		text: 'Observe the way spotlight interaction works with InputFields.'
	}
};

export const WithANumber = (args) => (
	<InputField
		onChange={action('onChange')}
		type="number"
		size={args['size']}
		defaultValue={0}
	/>
);

select('size', WithANumber, propOptions.size, FieldConfig);

WithANumber.storyName = 'with a number';
