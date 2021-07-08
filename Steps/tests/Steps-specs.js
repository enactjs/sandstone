// import {mount} from 'enzyme';
import '@testing-library/jest-dom';
import {render} from '@testing-library/react';

import {StepsBase as Steps} from '../Steps';
import css from '../Steps.module.less';

const stepSelector = `.${css.steps} > .${css.step}`;

describe('Steps Specs', () => {

	// test('debug', () => {
	// 	const {debug} = render(<Steps total={6} />);
	// 	debug();
	// });

	// test(
	// 	'should indicate a two step process with no props specified',
	// 	() => {
	// 		const subject = mount(
	// 			<Steps />
	// 		);
	//
	// 		const expected = 2;
	// 		const actual = subject.find(stepSelector);
	//
	// 		expect(actual).toHaveLength(expected);
	// 	}
	// );

	test('should render two steps with no props specified', () => {
		const {getByText} = render(<Steps />);
		const steps = getByText('1' && '2');

		expect(steps).toBeInTheDocument();
	});

	test('should indicate a two step process with no props specified', () => {
		const {getByRole} = render(<Steps />);
		const actual = getByRole('list').children;

		const expected = 2;

		expect(actual).toHaveLength(expected);
	});
	//
	// test(
	// 	'should indicate a 6 step process with `total` set to 6',
	// 	() => {
	// 		const subject = mount(
	// 			<Steps total={6} />
	// 		);
	//
	// 		const expected = 6;
	// 		const actual = subject.find(stepSelector);
	//
	// 		expect(actual).toHaveLength(expected);
	// 	}
	// );

	test('should render six steps with `total` set to 6', () => {
		const {getByText} = render(<Steps total={6} />);
		const steps = getByText('1' && '2' && '3' && '4' && '5' && '6');

		expect(steps).toBeInTheDocument();
	});

	test('should indicate a 6 step process with `total` set to 6', () => {
		const {getByRole} = render(<Steps total={6} />);
		const steps = getByRole('list').children;

		const expected = 6;

		expect(steps).toHaveLength(expected);
	});

	//
	// test(
	// 	'should correctly set the size',
	// 	() => {
	// 		const subject = mount(
	// 			<Steps size="medium" />
	// 		);
	//
	// 		const expected = 'medium';  // `size` actually comes from Icon, which we aren't accessing, so we use the bare class name.
	// 		const actual = subject.find(`${stepSelector} div`).first().prop('className');
	//
	// 		expect(actual).toContain(expected);
	// 	}
	// );
	//
	// test(
	// 	'should correctly indicate the current even if that\'s the only prop set',
	// 	() => {
	// 		const subject = mount(
	// 			<Steps current={2} />
	// 		);
	//
	// 		const expected = 1;
	// 		const actual = subject.find(`${stepSelector}.${css.current}`).first().prop('data-index');
	//
	// 		expect(actual).toBe(expected);
	// 	}
	// );
	//
	// test(
	// 	'should support custom pastIcon',
	// 	() => {
	// 		const expected = 'testIconName';
	//
	// 		const subject = mount(
	// 			<Steps current={2} total={3} pastIcon={expected} />
	// 		);
	//
	// 		const actual = subject.find(`${stepSelector}.${css.past}`).first().text();
	//
	// 		expect(actual).toBe(expected);
	// 	}
	// );
	//
	// test(
	// 	'should support custom currentIcon',
	// 	() => {
	// 		const expected = 'testIconName';
	//
	// 		const subject = mount(
	// 			<Steps current={2} total={3} currentIcon={expected} />
	// 		);
	//
	// 		const actual = subject.find(`${stepSelector}.${css.current}`).first().text();
	//
	// 		expect(actual).toBe(expected);
	// 	}
	// );
	//
	// test(
	// 	'should support custom futureIcon',
	// 	() => {
	// 		const expected = 'testIconName';
	//
	// 		const subject = mount(
	// 			<Steps current={2} total={3} futureIcon={expected} />
	// 		);
	//
	// 		const actual = subject.find(`${stepSelector}.${css.future}`).first().text();
	//
	// 		expect(actual).toBe(expected);
	// 	}
	// );
	//
	// test(
	// 	'should support numeric step identifier for pastIcon',
	// 	() => {
	// 		const subject = mount(
	// 			<Steps current={2} total={3} pastIcon="numbers" />
	// 		);
	//
	// 		const expected = '1';
	// 		const actual = subject.find(`${stepSelector}.${css.past}`).first().text();
	//
	// 		expect(actual).toBe(expected);
	// 	}
	// );
	//
	// test(
	// 	'should support numeric step identifier for currentIcon',
	// 	() => {
	// 		const subject = mount(
	// 			<Steps current={2} total={3} currentIcon="numbers" />
	// 		);
	//
	// 		const expected = '2';
	// 		const actual = subject.find(`${stepSelector}.${css.current}`).first().text();
	//
	// 		expect(actual).toBe(expected);
	// 	}
	// );
	//
	// test(
	// 	'should support numeric step identifier for futureIcon',
	// 	() => {
	// 		const subject = mount(
	// 			<Steps current={2} total={3} futureIcon="numbers" />
	// 		);
	//
	// 		const expected = '3';
	// 		const actual = subject.find(`${stepSelector}.${css.future}`).first().text();
	//
	// 		expect(actual).toBe(expected);
	// 	}
	// );
	//
	// test(
	// 	'should support number for `skip` prop',
	// 	() => {
	// 		const subject = mount(
	// 			<Steps skip={2} current={3} total={5} />
	// 		);
	//
	// 		const expected = css.skip;
	// 		const actual = subject.find(stepSelector).at(1).prop('className');
	//
	// 		expect(actual).toContain(expected);
	// 	}
	// );
	//
	// test(
	// 	'should support custom skipIcon',
	// 	() => {
	// 		const expected = 'testIconName';
	//
	// 		const subject = mount(
	// 			<Steps skip={2} skipIcon={expected} current={3} total={5} />
	// 		);
	//
	// 		const actual = subject.find(stepSelector).at(1).text();
	//
	// 		expect(actual).toBe(expected);
	// 	}
	// );
	//
	// test(
	// 	'should support number for `skip` prop',
	// 	() => {
	// 		const expected = 'testIconName';
	//
	// 		const subject = mount(
	// 			<Steps skip={2} skipIcon={expected} current={3} total={5} />
	// 		);
	//
	// 		const actual = subject.find(stepSelector).at(1).text();
	//
	// 		expect(actual).toBe(expected);
	// 	}
	// );
	//
	// test(
	// 	'should support array of numbers for `skip` prop',
	// 	() => {
	// 		const expected = 'testIconName';
	//
	// 		const subject = mount(
	// 			<Steps skip={[2, 4]} skipIcon={expected} current={3} total={5} />
	// 		);
	//
	// 		const actual = subject.find(stepSelector).at(1).text();
	//
	// 		expect(actual).toBe(expected);
	// 	}
	// );
	//
	// test(
	// 	'should not show a skip icon if the current step is in the skip list',
	// 	() => {
	// 		const subject = mount(
	// 			<Steps skip={[2, 3]} skipIcon="testIconName" current={3} currentIcon="numbers" total={5} />
	// 		);
	//
	// 		const expected = '3';
	// 		const actual = subject.find(`${stepSelector}.${css.current}`).first().text();
	//
	// 		expect(actual).toBe(expected);
	// 	}
	// );
});
