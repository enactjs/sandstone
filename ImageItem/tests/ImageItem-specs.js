import React from 'react';
import {mount, shallow} from 'enzyme';
import {ImageItemBase} from '../ImageItem';

function SelectionComponent () {
	return null;
}

// FIXME: `(describe && test)` condition was added to run unit tests properly.
// enzyme doesn't support a new context consumer yet.
// Unit tests will be updated based on testing-library.
// Then the `(describe && test)` condition will be removed.

describe('ImageItemBase', () => {
	test('should support `children` prop', () => {
		const children = 'caption';
		const subject = mount(
			<ImageItemBase>{children}</ImageItemBase>
		);

		const expected = children;
		const actual = subject.find('.caption').first().text();

		expect(actual).toBe(expected);
	});

	// FIXME:
	// enzyme doesn't support a new context consumer yet.
	// `label` and `imageIconSrc` is updated throught a context.
	// It will be fixed based on testing-library later.
	test.skip('should support `label` prop', () => {
		const label = 'label';
		const subject = shallow(
			<ImageItemBase label={label} />
		);

		const expected = label;
		const actual = subject.find('.label').prop('children');

		expect(actual).toBe(expected);
	});

	// FIXME:
	// enzyme doesn't support a new context consumer yet.
	// `label` and `imageIconSrc` is updated throught a context.
	// It will be fixed based on testing-library later.
	test.skip('should support `imageIconSrc` prop when `orientation="vertical"`', () => {
		const imageIconSrc = 'imageIconSrc';
		const subject = shallow(
			<ImageItemBase imageIconSrc={imageIconSrc} orientation="vertical" />
		);

		const expected = imageIconSrc;
		const actual = subject.find('.imageIcon').prop('src');

		expect(actual).toBe(expected);
	});

	test('should omit `.imageIcon` when `imageIconSrc` is unset and `caption` is set', () => {
		const subject = shallow(
			<ImageItemBase caption="caption" />
		);

		const actual = subject.find('.imageIcon');

		expect(actual).toHaveLength(0);
	});

	test('should omit `.imageIcon` when `imageIconSrc` is unset and `subCaption` is set', () => {
		const subject = shallow(
			<ImageItemBase subCaption="subCaption" />
		);

		const actual = subject.find('.imageIcon');

		expect(actual).toHaveLength(0);
	});

	test('should omit caption when `imageIconSrc`, `caption`, and `subCaption` are unset', () => {
		const subject = shallow(
			<ImageItemBase />
		);

		const actual = subject.prop('caption');

		expect(actual).toBeUndefined();
	});

	test('should omit `.selectionContainer` when `showSelection` is unset', () => {
		const subject = shallow(
			<ImageItemBase />
		);

		const imageSubject = shallow(subject.prop('imageComponent'));

		const actual = imageSubject.find('.selectionContainer');

		expect(actual).toHaveLength(0);
	});

	test('should include `.selectionContainer` when `showSelection`', () => {
		const subject = shallow(
			<ImageItemBase showSelection />
		);

		const imageSubject = shallow(subject.prop('imageComponent'));

		const actual = imageSubject.find('.selectionContainer');

		expect(actual).toHaveLength(1);
	});

	test('should support `selectionComponent` prop', () => {
		const subject = shallow(
			<ImageItemBase showSelection selectionComponent={SelectionComponent} />
		);

		const imageSubject = shallow(subject.prop('imageComponent'));

		const actual = imageSubject.find(SelectionComponent);

		expect(actual).toHaveLength(1);
	});
});
