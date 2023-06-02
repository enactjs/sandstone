import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {act, fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from '../Input';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('Input specs', () => {
	test('should be rendered opened if open is set to true', () => {
		render(
			<FloatingLayerController>
				<Input open />
			</FloatingLayerController>
		);
		const actual = screen.getAllByLabelText('- Input field')[0].parentElement.nextElementSibling.children.length > 0;

		expect(actual).toBeTruthy();
	});

	test('should set title when there is title text', () => {
		const str = 'title text';
		render(
			<FloatingLayerController>
				<Input open title={str} />
			</FloatingLayerController>
		);
		const titleField = screen.getByText(str).parentElement.parentElement;

		const expected = 'title';

		expect(titleField).toBeInTheDocument();
		expect(titleField).toHaveClass(expected);
	});

	test('should set title below when there is title below text', () => {
		const str = 'title below text';
		render(
			<FloatingLayerController>
				<Input open subtitle={str} />
			</FloatingLayerController>
		);
		const subtitleField = screen.getByText(str).parentElement.parentElement;

		const expected = 'subtitle';

		expect(subtitleField).toBeInTheDocument();
		expect(subtitleField).toHaveClass(expected);
	});

	test('should set value at input when there is value text', () => {
		const str = 'value text';
		render(
			<FloatingLayerController>
				<Input open value={str} />
			</FloatingLayerController>
		);
		const inputField = screen.getByPlaceholderText('-');

		expect(inputField).toHaveValue(str);
	});

	test('should set placeholder at input when there is placeholder text', () => {
		const str = 'placeholder text';
		render(
			<FloatingLayerController>
				<Input open placeholder={str} />
			</FloatingLayerController>
		);
		const inputField = screen.getByPlaceholderText(str);

		const expectedAttribute = 'placeholder';

		expect(inputField).toHaveAttribute(expectedAttribute, str);
	});

	test('should set type to password at input when input type is `password`', () => {
		const str = 'placeholder text';
		render(
			<FloatingLayerController>
				<Input open placeholder={str} type="password" />
			</FloatingLayerController>
		);
		const inputField = screen.getByPlaceholderText(str);

		const expectedAttribute = 'type';
		const expectedValue = 'password';

		expect(inputField).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should set `spellcheck=false` attribute when type is `password`', () => {
		const str = 'placeholder text';
		render(
			<FloatingLayerController>
				<Input placeholder={str} open type="password" />
			</FloatingLayerController>
		);
		const inputField = screen.getByPlaceholderText(str);

		const expectedAttribute = 'spellcheck';
		const expectedValue = 'false';

		expect(inputField).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should set type to url at input when input type is `url`', () => {
		const str = 'placeholder text';
		render(
			<FloatingLayerController>
				<Input open placeholder={str} type="url" />
			</FloatingLayerController>
		);
		const inputField = screen.getByPlaceholderText(str);

		const expectedAttribute = 'type';
		const expectedValue = 'url';

		expect(inputField).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should set disabled at button when popup is disabled', () => {
		render(<Input disabled />);
		const buttonInput = screen.getByRole('button');

		const expectedAttribute = 'aria-disabled';
		const expectedValue = 'true';

		expect(buttonInput).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should fire `onOpenPopup` and `onShow` with type when open', async () => {
		const handleOpenPopup = jest.fn();
		const handleShow = jest.fn();
		const user = userEvent.setup();

		render(
			<FloatingLayerController>
				<Input onOpenPopup={handleOpenPopup} onShow={handleShow} />
			</FloatingLayerController>
		);

		await user.click(screen.getByRole('button'));

		const openExpected = {type: 'onOpenPopup'};
		const openActual = handleOpenPopup.mock.calls.length && handleOpenPopup.mock.calls[0][0];

		const showExpected = {type: 'onShow'};
		const showActual = handleShow.mock.calls.length && handleShow.mock.calls[0][0];

		expect(openActual).toMatchObject(openExpected);
		expect(showActual).toMatchObject(showExpected);
	});

	test('should fire `onBeforeChange` and `onChange` with type when value changed', async () => {
		const handleBeforeChange = jest.fn();
		const handleChange = jest.fn();
		const user = userEvent.setup();

		render(
			<FloatingLayerController>
				<Input onBeforeChange={handleBeforeChange} onChange={handleChange} open />
			</FloatingLayerController>
		);

		await user.type(screen.getByPlaceholderText('-'), 'a');

		const beforeExpected = {type: 'onBeforeChange'};
		const beforeActual = handleBeforeChange.mock.calls.length && handleBeforeChange.mock.calls[0][0];

		const changeExpected = {type: 'onChange'};
		const changeActual = handleChange.mock.calls.length && handleChange.mock.calls[0][0];

		expect(beforeActual).toMatchObject(beforeExpected);
		expect(changeActual).toMatchObject(changeExpected);
	});

	test('should fire `onClose` and `onComplete` with type when enter key pressed', () => {
		const handleClose = jest.fn();
		const handleComplete = jest.fn();
		render(
			<FloatingLayerController>
				<Input onClose={handleClose} onComplete={handleComplete} open />
			</FloatingLayerController>
		);

		fireEvent.keyDown(screen.getByPlaceholderText('-'), {keyCode: 13});

		const closeExpected = {type: 'onClose'};
		const closeActual = handleClose.mock.calls.length && handleClose.mock.calls[0][0];

		const completeExpected = {type: 'onComplete'};
		const completeActual = handleComplete.mock.calls.length && handleComplete.mock.calls[0][0];

		expect(closeActual).toMatchObject(closeExpected);
		expect(completeActual).toMatchObject(completeExpected);
	});

	// Type = number
	describe('of type number', () => {
		test('should be rendered opened if open is set to true', () => {
			render(
				<FloatingLayerController>
					<Input type="number" open length={4} />
				</FloatingLayerController>
			);

			const actual = screen.getAllByLabelText('- Input field')[0].parentElement.nextElementSibling.children.length > 0;

			expect(actual).toBeTruthy();
		});

		test('should set title when there is title text', () => {
			const str = 'title text';
			render(
				<FloatingLayerController>
					<Input type="number" open length={4} title={str} />
				</FloatingLayerController>
			);
			const titleField = screen.getByText(str).parentElement.parentElement;

			const expected = 'title';

			expect(titleField).toBeInTheDocument();
			expect(titleField).toHaveClass(expected);
		});

		test('should set title below when there is title below text', () => {
			const str = 'title below text';
			render(
				<FloatingLayerController>
					<Input type="number" open length={4} subtitle={str} />
				</FloatingLayerController>
			);
			const subtitleField = screen.getByText(str).parentElement.parentElement;

			const expected = 'subtitle';

			expect(subtitleField).toBeInTheDocument();
			expect(subtitleField).toHaveClass(expected);
		});

		test('should set value at input when there is value text', () => {
			const str = '1234';
			render(
				<FloatingLayerController>
					<Input type="number" open length={4} value={str} />
				</FloatingLayerController>
			);

			const expected = str;
			const actual = screen.getByRole('list').textContent;

			expect(actual).toBe(expected);
		});

		test('should set disabled at button when the component is disabled', () => {
			render(<Input type="number" length={4} disabled />);
			const buttonInput = screen.getByRole('button');

			const expectedAttribute = 'aria-disabled';
			const expectedValue = 'true';

			expect(buttonInput).toHaveAttribute(expectedAttribute, expectedValue);
		});

		test('should not be able to add more characters when the maxlength is reached', async () => {
			const spy = jest.fn();
			const user = userEvent.setup();
			render(
				<FloatingLayerController>
					<Input type="number" minLength={1} maxLength={4} open onChange={spy} value="1234" />
				</FloatingLayerController>
			);
			const numberButton = screen.getByText('6');

			await user.click(numberButton);

			expect(spy).not.toHaveBeenCalled();
		});

		test('should include a submit button when `minLength` !== `maxLength` for number input', () => {
			render(
				<FloatingLayerController data-testid="input">
					<Input type="number" minLength={4} maxLength={6} open />
				</FloatingLayerController>
			);

			const buttonSubmit = screen.getByText('Submit');

			expect(buttonSubmit).not.toBeNull();
		});

		test('should include a submit button for implicit joined number input', () => {
			render(
				<FloatingLayerController>
					<Input type="number" length={10} open />
				</FloatingLayerController>
			);
			const buttonSubmit = screen.getByText('Submit');

			expect(buttonSubmit).not.toBeNull();
		});

		test('should include a submit button for explicit joined number input', () => {
			render(
				<FloatingLayerController>
					<Input type="number" length={4} open numberInputField="joined" />
				</FloatingLayerController>
			);
			const buttonSubmit = screen.getByText('Submit');

			expect(buttonSubmit).not.toBeNull();
		});

		test('should exclude a submit button when separated number input', () => {
			render(
				<FloatingLayerController>
					<Input type="number" length={4} open />
				</FloatingLayerController>
			);
			const buttonSubmit = screen.queryByText('Submit');

			expect(buttonSubmit).toBeNull();
		});

		test('should exclude a submit button for explicit separated number input', () => {
			render(
				<FloatingLayerController>
					<Input type="number" length={10} open numberInputField="separated" />
				</FloatingLayerController>
			);
			const buttonSubmit = screen.queryByText('Submit');

			expect(buttonSubmit).toBeNull();
		});

		test('should show an invalid tooltip if invalid and message supplied', () => {
			render(
				<FloatingLayerController>
					<Input type="number" open length={10} invalid invalidMessage="Invalid" />
				</FloatingLayerController>
			);
			const invalidTextField = screen.getByText('Invalid').parentElement.parentElement;

			const expected = 'tooltipLabel';

			expect(invalidTextField).toHaveClass(expected);
		});

		test('should not show invalid tooltip if not invalid but message supplied', () => {
			render(
				<FloatingLayerController>
					<Input type="number" open length={10} invalidMessage="Invalid" />
				</FloatingLayerController>
			);

			const actual = screen.queryByText('Invalid');

			expect(actual).toBeNull();
		});

		test('should show an invalid tooltip if invalid and no message supplied', () => {
			render(
				<FloatingLayerController>
					<Input type="number" open length={10} invalid />
				</FloatingLayerController>
			);
			const invalidTextField = screen.getByText('Please enter a valid value.').parentElement.parentElement;

			const expected = 'tooltipLabel';

			expect(invalidTextField).toHaveClass(expected);
		});

		test('should not show an invalid tooltip if invalid and message is falsy', () => {
			render(
				<FloatingLayerController>
					<Input type="number" open length={10} invalid invalidMessage="" />
				</FloatingLayerController>
			);

			const expected = 1;
			const actual = screen.getAllByRole('button')[2].parentElement.previousElementSibling.previousElementSibling.children.length;

			expect(actual).toBe(expected);
		});

		test('should call onComplete when submit button clicked', async () => {
			jest.useFakeTimers();
			const spy = jest.fn();
			const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
			render(
				<FloatingLayerController>
					<Input type="number" minLength={1} maxLength={4} open onComplete={spy} />
				</FloatingLayerController>
			);
			const numberButton = screen.getByText('2');
			const submitButton = screen.getByText('Submit');

			await user.click(numberButton);
			await user.click(submitButton);

			act(() => jest.advanceTimersByTime(300));

			expect(spy).toHaveBeenCalled();

			jest.useRealTimers();
		});

		test('should call onChange when submit button clicked', async () => {
			const spy = jest.fn();
			const user = userEvent.setup();
			render(
				<FloatingLayerController>
					<Input type="number" minLength={1} maxLength={4} open onChange={spy} />
				</FloatingLayerController>
			);
			const numberButton = screen.getByText('2');
			const submitButton = screen.getByText('Submit');

			await user.click(numberButton);
			await user.click(submitButton);

			expect(spy).toHaveBeenCalled();
		});

		test('should call onBeforeChange once when input occurs', async () => {
			const spy = jest.fn();
			const user = userEvent.setup();
			render(
				<FloatingLayerController>
					<Input type="number" open length={10} onBeforeChange={spy} />
				</FloatingLayerController>
			);
			const numberButton = screen.getByText('2');

			await user.click(numberButton);

			expect(spy).toHaveBeenCalled();
		});

		test('should prevent input when onBeforeChange calls preventDefault', async () => {
			const spy = jest.fn();
			const mock = jest.fn((ev) => {
				if (ev.value === '2') {
					ev.preventDefault();
				}
			});
			const user = userEvent.setup();
			render(
				<FloatingLayerController>
					<Input type="number" minLength={1} maxLength={4} open onBeforeChange={mock} onChange={spy} />
				</FloatingLayerController>
			);

			const numberButton2 = screen.getByText('2');
			const numberButton1 = screen.getByText('1');
			const submitButton = screen.getByText('Submit');

			await user.click(numberButton2);
			await user.click(numberButton1);
			await user.click(submitButton);

			const expected = 1;
			expect(spy).toHaveBeenCalledTimes(expected);
		});

		test('should delete an input when delete button clicked', async () => {
			const spy = jest.fn();
			const user = userEvent.setup();
			render(
				<FloatingLayerController>
					<Input type="number" value="12" minLength={1} maxLength={4} open onChange={spy} />
				</FloatingLayerController>
			);
			const backspaceButton = screen.getByText('␈');

			await user.click(backspaceButton);

			const expected = '1';
			const actual = screen.getByRole('list').textContent;

			expect(spy).toHaveBeenCalled();
			expect(actual).toBe(expected);
		});

		test('should call onBeforeChange when delete button clicked', async () => {
			const spy = jest.fn();
			const user = userEvent.setup();

			render(
				<FloatingLayerController>
					<Input type="number" value="12" minLength={1} maxLength={4} open onBeforeChange={spy} />
				</FloatingLayerController>
			);
			const backspaceButton = screen.getByText('␈');

			await user.click(backspaceButton);

			const expected = '1';
			const actual = screen.getByRole('list').textContent;

			expect(spy).toHaveBeenCalled();
			expect(actual).toBe(expected);
		});

		test('should not include a submit button when noSubmitButton is used', () => {
			render(
				<FloatingLayerController>
					<Input type="number" length={4} open numberInputField="joined" noSubmitButton />
				</FloatingLayerController>
			);
			const buttonSubmit = screen.queryByText('Submit');

			expect(buttonSubmit).toBeNull();
		});
	});
});
