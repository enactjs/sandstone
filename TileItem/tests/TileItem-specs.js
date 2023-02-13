import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {TileItemBase} from '../TileItem';

describe('TileItem', () => {
	test('should support `background` prop', () => {
		const background = '#ffffff';
		render(<TileItemBase background={background} data-testid="tileitem" />);

		const expected = 'rgb(255, 255, 255)';
		const actual = screen.getByTestId('tileitem').style;

		expect(actual).toHaveProperty('background', expected);
	});

	test('should support `bordered` prop', () => {
		render(<TileItemBase bordered data-testid="tileitem" />);

		const expected = 'bordered';
		const actual = screen.getByTestId('tileitem');

		expect(actual).toHaveClass(expected);
	});

	test('should support `children` prop', () => {
		const Children = () => <div>Test</div>;
		render(<TileItemBase><Children /></TileItemBase>);

		const expected = 'Test';
		const actual = screen.getByText(expected);

		expect(actual).toHaveTextContent(expected);
	});

	test('should support `icon` prop', () => {
		const icon = 'star';
		render(<TileItemBase data-testid="tileitem" icon={icon} />);

		const expected = 983080; // decimal converted charCode of Unicode 'star' character
		const actual = screen.getByTestId('tileitem').textContent.codePointAt();

		expect(actual).toBe(expected);
	});

	test('should support `image` prop', () => {
		const imageSrc = 'imageSrc';
		render(<TileItemBase image={{src: imageSrc, size: {width: '100px', height: '100px'}}} />);

		const expected = imageSrc;
		const actual = screen.getAllByRole('img')[0].children.item(0);

		expect(actual).toHaveAttribute('src', expected);
	});

	test('should support `label` prop', () => {
		const label = 'label';
		render(<TileItemBase label={label} />);

		const expected = label;
		const actual = screen.getByText('label');

		expect(actual).toHaveTextContent(expected);
	});
});
