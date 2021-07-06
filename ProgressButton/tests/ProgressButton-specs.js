import {render} from '@testing-library/react';

import {ProgressButtonBase} from '../ProgressButton';

describe('ProgressButton Specs', () => {
	test('should show text', () => {
		const {getByRole} = render(
			<ProgressButtonBase>
				Progress Button
			</ProgressButtonBase>
		);
		
		const expected = 'Progress Button';
		const actual = getByRole('button').textContent;
		
		expect(actual).toBe(expected);
	});

	test('should have a root className `progressButton`', () => {
		const {getByRole} = render(
			<ProgressButtonBase>
				Progress Button
			</ProgressButtonBase>
		);

		const expected = 'progressButton';
		const actual = getByRole('button').className;
		
		expect(actual).toContain(expected);
	});

	test('should show radial progress', () => {
		const {getByRole} = render(
			<ProgressButtonBase showProgress>
				Progress Button
			</ProgressButtonBase>
		);

		const expected = 'radial';
		const actual = getByRole('progressbar').className;
		
		expect(actual).toContain(expected);
	});

	test('should show 0.5 progress', () => {
		const {getByRole} = render(
			<ProgressButtonBase showProgress progress={0.5}>
				Progress Button
			</ProgressButtonBase>
		);

		const expected = '0.5';
		const styleValues = getByRole('progressbar').style._values;
		const {'--ui-progressbar-proportion-end':actual} = styleValues;
	
		expect(actual).toBe(expected);
	});

	test('should show default icon `stop`', () => {
		const {getByRole} = render(
			<ProgressButtonBase showProgress progress={0.5}>
				Progress Button
			</ProgressButtonBase>
		);

		const expectedCode = 983004;
		const actualCode = getByRole('button').textContent.codePointAt();

		expect(actualCode).toBe(expectedCode);
	});

	test('should support a custom icon', () => {
		const customIcon = 'star';
		const {getByRole} = render(
			<ProgressButtonBase showProgress progress={0.5} icon={customIcon}>
				Progress Button
			</ProgressButtonBase>
		);

		const expectedCode = 983080;
		const actualCode = getByRole('button').textContent.codePointAt();

		expect(actualCode).toBe(expectedCode);
	});
});
