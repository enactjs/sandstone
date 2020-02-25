import React from 'react';
import {mount} from 'enzyme';
import Picker from '../Picker';
import PickerItem from '../PickerItem';
import css from '../Picker.module.less';

const tap = (node) => {
	node.simulate('mousedown');
	node.simulate('mouseup');
};
const decrement = (slider) => tap(slider.find('JoinedPickerButtonBase').last());
const increment = (slider) => tap(slider.find('JoinedPickerButtonBase').first());

describe('Picker Specs', () => {

	test('should have a default \'value\' of 0', () => {
		const picker = mount(
			<Picker index={0} max={0} min={0} />
		);

		const expected = 0;
		const actual = picker.find('Picker').prop('value');

		expect(actual).toBe(expected);
	});

	test(
		'should return an object {value: Number} that represents the next value of the Picker component when pressing the increment <span>',
		() => {
			const handleChange = jest.fn();
			const picker = mount(
				<Picker index={0} max={1} min={-1} onChange={handleChange} value={0} orientation="vertical" />
			);

			increment(picker);

			const expected = 1;
			const actual = handleChange.mock.calls[0][0].value;

			expect(actual).toBe(expected);
		}
	);

	test(
		'should return an object {value: Number} that represents the next value of the Picker component when pressing the decrement <span>',
		() => {
			const handleChange = jest.fn();
			const picker = mount(
				<Picker index={0} max={1} min={-1} onChange={handleChange} orientation="vertical" value={0} />
			);

			decrement(picker);

			const expected = -1;
			const actual = handleChange.mock.calls[0][0].value;

			expect(actual).toBe(expected);
		}
	);

	test('should not run the onChange handler when disabled', () => {
		const handleChange = jest.fn();
		const picker = mount(
			<Picker disabled index={0} max={0} min={0} onChange={handleChange} value={0} />
		);

		increment(picker);

		const expected = 0;
		const actual = handleChange.mock.calls.length;

		expect(actual).toBe(expected);
	});

	test(
		'should wrap to the beginning of the value range if \'wrap\' is true',
		() => {
			const handleChange = jest.fn();
			const picker = mount(
				<Picker index={0} max={0} min={-1} onChange={handleChange} value={0} orientation="vertical" wrap />
			);

			increment(picker);

			const expected = -1;
			const actual = handleChange.mock.calls[0][0].value;

			expect(actual).toBe(expected);
		}
	);

	test(
		'should wrap to the end of the value range if \'wrap\' is true',
		() => {
			const handleChange = jest.fn();
			const picker = mount(
				<Picker index={0} max={1} min={0} onChange={handleChange} orientation="vertical" value={0} wrap />
			);

			decrement(picker);

			const expected = 1;
			const actual = handleChange.mock.calls[0][0].value;

			expect(actual).toBe(expected);
		}
	);

	test('should increment by \'step\' value', () => {
		const handleChange = jest.fn();
		const picker = mount(
			<Picker index={0} max={6} min={0} onChange={handleChange} step={3} value={0} orientation="vertical" />
		);

		increment(picker);

		const expected = 3;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should decrement by \'step\' value', () => {
		const handleChange = jest.fn();
		const picker = mount(
			<Picker index={0} max={3} min={0} onChange={handleChange} orientation="vertical" step={3} value={3} />
		);

		decrement(picker);

		const expected = 0;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should increment by \'step\' value and wrap successfully', () => {
		const handleChange = jest.fn();
		const picker = mount(
			<Picker index={0} max={3} min={0} onChange={handleChange} step={3} value={3} orientation="vertical" wrap />
		);

		increment(picker);

		const expected = 0;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should decrement by \'step\' value and wrap successfully', () => {
		const handleChange = jest.fn();
		const picker = mount(
			<Picker index={0} max={9} min={0} onChange={handleChange} orientation="vertical" step={3} value={0} wrap />
		);

		decrement(picker);

		const expected = 9;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test(
		'should enable the increment button when there is a wrapped value to increment',
		() => {
			const picker = mount(
				<Picker index={0} max={2} min={0} value={2} orientation="vertical" wrap />
			);

			const expected = false;
			const actual = picker.find(`JoinedPickerButtonBase.${css.incrementer}`).prop('disabled');

			expect(actual).toBe(expected);
		}
	);

	test(
		'should enable the decrement button when there is a wrapped value to decrement',
		() => {
			const picker = mount(
				<Picker index={0} max={2} min={0} value={2} orientation="vertical" wrap />
			);

			const expected = false;
			const actual = picker.find(`JoinedPickerButtonBase.${css.incrementer}`).prop('disabled');

			expect(actual).toBe(expected);
		}
	);

	test(
		'should disable the increment button when there is no value to increment',
		() => {
			const picker = mount(
				<Picker index={0} max={2} min={0} value={2} orientation="vertical" />
			);

			const expected = true;
			const actual = picker.find(`JoinedPickerButtonBase.${css.incrementer}`).prop('disabled');

			expect(actual).toBe(expected);
		}
	);

	test(
		'should disable the decrement button when there is no value to decrement',
		() => {
			const picker = mount(
				<Picker index={0} max={2} min={0} value={0} orientation="vertical" />
			);

			const expected = true;
			const actual = picker.find(`JoinedPickerButtonBase.${css.decrementer}`).prop('disabled');

			expect(actual).toBe(expected);
		}
	);

	test(
		'should disable the increment and decrement buttons when wrapped and there is a single value',
		() => {
			const picker = mount(
				<Picker index={0} max={0} min={0} value={0} wrap orientation="vertical" />
			);

			const expected = true;
			const actual = picker.find(`JoinedPickerButtonBase.${css.decrementer}`).prop('disabled') &&
                picker.find(`JoinedPickerButtonBase.${css.incrementer}`).prop('disabled');

			expect(actual).toBe(expected);
		}
	);


	test(
		'should allow keyboard decrement via down arrow keys when \'vertical\'',
		() => {
			const handleChange = jest.fn();
			const picker = mount(
				<Picker index={0} max={1} min={-1} onChange={handleChange} orientation="vertical" value={0} />
			);

			const expected = -1;
			picker.simulate('keyDown', {keyCode: 40});
			picker.simulate('mousedown');
			const actual = handleChange.mock.calls[0][0].value;

			expect(actual).toBe(expected);
		}
	);

	test(
		'should allow keyboard decrement via up arrow keys when \'vertical\'',
		() => {
			const handleChange = jest.fn();
			const picker = mount(
				<Picker index={0} max={1} min={-1} onChange={handleChange} orientation="vertical" value={0} />
			);

			const expected = 1;
			picker.simulate('keyDown', {keyCode: 38});
			picker.simulate('mousedown');
			const actual = handleChange.mock.calls[0][0].value;

			expect(actual).toBe(expected);
		}
	);

	test(
		'should not allow keyboard decrement via left arrow keys when \'vertical\'',
		() => {
			const handleChange = jest.fn();
			const picker = mount(
				<Picker index={0} max={1} min={-1} onChange={handleChange} orientation="vertical" value={0} />
			);

			const expected = 0;
			picker.simulate('keyDown', {keyCode: 37});
			picker.simulate('mousedown');
			const actual = handleChange.mock.calls.length;

			expect(actual).toBe(expected);
		}
	);

	test(
		'should not allow keyboard increment via right arrow keys when \'vertical\'',
		() => {
			const handleChange = jest.fn();
			const picker = mount(
				<Picker index={0} max={1} min={-1} onChange={handleChange} orientation="vertical" value={0} />
			);

			const expected = 0;
			picker.simulate('keyDown', {keyCode: 39});
			picker.simulate('mousedown');
			const actual = handleChange.mock.calls.length;

			expect(actual).toBe(expected);
		}
	);

	test(
		'should not allow keyboard decrement via down arrow keys when \'horizontal\'',
		() => {
			const handleChange = jest.fn();
			const picker = mount(
				<Picker index={0} max={1} min={-1} onChange={handleChange} orientation="horizontal" value={0}  />
			);

			const expected = 0;
			picker.simulate('keyDown', {keyCode: 40});
			picker.simulate('mousedown');
			const actual = handleChange.mock.calls.length;

			expect(actual).toBe(expected);
		}
	);

	test(
		'should not allow keyboard increment via up arrow keys when \'horizontal\'',
		() => {
			const handleChange = jest.fn();
			const picker = mount(
				<Picker index={0} max={1} min={-1} onChange={handleChange} orientation="horizontal" value={0} />
			);

			const expected = 0;
			picker.simulate('keyDown', {keyCode: 38});
			picker.simulate('mousedown');
			const actual = handleChange.mock.calls.length;

			expect(actual).toBe(expected);
		}
	);

	describe('accessibility', () => {

		test(
			'should set the aria-valuetext attribute properly to read it when changing the value',
			() => {
				const picker = mount(
					<Picker index={1} max={3} min={0} value={1}>
						<PickerItem>1</PickerItem>
						<PickerItem>2</PickerItem>
						<PickerItem>3</PickerItem>
						<PickerItem>4</PickerItem>
					</Picker>
				);

				const expected = '2';
				const actual = picker.find(`.${css.valueWrapper}`).prop('aria-valuetext');

				expect(actual).toBe(expected);
			}
		);

		test(
			'should have aria-hidden=true when not active',
			() => {
				const picker = mount(
					<Picker index={1} max={3} min={0} value={1}>
						<PickerItem>1</PickerItem>
						<PickerItem>2</PickerItem>
						<PickerItem>3</PickerItem>
						<PickerItem>4</PickerItem>
					</Picker>
				);

				const expected = true;
				const actual = picker.find(`.${css.valueWrapper}`).prop('aria-hidden');

				expect(actual).toBe(expected);
			}
		);

		test('should be aria-hidden=false when and active', () => {
			const picker = mount(
				<Picker index={1} max={3} min={0} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);

			picker.simulate('focus');

			const expected = false;
			const actual = picker.find(`.${css.valueWrapper}`).prop('aria-hidden');

			expect(actual).toBe(expected);
		});

		test('should set "aria-label" to picker', () => {
			const label = 'custom picker aria-label';
			const picker = mount(
				<Picker aria-label={label} index={1} max={3} min={0} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);

			const expected = label;
			const actual = picker.find(`.${css.valueWrapper}`).parent().prop('aria-label');

			expect(actual).toBe(expected);
		});
	});
});
