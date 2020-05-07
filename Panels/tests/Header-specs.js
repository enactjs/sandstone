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

	test('should support "wizard" type', () => {
		const subject = mount(
			<Header type="wizard"><title>Wizard Header</title></Header>
		);

		const expected = css.wizard;
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
			<Header noCloseButton>
				<title>Slotted Header</title>
				<slotAfter>
					{expected}
				</slotAfter>
			</Header>
		);

		const actual = subject.find(`.${css.slotAfter}`).first().text();

		expect(actual).toBe(expected);
	});

	test('should use `ViewManager` for `type="wizard"`', () => {
		const subject = mount(
			<Header
				type="wizard"
				arranger={{enter: () => {}, leave: () => {}}}
				title="title"
				subtitle="subtitle"
			/>
		);

		const expected = {
			duration: 500,
			index: 0
		};
		const actual = subject.find('ViewManager').props();

		expect(actual).toMatchObject(expected);
	});

	test('should not use `ViewManager` for other `type` values', () => {
		const subject = mount(
			<Header
				type="standard"
				arranger={{enter: () => {}, leave: () => {}}}
				title="title"
				subtitle="subtitle"
			/>
		);

		const expected = 0;
		const actual = subject.find('ViewManager').length;

		expect(actual).toBe(expected);
	});
});
