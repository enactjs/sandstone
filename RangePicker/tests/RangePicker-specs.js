import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {RangePicker, RangePickerBase} from '../RangePicker';

describe('RangePicker Specs', () => {
	test('should render a single child with the current value', () => {
		const {getByText} = render(
			<RangePicker min={-10} max={20} value={10} />
		);

		const value = getByText('10');
		const expected = 'item';
		const actual = value.className;

		expect(value).toBeInTheDocument();
		expect(actual).toContain(expected);
	});

	test('should increase by step amount on increment press', () => {
		const {getByText} = render(
			<RangePicker min={0} max={100} defaultValue={10} step={1} noAnimation />
		);

		userEvent.click(getByText('▶'));

		const value = getByText('11');
		const expected = 'item';
		const actual = value.className;

		expect(value).toBeInTheDocument();
		expect(actual).toContain(expected);
	});

	test('should decrease by step amount on decrement press', () => {
		const {getByText} = render(
			<RangePicker min={0} max={100} defaultValue={10} step={1} noAnimation />
		);

		userEvent.click(getByText('◀'));

		const value = getByText('9');
		const expected = 'item';
		const actual = value.className;

		expect(value).toBeInTheDocument();
		expect(actual).toContain(expected);
	});

	test('should pad the value', () => {
		const {getByText} = render(
			<RangePicker min={0} max={100} value={10} step={1} padded />
		);

		const value = getByText('010');
		const expected = 'item';
		const actual = value.className;

		expect(value).toBeInTheDocument();
		expect(actual).toContain(expected);
	});

	test('should pad the value when min has more digits than max', () => {
		const {getByText} = render(
			<RangePicker min={-1000} max={100} value={10} step={1} padded />
		);

		const value = getByText('0010');
		const expected = 'item';
		const actual = value.className;

		expect(value).toBeInTheDocument();
		expect(actual).toContain(expected);
	});

	test('should be disabled when limited to a single value', () => {
		const {getByTestId} = render(
			<RangePickerBase data-testid="rangePickerBase" min={0} max={0} value={0} />
		);

		const rangePicker = getByTestId('rangePickerBase');
		const expected = 'true';
		const actual = rangePicker.getAttribute('aria-disabled');
		expect(actual).toBe(expected);
	});

	test('should have an heading element when \'title\'', () => {
		const {getByTestId} = render(
			<div data-testid="rangePickerBase">
				<RangePickerBase min={0} max={0} value={0} title="title text" />
			</div>
		);

		const title = getByTestId('rangePickerBase').children.item(0);
		const expected = 'title text';
		const actual = title.textContent;

		expect(title).toBeInTheDocument();
		expect(actual).toBe(expected);
	});

	test('should have an heading element with inline class when \'title\' and \'inlineTitle\'', () => {
		const {getByTestId} = render(
			<div data-testid="rangePickerBase">
				<RangePickerBase inlineTitle min={0} max={0} value={0} title="title text" />
			</div>
		);

		const title = getByTestId('rangePickerBase').children.item(0);
		const expected = 'inlineTitle';
		const actual = title.className;

		expect(title).toBeInTheDocument();
		expect(actual).toContain(expected);
	});
});
