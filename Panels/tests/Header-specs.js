import React from 'react';
import {mount} from 'enzyme';
import Header from '../Header';
import css from '../Header.module.less';

describe('Header Specs', () => {

	test('should render with title text without changing case', () => {
		const expected = 'cRaZy-cased super Header';

		const subject = mount(
			<Header><title>{expected}</title></Header>
		);

		const actual = subject.find('h1').text();

		expect(actual).toBe(expected);
	});

	test('should support "walkthrough" type', () => {
		const subject = mount(
			<Header type="walkthrough"><title>Walkthrough Header</title></Header>
		);

		const expected = css.walkthrough;
		const actual = subject.find(`.${css.header}`).first().prop('className');

		expect(actual).toContain(expected);

	});

	test('should support "compact" type', () => {
		const subject = mount(
			<Header type="compact"><title>Compact Header</title></Header>
		);

		const expected = css.compact;
		const actual = subject.find(`.${css.header}`).first().prop('className');

		expect(actual).toContain(expected);

	});

	test('should have centered class applied when the centered prop is true', () => {
		const subject = mount(
			<Header centered><title>Centered Header</title></Header>
		);

		const expected = css.centered;
		const actual = subject.find(`.${css.header}`).first().prop('className');

		expect(actual).toContain(expected);

	});

	test('should support `slotAbove`', () => {
		const expected = 'slot above';

		const subject = mount(
			<Header>
				<slotAbove>
					{expected}
				</slotAbove>
				<title>Slotted Header</title>
			</Header>
		);

		const actual = subject.find(`.${css.slotAbove}`).first().text();

		expect(actual).toBe(expected);
	});

	test('should support `slotBefore`', () => {
		const expected = 'slot before';

		const subject = mount(
			<Header>
				<slotBefore>
					{expected}
				</slotBefore>
				<title>Slotted Header</title>
			</Header>
		);

		const actual = subject.find(`.${css.slotBefore}`).first().text();

		expect(actual).toBe(expected);
	});

	test('should support `slotAfter`', () => {
		const expected = 'slot after';

		const subject = mount(
			<Header>
				<title>Slotted Header</title>
				<slotAfter>
					{expected}
				</slotAfter>
			</Header>
		);

		const actual = subject.find(`.${css.slotAfter}`).first().text();

		expect(actual).toBe(expected);
	});

	test('should inject a custom component when headerInput is used', () => {
		// This just uses an <input> tag for easy discoverability. It should behave the same way
		// as a sandstone/Input, the standard here, but that would require importing a diffenent
		// component than what we're testing here.
		const Input = () => <input />;

		// For the purpose of this test, we must also set the `showInput` prop, due to a rendering
		// optimization in Transition, which doesn't render invisible content, which the Input
		// initially is without this flag.
		const subject = mount(
			<Header showInput>
				<title>Header</title>
				<headerInput>
					<Input />
				</headerInput>
			</Header>
		);

		const expected = 1;
		const actual = subject.find(Input);

		expect(actual).toHaveLength(expected);
	});
});
