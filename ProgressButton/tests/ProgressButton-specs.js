import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {ProgressButtonBase} from '../ProgressButton';

describe('ProgressButton Specs', () => {
	test('should show text', () => {
		render(
			<ProgressButtonBase>
				Progress Button
			</ProgressButtonBase>
		);

		const expected = 'Progress Button';
		const actual = screen.getByRole('button').textContent;

		expect(actual).toBe(expected);
	});

	test('should have a root className `progressButton`', () => {
		render(
			<ProgressButtonBase>
				Progress Button
			</ProgressButtonBase>
		);
		const button = screen.getByRole('button');

		const expected = 'progressButton';

		expect(button).toHaveClass(expected);
	});

	test('should show radial progress', () => {
		render(
			<ProgressButtonBase showProgress>
				Progress Button
			</ProgressButtonBase>
		);
		const progressBar = screen.getByRole('progressbar');

		const expected = 'radial';

		expect(progressBar).toHaveClass(expected);
	});

	test('should show 0.5 progress', () => {
		render(
			<ProgressButtonBase showProgress progress={0.5}>
				Progress Button
			</ProgressButtonBase>
		);
		const progressBar = screen.getByRole('progressbar');

		const expectedValue = '0.5';

		expect(progressBar).toHaveStyle({'--ui-progressbar-proportion-end': expectedValue});
	});

	test('should show default icon `stop`', () => {
		render(
			<ProgressButtonBase showProgress progress={0.5}>
				Progress Button
			</ProgressButtonBase>
		);

		// decimal converted charCode of Unicode 'stop' character
		const expectedCode = 983004;
		const actualCode = screen.getByRole('button').textContent.codePointAt();

		expect(actualCode).toBe(expectedCode);
	});

	test('should support a custom icon', () => {
		const customIcon = 'star';
		render(
			<ProgressButtonBase showProgress progress={0.5} icon={customIcon}>
				Progress Button
			</ProgressButtonBase>
		);

		// decimal converted charCode of Unicode 'star' character
		const expectedCode = 983080;
		const actualCode = screen.getByRole('button').textContent.codePointAt();

		expect(actualCode).toBe(expectedCode);
	});
});
