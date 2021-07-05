import {render} from '@testing-library/react';

import {ProgressButtonBase} from '../ProgressButton';

describe('ProgressButton Specs', () => {
	test('should show text', () => {
		const expected = 'Progress Button';
		const {getByRole} = render(
			<ProgressButtonBase>
				Progress Button
			</ProgressButtonBase>
		);

		const actual = getByRole('button').textContent;
		expect(actual).toBe(expected);
	});

	test('should have a root className `progressButton`', () => {
		const expected = 'progressButton';
		const {getByRole} = render(
			<ProgressButtonBase>
				Progress Button
			</ProgressButtonBase>
		);

		const actual = getByRole('button').className;
		expect(actual).toContain(expected);
	});

	test('should show radial progress', () => {
		const expected = 'radial';
		const {getByRole} = render(
			<ProgressButtonBase showProgress>
				Progress Button
			</ProgressButtonBase>
		);

		const actual = getByRole('progressbar').className;
		expect(actual).toContain(expected);
	});

	test('should show 0.5 progress', () => {
		const expected = 0.5;
		const {getByRole} = render(
			<ProgressButtonBase showProgress progress={0.5}>
				Progress Button
			</ProgressButtonBase>
		);

		const styleValues = getByRole('progressbar').style._values;
		const {'--ui-progressbar-proportion-end':actual} = styleValues;
		expect(actual).toBe(expected.toString());
	});

	test('should show default icon `stop`', () => {
		const expectedCode = 983004;
		const {getByRole} = render(
			<ProgressButtonBase showProgress progress={0.5}>
				Progress Button
			</ProgressButtonBase>
		);

		const actualCode = getByRole('button').textContent.codePointAt();
		expect(actualCode).toBe(expectedCode);
	});

	test('should support a custom icon', () => {
		const expected = 'star';
		const expectedCode = 983080;
		const {getByRole} = render(
			<ProgressButtonBase showProgress progress={0.5} icon={expected}>
				Progress Button
			</ProgressButtonBase>
		);

		const actualCode = getByRole('button').textContent.codePointAt();
		expect(actualCode).toBe(expectedCode);
	});
});
