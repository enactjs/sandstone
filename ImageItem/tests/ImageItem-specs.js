import React from 'react';
import {mount, shallow} from 'enzyme';
import {ImageItemBase} from '../ImageItem';

function SelectionComponent () {
	return null;
}

describe('ImageItem', () => {
	test('should support `caption` prop', () => {
		const caption = 'caption';
		const subject = shallow(
			<ImageItemBase caption={caption} />
		);

		const captionSubject = shallow(subject.prop('caption'));

		const expected = caption;
		const actual = captionSubject.find('.caption').prop('children');

		expect(actual).toBe(expected);
	});

	test('should support `subCaption` prop', () => {
		const subCaption = 'subCaption';
		const subject = shallow(
			<ImageItemBase subCaption={subCaption} />
		);

		const captionSubject = shallow(subject.prop('caption'));

		const expected = subCaption;
		const actual = captionSubject.find('.subCaption').prop('children');

		expect(actual).toBe(expected);
	});

	test('should support `imageIconSrc` prop when `orientation="vertical"`', () => {
		const imageIconSrc = 'imageIconSrc';
		const subject = shallow(
			<ImageItemBase imageIconSrc={imageIconSrc} orientation="vertical" />
		);

		const captionSubject = shallow(subject.prop('caption'));

		const expected = imageIconSrc;
		const actual = captionSubject.find('.imageIcon').prop('src');

		expect(actual).toBe(expected);
	});

	test('should omit `.imageIcon` when `imageIconSrc` is unset and `caption` is set', () => {
		const subject = shallow(
			<ImageItemBase caption="caption" />
		);

		const captionSubject = shallow(subject.prop('caption'));

		const actual = captionSubject.find('.imageIcon');

		expect(actual).toHaveLength(0);
	});

	test('should omit `.imageIcon` when `imageIconSrc` is unset and `subCaption` is set', () => {
		const subject = shallow(
			<ImageItemBase subCaption="subCaption" />
		);

		const captionSubject = shallow(subject.prop('caption'));

		const actual = captionSubject.find('.imageIcon');

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
