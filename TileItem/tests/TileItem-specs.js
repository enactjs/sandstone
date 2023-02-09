import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {TileItemBase} from '../TileItem';

describe('TileItem', () => {
	test('should support `centered` prop', () => {
		const children = 'caption';
		render(<TileItemBase centered>{children}</TileItemBase>);

		const expected = 'center';
		const actual = screen.getByText('caption').style;

		expect(actual).toHaveProperty('textAlign', expected);
	});

	test('should support `centered` prop to label', () => {
		const label = 'label';
		render(<TileItemBase centered label={label} />);

		const expected = 'center';
		const actual = screen.getByText('label').style;

		expect(actual).toHaveProperty('textAlign', expected);
	});

	test('should support not apply `centered` with horizontal', () => {
		const children = 'caption';
		render(<TileItemBase centered orientation="horizontal">{children}</TileItemBase>);

		const unexpected = 'center';
		const actual = screen.getByText('caption').style;

		expect(actual).not.toHaveProperty('textAlign', unexpected);
	});

	test('should support `children` prop', () => {
		const children = 'caption';
		render(<TileItemBase>{children}</TileItemBase>);

		const expected = children;
		const actual = screen.getByText('caption');

		expect(actual).toHaveTextContent(expected);
	});

	test('should support `children` prop when \'data-index\' is set', () => {
		const children = 'caption';
		render(<TileItemBase data-index={0}>{children}</TileItemBase>);

		const expected = children;
		const actual = screen.getByText('caption');

		expect(actual).toHaveTextContent(expected);
	});

	test('should support `label` prop', () => {
		const label = 'label';
		render(<TileItemBase centered label={label} />);

		const expected = label;
		const actual = screen.getByText('label');

		expect(actual).toHaveTextContent(expected);
	});

	test('should support `label` prop when \'data-index\' is set', () => {
		const label = 'label';
		render(<TileItemBase centered data-index={0} label={label} />);

		const expected = label;
		const actual = screen.getByText('label');

		expect(actual).toHaveTextContent(expected);
	});

	test('should support `imageIconSrc` prop when `orientation="vertical"`', () => {
		const imageIconSrc = 'imageIconSrc';
		render(<TileItemBase imageIconSrc={imageIconSrc} orientation="vertical" />);

		const expected = imageIconSrc;
		const actual = screen.getAllByRole('img')[2].children.item(0);

		expect(actual).toHaveAttribute('src', expected);
	});

	test('should not support `imageIconSrc` prop when `orientation="horizontal"`', () => {
		const imageIconSrc = 'imageIconSrc';
		render(<TileItemBase imageIconSrc={imageIconSrc} orientation="horizontal" />);

		const expected = 2;
		const actual = screen.getAllByRole('img').length;

		expect(actual).toBe(expected);
	});

	test('should omit `.imageIcon` when `imageIconSrc` is unset and `caption` is set', () => {
		const children = 'caption';
		render(<TileItemBase>{children}</TileItemBase>);

		const className = 'imageIcon';
		const images = screen.getAllByRole('img');

		for (let image of images) {
			expect(image).not.toHaveClass(className);
		}
	});

	test('should omit `.imageIcon` when `imageIconSrc` is unset and `label` is set', () => {
		render(<TileItemBase label="label" />);

		const className = 'imageIcon';
		const images = screen.getAllByRole('img');

		for (let image of images) {
			expect(image).not.toHaveClass(className);
		}
	});

	test('should omit children when `imageIconSrc`, `children`, and `label` are unset', () => {
		render(<TileItemBase />);

		const actual = screen.queryByText('caption');

		expect(actual).toBeNull();
	});
});
