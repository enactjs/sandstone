import React from 'react';
import {shallow} from 'enzyme';

import {ProgressButtonBase} from '../ProgressButton';

describe('ProgressButton Specs', () => {
	test('should show text', () => {
		const expected = 'Progress Button';
		const progressButton = shallow(
			<ProgressButtonBase>
				Progress Button
			</ProgressButtonBase>
		);
		const actual = progressButton.prop('children');
		expect(actual).toBe(expected);
	});

	test('should have a root className `progressButton`', () => {
		const expected = 'progressButton';
		const progressButton = shallow(
			<ProgressButtonBase>
				Progress Button
			</ProgressButtonBase>
		);
		const actual = progressButton.prop('className');
		expect(actual).toBe(expected);
	});

	test('should show radial progress', () => {
		const expected = 'radial';
		const progressButton = shallow(
			<ProgressButtonBase showProgress>
				Progress Button
			</ProgressButtonBase>
		);

		const actual = progressButton.find('.progressContainer').childAt(0).prop('orientation');
		expect(actual).toBe(expected);
	});

	test('should show 0.5 progress', () => {
		const expected = 0.5;
		const progressButton = shallow(
			<ProgressButtonBase showProgress progress={0.5}>
				Progress Button
			</ProgressButtonBase>
		);

		const actual = progressButton.find('.progressContainer').childAt(0).prop('progress');
		expect(actual).toBe(expected);
	});

	test('should show default icon `stop`', () => {
		const expected = 'stop';

		const progressButton = shallow(
			<ProgressButtonBase showProgress progress={0.5}>
				Progress Button
			</ProgressButtonBase>
		);

		const actual = progressButton.find('.icon').prop('children');
		expect(actual).toBe(expected);
	});

	test('should support a custom icon', () => {
		const expected = 'play';

		const progressButton = shallow(
			<ProgressButtonBase showProgress progress={0.5} icon={expected}>
				Progress Button
			</ProgressButtonBase>
		);

		const actual = progressButton.find('.icon').prop('children');
		expect(actual).toBe(expected);
	});
});
