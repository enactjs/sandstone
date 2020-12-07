import React from 'react';
import {mount} from 'enzyme';
import Header from '../Header';
import css from '../Header.module.less';

const tap = (node) => {
	node.simulate('mousedown');
	node.simulate('mouseup');
};

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

	test('should not render back button', () => {
		const subject = mount(
			<Header />
		);

		const backButton = subject.find(`.${css.slotBefore}`).find('Button');
		const expected = 0;
		const actual = backButton.length;

		expect(actual).toBe(expected);
	});

	test('should render close button when \'noCloseButton\' is not specified', () => {
		const subject = mount(
			<Header />
		);

		const closeButton = subject.find(`.${css.slotAfter}`).find('Button');
		const expected = 1;
		const actual = closeButton.length;

		expect(actual).toBe(expected);
	});

	test('should not render close button when \'noCloseButton\' is set to true', () => {
		const subject = mount(
			<Header noCloseButton />
		);

		const closeButton = subject.find(`.${css.slotAfter}`).find('Button');
		const expected = 0;
		const actual = closeButton.length;

		expect(actual).toBe(expected);
	});

	test('should call onClose when close button is clicked', () => {
		const handleClose = jest.fn();
		const subject = mount(
			<Header onClose={handleClose} />
		);

		tap(subject.find(`.${css.slotAfter}`).find('Button'));

		const expected = 1;
		const actual = handleClose.mock.calls.length;

		expect(actual).toBe(expected);
	});

	test('should set close button "aria-label" to closeButtonAriaLabel', () => {
		const label = 'custom close button label';
		const subject = mount(
			<Header closeButtonAriaLabel={label} />
		);

		const expected = label;
		const actual = subject.find(`.${css.slotAfter}`).find('Button').prop('aria-label');

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
