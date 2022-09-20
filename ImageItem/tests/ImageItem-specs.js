import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {ImageItemBase} from '../ImageItem';

function SelectionComponent () {
	return null;
}

describe('ImageItem', () => {
	test('should support `centered` prop', () => {
		const children = 'caption';
		render(<ImageItemBase centered>{children}</ImageItemBase>);

		const expected = 'center';
		const actual = screen.getByText('caption').style;

		expect(actual).toHaveProperty('textAlign', expected);
	});

	test('should support `centered` prop to label', () => {
		const label = 'label';
		render(<ImageItemBase centered label={label} />);

		const expected = 'center';
		const actual = screen.getByText('label').style;

		expect(actual).toHaveProperty('textAlign', expected);
	});

	test('should support not apply `centered` with horizontal', () => {
		const children = 'caption';
		render(<ImageItemBase centered orientation="horizontal">{children}</ImageItemBase>);

		const unexpected = 'center';
		const actual = screen.getByText('caption').style;

		expect(actual).not.toHaveProperty('textAlign', unexpected);
	});

	test('should support `children` prop', () => {
		const children = 'caption';
		render(<ImageItemBase>{children}</ImageItemBase>);

		const expected = children;
		const actual = screen.getByText('caption');

		expect(actual).toHaveTextContent(expected);
	});

	test('should support `children` prop when \'data-index\' is set', () => {
		const children = 'caption';
		render(<ImageItemBase data-index={0}>{children}</ImageItemBase>);

		const expected = children;
		const actual = screen.getByText('caption');

		expect(actual).toHaveTextContent(expected);
	});

	test('should support `label` prop', () => {
		const label = 'label';
		render(<ImageItemBase centered label={label} />);

		const expected = label;
		const actual = screen.getByText('label');

		expect(actual).toHaveTextContent(expected);
	});

	test('should support `imageIconSrc` prop when `orientation="vertical"`', () => {
		const imageIconSrc = 'imageIconSrc';
		render(<ImageItemBase imageIconSrc={imageIconSrc} orientation="vertical" />);

		const expected = imageIconSrc;
		const actual = screen.getAllByRole('img')[2].children.item(0);

		expect(actual).toHaveAttribute('src', expected);
	});

	test('should not support `imageIconSrc` prop when `orientation="horizontal"`', () => {
		const imageIconSrc = 'imageIconSrc';
		render(<ImageItemBase imageIconSrc={imageIconSrc} orientation="horizontal" />);

		const expected = 2;
		const actual = screen.getAllByRole('img').length;

		expect(actual).toBe(expected);
	});

	test('should omit `.imageIcon` when `imageIconSrc` is unset and `caption` is set', () => {
		const children = 'caption';
		render(<ImageItemBase>{children}</ImageItemBase>);

		const className = 'imageIcon';
		const images = screen.getAllByRole('img');

		for (let image of images) {
			expect(image).not.toHaveClass(className);
		}
	});

	test('should omit `.imageIcon` when `imageIconSrc` is unset and `label` is set', () => {
		render(<ImageItemBase label="label" />);

		const className = 'imageIcon';
		const images = screen.getAllByRole('img');

		for (let image of images) {
			expect(image).not.toHaveClass(className);
		}
	});

	test('should omit children when `imageIconSrc`, `children`, and `label` are unset', () => {
		render(<ImageItemBase />);

		const actual = screen.queryByText('caption');

		expect(actual).toBeNull();
	});

	test('should omit `.selectionContainer` when `showSelection` is unset', () => {
		render(<ImageItemBase />);

		const unexpected = 'selectionContainer';
		const actual = screen.getAllByRole('img')[0].children.item(0);

		expect(actual).not.toHaveClass(unexpected);
	});

	test('should include `.selectionContainer` when `showSelection`', () => {
		render(<ImageItemBase showSelection />);

		const expected = 'selectionContainer';
		const actual = screen.getAllByRole('img')[0].children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should support `selectionComponent` prop', () => {
		render(<ImageItemBase selectionComponent={SelectionComponent} showSelection />);

		const expected = 'selectionContainer';
		const actual = screen.getAllByRole('img')[0].children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should have `checkbox` role when `showSelection` is true', () => {
		render(<ImageItemBase showSelection />);

		const actual = screen.getByRole('checkbox');

		expect(actual).toBeInTheDocument();
	});

	test('should be `checked` when `showSelection` and `selected` props are true', () => {
		render(<ImageItemBase selected showSelection />);

		const actual = screen.getByRole('checkbox');

		expect(actual).toBeChecked();
	});
});
