import React from 'react';
import {mount} from 'enzyme';
import {IconBase as Icon} from '../Icon';

describe('Icon Specs', () => {

	test(
		'should return the correct Unicode value for named icon \'star\'',
		() => {
			const subject = mount(
				<Icon>star</Icon>
			);

			const expected = 983080; // decimal converted charCode of Unicode 'star' character
			const actual = subject.text().codePointAt();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should return the correct Unicode value when provided \'star\' hex value',
		() => {
			const subject = mount(
				<Icon>0x0F0028</Icon>
			);

			const expected = 983080; // decimal converted charCode of character
			const actual = subject.text().codePointAt();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should return the correct Unicode value when provided HTML entity as hex value',
		() => {
			const subject = mount(
				<Icon>&#x2605;</Icon>
			);

			const expected = 9733; // decimal converted charCode of character
			const actual = subject.text().codePointAt();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should return the correct Unicode value when provided Unicode reference',
		() => {
			const subject = mount(
				<Icon>\u0F0028</Icon>
			);

			const expected = 983080; // decimal converted charCode of Unicode 'star' character
			const actual = subject.text().codePointAt();

			expect(actual).toBe(expected);
		}
	);

	test('should support high code point Unicode values', () => {
		const subject = mount(
			<Icon>{String.fromCodePoint(0x0F0028)}</Icon>
		);

		const expected = 983080; // decimal converted charCode of Unicode 'star' character
		const actual = subject.text().codePointAt();

		expect(actual).toBe(expected);
	});

	test(
		'should support preset size "large"',
		() => {
			const subject = mount(
				<Icon size="large">star</Icon>
			);

			const expected = 'large';
			const actual = subject.find('.icon').prop('className');

			expect(actual).toContain(expected);
		}
	);

	test(
		'should support preset size "medium"',
		() => {
			const subject = mount(
				<Icon size="medium">star</Icon>
			);

			const expected = 'medium';
			const actual = subject.find('.icon').prop('className');

			expect(actual).toContain(expected);
		}
	);

	test(
		'should support preset size "small"',
		() => {
			const subject = mount(
				<Icon size="small">star</Icon>
			);

			const expected = 'small';
			const actual = subject.find('.icon').prop('className');

			expect(actual).toContain(expected);
		}
	);

	test(
		'should support preset size "tiny"',
		() => {
			const subject = mount(
				<Icon size="tiny">star</Icon>
			);

			const expected = 'tiny';
			const actual = subject.find('.icon').prop('className');

			expect(actual).toContain(expected);
		}
	);

	test(
		'should support arbitrary custom numeric sizes',
		() => {
			const subject = mount(
				<Icon size={96}>star</Icon>
			);

			const expected = '--icon-size';
			const actual = subject.find('.icon').prop('style');

			expect(actual).toHaveProperty(expected);
		}
	);

	test(
		'should support arbitrary custom numeric sizes that scale to the correct value',
		() => {
			const subject = mount(
				<Icon size={96}>star</Icon>
			);

			const expected = '--icon-size';
			const actual = subject.find('.icon').prop('style');

			// surprisingly this returns 8rem, instead of what you'd expect
			// with a base pxToRem value of 48px, which would be 2rem.
			// Tests must run at a tiny simulated screen size.
			expect(actual).toHaveProperty(expected, '8rem');
		}
	);
});
