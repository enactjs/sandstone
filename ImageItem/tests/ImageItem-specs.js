import React from 'react';
import {mount, shallow} from 'enzyme';
import {ImageItemBase} from '../ImageItem';

function SelectionComponent () {
	return null;
}

describe('ImageItem', () => {
	test('should support `centered` prop', () => {
		const children = 'caption';
		const subject = mount(
			<ImageItemBase centered>{children}</ImageItemBase>
		);

		const expected = 'center';
		const actual = subject.find('.text').prop('style');

		expect(actual).toHaveProperty('textAlign', expected);
	});

	test('should support not apply `centered` with horizontal', () => {
		const children = 'caption';
		const subject = mount(
			<ImageItemBase centered orientation="horizontal">{children}</ImageItemBase>
		);

		const unexpected = 'center';
		const actual = subject.find('.text').prop('style');

		expect(actual).not.toHaveProperty('textAlign', unexpected);
	});

	test('should support `children` prop', () => {
		const children = 'caption';
		const subject = shallow(
			<ImageItemBase>{children}</ImageItemBase>
		);

		const expected = children;
		const actual = subject.find('.caption').prop('children');

		expect(actual).toBe(expected);
	});

	test('should support `label` prop', () => {
		const label = 'label';
		const subject = shallow(
			<ImageItemBase label={label} />
		);

		const expected = label;
		const actual = subject.find('.label').prop('children');

		expect(actual).toBe(expected);
	});

	test('should support `imageIconSrc` prop when `orientation="vertical"`', () => {
		const imageIconSrc = 'imageIconSrc';
		const subject = shallow(
			<ImageItemBase imageIconSrc={imageIconSrc} orientation="vertical" />
		);

		const expected = imageIconSrc;
		const actual = subject.find('.imageIcon').prop('src');

		expect(actual).toBe(expected);
	});

	test('should not support `imageIconSrc` prop when `orientation="horizontal"`', () => {
		const imageIconSrc = 'imageIconSrc';
		const subject = shallow(
			<ImageItemBase imageIconSrc={imageIconSrc} orientation="horizontal" />
		);

		const expected = false;
		const actual = subject.find('.imageIcon').exists();

		expect(actual).toBe(expected);
	});

	test('should omit `.imageIcon` when `imageIconSrc` is unset and `caption` is set', () => {
		const children = 'caption';
		const subject = shallow(
			<ImageItemBase>{children}</ImageItemBase>
		);

		const actual = subject.find('.imageIcon');

		expect(actual).toHaveLength(0);
	});

	test('should omit `.imageIcon` when `imageIconSrc` is unset and `label` is set', () => {
		const subject = shallow(
			<ImageItemBase label="label" />
		);

		const actual = subject.find('.imageIcon');

		expect(actual).toHaveLength(0);
	});

	test('should omit children when `imageIconSrc`, `children`, and `label` are unset', () => {
		const subject = shallow(
			<ImageItemBase />
		);

		const actual = subject.prop('children');

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
