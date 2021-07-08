import '@testing-library/jest-dom';
import {render} from '@testing-library/react';

import {Picker, PickerBase} from '../Picker';

describe('Picker Specs', () => {
	test('should render selected child wrapped with <PickerItem/>', () => {
		const {getByTestId} = render(
			<Picker data-testid="picker" value={1}>
				{[1, 2, 3, 4]}
			</Picker>
		);

		const picker = getByTestId('picker');
		const expected = '2';
		const actual = picker.children.item(1).textContent;

		expect(actual).toBe(expected);
	});

	test(
		'should set the max of <Picker> to be one less than the number of children',
		() => {
			const {getAllByRole} = render(
				<Picker value={3}>
					{[1, 2, 3, 4]}
				</Picker>
			);

			const arrowForward = getAllByRole('button')[0];
			const expected = 'true';
			const actual = arrowForward.attributes.getNamedItem('aria-disabled').value;

			expect(actual).toBe(expected);
		}
	);

	test('should be disabled when empty', () => {
		const {getByTestId} = render(
			<PickerBase data-testid="picker">
				{[]}
			</PickerBase>
		);

		const picker = getByTestId('picker');
		const expected = 'disabled';

		expect(picker).toHaveAttribute(expected);
	});

	test('should set "data-webos-voice-disabled" to decrement button when voice control is disabled', () => {
		const {getAllByRole} = render(
			<PickerBase data-webos-voice-disabled>
				{[1, 2, 3, 4]}
			</PickerBase>
		);

		const picker = getAllByRole('button')[1];
		const expected = 'data-webos-voice-disabled';

		expect(picker).toHaveAttribute(expected);
	});

	test('should set "data-webos-voice-disabled" to increment button when voice control is disabled', () => {
		const {getAllByRole} = render(
			<PickerBase data-webos-voice-disabled>
				{[1, 2, 3, 4]}
			</PickerBase>
		);

		const picker = getAllByRole('button')[0];
		const expected = 'data-webos-voice-disabled';

		expect(picker).toHaveAttribute(expected);
	});

	test('should have an heading element when \'title\'', () => {
		const {getByText} = render(
			<PickerBase title="title text">
				{[1, 2, 3, 4]}
			</PickerBase>
		);

		const heading = getByText('title text');

		expect(heading).toBeInTheDocument();
	});

	test('should have an heading element with inline class when \'title\' and \'inlineTitle\'', () => {
		const {getByTestId} = render(
			<div data-testid="testContainer">
				<PickerBase inlineTitle title="title text">
					{[1, 2, 3, 4]}
				</PickerBase>
			</div>
		);

		const heading = getByTestId('testContainer').children.item(0);
		const expected = 'inlineTitle';
		const actual = heading.className;

		expect(heading).toBeInTheDocument();
		expect(actual).toContain(expected);
	});
});
