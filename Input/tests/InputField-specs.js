import Spotlight from '@enact/spotlight';
import '@testing-library/jest-dom';
import {fireEvent, render} from '@testing-library/react';

import {InputField} from '../';

const isPaused = () => Spotlight.isPaused() ? 'paused' : 'not paused';

describe('InputField Specs', () => {
	test('should have an input element', () => {
		const {getByTestId} = render(
			<InputField data-testid="inputField" />
		);

		const inputField = getByTestId('inputField');

		expect(inputField).toBeInTheDocument();
	});

	test('should include a placeholder if specified', () => {
		const {getByTestId} = render(
			<InputField data-testid="inputField" placeholder="hello" />
		);

		const inputField = getByTestId('inputField');
		const expected = 'hello';
		const actual = inputField.textContent;

		expect(actual).toBe(expected);
	});

	test('should callback onChange when the text changes', () => {
		const handleChange = jest.fn();
		const value = 'blah';
		const evt = {target: {value: value}};
		const {getByTestId} = render(
			<InputField data-testid="inputField" onChange={handleChange} />
		);

		const inputField = getByTestId('inputField').children.item(2);
		fireEvent.change(inputField, evt);

		expect(handleChange).toHaveBeenCalled();
	});

	test('should forward an event with a stopPropagation method from onChange handler', () => {
		const handleChange = jest.fn();
		const value = 'blah';
		const evt = {
			target: {value: value},
			stopPropagation: jest.fn()
		};

		const {getByTestId} = render(
			<InputField data-testid="inputField" onChange={handleChange} />
		);

		const inputField = getByTestId('inputField').children.item(2);
		fireEvent.change(inputField, evt);

		const actual = typeof handleChange.mock.calls[0][0].stopPropagation === 'function';

		expect(actual).toBeTruthy();
	});

	test('should not bubble the native event when stopPropagation from onChange is called', () => {
		const handleChange = jest.fn();
		function stop (ev) {
			ev.stopPropagation();
		}

		const {getByTestId} = render(
			<div onChange={handleChange}>
				<InputField data-testid="inputField" onChange={stop} />
			</div>
		);

		const inputText = getByTestId('inputField').children.item(2);
		fireEvent.change(inputText, {target:{value:'smt'}});

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should callback onBeforeChange before the text changes', () => {
		const handleBeforeChange = jest.fn();
		const value = 'blah';
		const evt = {target: {value: value}};
		const {getByTestId} = render(
			<InputField data-testid="inputField" onBeforeChange={handleBeforeChange} />
		);

		const inputText = getByTestId('inputField').children.item(2);
		fireEvent.change(inputText, evt);

		expect(handleBeforeChange).toHaveBeenCalled();
	});

	test('should prevent onChange if onBeforeChange prevents', () => {
		const handleBeforeChange = jest.fn(ev => ev.preventDefault());
		const handleChange = jest.fn();
		const value = 'blah';
		const evt = {target: {value: value}};
		const {getByTestId} = render(
			<InputField data-testid="inputField" onBeforeChange={handleBeforeChange} onChange={handleChange} />
		);

		const inputText = getByTestId('inputField').children.item(2);
		fireEvent.change(inputText, evt);

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should blur input on enter if dismissOnEnter', () => {
		const handleChange = jest.fn();

		const {getByTestId} = render(
			<InputField data-testid="inputField" onBlur={handleChange} dismissOnEnter />
		);

		const inputText = getByTestId('inputField').children.item(2);
		fireEvent.mouseDown(inputText);
		fireEvent.keyUp(inputText, {which: 13, keyCode: 13, code: 13});

		expect(handleChange).toHaveBeenCalled();
	});

	test('should activate input on enter', () => {
		const handleChange = jest.fn();

		const {getByTestId} = render(
			<InputField data-testid="inputField" onActivate={handleChange} />
		);

		const inputText = getByTestId('inputField').children.item(2);
		fireEvent.keyDown(inputText, {which: 13, keyCode: 13, code: 13});
		fireEvent.keyUp(inputText, {which: 13, keyCode: 13, code: 13});


		expect(handleChange).toHaveBeenCalled();
	});

	test('should not activate input on enter when disabled', () => {
		const handleChange = jest.fn();

		const {getByTestId} = render(
			<InputField data-testid="inputField" disabled onActivate={handleChange} />
		);

		const inputText = getByTestId('inputField').children.item(2);
		fireEvent.keyDown(inputText, {which: 13, keyCode: 13, code: 13});
		fireEvent.keyUp(inputText, {which: 13, keyCode: 13, code: 13});


		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should be able to be disabled', () => {
		const {getByTestId} = render(
			<InputField data-testid="inputField" disabled />
		);

		const actual = getByTestId('inputField');
		const expected = 'disabled';

		expect(actual).toHaveAttribute(expected);
	});

	test('should reflect the value if specified', () => {
		const {getByTestId} = render(
			<InputField data-testid="inputField" value="hello" />
		);

		const inputField = getByTestId('inputField');
		const actual = inputField.textContent;
		const expected = 'hello';

		expect(actual).toBe(expected);
	});

	test('should have dir equal to rtl when there is rtl text', () => {
		const {getByTestId} = render(
			<InputField data-testid="inputField" value="שועל החום הזריז קפץ מעל הכלב העצלן.ציפור עפה השעועית עם שקי" />
		);

		const inputField = getByTestId('inputField').children.item(2);
		const actual = inputField.getAttribute('dir');
		const expected = 'rtl';

		expect(actual).toBe(expected);
	});

	test('should have dir equal to ltr when there is ltr text', () => {
		const {getByTestId} = render(
			<InputField data-testid="inputField" value="content" />
		);

		const inputField = getByTestId('inputField').children.item(2);
		const actual = inputField.getAttribute('dir');
		const expected = 'ltr';

		expect(actual).toBe(expected);
	});

	test('should have dir equal to rtl when there is rtl text in the placeholder', () => {
		const {getByTestId} = render(
			<InputField data-testid="inputField" placeholder="שועל החום הזריז קפץ מעל הכלב העצלן.ציפור עפה השעועית עם שקי" />
		);

		const inputField = getByTestId('inputField').children.item(2);
		const actual = inputField.getAttribute('dir');
		const expected = 'rtl';

		expect(actual).toBe(expected);
	});

	test('should have dir equal to ltr when there is ltr text in the placeholder', () => {
		const {getByTestId} = render(
			<InputField data-testid="inputField" placeholder="content" />
		);

		const inputField = getByTestId('inputField').children.item(2);
		const actual = inputField.getAttribute('dir');
		const expected = 'ltr';

		expect(actual).toBe(expected);
	});

	test('should have dir equal to rtl when there is ltr text in the placeholder, but rtl text in value', () => {
		const {getByTestId} = render(
			<InputField
				data-testid="inputField"
				placeholder="content"
				value="שועל החום הזריז קפץ מעל הכלב העצלן.ציפור עפה השעועית עם שקי"
			/>
		);

		const inputField = getByTestId('inputField').children.item(2);
		const actual = inputField.getAttribute('dir');
		const expected = 'rtl';

		expect(actual).toBe(expected);
	});

	test('should have dir equal to ltr when there is rtl text in the placeholder, but ltr text in value', () => {
		const {getByTestId} = render(
			<InputField
				data-testid="inputField"
				placeholder="שועל החום הזריז קפץ מעל הכלב העצלן.ציפור עפה השעועית עם שקי"
				value="content"
			/>
		);

		const inputField = getByTestId('inputField').children.item(2);
		const actual = inputField.getAttribute('dir');
		const expected = 'ltr';

		expect(actual).toBe(expected);
	});

	test('should pause spotlight when input has focus', () => {
		const {getByTestId} = render(
			<InputField data-testid="inputField" />
		);

		const inputField = getByTestId('inputField').children.item(2);
		fireEvent.mouseDown(inputField);

		const expected = 'paused';
		const actual = isPaused();

		Spotlight.resume();

		expect(actual).toBe(expected);
	});

	test('should resume spotlight on unmount', () => {
		const {getByTestId, unmount} = render(
			<InputField data-testid="inputField" />
		);

		const inputField = getByTestId('inputField').children.item(2);
		fireEvent.mouseDown(inputField);

		unmount();

		const expected = 'not paused';
		const actual = isPaused();

		Spotlight.resume();

		expect(actual).toBe(expected);
	});

	test('should display invalid message if it invalid and invalid message exists', () => {
		const {getByText} = render(
			<InputField invalid invalidMessage="invalid message" />
		);

		const invalidText = getByText('invalid message').parentElement.parentElement;
		const expected = 'tooltipLabel';
		const actual = invalidText.className;

		expect(invalidText).toBeInTheDocument();
		expect(actual).toContain(expected);
	});

	test('should not display invalid message if it is valid', () => {
		const {queryByText} = render(
			<InputField invalidMessage="invalid message" />
		);

		const actual = queryByText('invalid message');

		expect(actual).toBeNull();
	});

	test('should set voice intent if specified', () => {
		const {getByTestId} = render(
			<InputField data-testid="inputField" data-webos-voice-intent="Select" />
		);

		const inputField = getByTestId('inputField').children.item(2);
		const expected = 'Select';
		const actual = inputField.getAttribute('data-webos-voice-intent');

		expect(actual).toBe(expected);
	});

	test('should set voice label if specified', () => {
		const label = 'input label';
		const {getByTestId} = render(
			<InputField data-testid="inputField" data-webos-voice-label={label} />
		);

		const inputField = getByTestId('inputField').children.item(2);
		const expected = label;
		const actual = inputField.getAttribute('data-webos-voice-label');

		expect(actual).toBe(expected);
	});
});
