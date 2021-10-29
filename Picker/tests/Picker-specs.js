import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {Picker, PickerBase} from '../Picker';

describe('Picker Specs', () => {
	test('should render selected child wrapped with <PickerItem/>', () => {
		render(
			<Picker value={1}>
				{[1, 2, 3, 4]}
			</Picker>
		);
		const pickerText = screen.getByText('2').parentElement.parentElement;

		const expected = 'item';

		expect(pickerText).toHaveClass(expected);
	});

	test('should set the max of <Picker> to be one less than the number of children', () => {
		render(
			<Picker value={3}>
				{[1, 2, 3, 4]}
			</Picker>
		);
		const arrowForward = screen.getAllByRole('button')[0];

		const expectedValue = 'true';
		const expectedAttribute = 'aria-disabled';

		expect(arrowForward).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should be disabled when empty', () => {
		render(<PickerBase data-testid="picker">{[]}</PickerBase>);
		const picker = screen.getByTestId('picker');

		const expected = 'disabled';

		expect(picker).toHaveAttribute(expected);
	});

	test('should set "data-webos-voice-disabled" to decrement button when voice control is disabled', () => {
		render(
			<PickerBase data-webos-voice-disabled>
				{[1, 2, 3, 4]}
			</PickerBase>
		);
		const decrementButton = screen.getAllByRole('button')[1];

		const expected = 'data-webos-voice-disabled';

		expect(decrementButton).toHaveAttribute(expected);
	});

	test('should set "data-webos-voice-disabled" to increment button when voice control is disabled', () => {
		render(
			<PickerBase data-webos-voice-disabled>
				{[1, 2, 3, 4]}
			</PickerBase>
		);
		const incrementButton = screen.getAllByRole('button')[0];

		const expected = 'data-webos-voice-disabled';

		expect(incrementButton).toHaveAttribute(expected);
	});

	test('should have a heading element when \'title\'', () => {
		render(
			<PickerBase title="title text">
				{[1, 2, 3, 4]}
			</PickerBase>
		);
		const heading = screen.getByText('title text');

		const expected = 'heading';
		const actual = heading.parentElement.parentElement;

		expect(heading).toBeInTheDocument();
		expect(actual).toHaveClass(expected);
	});

	test('should have a heading element with inline class when \'title\' and \'inlineTitle\'', () => {
		render(
			<PickerBase inlineTitle title="title text">
				{[1, 2, 3, 4]}
			</PickerBase>
		);
		const heading = screen.getByText('title text');

		const expectedInline = 'inlineTitle';
		const expectedHeader = 'heading';
		const actual = heading.parentElement.parentElement;

		expect(heading).toBeInTheDocument();
		expect(actual).toHaveClass(expectedInline);
		expect(actual).toHaveClass(expectedHeader);
	});
});
