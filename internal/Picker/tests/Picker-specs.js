import '@testing-library/jest-dom';
import {act, fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Picker from '../Picker';
import PickerItem from '../PickerItem';

const keyDown = (keyCode) => (picker) => fireEvent.keyDown(picker, {keyCode});

const leftKeyDown = keyDown(37);
const rightKeyDown = keyDown(39);

describe('Picker Specs', () => {
	test('should have a default \'value\' of 0', () => {
		render(
			<Picker index={0} max={0} min={0} />
		);
		const valueText = screen.getAllByRole('button')[0].nextElementSibling.nextElementSibling; // there is a dummy sibling by Spottable

		const expectedValue = '0';
		const expectedAttribute = 'aria-valuetext';

		expect(valueText).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should return an object {value: Number} that represents the next value of the Picker component when pressing the increment <span>', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(
			<Picker index={0} max={1} min={-1} onChange={handleChange} value={0} />
		);
		const picker = screen.getByLabelText('0 next item').parentElement;

		await user.click(picker.firstElementChild);

		const expected = 1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should return an object {value: Number} that represents the next value of the Picker component when pressing the decrement <span>', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(
			<Picker index={0} max={1} min={-1} onChange={handleChange} value={0} />
		);
		const picker = screen.getByLabelText('0 next item').parentElement;

		await user.click(picker.lastElementChild.previousElementSibling); // there is a dummy sibling by Spottable

		const expected = -1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should not run the onChange handler when disabled', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(
			<Picker disabled index={0} max={0} min={0} onChange={handleChange} value={0} />
		);
		const picker = screen.getByLabelText('0 next item').parentElement;

		await user.click(picker.firstElementChild);

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should wrap to the beginning of the value range if \'wrap\' is true', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(
			<Picker index={0} max={0} min={-1} onChange={handleChange} value={0} wrap />
		);
		const picker = screen.getByLabelText('0 next item').parentElement;

		await user.click(picker.firstElementChild);

		const expected = -1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should wrap to the end of the value range if \'wrap\' is true', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(
			<Picker index={0} max={1} min={0} onChange={handleChange} value={0} wrap />
		);
		const picker = screen.getByLabelText('0 next item').parentElement;

		await user.click(picker.lastElementChild.previousElementSibling); // there is a dummy sibling by Spottable

		const expected = 1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should increment by \'step\' value', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(
			<Picker index={0} max={6} min={0} onChange={handleChange} step={3} value={0} />
		);
		const picker = screen.getByLabelText('0 next item').parentElement;

		await user.click(picker.firstElementChild);

		const expected = 3;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should decrement by \'step\' value', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(
			<Picker index={0} max={3} min={0} onChange={handleChange} step={3} value={3} />
		);
		const picker = screen.getByLabelText('3 next item').parentElement;

		await user.click(picker.lastElementChild.previousElementSibling); // there is a dummy sibling by Spottable

		const expected = 0;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should call onKeyDown when right key pressed', () => {
		const handleChange = jest.fn();
		render(
			<Picker index={0} max={6} min={0} onKeyDown={handleChange} step={3} value={0} />
		);
		const picker = screen.getAllByRole('button')[0];

		rightKeyDown(picker);

		expect(handleChange).toHaveBeenCalled();
	});

	test('should call onKeyDown when left key pressed', () => {
		const handleChange = jest.fn();
		render(
			<Picker index={0} max={6} min={0} onKeyDown={handleChange} step={3} value={0} />
		);
		const picker = screen.getAllByRole('button')[1];

		leftKeyDown(picker);

		expect(handleChange).toHaveBeenCalled();
	});

	test('should increment by \'step\' value and wrap successfully', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(
			<Picker index={0} max={3} min={0} onChange={handleChange} step={3} value={3} wrap />
		);
		const picker = screen.getByLabelText('3 next item').parentElement;

		await user.click(picker.firstElementChild);

		const expected = 0;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should call onWheel event when \'joined\' and \'value\' is between \'max\' and \'min\'', () => {
		const handleWheelEvent = jest.fn();
		render(
			<Picker index={0} joined max={3} min={0} noAnimation step={1} value={1} onWheel={handleWheelEvent} />
		);
		const picker = screen.getByLabelText('1 press ok button to change the value');

		act(() => {
			picker.focus();
		});
		fireEvent.wheel(picker, {deltaY: 10});

		expect(handleWheelEvent).toHaveBeenCalled();
	});

	test('should call onWheel event when \'joined\' and \'value\' is \'max\' and \'deltaY\' is positive', () => {
		const handleWheelEvent = jest.fn();
		render(
			<Picker index={0} joined max={3} min={0} noAnimation step={1} value={3} onWheel={handleWheelEvent} />
		);
		const picker = screen.getByLabelText('3 press ok button to change the value');

		act(() => {
			picker.focus();
		});
		fireEvent.wheel(picker, {deltaY: 10});

		expect(handleWheelEvent).toHaveBeenCalled();
	});

	test('should call onWheel event when \'joined\' and \'value\' is \'min\' and \'deltaY\' is negative', () => {
		const handleWheelEvent = jest.fn();
		render(
			<Picker index={0} joined max={3} min={0} noAnimation step={1} value={0} onWheel={handleWheelEvent} />
		);
		let picker = screen.getByLabelText('0 press ok button to change the value');

		act(() => {
			picker.focus();
		});
		fireEvent.wheel(picker, {deltaY: -10});

		expect(handleWheelEvent).toHaveBeenCalled();
	});

	test('should decrement by \'step\' value and wrap successfully', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(
			<Picker index={0} max={9} min={0} onChange={handleChange} step={3} value={0} wrap />
		);
		const picker = screen.getByLabelText('0 next item').parentElement;

		await user.click(picker.lastElementChild.previousElementSibling); // there is a dummy sibling by Spottable

		const expected = 9;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should enable the increment button when there is a wrapped value to increment', () => {
		render(
			<Picker index={0} max={2} min={0} value={2} wrap />
		);

		const expectedAttribute = 'aria-disabled';
		const expectedValue = 'false';
		const actual = screen.getAllByRole('button')[0];

		expect(actual).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should enable the decrement button when there is a wrapped value to decrement', () => {
		render(
			<Picker index={0} max={2} min={0} value={2} wrap />
		);

		const expectedAttribute = 'aria-disabled';
		const expectedValue = 'false';
		const actual = screen.getAllByRole('button')[1];

		expect(actual).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should disable the increment button when there is no value to increment', () => {
		render(
			<Picker index={0} max={2} min={0} value={2} />
		);

		const expectedAttribute = 'disabled';
		const actual = screen.getAllByRole('button')[0];

		expect(actual).toHaveAttribute(expectedAttribute);
	});

	test('should disable the decrement button when there is no value to decrement', () => {
		render(
			<Picker index={0} max={2} min={0} value={0} />
		);

		const expectedAttribute = 'disabled';
		const actual = screen.getAllByRole('button')[1];

		expect(actual).toHaveAttribute(expectedAttribute);
	});

	test('should disable the increment and decrement buttons when wrapped and there is a single value', () => {
		render(
			<Picker index={0} max={0} min={0} value={0} wrap />
		);
		const incrementButton = screen.getAllByRole('button')[0];
		const decrementButton = screen.getAllByRole('button')[1];

		const expectedAttribute = 'disabled';

		expect(incrementButton).toHaveAttribute(expectedAttribute);
		expect(decrementButton).toHaveAttribute(expectedAttribute);
	});

	// TODO: ui-tests for select keys for joined horizontal pickers
	// Note: Because of the limitation of the unit test environment, simulating `keyCode: 13` or the select/enter key will not forward the mouse events that'll trigger `onChange` like it's supposed to
	test('should allow keyboard increment via enter key when \'joined\' and \'horizontal\'', () => {
		const handleChange = jest.fn();
		render(
			<Picker index={0} joined max={1} min={-1} onChange={handleChange} value={0} />
		);
		const picker = screen.getByLabelText('0 press ok button to change the value');

		fireEvent.keyDown(picker, {keyCode: 13});
		fireEvent.mouseDown(picker);

		expect(handleChange).toHaveBeenCalled();
	});

	test('should increment via mousedown when \'joined\' and \'horizontal\'', () => {
		const handleChange = jest.fn();
		render(
			<Picker index={0} joined max={1} min={-1} onChange={handleChange} value={0} />
		);
		const picker = screen.getByLabelText('0 press ok button to change the value');

		fireEvent.mouseDown(picker);

		const expected = 1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should increment via mousedown when \'joined\' and \'horizontal\' and wrap successfully', () => {
		const handleChange = jest.fn();
		render(
			<Picker index={2} joined max={3} min={0} onChange={handleChange} value={3} />
		);
		const picker = screen.getByLabelText('3 press ok button to change the value');

		fireEvent.mouseDown(picker);

		const expected = 0;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	// TODO: ui-tests for select keys for joined horizontal pickers
	// Note: Because of the limitation of the unit test environment, simulating `keyCode: 13` or the select/enter key will not forward the mouse events that'll trigger `onChange` like it's supposed to
	test('should increment keyboard select when \'joined\' and \'horizontal\' and wrap successfully', () => {
		const handleChange = jest.fn();
		render(
			<Picker index={2} joined max={3} min={0} onChange={handleChange} value={3} />
		);
		const picker = screen.getByLabelText('3 press ok button to change the value');

		fireEvent.keyDown(picker, {keyCode: 13});
		fireEvent.mouseDown(picker);

		const expected = 0;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should not allow keyboard decrement via left arrow keys when \'joined\' and \'horizontal\'', () => {
		const handleChange = jest.fn();
		render(
			<Picker index={0} joined max={1} min={-1} onChange={handleChange} value={0} />
		);
		const picker = screen.getByLabelText('0 press ok button to change the value');

		fireEvent.keyDown(picker, {keyCode: 37});

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should not allow keyboard increment via right arrow keys when \'joined\' and \'horizontal\'', () => {
		const handleChange = jest.fn();
		render(
			<Picker index={0} joined max={1} min={-1} onChange={handleChange} value={0} />
		);
		const picker = screen.getByLabelText('0 press ok button to change the value');

		fireEvent.keyDown(picker, {keyCode: 39});

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should allow keyboard decrement via left arrow keys when \'changedBy="arrow"\', \'joined\', and \'horizontal\'', () => {
		const handleChange = jest.fn();
		render(
			<Picker changedBy="arrow" index={0} joined max={1} min={-1} onChange={handleChange} value={0} />
		);
		const picker = screen.getByLabelText('0 change a value with left right button');

		fireEvent.keyDown(picker, {keyCode: 37});
		fireEvent.mouseDown(picker);

		const expected = -1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should allow keyboard increment via right arrow keys when \'changedBy="arrow"\', \'joined\', and \'horizontal\'', () => {
		const handleChange = jest.fn();
		render(
			<Picker changedBy="arrow" index={0} joined max={1} min={-1} onChange={handleChange} value={0} />
		);
		const picker = screen.getByLabelText('0 change a value with left right button');

		fireEvent.keyDown(picker, {keyCode: 39});
		fireEvent.mouseDown(picker);

		const expected = 1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should allow keyboard decrement via down arrow keys when \'joined\' and \'vertical\'', () => {
		const handleChange = jest.fn();
		render(
			<Picker index={0} joined max={1} min={-1} onChange={handleChange} orientation="vertical" value={0} />
		);
		const picker = screen.getByLabelText('0 change a value with up down button');

		fireEvent.keyDown(picker, {keyCode: 40});
		fireEvent.mouseDown(picker);

		const expected = -1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should allow keyboard decrement via up arrow keys when \'joined\' and \'vertical\'', () => {
		const handleChange = jest.fn();
		render(
			<Picker index={0} joined max={1} min={-1} onChange={handleChange} orientation="vertical" value={0} />
		);
		const picker = screen.getByLabelText('0 change a value with up down button');

		fireEvent.keyDown(picker, {keyCode: 38});
		fireEvent.mouseDown(picker);

		const expected = 1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should not allow keyboard decrement via left arrow keys when \'joined\' and \'vertical\'', () => {
		const handleChange = jest.fn();
		render(
			<Picker index={0} joined max={1} min={-1} onChange={handleChange} orientation="vertical" value={0} />
		);
		const picker = screen.getByLabelText('0 change a value with up down button');

		fireEvent.keyDown(picker, {keyCode: 37});
		fireEvent.mouseDown(picker);

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should not allow keyboard increment via right arrow keys when \'joined\' and \'vertical\'', () => {
		const handleChange = jest.fn();
		render(
			<Picker index={0} joined max={1} min={-1} onChange={handleChange} orientation="vertical" value={0} />
		);
		const picker = screen.getByLabelText('0 change a value with up down button');

		fireEvent.keyDown(picker, {keyCode: 39});
		fireEvent.mouseDown(picker);

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should not allow keyboard decrement via down arrow keys when \'joined\' and \'horizontal\'', () => {
		const handleChange = jest.fn();
		render(
			<Picker index={0} joined max={1} min={-1} onChange={handleChange} orientation="horizontal" value={0}  />
		);
		const picker = screen.getByLabelText('0 press ok button to change the value');

		fireEvent.keyDown(picker, {keyCode: 40});

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should not allow keyboard increment via up arrow keys when \'joined\' and \'horizontal\'', () => {
		const handleChange = jest.fn();
		render(
			<Picker index={0} joined max={1} min={-1} onChange={handleChange} orientation="horizontal" value={0} />
		);
		const picker = screen.getByLabelText('0 press ok button to change the value');

		fireEvent.keyDown(picker, {keyCode: 38});

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should not allow keyboard decrement via down arrow keys when \'changedBy="arrow"\', \'joined\', and \'horizontal\'', () => {
		const handleChange = jest.fn();
		render(
			<Picker changedBy="arrow" index={0} joined max={1} min={-1} onChange={handleChange} orientation="horizontal" value={0}  />
		);
		const picker = screen.getByLabelText('0 change a value with left right button');

		fireEvent.keyDown(picker, {keyCode: 40});

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should not allow keyboard increment via up arrow keys when \'changedBy="arrow"\', \'joined\', and \'horizontal\'', () => {
		const handleChange = jest.fn();
		render(
			<Picker changedBy="arrow" index={0} joined max={1} min={-1} onChange={handleChange} orientation="horizontal" value={0} />
		);
		const picker = screen.getByLabelText('0 change a value with left right button');

		fireEvent.keyDown(picker, {keyCode: 38});

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('indicator Container should not show any indicator when \'joined\' and \'horizontal\' and has no children', () => {
		render(
			<Picker index={0} joined max={1} min={-1} orientation="horizontal" />
		);
		const picker = screen.getByLabelText('0 press ok button to change the value');

		const expected = 2; // there is a dummy sibling by Spottable
		// The indicator will be a child of picker's children
		// With it there will be 2 child elements
		const actual = picker.children.item(0).children.length;

		expect(actual).toBe(expected);
	});

	test('indicator Container should not show any indicator when \'joined\' and \'horizontal\' and has one children', () => {
		render(
			<Picker index={0} max={1} min={-1} joined orientation="horizontal">
				<PickerItem>Test one picker</PickerItem>
			</Picker>
		);
		const picker = screen.getByRole('spinbutton', {hidden: true});

		const expected = 2; // there is a dummy sibling by Spottable
		// The indicator will be a child of picker's children
		// With it there will be 2 child elements
		const actual = picker.children.length;

		expect(actual).toBe(expected);
	});

	test('indicator Container should show with the exact number of children indicator when \'joined\' and \'horizontal\'', () => {
		render(
			<Picker index={0} max={2} min={0} joined orientation="horizontal">
				<PickerItem>Test one picker</PickerItem>
				<PickerItem>Test two picker</PickerItem>
				<PickerItem>Test three picker</PickerItem>
			</Picker>
		);
		const picker = screen.getByRole('spinbutton', {hidden: true});

		const expected = 3;
		const actual = picker.children.item(2).children.length; // there is a dummy sibling by Spottable

		expect(actual).toBe(expected);
	});

	describe('accessibility', () => {
		test('should set the aria-label attribute properly in the next icon button', () => {
			render(
				<Picker index={1} max={3} min={0} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const incrementButton = screen.getAllByRole('button')[0];

			const expectedAttribute = 'aria-label';
			const expectedValue = '2 next item';

			expect(incrementButton).toHaveAttribute(expectedAttribute, expectedValue);
		});

		test('should set the aria-label attribute properly in the previous icon button', () => {
			render(
				<Picker index={1} max={3} min={0} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const decrementButton = screen.getAllByRole('button')[1];

			const expectedAttribute = 'aria-label';
			const expectedValue = '2 previous item';

			expect(decrementButton).toHaveAttribute(expectedAttribute, expectedValue);
		});

		test('should set the aria-label attribute properly in the next icon button with title', () => {
			const titleText = 'title text';
			render(
				<Picker index={1} max={3} min={0} title={titleText} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const incrementButton = screen.getAllByRole('button')[0];

			const expectedAttribute = 'aria-label';
			const expectedValue = titleText + ' ' + '2 next item';

			expect(incrementButton).toHaveAttribute(expectedAttribute, expectedValue);
		});

		test('should set the aria-label attribute properly in the previous icon button with title', () => {
			const titleText = 'title text';
			render(
				<Picker index={1} max={3} min={0} title={titleText} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const decrementButton = screen.getAllByRole('button')[1];

			const expectedAttribute = 'aria-label';
			const expectedValue = titleText + ' ' + '2 previous item';

			expect(decrementButton).toHaveAttribute(expectedAttribute, expectedValue);
		});

		test('should set the aria-valuetext attribute properly to read it when changing the value', () => {
			render(
				<Picker index={1} max={3} min={0} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const pickerItem = screen.getByLabelText('2 next item').nextElementSibling.nextElementSibling; // there is a dummy sibling by Spottable
			// I chose this and not getByText because in get by test you have to go 4 parentElements up

			const expectedAttribute = 'aria-valuetext';
			const expectedValue = '2';

			expect(pickerItem).toHaveAttribute(expectedAttribute, expectedValue);
		});

		test('should have aria-hidden=true when \'joined\' and not active', () => {
			render(
				<Picker index={1} joined max={3} min={0} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const picker = screen.getByLabelText('2 press ok button to change the value').children.item(0);
			// I chose this and not getByText because in get by test you have to go 4 parentElements up

			const expectedAttribute = 'aria-hidden';
			const expectedValue = 'true';

			expect(picker).toHaveAttribute(expectedAttribute, expectedValue);
		});

		test('should be aria-hidden=false when \'joined\' and active', () => {
			render(
				<Picker index={1} joined max={3} min={0} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const picker = screen.getByLabelText('2 press ok button to change the value').children.item(0);
			// I chose this and not getByText because in get by test you have to go 4 parentElements up

			fireEvent.focus(picker);

			const expectedAttribute = 'aria-hidden';
			const expectedValue = 'false';

			expect(picker).toHaveAttribute(expectedAttribute, expectedValue);
		});

		test('should set picker \'decrementAriaLabel\' to decrement button', () => {
			const customLabel = 'custom decrement aria-label';
			render(
				<Picker decrementAriaLabel={customLabel} index={1} max={3} min={0} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const picker = screen.getAllByRole('button')[1];

			const expectedAttribute = 'aria-label';

			expect(picker).toHaveAttribute(expectedAttribute, customLabel);
		});

		test('should set picker \'incrementAriaLabel\' to decrement button', () => {
			const customLabel = 'custom increment aria-label';
			render(
				<Picker incrementAriaLabel={customLabel} index={1} max={3} min={0} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const picker = screen.getAllByRole('button')[0];

			const expectedAttribute = 'aria-label';

			expect(picker).toHaveAttribute(expectedAttribute, customLabel);
		});

		test('should set picker \'decrementAriaLabel\' to decrement button with title', () => {
			const titleText = 'title text';
			const customLabel = 'custom decrement aria-label';
			render(
				<Picker decrementAriaLabel={customLabel} index={1} max={3} min={0} title={titleText} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const picker = screen.getAllByRole('button')[1];

			const expectedAttribute = 'aria-label';

			expect(picker).toHaveAttribute(expectedAttribute, titleText + ' ' + customLabel);
		});

		test('should set picker \'incrementAriaLabel\' to decrement button with title', () => {
			const titleText = 'title text';
			const customLabel = 'custom increment aria-label';
			render(
				<Picker incrementAriaLabel={customLabel} index={1} max={3} min={0} title={titleText} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const picker = screen.getAllByRole('button')[0];

			const expectedAttribute = 'aria-label';

			expect(picker).toHaveAttribute(expectedAttribute, titleText + ' ' + customLabel);
		});

		test('should set \'aria-label\' to joined picker', () => {
			const customLabel = 'custom joined picker aria-label';
			render(
				<Picker aria-label={customLabel} index={1} joined max={3} min={0} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const picker = screen.getByLabelText(customLabel);

			expect(picker).toBeInTheDocument();
		});
	});
});
