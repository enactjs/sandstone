import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {IconItemBase} from '../IconItem';

describe('IconItem', () => {
	test('should support `background` prop', () => {
		const background = '#ffffff';
		render(<IconItemBase background={background} data-testid="iconitem" />);

		const expected = 'rgb(255, 255, 255)';
		const actual = screen.getByTestId('iconitem').style;

		expect(actual).toHaveProperty('background', expected);
	});

	test('should support `bordered` prop', () => {
		render(<IconItemBase bordered data-testid="iconitem" />);

		const expected = 'bordered';
		const actual = screen.getByTestId('iconitem');

		expect(actual).toHaveClass(expected);
	});

	test('should support `children` prop', () => {
		const Children = () => <div>Test</div>;
		render(<IconItemBase><Children /></IconItemBase>);

		const expected = 'Test';
		const actual = screen.getByText(expected);

		expect(actual).toHaveTextContent(expected);
	});

	test('should support `icon` prop', () => {
		const icon = 'star';
		render(<IconItemBase data-testid="iconitem" icon={icon} />);

		const expected = 983080; // decimal converted charCode of Unicode 'star' character
		const actual = screen.getByTestId('iconitem').textContent.codePointAt();

		expect(actual).toBe(expected);
	});

	test('should support `image` prop', () => {
		const imageSrc = 'imageSrc';
		render(<IconItemBase image={{src: imageSrc, size: {width: '100px', height: '100px'}}} />);

		const expected = imageSrc;
		const actual = screen.getAllByRole('img')[0].children.item(0);

		expect(actual).toHaveAttribute('src', expected);
	});

	test('should support `label` prop', () => {
		const label = 'label';
		render(<IconItemBase label={label} />);

		const expected = label;
		const actual = screen.getByText('label');

		expect(actual).toHaveTextContent(expected);
	});
});
