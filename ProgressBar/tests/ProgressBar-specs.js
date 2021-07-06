import {render} from '@testing-library/react';

import ProgressBar from '../ProgressBar';

describe('ProgressBar Specs', () => {
	test('should only show tooltip when tooltip is true', () => {
		const {getByRole} = render(
			<ProgressBar tooltip />
		);

		const expected = 'tooltip';
		const actual = getByRole('progressbar').children.item(1).className;

		expect(actual).toContain(expected);
	});

	test('should have tooltip show progress as percentage', () => {
		const {getByRole} = render(
			<ProgressBar
				tooltip
				progress={0.6}
			/>
		);

		const expected = '60%';
		const actual = getByRole('progressbar').textContent;

		expect(actual).toBe(expected);
	});
});
