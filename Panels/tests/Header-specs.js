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

	test('should render the first title in title array', () => {
		const titles = ['title 1', 'title 2', 'title 3'];

		const subject = mount(
			<Header title={titles} />
		);

		const expected = titles[0];
		const actual = subject.find('h1').text();

		expect(actual).toBe(expected);
	});

	test('should render the first subtitle in subtitle array', () => {
		const subtitles = ['subtitle 1', 'subtitle 2', 'subtitle 3'];

		const subject = mount(
			<Header subtitle={subtitles} />
		);

		const expected = subtitles[0];
		const actual = subject.find('h2').text();

		expect(actual).toBe(expected);
	});

	test('should render the index title', () => {
		const titles = ['title 1', 'title 2', 'title 3'];

		const subject = mount(
			<Header index={1} title={titles} />
		);

		const expected = titles[1];
		const actual = subject.find('h1').text();

		expect(actual).toBe(expected);
	});

	test('should render the index subtitle', () => {
		const subtitles = ['subtitle 1', 'subtitle 2', 'subtitle 3'];

		const subject = mount(
			<Header index={1} subtitle={subtitles} />
		);

		const expected = subtitles[1];
		const actual = subject.find('h2').text();

		expect(actual).toBe(expected);
	});

	test('should render title with the index subtitle', () => {
		const title = 'title';
		const subtitles = ['subtitle 1', 'subtitle 2', 'subtitle 3'];

		const subject = mount(
			<Header index={1} subtitle={subtitles} title={title} />
		);

		const expected = `${title} ${subtitles[1]}`;
		const actualTitle = subject.find('h1').text();
		const actualSubtitle = subject.find('h2').text();
		const actual = `${actualTitle} ${actualSubtitle}`;

		expect(actual).toBe(expected);
	});

	test('should render the index title with subtitle', () => {
		const titles = ['title 1', 'title 2', 'title 3'];
		const subtitle = 'subtitle';

		const subject = mount(
			<Header index={1} subtitle={subtitle} title={titles} />
		);

		const expected = `${titles[1]} ${subtitle}`;
		const actualTitle = subject.find('h1').text();
		const actualSubtitle = subject.find('h2').text();
		const actual = `${actualTitle} ${actualSubtitle}`;

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
});
