import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import ProgressBar from '../ProgressBar';

describe('ProgressBar Specs', () => {
	test('should only show tooltip when tooltip is true', () => {
		render(
			<ProgressBar tooltip />
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'tooltip';

		expect(progressBar).toHaveClass(expected);
	});

	test('should have tooltip show progress as percentage', () => {
		render(
			<ProgressBar
				tooltip
				progress={0.6}
			/>
		);

		const expected = '60%';
		const actual = screen.getByRole('progressbar').textContent;

		expect(actual).toBe(expected);
	});
});
