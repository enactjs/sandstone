import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
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

	test('should fire `onOpenPopup` and `onShow` with type when open', () => {
		let openType, showType;
		const handleOpenPopup = jest.fn(({type}) => {
			openType = type;
		});
		const handleShow = jest.fn(({type}) => {
			showType = type;
		});
		render(
			<FloatingLayerController>
				<Input onOpenPopup={handleOpenPopup} onShow={handleShow} />
			</FloatingLayerController>
		);

		userEvent.click(screen.getByRole('button'));

		expect(openType).toBe('onOpenPopup');
		expect(showType).toBe('onShow');
	});

	test('should fire `onBeforeChange` and `onChange` with type when value changed', () => {
		let beforeChangeType, changeType;
		const handleBeforeChange = jest.fn(({type}) => {
			beforeChangeType = type;
		});
		const handleChange = jest.fn(({type}) => {
			changeType = type;
		});
		render(
			<FloatingLayerController>
				<Input onBeforeChange={handleBeforeChange} onChange={handleChange} open />
			</FloatingLayerController>
		);

		userEvent.type(screen.getByPlaceholderText('-'), 'a');

		expect(beforeChangeType).toBe('onBeforeChange');
		expect(changeType).toBe('onChange');
	});

	test('should fire `onClose` and `onComplete` with type when enter key pressed', () => {
		let closeType, completeType;
		const handleClose = jest.fn(({type}) => {
			closeType = type;
		});
		const handleComplete = jest.fn(({type}) => {
			completeType = type;
		});
		render(
			<FloatingLayerController>
				<Input onClose={handleClose} onComplete={handleComplete} open />
			</FloatingLayerController>
		);

		userEvent.type(screen.getByPlaceholderText('-'), '{enter}');

		expect(closeType).toBe('onClose');
		expect(completeType).toBe('onComplete');
	});

	// Type = number
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

	test('should not be able to add more characters when the maxlength is reached', () => {
		const spy = jest.fn();
		render(
			<FloatingLayerController>
				<Input type="number" minLength={1} maxLength={4} open onChange={spy} value="1234" />
			</FloatingLayerController>
		);
		const numberButton = screen.getByText('6');

		userEvent.click(numberButton);

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

	test('should call onComplete when submit button clicked', (done) => {
		const spy = jest.fn();
		render(
			<FloatingLayerController>
				<Input type="number" minLength={1} maxLength={4} open onComplete={spy} />
			</FloatingLayerController>
		);
		const numberButton = screen.getByText('2');
		const submitButton = screen.getByText('Submit');

		userEvent.click(numberButton);
		userEvent.click(submitButton);

		setTimeout(() => {
			expect(spy).toHaveBeenCalled();
			done();
		}, 300);
	});

	test('should call onChange when submit button clicked', () => {
		const spy = jest.fn();
		render(
			<FloatingLayerController>
				<Input type="number" minLength={1} maxLength={4} open onChange={spy} />
			</FloatingLayerController>
		);
		const numberButton = screen.getByText('2');
		const submitButton = screen.getByText('Submit');

		userEvent.click(numberButton);
		userEvent.click(submitButton);

		expect(spy).toHaveBeenCalled();
	});

	test('should call onBeforeChange once when input occurs', () => {
		const spy = jest.fn();
		render(
			<FloatingLayerController>
				<Input type="number" open length={10} onBeforeChange={spy} />
			</FloatingLayerController>
		);
		const numberButton = screen.getByText('2');

		userEvent.click(numberButton);

		expect(spy).toHaveBeenCalled();
	});

	test('should prevent input when onBeforeChange calls preventDefault', () => {
		const spy = jest.fn();
		const mock = jest.fn((ev) => {
			if (ev.value === '2') {
				ev.preventDefault();
			}
		});
		render(
			<FloatingLayerController>
				<Input type="number" minLength={1} maxLength={4} open onBeforeChange={mock} onChange={spy} />
			</FloatingLayerController>
		);

		const numberButton2 = screen.getByText('2');
		const numberButton1 = screen.getByText('1');
		const submitButton = screen.getByText('Submit');

		userEvent.click(numberButton2);
		userEvent.click(numberButton1);
		userEvent.click(submitButton);

		const expected = 1;
		expect(spy).toHaveBeenCalledTimes(expected);
	});

	test('should delete an input when delete button clicked', () => {
		const spy = jest.fn();
		render(
			<FloatingLayerController>
				<Input type="number" value="12" minLength={1} maxLength={4} open onChange={spy} />
			</FloatingLayerController>
		);
		const backspaceButton = screen.getByText('␈');

		userEvent.click(backspaceButton);

		const expected = '1';
		const actual = screen.getByRole('list').textContent;

		expect(spy).toHaveBeenCalled();
		expect(actual).toBe(expected);
	});

	test('should call onBeforeChange when delete button clicked', () => {
		const spy = jest.fn();

		render(
			<FloatingLayerController>
				<Input type="number" value="12" minLength={1} maxLength={4} open onBeforeChange={spy} />
			</FloatingLayerController>
		);
		const backspaceButton = screen.getByText('␈');

		userEvent.click(backspaceButton);

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
