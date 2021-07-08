import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Picker, PickerBase} from '../Picker';

describe('Picker Specs', () => {
	console.log('----------------------------------');
	test('should render selected child wrapped with <PickerItem/>', () => {
		const {getByTestId} = render(
			<Picker data-testid='picker' value={1}>
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
			const {getAllByRole, getByTestIdt} = render(
				<Picker data-testid='picker' value={3}>
					{[1, 2, 3, 4]}
				</Picker>
			);

			const arrowForward = getAllByRole('button')[1];

			console.log(arrowForward.getAttributeNames());
			userEvent.click(arrowForward);
			userEvent.click(arrowForward);
			console.log(arrowForward.getAttributeNames());
			console.log(arrowForward.attributes.getNamedItem('aria-controls').textContent);
			// const expected = 3;
			// const actual = picker.find('Picker').last().prop('max');
			//
			// expect(actual).toBe(expected);
		}
	);

	// test('should be disabled when empty', () => {
	// 	const {getByTestId} = render(
	// 		<PickerBase data-testid='picker'>
	// 			{[]}
	// 		</PickerBase>
	// 	);
	//
	// 	const picker = getByTestId('picker');
	//
	// 	const actual = picker.find('Picker').last().prop('disabled');
	// 	expect(actual).toBe(true);
	// });
	//
	// test('should set "data-webos-voice-disabled" to decrement button when voice control is disabled', () => {
	// 	const picker = mount(
	// 		<PickerBase data-webos-voice-disabled>
	// 			{[1, 2, 3, 4]}
	// 		</PickerBase>
	// 	);
	//
	// 	const expected = true;
	// 	const actual = picker.find('PickerButton').at(0).prop('data-webos-voice-disabled');
	//
	// 	expect(actual).toBe(expected);
	// });
	//
	// test('should set "data-webos-voice-disabled" to increment button when voice control is disabled', () => {
	// 	const picker = mount(
	// 		<PickerBase data-webos-voice-disabled>
	// 			{[1, 2, 3, 4]}
	// 		</PickerBase>
	// 	);
	//
	// 	const expected = true;
	// 	const actual = picker.find('PickerButton').at(1).prop('data-webos-voice-disabled');
	//
	// 	expect(actual).toBe(expected);
	// });
	//
	// test('should have an heading element when \'title\'', () => {
	// 	const subject = mount(
	// 		<PickerBase title="title text">
	// 			{[1, 2, 3, 4]}
	// 		</PickerBase>
	// 	);
	//
	// 	expect(subject.find('Heading')).toHaveLength(1);
	//
	// 	const expected = 'title';
	// 	const actual = subject.find('Heading').prop('className');
	//
	// 	expect(actual).toContain(expected);
	// });
	//
	// test('should have an heading element with inline class when \'title\' and \'inlineTitle\'', () => {
	// 	const subject = mount(
	// 		<PickerBase title="title text" inlineTitle>
	// 			{[1, 2, 3, 4]}
	// 		</PickerBase>
	// 	);
	//
	// 	expect(subject.find('Heading')).toHaveLength(1);
	//
	// 	const expected = 'inline';
	// 	const actual = subject.find('Heading').prop('className');
	//
	// 	expect(actual).toContain(expected);
	// });
	console.log('----------------------------------');
});
