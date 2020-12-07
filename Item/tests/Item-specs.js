import React from 'react';
import {shallow, mount} from 'enzyme';

import {ItemBase} from '../Item';
import css from '../Item.module.less';

describe('Item Specs', () => {
	test('should support adding text as a child', () => {
		const expected = 'Hello Item';

		const subject = mount(
			<ItemBase>
				{expected}
			</ItemBase>
		);

		const actual = subject.text();

		expect(actual).toBe(expected);
	});

	test('should support adding a `label`', () => {
		const expected = 'Example Label';

		const subject = mount(
			<ItemBase label={expected}>
				Hello Item
			</ItemBase>
		);

		const actual = subject.find(`.${css.label}`).first().text();

		expect(actual).toBe(expected);
	});

	test('should support label with 0', () => {
		const subject = mount(
			<ItemBase label={0}>
				Hello Item
			</ItemBase>
		);

		const expected = '0';
		const actual = subject.find(`.${css.label}`).first().text();

		expect(actual).toContain(expected);
	});

	test('should support adding text as a child when a label is also set', () => {
		const expected = 'Hello Item';

		const subject = mount(
			<ItemBase label="Example Label">
				{expected}
			</ItemBase>
		);

		const actual = subject.find(`.${css.content}`).first().text();

		expect(actual).toBe(expected);
	});

	test('should support `slotBefore`', () => {
		const expected = 'slot before';

		const subject = mount(
			<ItemBase slotBefore={expected}>
				Hello Item
			</ItemBase>
		);

		const actual = subject.find(`.${css.slotBefore}`).first().text();

		expect(actual).toBe(expected);
	});

	test('should support `slotAfter`', () => {
		const expected = 'slot after';

		const subject = mount(
			<ItemBase slotAfter={expected}>
				Hello Item
			</ItemBase>
		);

		const actual = subject.find(`.${css.slotAfter}`).first().text();

		expect(actual).toBe(expected);
	});

	test('should support repositioning of the label', () => {
		const subject = mount(
			<ItemBase labelPosition="above" label="my label">
				Hello Item
			</ItemBase>
		);

		const expected = css.labelAbove;
		const actual = subject.find(`.${css.itemContent}`).first().prop('className');

		expect(actual).toContain(expected);
	});

	test('should not include the selected class when not selected', () => {
		const subject = shallow(
			<ItemBase>
				Hello Item
			</ItemBase>
		);

		const expected = css.selected;
		const actual = subject.first().prop('className');

		expect(actual).not.toContain(expected);
	});

	test('should add the selected class when given the selected prop', () => {
		const subject = shallow(
			<ItemBase selected>
				Hello Item
			</ItemBase>
		);

		const expected = css.selected;
		const actual = subject.first().prop('className');

		expect(actual).toContain(expected);
	});

	it('should have apply small class when small', function () {
		const subject = shallow(<ItemBase size="small" />);

		const expected = 'small';
		const actual = subject.first().prop('className');

		expect(actual).toContain(expected);
	});

	test('should support RTL text', () => {
		const subject = mount(<ItemBase>Hello מצב תמונה</ItemBase>);

		const expected = 'rtl';
		const actual = subject.find('.text').prop('style');

		expect(actual).toHaveProperty('direction', expected);
	});

});
