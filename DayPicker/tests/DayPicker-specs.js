import React from 'react';
import {mount} from 'enzyme';

import DayPicker, {getSelectedDayString} from '../DayPicker';


describe('DayPicker', () => {

	test('should not select any item when there is no passed prop `selected`', () => {
		const subject = mount(
			<DayPicker />
		);
		const selected = subject.find('CheckboxItem').find({'selected': true});
		expect(selected.debug()).toBeFalsy();
	});

	test('should select day when passed prop `selected`', () => {
		const subject = mount(
			<DayPicker selected={[1]} />
		);
		const secondCheckboxItem = subject.find('CheckboxItem').find({'data-index': 1}).first();
		const selected = secondCheckboxItem.props().selected;
		expect(selected).toBe(true);
	});

	test('should emit an onSelect event when selecting days', () => {
		const handleSelect = jest.fn();
		const subject = mount(
			<DayPicker onSelect={handleSelect} />
		);
		const item = subject.find('CheckboxItem').find({'data-index': 1}).first();
		item.simulate('click');
		expect(handleSelect).toHaveBeenCalled();
	});

	test('should return `None` when selected is null', () => {
		const label = getSelectedDayString(null, 'None');
		const expected = 'None';
		expect(label).toBe(expected);
	});

	test('should return `None` when selected is empty', () => {
		const label = getSelectedDayString([], 'None');
		const expected = 'None';
		expect(label).toBe(expected);
	});

	test('should return `Every Weekend` when all selected', () => {
		const selected = [0, 6];
		const label = getSelectedDayString(selected);
		const expected = 'Every Weekend';
		expect(label).toBe(expected);
	});

	test('should return `Every Weekday` when all selected', () => {
		const selected = [1, 2, 3, 4, 5];
		const label = getSelectedDayString(selected);
		const expected = 'Every Weekday';
		expect(label).toBe(expected);
	});

	test('should return `Every Day` when all selected', () => {
		const selected = [0, 1, 2, 3, 4, 5, 6];
		const label = getSelectedDayString(selected);
		const expected = 'Every Day';
		expect(label).toBe(expected);
	});
});
