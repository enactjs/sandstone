import '@testing-library/jest-dom';
import {fireEvent, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Picker from '../Picker';
import PickerItem from '../PickerItem';

const increment = (slider) => userEvent.click(slider.firstElementChild);
const decrement = (slider) => userEvent.click(slider.lastElementChild);

describe('Picker Specs', () => {
	test('should have a default \'value\' of 0', () => {
		const {getAllByRole} = render(
			<Picker index={0} max={0} min={0} />
		);
		const valueText = getAllByRole('button')[0].nextElementSibling;

		const expected = '0';
		const actual = valueText.getAttribute('aria-valuetext');

		expect(actual).toBe(expected);
	});

	test('should return an object {value: Number} that represents the next value of the Picker component when pressing the increment <span>', () => {
		const handleChange = jest.fn();
		const {getByTestId} = render(
			<Picker data-testid="picker" index={0} max={1} min={-1} onChange={handleChange} value={0} />
		);
		const picker = getByTestId('picker');

		increment(picker);

		const expected = 1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should return an object {value: Number} that represents the next value of the Picker component when pressing the decrement <span>', () => {
		const handleChange = jest.fn();
		const {getByTestId} = render(
			<Picker data-testid="picker" index={0} max={1} min={-1} onChange={handleChange} value={0} />
		);
		const picker = getByTestId('picker');

		decrement(picker);

		const expected = -1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should not run the onChange handler when disabled', () => {
		const handleChange = jest.fn();
		const {getByTestId} = render(
			<Picker data-testid="picker" disabled index={0} max={0} min={0} onChange={handleChange} value={0} />
		);
		const picker = getByTestId('picker');

		increment(picker);

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should wrap to the beginning of the value range if \'wrap\' is true', () => {
		const handleChange = jest.fn();
		const {getByTestId} = render(
			<Picker data-testid="picker" index={0} max={0} min={-1} onChange={handleChange} value={0} wrap />
		);
		const picker = getByTestId('picker');

		increment(picker);

		const expected = -1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should wrap to the end of the value range if \'wrap\' is true', () => {
		const handleChange = jest.fn();
		const {getByTestId} = render(
			<Picker data-testid="picker" index={0} max={1} min={0} onChange={handleChange} value={0} wrap />
		);
		const picker = getByTestId('picker');

		decrement(picker);

		const expected = 1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should increment by \'step\' value', () => {
		const handleChange = jest.fn();
		const {getByTestId} = render(
			<Picker data-testid="picker" index={0} max={6} min={0} onChange={handleChange} step={3} value={0} />
		);
		const picker = getByTestId('picker');

		increment(picker);

		const expected = 3;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should decrement by \'step\' value', () => {
		const handleChange = jest.fn();
		const {getByTestId} = render(
			<Picker data-testid="picker" index={0} max={3} min={0} onChange={handleChange} step={3} value={3} />
		);
		const picker = getByTestId('picker');

		decrement(picker);

		const expected = 0;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should increment by \'step\' value and wrap successfully', () => {
		const handleChange = jest.fn();
		const {getByTestId} = render(
			<Picker data-testid="picker" index={0} max={3} min={0} onChange={handleChange} step={3} value={3} wrap />
		);
		const picker = getByTestId('picker');

		increment(picker);

		const expected = 0;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should decrement by \'step\' value and wrap successfully', () => {
		const handleChange = jest.fn();
		const {getByTestId} = render(
			<Picker data-testid="picker" index={0} max={9} min={0} onChange={handleChange} step={3} value={0} wrap />
		);
		const picker = getByTestId('picker');

		decrement(picker);

		const expected = 9;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should enable the increment button when there is a wrapped value to increment', () => {
		const {getAllByRole} = render(
			<Picker index={0} max={2} min={0} value={2} wrap />
		);

		const expectedAttribute = 'aria-disabled';
		const expectedValue = 'false';
		const actual = getAllByRole('button')[0];

		expect(actual).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should enable the decrement button when there is a wrapped value to decrement', () => {
		const {getAllByRole} = render(
			<Picker index={0} max={2} min={0} value={2} wrap />
		);

		const expectedAttribute = 'aria-disabled';
		const expectedValue = 'false';
		const actual = getAllByRole('button')[1];

		expect(actual).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should disable the increment button when there is no value to increment', () => {
		const {getAllByRole} = render(
			<Picker index={0} max={2} min={0} value={2} />
		);

		const expectedAttribute = 'disabled';
		const actual = getAllByRole('button')[0];

		expect(actual).toHaveAttribute(expectedAttribute);
	});

	test('should disable the decrement button when there is no value to decrement', () => {
		const {getAllByRole} = render(
			<Picker index={0} max={2} min={0} value={0} />
		);

		const expectedAttribute = 'disabled';
		const actual = getAllByRole('button')[1];

		expect(actual).toHaveAttribute(expectedAttribute);
	});

	test('should disable the increment and decrement buttons when wrapped and there is a single value', () => {
		const {getAllByRole} = render(
			<Picker index={0} max={0} min={0} value={0} wrap />
		);
		const incrementButton = getAllByRole('button')[0];
		const decrementButton = getAllByRole('button')[1];

		const expectedAttribute = 'disabled';

		expect(incrementButton).toHaveAttribute(expectedAttribute);
		expect(decrementButton).toHaveAttribute(expectedAttribute);
	});

	// TODO: ui-tests for select keys for joined horizontal pickers
	// Note: Because of the limitation of the unit test environment, simulating `keyCode: 13` or the select/enter key will not forward the mouse events that'll trigger `onChange` like it's supposed to
	test('should allow keyboard increment via enter key when \'joined\' and \'horizontal\'', () => {
		const handleChange = jest.fn();
		const {getByTestId} = render(
			<Picker data-testid="picker" index={0} joined max={1} min={-1} onChange={handleChange} value={0} />
		);
		const picker = getByTestId('picker');

		fireEvent.keyDown(picker, {keyCode: 13});
		fireEvent.mouseDown(picker);

		expect(handleChange).toHaveBeenCalled();
	});

	test('should increment via mousedown when \'joined\' and \'horizontal\'', () => {
		const handleChange = jest.fn();
		const {getByTestId} = render(
			<Picker data-testid="picker" index={0} joined max={1} min={-1} onChange={handleChange} value={0} />
		);
		const picker = getByTestId('picker');

		fireEvent.mouseDown(picker);

		const expected = 1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should increment via mousedown when \'joined\' and \'horizontal\' and wrap successfully', () => {
		const handleChange = jest.fn();
		const {getByTestId} = render(
			<Picker data-testid="picker" index={2} joined max={3} min={0} onChange={handleChange} value={3} />
		);
		const picker = getByTestId('picker');

		fireEvent.mouseDown(picker);

		const expected = 0;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	// TODO: ui-tests for select keys for joined horizontal pickers
	// Note: Because of the limitation of the unit test environment, simulating `keyCode: 13` or the select/enter key will not forward the mouse events that'll trigger `onChange` like it's supposed to
	test('should increment keyboard select when \'joined\' and \'horizontal\' and wrap successfully', () => {
		const handleChange = jest.fn();
		const {getByTestId} = render(
			<Picker data-testid="picker" index={2} joined max={3} min={0} onChange={handleChange} value={3} />
		);
		const picker = getByTestId('picker');

		fireEvent.keyDown(picker, {keyCode: 13});
		fireEvent.mouseDown(picker);

		const expected = 0;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should not allow keyboard decrement via left arrow keys when \'joined\' and \'horizontal\'', () => {
		const handleChange = jest.fn();
		const {getByTestId} = render(
			<Picker data-testid="picker" index={0} joined max={1} min={-1} onChange={handleChange} value={0} />
		);
		const picker = getByTestId('picker');

		fireEvent.keyDown(picker, {keyCode: 37});

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should not allow keyboard increment via right arrow keys when \'joined\' and \'horizontal\'', () => {
		const handleChange = jest.fn();
		const {getByTestId} = render(
			<Picker data-testid="picker" index={0} joined max={1} min={-1} onChange={handleChange} value={0} />
		);
		const picker = getByTestId('picker');

		fireEvent.keyDown(picker, {keyCode: 39});

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should allow keyboard decrement via down arrow keys when \'joined\' and \'vertical\'', () => {
		const handleChange = jest.fn();
		const {getByTestId} = render(
			<Picker data-testid="picker" index={0} joined max={1} min={-1} onChange={handleChange} orientation="vertical" value={0} />
		);
		const picker = getByTestId('picker');

		fireEvent.keyDown(picker, {keyCode: 40});
		fireEvent.mouseDown(picker);

		const expected = -1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should allow keyboard decrement via up arrow keys when \'joined\' and \'vertical\'', () => {
		const handleChange = jest.fn();
		const {getByTestId} = render(
			<Picker data-testid="picker" index={0} joined max={1} min={-1} onChange={handleChange} orientation="vertical" value={0} />
		);
		const picker = getByTestId('picker');

		fireEvent.keyDown(picker, {keyCode: 38});
		fireEvent.mouseDown(picker);

		const expected = 1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should not allow keyboard decrement via left arrow keys when \'joined\' and \'vertical\'', () => {
		const handleChange = jest.fn();
		const {getByTestId} = render(
			<Picker data-testid="picker" index={0} joined max={1} min={-1} onChange={handleChange} orientation="vertical" value={0} />
		);
		const picker = getByTestId('picker');

		fireEvent.keyDown(picker, {keyCode: 37});
		fireEvent.mouseDown(picker);

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should not allow keyboard increment via right arrow keys when \'joined\' and \'vertical\'', () => {
		const handleChange = jest.fn();
		const {getByTestId} = render(
			<Picker data-testid="picker" index={0} joined max={1} min={-1} onChange={handleChange} orientation="vertical" value={0} />
		);
		const picker = getByTestId('picker');

		fireEvent.keyDown(picker, {keyCode: 39});
		fireEvent.mouseDown(picker);

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should not allow keyboard decrement via down arrow keys when \'joined\' and \'horizontal\'', () => {
		const handleChange = jest.fn();
		const {getByTestId} = render(
			<Picker data-testid="picker" index={0} joined max={1} min={-1} onChange={handleChange} orientation="horizontal" value={0}  />
		);
		const picker = getByTestId('picker');

		fireEvent.keyDown(picker, {keyCode: 40});

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should not allow keyboard increment via up arrow keys when \'joined\' and \'horizontal\'', () => {
		const handleChange = jest.fn();
		const {getByTestId} = render(
			<Picker data-testid="picker" index={0} joined max={1} min={-1} onChange={handleChange} orientation="horizontal" value={0} />
		);
		const picker = getByTestId('picker');

		fireEvent.keyDown(picker, {keyCode: 38});

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('indicator Container should not show any indicator when \'joined\' and \'horizontal\' and has no children', () => {
		const {getByTestId} = render(
			<Picker data-testid="picker" index={0} joined max={1} min={-1} orientation="horizontal" />
		);
		const picker = getByTestId('picker');

		const expected = 1;
		// The indicator will be a child of picker's children
		// With it there will be 2 child elements
		const actual = picker.children.item(0).children.length;

		expect(actual).toBe(expected);
	});

	test('indicator Container should not show any indicator when \'joined\' and \'horizontal\' and has one children', () => {
		const {getByTestId} = render(
			<Picker data-testid="picker" index={0} max={1} min={-1} joined orientation="horizontal">
				<PickerItem>Test one picker</PickerItem>
			</Picker>
		);
		const picker = getByTestId('picker');

		const expected = 1;
		// The indicator will be a child of picker's children
		// With it there will be 2 child elements
		const actual = picker.children.item(0).children.length;

		expect(actual).toBe(expected);
	});

	test('indicator Container should show with the exact number of children indicator when \'joined\' and \'horizontal\'', () => {
		const {getByTestId} = render(
			<Picker data-testid="picker" index={0} max={2} min={0} joined orientation="horizontal">
				<PickerItem>Test one picker</PickerItem>
				<PickerItem>Test two picker</PickerItem>
				<PickerItem>Test three picker</PickerItem>
			</Picker>
		);
		const picker = getByTestId('picker');

		const expected = 3;
		const actual = picker.children.item(0).children.item(1).children.length;

		expect(actual).toBe(expected);
	});

	describe('accessibility', () => {
		test('should set the aria-label attribute properly in the next icon button', () => {
			const {getAllByRole} = render(
				<Picker index={1} max={3} min={0} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const incrementButton = getAllByRole('button')[0];

			const expectedAttribute = 'aria-label';
			const expectedValue = '2 next item';

			expect(incrementButton).toHaveAttribute(expectedAttribute, expectedValue);
		});

		test('should set the aria-label attribute properly in the previous icon button', () => {
			const {getAllByRole} = render(
				<Picker index={1} max={3} min={0} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const decrementButton = getAllByRole('button')[1];

			const expectedAttribute = 'aria-label';
			const expectedValue = '2 previous item';

			expect(decrementButton).toHaveAttribute(expectedAttribute, expectedValue);
		});

		test('should set the aria-valuetext attribute properly to read it when changing the value', () => {
			const {getByTestId} = render(
				<Picker data-testid="picker" index={1} max={3} min={0} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const pickerItem = getByTestId('picker').children.item(1);
			// I chosen this and not getByText because in get by test you have to go 4 parentElements up

			const expectedAttribute = 'aria-valuetext';
			const expectedValue = '2';

			expect(pickerItem).toHaveAttribute(expectedAttribute, expectedValue);
		});

		test('should have aria-hidden=true when \'joined\' and not active', () => {
			const {getByTestId} = render(
				<Picker data-testid="picker" index={1} joined max={3} min={0} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const picker = getByTestId('picker').children.item(0);
			// I chosen this and not getByText because in get by test you have to go 4 parentElements up

			const expectedAttribute = 'aria-hidden';
			const expectedValue = 'true';

			expect(picker).toHaveAttribute(expectedAttribute, expectedValue);
		});

		test('should be aria-hidden=false when \'joined\' and active', () => {
			const {getByTestId} = render(
				<Picker data-testid="picker" index={1} joined max={3} min={0} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const picker = getByTestId('picker').children.item(0);
			// I chosen this and not getByText because in get by test you have to go 4 parentElements up

			fireEvent.focus(picker);

			const expectedAttribute = 'aria-hidden';
			const expectedValue = 'false';

			expect(picker).toHaveAttribute(expectedAttribute, expectedValue);
		});

		test('should set picker `decrementAriaLabel` to decrement button', () => {
			const customLabel = 'custom decrement aria-label';
			const {getAllByRole} = render(
				<Picker decrementAriaLabel={customLabel} index={1} max={3} min={0} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const picker = getAllByRole('button')[1];

			const expectedAttribute = 'aria-label';

			expect(picker).toHaveAttribute(expectedAttribute, customLabel);
		});

		test('should set picker `incrementAriaLabel` to decrement button', () => {
			const customLabel = 'custom increment aria-label';
			const {getAllByRole} = render(
				<Picker incrementAriaLabel={customLabel} index={1} max={3} min={0} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const picker = getAllByRole('button')[0];

			const expectedAttribute = 'aria-label';

			expect(picker).toHaveAttribute(expectedAttribute, customLabel);
		});

		test('should set `aria-label` to joined picker', () => {
			const customLabel = 'custom joined picker aria-label';
			const {getByTestId} = render(
				<Picker data-testid="picker" aria-label={customLabel} index={1} joined max={3} min={0} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const picker = getByTestId('picker');

			const expectedAttribute = 'aria-label';

			expect(picker).toHaveAttribute(expectedAttribute, customLabel);
		});
	});
});
