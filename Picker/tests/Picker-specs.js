import {mount} from 'enzyme';
import {Picker, PickerBase} from '../Picker';

describe('Picker Specs', () => {
	test('should render selected child wrapped with <PickerItem/>', () => {
		const picker = mount(
			<Picker value={1}>
				{[1, 2, 3, 4]}
			</Picker>
		);

		const expected = '2';
		const actual = picker.find('PickerItem').text();

		expect(actual).toBe(expected);
	});

	test(
		'should set the max of <Picker> to be one less than the number of children',
		() => {
			const picker = mount(
				<Picker value={1}>
					{[1, 2, 3, 4]}
				</Picker>
			);

			const expected = 3;
			const actual = picker.find('Picker').last().prop('max');

			expect(actual).toBe(expected);
		}
	);

	test('should be disabled when empty', () => {
		const picker = mount(
			<PickerBase>
				{[]}
			</PickerBase>
		);

		const actual = picker.find('Picker').last().prop('disabled');
		expect(actual).toBe(true);
	});

	test('should set "data-webos-voice-disabled" to decrement button when voice control is disabled', () => {
		const picker = mount(
			<PickerBase data-webos-voice-disabled>
				{[1, 2, 3, 4]}
			</PickerBase>
		);

		const expected = true;
		const actual = picker.find('PickerButton').at(0).prop('data-webos-voice-disabled');

		expect(actual).toBe(expected);
	});

	test('should set "data-webos-voice-disabled" to increment button when voice control is disabled', () => {
		const picker = mount(
			<PickerBase data-webos-voice-disabled>
				{[1, 2, 3, 4]}
			</PickerBase>
		);

		const expected = true;
		const actual = picker.find('PickerButton').at(1).prop('data-webos-voice-disabled');

		expect(actual).toBe(expected);
	});

	test('should have an heading element when \'title\'', () => {
		const subject = mount(
			<PickerBase title="title text">
				{[1, 2, 3, 4]}
			</PickerBase>
		);

		expect(subject.find('Heading')).toHaveLength(1);

		const expected = 'title';
		const actual = subject.find('Heading').prop('className');

		expect(actual).toContain(expected);
	});

	test('should have an heading element with inline class when \'title\' and \'inlineTitle\'', () => {
		const subject = mount(
			<PickerBase title="title text" inlineTitle>
				{[1, 2, 3, 4]}
			</PickerBase>
		);

		expect(subject.find('Heading')).toHaveLength(1);

		const expected = 'inline';
		const actual = subject.find('Heading').prop('className');

		expect(actual).toContain(expected);
	});
});
