import {mount} from 'enzyme';
import {RangePicker, RangePickerBase} from '../RangePicker';

const tap = (node) => {
	node.simulate('mousedown');
	node.simulate('mouseup');
};
const decrement = (slider) => tap(slider.find('Button').last());
const increment = (slider) => tap(slider.find('Button').first());

describe('RangePicker Specs', () => {
	test('should render a single child with the current value', () => {
		const picker = mount(
			<RangePicker min={-10} max={20} value={10} />
		);

		const expected = '10';
		const actual = picker.find('PickerItem').text();

		expect(actual).toBe(expected);
	});

	test('should increase by step amount on increment press', () => {
		const picker = mount(
			<RangePicker min={0} max={100} defaultValue={10} step={1} noAnimation />
		);

		increment(picker);

		const expected = '11';
		const actual = picker.find('PickerItem').first().text();

		expect(actual).toBe(expected);
	});

	test('should decrease by step amount on decrement press', () => {
		const picker = mount(
			<RangePicker min={0} max={100} defaultValue={10} step={1} noAnimation />
		);

		decrement(picker);

		const expected = '9';
		const actual = picker.find('PickerItem').first().text();

		expect(actual).toBe(expected);
	});

	test('should pad the value', () => {
		const picker = mount(
			<RangePicker min={0} max={100} value={10} step={1} padded />
		);

		const expected = '010';
		const actual = picker.find('PickerItem').text();

		expect(actual).toBe(expected);
	});

	test('should pad the value when min has more digits than max', () => {
		const picker = mount(
			<RangePicker min={-1000} max={100} value={10} step={1} padded />
		);

		const expected = '0010';
		const actual = picker.find('PickerItem').text();

		expect(actual).toBe(expected);
	});

	test('should be disabled when limited to a single value', () => {
		const picker = mount(
			<RangePickerBase min={0} max={0} value={0} />
		);

		const actual = picker.find('Picker').last().prop('disabled');
		expect(actual).toBe(true);
	});

	test('should have an heading element when \'title\'', () => {
		const subject = mount(
			<RangePickerBase min={0} max={0} value={0} title="title text" />
		);

		expect(subject.find('Heading')).toHaveLength(1);

		const expected = 'title';
		const actual = subject.find('Heading').prop('className');

		expect(actual).toContain(expected);
	});

	test('should have an heading element with inline class when \'title\' and \'inlineTitle\'', () => {
		const subject = mount(
			<RangePickerBase min={0} max={0} value={0} inlineTitle title="title text" />
		);

		expect(subject.find('Heading')).toHaveLength(1);

		const expected = 'inline';
		const actual = subject.find('Heading').prop('className');

		expect(actual).toContain(expected);
	});
});
