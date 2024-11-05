import Spotlight from '@enact/spotlight';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {InputField} from '../';

const isPaused = () => Spotlight.isPaused() ? 'paused' : 'not paused';

describe('InputField Specs', () => {
	test('should have an input element', () => {
		render(<InputField />);
		const inputField = screen.getByLabelText('Input field');

		expect(inputField).toBeInTheDocument();
	});

	test('should include a placeholder if specified', () => {
		render(<InputField placeholder="hello" />);
		const inputField = screen.getByLabelText('hello Input field');

		const expected = 'hello';
		const actual = inputField.textContent;

		expect(actual).toBe(expected);
	});

	test('should callback onChange with `onChange` type when the text changes', async () => {
		const handleChange = jest.fn();
		const value = 'blah';
		const user = userEvent.setup();
		render(<InputField onChange={handleChange} />);
		const inputField = screen.getByPlaceholderText('');

		await user.type(inputField, value);

		const expected = {type: 'onChange'};
		const actual = handleChange.mock.calls.length && handleChange.mock.calls[0][0];

		expect(handleChange).toHaveBeenCalled();
		expect(actual).toMatchObject(expected);
	});

	test('should forward an event with a stopPropagation method from onChange handler', () => {
		const handleChange = jest.fn();
		const value = 'blah';
		const evt = {
			target: {value},
			stopPropagation: jest.fn()
		};

		render(<InputField onChange={handleChange} />);
		const inputField = screen.getByPlaceholderText('');

		fireEvent.change(inputField, evt);

		const actual = typeof handleChange.mock.calls[0][0].stopPropagation === 'function';

		expect(actual).toBeTruthy();
	});

	test('should not bubble the native event when stopPropagation from onChange is called', async () => {
		const handleChange = jest.fn();
		const value = 'smt';
		function stop (ev) {
			ev.stopPropagation();
		}
		const user = userEvent.setup();

		render(
			<div onChange={handleChange}>
				<InputField onChange={stop} />
			</div>
		);
		const inputField = screen.getByPlaceholderText('');

		await user.type(inputField, value);

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should callback onBeforeChange with `onBeforeChange` type before the text changes', async () => {
		const handleBeforeChange = jest.fn();
		const value = 'blah';
		const user = userEvent.setup();
		render(<InputField onBeforeChange={handleBeforeChange} />);
		const inputField = screen.getByPlaceholderText('');

		await user.type(inputField, value);

		const expected = {type: 'onBeforeChange'};
		const actual = handleBeforeChange.mock.calls.length && handleBeforeChange.mock.calls[0][0];

		expect(handleBeforeChange).toHaveBeenCalled();
		expect(actual).toMatchObject(expected);
	});

	test('should prevent onChange if onBeforeChange prevents', async () => {
		const handleBeforeChange = jest.fn(ev => ev.preventDefault());
		const handleChange = jest.fn();
		const value = 'blah';
		const user = userEvent.setup();
		render(<InputField onBeforeChange={handleBeforeChange} onChange={handleChange} />);
		const inputField = screen.getByPlaceholderText('');

		await user.type(inputField, value);

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should blur input on enter if dismissOnEnter', () => {
		const handleChange = jest.fn();

		render(<InputField onBlur={handleChange} dismissOnEnter />);
		const inputField = screen.getByPlaceholderText('');

		fireEvent.mouseDown(inputField);
		fireEvent.keyUp(inputField, {which: 13, keyCode: 13, code: 13});

		expect(handleChange).toHaveBeenCalled();
	});

	test('should activate input on enter', () => {
		const handleChange = jest.fn();

		render(<InputField onActivate={handleChange} />);
		const inputField = screen.getByPlaceholderText('');

		fireEvent.keyDown(inputField, {which: 13, keyCode: 13, code: 13});
		fireEvent.keyUp(inputField, {which: 13, keyCode: 13, code: 13});


		expect(handleChange).toHaveBeenCalled();
	});

	test('should not activate input on enter when disabled', () => {
		const handleChange = jest.fn();

		render(<InputField disabled onActivate={handleChange} />);
		const inputField = screen.getByPlaceholderText('');

		fireEvent.keyDown(inputField, {which: 13, keyCode: 13, code: 13});
		fireEvent.keyUp(inputField, {which: 13, keyCode: 13, code: 13});


		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should be able to be disabled', () => {
		render(<InputField disabled />);

		const actual = screen.getByLabelText('Input field');
		const expected = 'disabled';

		expect(actual).toHaveAttribute(expected);
	});

	test('should reflect the value if specified', () => {
		render(<InputField value="hello" />);

		const inputField = screen.getByLabelText('hello Input field');
		const actual = inputField.textContent;
		const expected = 'hello';

		expect(actual).toBe(expected);
	});

	test('should have dir equal to rtl when there is rtl text', () => {
		render(<InputField value="שועל החום הזריז קפץ מעל הכלב העצלן.ציפור עפה השעועית עם שקי" />);
		const inputField = screen.getByLabelText( 'שועל החום הזריז קפץ מעל הכלב העצלן.ציפור עפה השעועית עם שקי' + ' Input field').children.item(2);

		const expectedAttribute = 'dir';
		const expectedValue = 'rtl';

		expect(inputField).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should have dir equal to ltr when there is ltr text', () => {
		render(<InputField value="content" />);
		const inputField = screen.getByPlaceholderText('');

		const expectedAttribute = 'dir';
		const expectedValue = 'ltr';

		expect(inputField).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should have dir equal to rtl when there is rtl text in the placeholder', () => {
		render(<InputField placeholder="שועל החום הזריז קפץ מעל הכלב העצלן.ציפור עפה השעועית עם שקי" />);
		const inputField = screen.getByPlaceholderText('שועל החום הזריז קפץ מעל הכלב העצלן.ציפור עפה השעועית עם שקי');

		const expectedAttribute = 'dir';
		const expectedValue = 'rtl';

		expect(inputField).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should have dir equal to ltr when there is ltr text in the placeholder', () => {
		render(<InputField placeholder="content" />);
		const inputField = screen.getByPlaceholderText('content');

		const expectedAttribute = 'dir';
		const expectedValue = 'ltr';

		expect(inputField).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should have dir equal to rtl when there is ltr text in the placeholder, but rtl text in value', () => {
		render(
			<InputField
				placeholder="content"
				value="שועל החום הזריז קפץ מעל הכלב העצלן.ציפור עפה השעועית עם שקי"
			/>
		);
		const inputField = screen.getByPlaceholderText('content');

		const expectedAttribute = 'dir';
		const expectedValue = 'rtl';

		expect(inputField).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should have dir equal to ltr when there is rtl text in the placeholder, but ltr text in value', () => {
		const placeholder = 'שועל החום הזריז קפץ מעל הכלב העצלן.ציפור עפה השעועית עם שקי';
		render(
			<InputField
				placeholder={placeholder}
				value="content"
			/>
		);
		const inputField = screen.getByPlaceholderText(placeholder);

		const expectedAttribute = 'dir';
		const expectedValue = 'ltr';

		expect(inputField).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should pause spotlight when input has focus', () => {
		render(<InputField />);
		const inputField = screen.getByPlaceholderText('');

		fireEvent.mouseDown(inputField);

		const expected = 'paused';
		const actual = isPaused();

		Spotlight.resume();

		expect(actual).toBe(expected);
	});

	test('should resume spotlight on unmount', () => {
		const {unmount} = render(<InputField />);
		const inputField = screen.getByPlaceholderText('');

		fireEvent.mouseDown(inputField);

		unmount();

		const expected = 'not paused';
		const actual = isPaused();

		Spotlight.resume();

		expect(actual).toBe(expected);
	});

	test('should display invalid message if it invalid and invalid message exists', () => {
		render(<InputField invalid invalidMessage="invalid message" />);
		const invalidText = screen.getByText('invalid message').parentElement.parentElement;

		const expected = 'tooltipLabel';

		expect(invalidText).toBeInTheDocument();
		expect(invalidText).toHaveClass(expected);
	});

	test('should not display invalid message if it is valid', () => {
		render(<InputField invalidMessage="invalid message" />);

		const actual = screen.queryByText('invalid message');

		expect(actual).toBeNull();
	});

	test('should set voice intent if specified', () => {
		render(<InputField data-webos-voice-intent="Select" />);
		const inputField = screen.getByPlaceholderText('');

		const expectedAttribute = 'data-webos-voice-intent';
		const expectedValue = 'Select';

		expect(inputField).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should set voice label if specified', () => {
		const customLabel = 'input label';
		render(<InputField data-webos-voice-label={customLabel} />);
		const inputField = screen.getByPlaceholderText('');

		const expectedAttribute = 'data-webos-voice-label';

		expect(inputField).toHaveAttribute(expectedAttribute, customLabel);
	});
});
