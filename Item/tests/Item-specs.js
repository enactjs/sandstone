import '@testing-library/jest-dom';
import {render} from '@testing-library/react';

import {ItemBase} from '../Item';

import css from '../Item.module.less';

describe('Item Specs', () => {
	test('should support adding text as a child', () => {
		const expected = 'Hello Item';

		const {getByText} = render(<ItemBase>{expected}</ItemBase>);
		const actual = getByText(expected).textContent;

		expect(actual).toBe(expected);
	});

	test('should support adding a `label`', () => {
		const expected = 'Example Label';

		const {getByTestId} = render(<ItemBase data-testid="item" label={expected}>Hello Item</ItemBase>);
		const actual = getByTestId('item').children.item(1).children.item(0).children.item(1).textContent;

		expect(actual).toBe(expected);
	});

	test('should support label with 0', () => {
		const expected = '0';

		const {getByTestId} = render(<ItemBase data-testid="item" label={expected}>Hello Item</ItemBase>);
		const actual = getByTestId('item').children.item(1).children.item(0).children.item(1).textContent;

		expect(actual).toBe(expected);
	});

	test('should support adding text as a child when a label is also set', () => {
		const expected = 'Hello Item';

		const {getByTestId} = render(<ItemBase data-testid="item" label="Example Label">{expected}</ItemBase>);
		const actual = getByTestId('item').children.item(1).children.item(0).children.item(0).textContent;

		expect(actual).toBe(expected);
	});

	test('should support `slotBefore`', () => {
		const expected = 'slot before';

		const {getByTestId} = render(<ItemBase data-testid="item" slotBefore={expected}>Hello Item</ItemBase>);
		const actual = getByTestId('item').children.item(1).textContent;

		expect(actual).toBe(expected);
	});

	test('should support `slotAfter`', () => {
		const expected = 'slot after';

		const {getByTestId} = render(<ItemBase data-testid="item" slotAfter={expected}>Hello Item</ItemBase>);
		const actual = getByTestId('item').children.item(2).textContent;

		expect(actual).toBe(expected);

	});

	test('should support repositioning of the label', () => {
		const {getByTestId} = render(<ItemBase data-testid="item" labelPosition="above" label="my label">Hello Item</ItemBase>);

		expect(getByTestId('item').children.item(1).className).toContain(css.labelAbove);
	});

	test('should not include the selected class when not selected', () => {
		const {getByTestId} = render(<ItemBase data-testid="item">Hello Item</ItemBase>);

		const expected = css.selected;
		const actual = getByTestId('item').className;

		expect(actual).not.toContain(expected);
	});

	test('should add the selected class when given the selected prop', () => {
		const {getByTestId} = render(<ItemBase data-testid="item" selected>Hello Item</ItemBase>);

		const expected = css.selected;
		const actual = getByTestId('item').className;

		expect(actual).toContain(expected);
	});

	test('should have apply small class when small', function () {
		const {getByTestId} = render(<ItemBase data-testid="item" size="small">Hello Item</ItemBase>);

		const expected = 'small';
		const actual = getByTestId('item').className;

		expect(actual).toContain(expected);
	});

	test('should support RTL text', () => {
		const text = 'Hello מצב תמונה';
		const {getByTestId} = render(<ItemBase data-testid="item">{text}</ItemBase>);

		const expected = 'rtl';
		const actual = getByTestId('item').children.item(1).children.item(0).children.item(0).style;

		expect(actual).toHaveProperty('direction', expected);
	});
});
