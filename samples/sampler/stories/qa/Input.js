import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {action} from '@enact/storybook-utils/addons/actions';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import ri from '@enact/ui/resolution';
import React from 'react';
import {storiesOf} from '@storybook/react';
import Button from '@enact/sandstone/Button';
import Input, {InputBase, InputField, InputFieldBase} from '@enact/sandstone/Input';

import icons from '../default/icons';

Input.displayName = 'Input';
InputField.displayName = 'InputField';
const Config = mergeComponentMetadata('Input', InputBase, Input);
const FieldConfig = mergeComponentMetadata('InputField', InputFieldBase, InputField);

const iconNames = ['', ...icons];

const divMargin = {margin: ri.scaleToRem(24)};

// Work around a storybook knob rendering issue.
const buttons = {
	'no buttons': null,
	'one button': (<Button>Single Button</Button>),
	'two buttons': (<React.Fragment>
		<Button>Button One of Two</Button>
		<Button>Button Two of Two</Button>
	</React.Fragment>)
};
const props = {
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
const inputData = {
	textSubtitle: 'An InputField component inside a popup',
	numberSubtitle: 'This will auto-close when the length has been reached',
	shortText: 'Text string',
	shortPlaceholder: 'Placeholder string',
	longText: 'What could we do with such a very long text string? We could write that novel we\'ve always talked about, or travel the world, or hike a great mountain; the sky\'s the limit!',
	longPlaceHolder: 'Placeholder - What could we do with such a very long placeholder string? We could write that novel we\'ve always talked about, or travel the world, or hike a great mountain; the sky\'s the limit!',
	tallText: ['नरेंद्र मोदी', 'ฟิ้  ไั  ஒ  து', 'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ', 'តន្ត្'],
	initialValue: 'Example value',
	rtlAndLtr: 'abcdeشلاؤيث'
};

storiesOf('Input/Text', module)
	.add(
		'basic',
		() => (
			<Input
				title={text('title', Config, 'Title')}
				subtitle={text('subtitle', Config, 'Subtitle')}
				popupType={select('popupType', props.popupTypes, Config)}
				type={select('type', props.textTypes, Config)}
				disabled={boolean('disabled', Config)}
				iconAfter={select('iconAfter', iconNames, Config)}
				iconBefore={select('iconBefore', iconNames, Config)}
				invalid={boolean('invalid', Config)}
				invalidMessage={text('invalidMessage', Config)}
				placeholder={text('placeholder', Config)}
				size={select('size', props.size, Config)}
				defaultValue={inputData.shortText}
			>
				{buttons[select('buttons', props.buttons, Config)]}
			</Input>
		), {
			info: {
				text: 'Input with all knobs available.'
			}
		}
	);

storiesOf('Input/Text/Fullscreen', module)
	.add(
		'long text',
		() => (
			<Input
				title="Fullscreen Input"
				subtitle={inputData.textSubtitle}
				disabled={boolean('disabled', Config)}
				placeholder={text('placeholder', Config)}
				size={select('size', props.size, Config)}
				type={select('type', props.textTypes, Config)}
				popupType="fullscreen"
				defaultValue={inputData.longText}
			/>
		)
	)
	.add(
		'long titles',
		() => (
			<Input
				title={inputData.longText}
				subtitle={inputData.longText}
				popupType="fullscreen"
				defaultOpen
			/>
		), {
			info: {
				text: 'Test the input popup\'s maximum bounds.'
			}
		}
	)
	.add(
		'no titles',
		() => (
			<Input
				popupType="fullscreen"
				defaultOpen
			/>
		), {
			info: {
				text: 'No titles, just an input field.'
			}
		}
	);

storiesOf('Input/Text/Overlay', module)
	.add(
		'long text',
		() => (
			<Input
				title="Overlay Input"
				subtitle={inputData.textSubtitle}
				disabled={boolean('disabled', Config)}
				placeholder={text('placeholder', Config)}
				size={select('size', props.size, Config)}
				type={select('type', props.textTypes, Config)}
				popupType="overlay"
				defaultValue={inputData.longText}
			/>
		)
	)
	.add(
		'long titles',
		() => (
			<Input
				title={inputData.longText}
				subtitle={inputData.longText}
				popupType="overlay"
				defaultOpen
			/>
		), {
			info: {
				text: 'Test the input popup\'s maximum bounds.'
			}
		}
	)
	.add(
		'no titles',
		() => (
			<Input
				popupType="overlay"
				defaultOpen
			/>
		), {
			info: {
				text: 'No titles, just an input field.'
			}
		}
	);

storiesOf('Input/Number', module)
	.add(
		'basic',
		() => (
			<Input
				title={text('title', Config, 'Title')}
				subtitle={text('subtitle', Config, 'Subtitle')}
				popupType={select('popupType', props.popupTypes, Config)}
				length={select('length', props.lengths, Config)}
				type={select('type', props.numberTypes, Config, 'number')}
				disabled={boolean('disabled', Config)}
				invalid={boolean('invalid', Config)}
				invalidMessage={text('invalidMessage', Config)}
				placeholder={text('placeholder', Config)}
				size={select('size', props.size, Config)}
			>
				{buttons[select('buttons', props.buttons, Config)]}
			</Input>
		), {
			info: {
				text: 'Input with all knobs available.'
			}
		}
	);

storiesOf('Input/Number/Fullscreen', module)
	.add(
		'length 4',
		() => (
			<Input
				title="Fullscreen Input (4)"
				subtitle={inputData.numberSubtitle}
				disabled={boolean('disabled', Config)}
				invalid={boolean('invalid', Config)}
				invalidMessage={text('invalidMessage', Config)}
				placeholder={text('placeholder', Config)}
				size={select('size', props.size, Config)}
				type={select('type', props.numberTypes, Config, 'number')}
				popupType="fullscreen"
				length={4}
			>
				{buttons[select('buttons', props.buttons, Config)]}
			</Input>
		), {
			info: {
				text: 'Uses a short-number form of number input.'
			}
		}
	)
	.add(
		'length 10',
		() => (
			<Input
				title="Fullscreen Input (10)"
				subtitle={inputData.numberSubtitle}
				disabled={boolean('disabled', Config)}
				invalid={boolean('invalid', Config)}
				invalidMessage={text('invalidMessage', Config)}
				placeholder={text('placeholder', Config)}
				size={select('size', props.size, Config)}
				type={select('type', props.numberTypes, Config, 'number')}
				popupType="fullscreen"
				length={10}
			>
				{buttons[select('buttons', props.buttons, Config)]}
			</Input>
		), {
			info: {
				text: 'Uses a long-number form of number input.'
			}
		}
	)
	.add(
		'long titles',
		() => (
			<Input
				title={inputData.longText}
				subtitle={inputData.longText}
				popupType="fullscreen"
				type="number"
				defaultOpen
			/>
		), {
			info: {
				text: 'Test the input popup\'s maximum bounds.'
			}
		}
	)
	.add(
		'no titles',
		() => (
			<Input
				popupType="fullscreen"
				type="number"
				defaultOpen
			/>
		), {
			info: {
				text: 'No titles, just an input field.'
			}
		}
	);

storiesOf('Input/Number/Overlay', module)
	.add(
		'length 4',
		() => (
			<Input
				title="Overlay Input (4)"
				subtitle={inputData.numberSubtitle}
				disabled={boolean('disabled', Config)}
				invalid={boolean('invalid', Config)}
				invalidMessage={text('invalidMessage', Config)}
				placeholder={text('placeholder', Config)}
				size={select('size', props.size, Config)}
				type={select('type', props.numberTypes, Config, 'number')}
				popupType="overlay"
				length={4}
			>
				{buttons[select('buttons', props.buttons, Config)]}
			</Input>
		), {
			info: {
				text: 'Uses a short-number form of number input.'
			}
		}
	)
	.add(
		'length 10',
		() => (
			<Input
				title="Overlay Input (10)"
				subtitle={inputData.numberSubtitle}
				disabled={boolean('disabled', Config)}
				invalid={boolean('invalid', Config)}
				invalidMessage={text('invalidMessage', Config)}
				placeholder={text('placeholder', Config)}
				size={select('size', props.size, Config)}
				type={select('type', props.numberTypes, Config, 'number')}
				popupType="overlay"
				length={10}
			>
				{buttons[select('buttons', props.buttons, Config)]}
			</Input>
		), {
			info: {
				text: 'Uses a long-number form of number input.'
			}
		}
	)
	.add(
		'long titles',
		() => (
			<Input
				title={inputData.longText}
				subtitle={inputData.longText}
				popupType="overlay"
				type="number"
				defaultOpen
			/>
		), {
			info: {
				text: 'Test the input popup\'s maximum bounds.'
			}
		}
	)
	.add(
		'no titles',
		() => (
			<Input
				popupType="overlay"
				type="number"
				defaultOpen
			/>
		), {
			info: {
				text: 'No titles, just an input field.'
			}
		}
	);

storiesOf('Input/InputField', module)
	.add(
		'with long text',
		() => (
			<InputField
				disabled={boolean('disabled', FieldConfig)}
				iconAfter={select('iconAfter', iconNames, FieldConfig)}
				iconBefore={select('iconBefore', iconNames, FieldConfig)}
				size={select('size', props.size, FieldConfig)}
				type={select('type', props.fieldTypes, FieldConfig)}
				defaultValue={inputData.longText}
			/>
		)
	)
	.add(
		'with long placeholder',
		() => (
			<InputField
				disabled={boolean('disabled', FieldConfig)}
				iconAfter={select('iconAfter', iconNames, FieldConfig)}
				iconBefore={select('iconBefore', iconNames, FieldConfig)}
				placeholder={text('placeholder', FieldConfig, inputData.longPlaceHolder)}
				type={select('type', props.fieldTypes, FieldConfig)}
				size={select('size', props.size, FieldConfig)}
			/>
		)
	)
	.add(
		'marked invalid',
		() => (
			<InputField
				disabled={boolean('disabled', FieldConfig)}
				iconAfter={select('iconAfter', iconNames, FieldConfig)}
				iconBefore={select('iconBefore', iconNames, FieldConfig)}
				invalid={boolean('invalid', FieldConfig, true)}
				invalidMessage={text('invalidMessage', FieldConfig)}
				placeholder={text('placeholder', FieldConfig, inputData.shortPlaceholder)}
				size={select('size', props.size, FieldConfig)}
				defaultValue={inputData.longText}
			/>
		), {
			info: {
				text: 'An invalidated field should appear different from a normal field.'
			}
		}
	)
	.add(
		'with tall characters',
		() => (
			<div>
				<InputField
					style={divMargin}
					size={select('size', props.size, FieldConfig)}
					defaultValue={inputData.tallText[0]}
				/>
				<InputField
					style={divMargin}
					size={select('size', props.size, FieldConfig)}
					defaultValue={inputData.tallText[1]}
				/>
				<InputField
					style={divMargin}
					size={select('size', props.size, FieldConfig)}
					defaultValue={inputData.tallText[2]}
				/>
				<InputField
					style={divMargin}
					size={select('size', props.size, FieldConfig)}
					defaultValue={inputData.tallText[3]}
				/>
			</div>
		), {
			info: {
				text: 'Fields that include text which has historically required special handling.'
			}
		}
	)
	.add(
		'with RTL and LTR text together',
		() => (
			<InputField
				iconAfter={select('iconAfter', iconNames, FieldConfig)}
				iconBefore={select('iconBefore', iconNames, FieldConfig)}
				size={select('size', props.size, FieldConfig)}
				defaultValue={inputData.rtlAndLtr}
			/>
		)
	)
	.add(
		'5 way test',
		() => {
			const disable1 = boolean('disable field one', FieldConfig);
			const disable2 = boolean('disable field two', FieldConfig);
			const disable3 = boolean('disable field three', FieldConfig);
			const disable4 = boolean('disable field four', FieldConfig);
			return (<div>
				<div style={divMargin}>
					<InputField
						autoFocus={boolean('autoFocus', FieldConfig)}
						disabled={disable1}
						onChange={action('onChange')}
						size={select('size', props.size, FieldConfig)}
						defaultValue={inputData.initialValue + ' one'}
					/>
					<InputField
						autoFocus={boolean('autoFocus', FieldConfig)}
						disabled={disable2}
						onChange={action('onChange')}
						size={select('size', props.size, FieldConfig)}
						defaultValue={inputData.initialValue + ' two'}
					/>
				</div>
				<div style={divMargin}>
					<InputField
						autoFocus={boolean('autoFocus', FieldConfig)}
						disabled={disable3}
						onChange={action('onChange')}
						size={select('size', props.size, FieldConfig)}
						defaultValue={inputData.initialValue + ' three'}
					/>
					<InputField
						autoFocus={boolean('autoFocus', FieldConfig)}
						disabled={disable4}
						onChange={action('onChange')}
						size={select('size', props.size, FieldConfig)}
						defaultValue={inputData.initialValue + ' four'}
					/>
				</div>
			</div>);
		}, {
			info: {
				text: 'Observe the way spotlight interaction works with InputFields.'
			}
		}
	)
	.add(
		'with a number',
		() => (
			<InputField
				onChange={action('onChange')}
				type="number"
				size={select('size', props.size, FieldConfig)}
				defaultValue={0}
			/>
		)
	)
;
