import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {TileItemBase} from '../TileItem';

describe('TileItem', () => {
	test('should support `children` prop', () => {
		const children = 'caption';
		render(<TileItemBase>{children}</TileItemBase>);

		const expected = children;
		const actual = screen.getByText('caption');

		expect(actual).toHaveTextContent(expected);
	});

	test('should support `label` prop', () => {
		const label = 'label';
		render(<TileItemBase label={label} />);

		const expected = label;
		const actual = screen.getByText('label');

		expect(actual).toHaveTextContent(expected);
	});
});
