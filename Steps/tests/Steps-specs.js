import React from 'react';
import {mount} from 'enzyme';

import {StepsBase as Steps} from '../Steps';
import css from '../Steps.module.less';

const stepSelector = `.${css.steps} > .${css.step}`;

describe('Steps Specs', () => {

	test(
		'should indicate a two step process with no props specified',
		() => {
			const subject = mount(
				<Steps />
			);

			const expected = 2;
			const actual = subject.find(stepSelector);

			expect(actual).toHaveLength(expected);
		}
	);

	test(
		'should indicate a 6 step process with `total` set to 6',
		() => {
			const subject = mount(
				<Steps total={6} />
			);

			const expected = 6;
			const actual = subject.find(stepSelector);

			expect(actual).toHaveLength(expected);
		}
	);

	test(
		'should correctly set the size',
		() => {
			const subject = mount(
				<Steps size="medium" />
			);

			const expected = 'medium';  // `size` actually comes from Icon, which we aren't accessing, so we use the bare class name.
			const actual = subject.find(`${stepSelector} div`).first().prop('className');

			expect(actual).toContain(expected);
		}
	);

	test(
		'should correctly indicate the current even if that\'s the only prop set',
		() => {
			const subject = mount(
				<Steps current={2} />
			);

			const expected = 1;
			const actual = subject.find(`${stepSelector}.${css.current}`).first().prop('data-index');

			expect(actual).toBe(expected);
		}
	);

	test(
		'should support custom pastIcon',
		() => {
			const expected = 'testIconName';

			const subject = mount(
				<Steps current={2} total={3} pastIcon={expected} />
			);

			const actual = subject.find(`${stepSelector}.${css.past}`).first().text();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should support custom currentIcon',
		() => {
			const expected = 'testIconName';

			const subject = mount(
				<Steps current={2} total={3} currentIcon={expected} />
			);

			const actual = subject.find(`${stepSelector}.${css.current}`).first().text();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should support custom futureIcon',
		() => {
			const expected = 'testIconName';

			const subject = mount(
				<Steps current={2} total={3} futureIcon={expected} />
			);

			const actual = subject.find(`${stepSelector}.${css.future}`).first().text();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should support numeric step identifier for pastIcon',
		() => {
			const subject = mount(
				<Steps current={2} total={3} pastIcon="numbers" />
			);

			const expected = '1';
			const actual = subject.find(`${stepSelector}.${css.past}`).first().text();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should support numeric step identifier for currentIcon',
		() => {
			const subject = mount(
				<Steps current={2} total={3} currentIcon="numbers" />
			);

			const expected = '2';
			const actual = subject.find(`${stepSelector}.${css.current}`).first().text();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should support numeric step identifier for futureIcon',
		() => {
			const subject = mount(
				<Steps current={2} total={3} futureIcon="numbers" />
			);

			const expected = '3';
			const actual = subject.find(`${stepSelector}.${css.future}`).first().text();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should support number for `skip` prop',
		() => {
			const subject = mount(
				<Steps skip={2} current={3} total={5} />
			);

			const expected = css.skip;
			const actual = subject.find(stepSelector).at(1).prop('className');

			expect(actual).toContain(expected);
		}
	);

	test(
		'should support custom skipIcon',
		() => {
			const expected = 'testIconName';

			const subject = mount(
				<Steps skip={2} skipIcon={expected} current={3} total={5} />
			);

			const actual = subject.find(stepSelector).at(1).text();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should support number for `skip` prop',
		() => {
			const expected = 'testIconName';

			const subject = mount(
				<Steps skip={2} skipIcon={expected} current={3} total={5} />
			);

			const actual = subject.find(stepSelector).at(1).text();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should support array of numbers for `skip` prop',
		() => {
			const expected = 'testIconName';

			const subject = mount(
				<Steps skip={[2, 4]} skipIcon={expected} current={3} total={5} />
			);

			const actual = subject.find(stepSelector).at(1).text();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should not show a skip icon if the current step is in the skip list',
		() => {
			const subject = mount(
				<Steps skip={[2, 3]} skipIcon="testIconName" current={3} currentIcon="numbers" total={5} />
			);

			const expected = '3';
			const actual = subject.find(`${stepSelector}.${css.current}`).first().text();

			expect(actual).toBe(expected);
		}
	);
});
