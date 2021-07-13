import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {fireEvent, render} from '@testing-library/react';

import Input from '../Input';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('Input specs', () => {
	test('should be rendered opened if open is set to true', () => {
		const {getAllByRole} = render(
			<FloatingLayerController>
				<Input open />
			</FloatingLayerController>
		);

		const expected = 2;
		const actual = getAllByRole('button').length;

		expect(actual).toBe(expected);
	});

	test('should set title when there is title text', () => {
		const str = 'title text';
		const {getByText} = render(
			<FloatingLayerController>
				<Input open title={str} />
			</FloatingLayerController>
		);

		const titleField = getByText(str).parentElement.parentElement;
		const expected = 'title';
		const actual = titleField.className;

		expect(titleField).toBeInTheDocument();
		expect(actual).toContain(expected);
	});

	test('should set title below when there is title below text', () => {
		const str = 'title below text';
		const {getByText} = render(
			<FloatingLayerController>
				<Input open subtitle={str} />
			</FloatingLayerController>
		);

		const subtitleField = getByText(str).parentElement.parentElement;
		const expected = 'subtitle';
		const actual = subtitleField.className;

		expect(subtitleField).toBeInTheDocument();
		expect(actual).toContain(expected);
	});

	test('should set value at input when there is value text', () => {
		const str = 'value text';
		const {getAllByText} = render(
			<FloatingLayerController>
				<Input open value={str} />
			</FloatingLayerController>
		);

		const inputField = getAllByText(str)[1].parentElement;
		const expected = 'inputField';
		const actual = inputField.className;

		expect(inputField).toBeInTheDocument();
		expect(actual).toContain(expected);
	});

	test('should set placeholder at input when there is placeholder text', () => {
		const str = 'placeholder text';
		const {getAllByText} = render(
			<FloatingLayerController>
				<Input open placeholder={str} />
			</FloatingLayerController>
		);

		const inputField = getAllByText(str)[1].nextElementSibling;
		const expected = str;
		const actual = inputField.getAttribute('placeholder');

		expect(actual).toBe(expected);
	});

	test('should set type to password at input when input type is `password`', () => {
		const str = 'placeholder text';
		const {getAllByText} = render(
			<FloatingLayerController>
				<Input open placeholder={str} type="password" />
			</FloatingLayerController>
		);

		const inputField = getAllByText(str)[1].nextElementSibling;
		const expected = 'password';
		const actual = inputField.getAttribute('type');

		expect(actual).toBe(expected);
	});

	test('should set type to url at input when input type is `url`', () => {
		const str = 'placeholder text';
		const {getAllByText} = render(
			<FloatingLayerController>
				<Input open placeholder={str} type="url" />
			</FloatingLayerController>
		);

		const inputField = getAllByText(str)[1].nextElementSibling;
		const expected = 'url';
		const actual = inputField.getAttribute('type');

		expect(actual).toBe(expected);
	});

	test('should set disabled at button when popup is disabled', () => {
		const {getByRole} = render(<Input disabled />);

		const expected = 'true';
		const actual = getByRole('button').getAttribute('aria-disabled');

		expect(actual).toBe(expected);
	});

	// Type = number
	test('should be rendered opened if open is set to true', () => {
		const {getAllByRole} = render(
			<FloatingLayerController>
				<Input type="number" open length={4} />
			</FloatingLayerController>
		);

		const expected = true;
		const actual = getAllByRole('button').length > 1;

		expect(actual).toBe(expected);
	});

	test('should set title when there is title text', () => {
		const str = 'title text';
		const {getByText} = render(
			<FloatingLayerController>
				<Input type="number" open length={4} title={str} />
			</FloatingLayerController>
		);

		const titleField = getByText(str).parentElement.parentElement;
		const expected = 'title';
		const actual = titleField.className;

		expect(titleField).toBeInTheDocument();
		expect(actual).toContain(expected);
	});

	test('should set title below when there is title below text', () => {
		const str = 'title below text';
		const {getByText} = render(
			<FloatingLayerController>
				<Input type="number" open length={4} subtitle={str} />
			</FloatingLayerController>
		);

		const subtitleField = getByText(str).parentElement.parentElement;
		const expected = 'subtitle';
		const actual = subtitleField.className;

		expect(subtitleField).toBeInTheDocument();
		expect(actual).toContain(expected);
	});

	test('should set value at input when there is value text', () => {
		const str = '1234';
		const {getByRole} = render(
			<FloatingLayerController>
				<Input type="number" open length={4} value={str} />
			</FloatingLayerController>
		);

		const expected = str;
		const actual = getByRole('list').textContent;

		expect(actual).toBe(expected);
	});

	test('should set disabled at button when the component is disabled', () => {
		const {getByRole} = render(<Input type="number" length={4} disabled />);

		const expected = 'true';
		const actual = getByRole('button').getAttribute('aria-disabled');

		expect(actual).toBe(expected);
	});

	test('should not be able to add more characters when the maxlength is reached', () => {
		const spy = jest.fn();
		const {getByText} = render(
			<FloatingLayerController>
				<Input type="number" minLength={1} maxLength={4} open onChange={spy} value="1234" />
			</FloatingLayerController>
		);

		fireEvent.click(getByText('6'));

		expect(spy).not.toHaveBeenCalled();
	});

	test('should have the submit button disabled if value\'s length is smaller than minLength', () => {
		const {getAllByRole} = render(
			<FloatingLayerController>
				<Input type="number" minLength={3} maxLength={4} open value="1" />
			</FloatingLayerController>
		);

		const expected = 'disabled';
		const actual = getAllByRole('button')[13];

		expect(actual).toHaveAttribute(expected);
	});

	test('should include a submit button for implicit joined number input', () => {
		const {getAllByRole} = render(
			<FloatingLayerController>
				<Input type="number" length={10} open />
			</FloatingLayerController>
		);

		const expected = 14;
		// We use 14 because there are 14 total buttons when the input is open
		// 0 input button, 1 the back button 2-11 the numeric buttons and 12 the backspace button 13 submit button
		const actual = getAllByRole('button').length;

		expect(actual).toBe(expected);
	});

	test('should include a submit button for explicit joined number input', () => {
		const {getAllByRole} = render(
			<FloatingLayerController>
				<Input type="number" length={4} open numberInputField="joined" />
			</FloatingLayerController>
		);

		const expected = 14;
		// We use 14 because there are 14 total buttons when the input is open
		// 0 input button, 1 the back button 2-11 the numeric buttons and 12 the backspace button 13 submit button
		const actual = getAllByRole('button').length;

		expect(actual).toBe(expected);
	});

	test('should exclude a submit button when separated number input', () => {
		const {getAllByRole} = render(
			<FloatingLayerController>
				<Input type="number" length={4} open />
			</FloatingLayerController>
		);

		const expected = 13;
		// We use 13 because there are 13 total buttons when the input is open and the submit button is missing
		// 0 input button, 1 the back button 2-11 the numeric buttons and 12 the backspace button
		const actual = getAllByRole('button').length;

		expect(actual).toBe(expected);
	});

	test('should exclude a submit button for explicit separated number input', () => {
		const {getAllByRole} = render(
			<FloatingLayerController>
				<Input type="number" length={10} open numberInputField="separated" />
			</FloatingLayerController>
		);

		const expected = 13;
		// We use 13 because there are 13 total buttons when the input is open and the submit button is missing
		// 0 input button, 1 the back button 2-11 the numeric buttons and 12 the backspace button
		const actual = getAllByRole('button').length;

		expect(actual).toBe(expected);
	});

	test('should show an invalid tooltip if invalid and message supplied', () => {
		const {getByText} = render(
			<FloatingLayerController>
				<Input type="number" open length={10} invalid invalidMessage="Invalid" />
			</FloatingLayerController>
		);

		const invalidTextField = getByText('Invalid').parentElement.parentElement;
		const expected = 'tooltipLabel';
		const actual = invalidTextField.className;

		expect(actual).toContain(expected);
	});

	test('should not show invalid tooltip if not invalid but message supplied', () => {
		const {queryByText} = render(
			<FloatingLayerController>
				<Input type="number" open length={10} invalidMessage="Invalid" />
			</FloatingLayerController>
		);

		const actual = queryByText('Invalid');

		expect(actual).toBeNull();
	});

	test('should show an invalid tooltip if invalid and no message supplied', () => {
		const {getByText} = render(
			<FloatingLayerController>
				<Input type="number" open length={10} invalid />
			</FloatingLayerController>
		);

		const invalidTextField = getByText('Please enter a valid value.').parentElement.parentElement;
		const expected = 'tooltipLabel';
		const actual = invalidTextField.className;

		expect(actual).toContain(expected);
	});

	test('should not show an invalid tooltip if invalid and message is falsy', () => {
		const {getAllByRole} = render(
			<FloatingLayerController>
				<Input type="number" open length={10} invalid invalidMessage="" />
			</FloatingLayerController>
		);

		const expected = 1;
		const actual = getAllByRole('button')[2].parentElement.previousElementSibling.previousElementSibling.children.length;

		expect(actual).toBe(expected);
	});

	test('should call onComplete when submit button clicked', (done) => {
		const spy = jest.fn();
		const {getByText} = render(
			<FloatingLayerController>
				<Input type="number" minLength={1} maxLength={4} open onComplete={spy} />
			</FloatingLayerController>
		);

		fireEvent.click(getByText('2'));
		fireEvent.click(getByText('Submit'));

		setTimeout(() => {
			expect(spy).toHaveBeenCalled();
			done();
		}, 300);
	});

	test('should call onChange when submit button clicked', () => {
		const spy = jest.fn();
		const {getByText} = render(
			<FloatingLayerController>
				<Input type="number" minLength={1} maxLength={4} open onChange={spy} />
			</FloatingLayerController>
		);

		fireEvent.click(getByText('2'));
		fireEvent.click(getByText('Submit'));

		expect(spy).toHaveBeenCalled();
	});

	test('should call onBeforeChange once when input occurs', () => {
		const spy = jest.fn();
		const {getByText} = render(
			<FloatingLayerController>
				<Input type="number" open length={10} onBeforeChange={spy} />
			</FloatingLayerController>
		);

		fireEvent.click(getByText('2'));

		expect(spy).toHaveBeenCalled();
	});

	test('should prevent input when onBeforeChange calls preventDefault', () => {
		const spy = jest.fn();
		const mock = jest.fn((ev) => {
			if (ev.value === '2') {
				ev.preventDefault();
			}
		});
		const {getByText} = render(
			<FloatingLayerController>
				<Input type="number" minLength={1} maxLength={4} open onBeforeChange={mock} onChange={spy} />
			</FloatingLayerController>
		);

		fireEvent.click(getByText('2'));
		fireEvent.click(getByText('1'));
		fireEvent.click(getByText('Submit'));

		expect(spy).toHaveBeenCalled();
	});

	test('should delete an input when delete button clicked', () => {
		const spy = jest.fn();
		const {getByRole, getByText} = render(
			<FloatingLayerController>
				<Input type="number" value="12" minLength={1} maxLength={4} open onChange={spy} />
			</FloatingLayerController>
		);

		fireEvent.click(getByText('␈'));

		const expected = '1';
		const actual = getByRole('list').textContent;

		expect(spy).toHaveBeenCalled();
		expect(actual).toBe(expected);
	});

	test('should call onBeforeChange when delete button clicked', () => {
		const spy = jest.fn();

		const {getByRole, getByText} = render(
			<FloatingLayerController>
				<Input type="number" value="12" minLength={1} maxLength={4} open onBeforeChange={spy} />
			</FloatingLayerController>
		);

		fireEvent.click(getByText('␈'));

		const expected = '1';
		const actual = getByRole('list').textContent;

		expect(spy).toHaveBeenCalled();
		expect(actual).toBe(expected);
	});

	test('should not include a submit button when noSubmitButton is used', () => {
		const {getAllByRole} = render(
			<FloatingLayerController>
				<Input type="number" length={4} open numberInputField="joined" noSubmitButton />
			</FloatingLayerController>
		);

		const expected = 13;
		// We use 13 because there are 13 total buttons when the input is open and the submit button is missing
		// 0 input button, 1 the back button 2-11 the numeric buttons and 12 the backspace button
		const actual = getAllByRole('button').length;

		expect(actual).toBe(expected);
	});
});
