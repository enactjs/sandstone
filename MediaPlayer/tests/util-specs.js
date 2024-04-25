import {memoize} from '@enact/core/util';
import {DurationFmt} from '@enact/i18n/iLibLink';
import {render} from '@testing-library/react';

import {countReactChildren, parseTime, secondsToPeriod, secondsToTime} from '../util';

const memoGetDurFmt = memoize((/* locale */) => new DurationFmt({
	length: 'medium', style: 'clock', useNative: false
}));

const getDurFmt = (locale) => {
	if (typeof window === 'undefined') return null;

	return memoGetDurFmt(locale);
};

describe('util', () => {
	describe('countReactChildren', () => {
		test('should return the number of children node', () => {
			const expected = 2;
			let actual;

			const Parent = ({children}) => {
				actual = countReactChildren(children);
				return <ul>{children}</ul>;
			};

			render(
				<Parent>
					<li>First item.</li>
					<li>Second item.</li>
				</Parent>
			);

			expect(actual).toEqual(expected);
		});
	});

	describe('parseTime', () => {
		test('should return time.hour for 3600 sec or more', () => {
			const value = 4850;
			const expected = Object.assign({}, {hour:1, minute:20, second:50});
			const actual = parseTime(value);

			expect(actual).toEqual(expected);
		});

		test('should not return time.hour for less than 3600 sec', () => {
			const value = 100;
			const expected = Object.assign({}, {minute:1, second:40});
			const actual = parseTime(value);

			expect(actual).toEqual(expected);
		});
	});

	describe('secondsToPeriod', () => {
		test('should return String formatted for use in a `datetime` field of a `<time>` tag', () => {
			const value = 10;
			const expected = "P10S";
			const actual = secondsToPeriod(value);

			expect(actual).toEqual(expected);
		});
	});

	describe('secondsToTime', () => {
		test('should return hour unit string when seconds is 3600 sec or more and includeHour is true', () => {
			const seconds = 4850;
			const expected = '1:20:50';
			const actual = secondsToTime(seconds, getDurFmt('en'), {includeHour: true});

			expect(actual).toEqual(expected);
		});

		test('should return hour unit string as 00 when seconds is less than 3600 sec and includeHour is true', () => {
			const seconds = 100;
			const expected = '00:01:40';
			const actual = secondsToTime(seconds, getDurFmt('en'), {includeHour: true});

			expect(actual).toEqual(expected);
		});

		test('should not return hour unit string when seconds is less than 3600 sec and includeHour is false', () => {
			const seconds = 100;
			const expected = '01:40';
			const actual = secondsToTime(seconds, getDurFmt('en'), {includeHour: false});

			expect(actual).toEqual(expected);
		});

		test('should return 00:00:00 when instance of a `ilib.DurationFmt` object is null and includeHour is true', () => {
			const seconds = 100;
			const expected = '00:00:00';
			const actual = secondsToTime(seconds, null, {includeHour: true});

			expect(actual).toEqual(expected);
		});

		test('should return 00:00 when instance of a `ilib.DurationFmt` object is null and includeHour is false', () => {
			const seconds = 100;
			const expected = '00:00';
			const actual = secondsToTime(seconds, null, {includeHour: false});

			expect(actual).toEqual(expected);
		});
	});
});
