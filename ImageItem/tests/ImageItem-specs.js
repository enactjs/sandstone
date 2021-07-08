import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {ImageItemBase} from '../ImageItem';

function SelectionComponent () {
	return null;
}

describe('ImageItem', () => {
	test('should support `centered` prop', () => {
		const children = 'caption';
		const {getByText} = render(<ImageItemBase centered>{children}</ImageItemBase>);

		const expected = 'center';
		const actual = getByText('caption').style;

		expect(actual).toHaveProperty('textAlign', expected);
	});

	test('should support `centered` prop to label', () => {
		const label = 'label';
		const {getByText} = render(<ImageItemBase centered label={label} />);

		const expected = 'center';
		const actual = getByText('label').style;

		expect(actual).toHaveProperty('textAlign', expected);
	});

	test('should support not apply `centered` with horizontal', () => {
		const children = 'caption';
		const {getByText} = render(<ImageItemBase centered orientation="horizontal">{children}</ImageItemBase>);

		const unexpected = 'center';
		const actual = getByText('caption').style;

		expect(actual).not.toHaveProperty('textAlign', unexpected);
	});

	test('should support `children` prop', () => {
		const children = 'caption';
		const {getByText} = render(<ImageItemBase>{children}</ImageItemBase>);

		const expected = children;
		const actual = getByText('caption');

		expect(actual).toHaveTextContent(expected);
	});

	test('should support `label` prop', () => {
		const label = 'label';
		const {getByText} = render(<ImageItemBase centered label={label} />);

		const expected = label;
		const actual = getByText('label');

		expect(actual).toHaveTextContent(expected);
	});

	test('should support `imageIconSrc` prop when `orientation="vertical"`', () => {
		const imageIconSrc = 'imageIconSrc';
		const {getAllByRole} = render(<ImageItemBase imageIconSrc={imageIconSrc} orientation="vertical" />);

		const expected = imageIconSrc;
		const actual = getAllByRole('img')[2].children.item(0).src;

		expect(actual).toContain(expected);
	});

	test('should not support `imageIconSrc` prop when `orientation="horizontal"`', () => {
		const imageIconSrc = 'imageIconSrc';
		const {getAllByRole} = render(<ImageItemBase imageIconSrc={imageIconSrc} orientation="horizontal" />);

		const unexpected = 3;
		const actual = getAllByRole('img');

		expect(actual.length).not.toBe(unexpected);
	});

	test('should omit `.imageIcon` when `imageIconSrc` is unset and `caption` is set', () => {
		const children = 'caption';
		const {getAllByRole} = render(<ImageItemBase>{children}</ImageItemBase>);

		const unexpected = 'imageIcon';
		const actual = getAllByRole('img')[0];

		expect(actual.className).not.toContain(unexpected);
	});

	test('should omit `.imageIcon` when `imageIconSrc` is unset and `label` is set', () => {
		const {getAllByRole} = render(<ImageItemBase label="label" />);

		const unexpected = 'imageIcon';
		const actual = getAllByRole('img')[0];

		expect(actual.className).not.toContain(unexpected);
	});

	test('should omit children when `imageIconSrc`, `children`, and `label` are unset', () => {
		render(<ImageItemBase />);

		const actual = screen.queryByText('caption');

		expect(actual).toBeNull();
	});

	test('should omit `.selectionContainer` when `showSelection` is unset', () => {
		const {getAllByRole} = render(<ImageItemBase />);

		const unexpected = 'selectionContainer';
		const actual = getAllByRole('img')[0].children.item(0);

		expect(actual.className).not.toContain(unexpected);
	});

	test('should include `.selectionContainer` when `showSelection`', () => {
		const {getAllByRole} = render(<ImageItemBase showSelection />);

		const expected = 'selectionContainer';
		const actual = getAllByRole('img')[0].children.item(0);

		expect(actual.className).toContain(expected);
	});

	test('should support `selectionComponent` prop', () => {
		const {getAllByRole} = render(<ImageItemBase selectionComponent={SelectionComponent} showSelection />);

		const expected = 'selectionContainer';
		const actual = getAllByRole('img')[0].children.item(0);

		expect(actual.className).toContain(expected);
	});

	test('should have `checkbox` role when `showSelection` is true', () => {
		const {getByRole} = render(<ImageItemBase showSelection />);

		const actual = getByRole('checkbox');

		expect(actual).toBeInTheDocument();
	});

	test('should be `checked` when `showSelection` and `selected` props are true', () => {
		const {getByRole} = render(<ImageItemBase selected showSelection />);

		const actual = getByRole('checkbox');

		expect(actual).toBeChecked();
	});
});
