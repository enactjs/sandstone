import React from 'react';
import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import {mount} from 'enzyme';

import Input from '../Input';

import css from '../Input.module.less';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('Input specs', () => {
	test('should be rendered opened if open is set to true', () => {
		const subject = mount(
			<FloatingLayerController>
				<Input open />
			</FloatingLayerController>
		);

		const expected = true;
		const actual = subject.find('FloatingLayer').prop('open');

		expect(actual).toBe(expected);
	});

	test('should set title when there is title text', () => {
		const str = 'title text';
		const subject = mount(
			<FloatingLayerController>
				<Input open title={str} />
			</FloatingLayerController>
		);

		const expected = str;
		const actual = subject.find(`.${css.title}`).first().text();

		expect(actual).toBe(expected);
	});

	test('should set title below when there is title below text', () => {
		const str = 'title below text';
		const subject = mount(
			<FloatingLayerController>
				<Input open subtitle={str} />
			</FloatingLayerController>
		);

		const expected = str;
		const actual = subject.find(`.${css.subtitle}`).first().text();

		expect(actual).toBe(expected);
	});

	test('should set value at input when there is value text', () => {
		const str = 'value text';
		const subject = mount(
			<FloatingLayerController>
				<Input open value={str} />
			</FloatingLayerController>
		);

		const expected = str;
		const actual = subject.find('input').prop('value');

		expect(actual).toBe(expected);
	});

	test('should set placeholder at input when there is placeholder text', () => {
		const str = 'placeholder text';
		const subject = mount(
			<FloatingLayerController>
				<Input open placeholder={str} />
			</FloatingLayerController>
		);

		const expected = str;
		const actual = subject.find('input').prop('placeholder');

		expect(actual).toBe(expected);
	});

	test('should set type to password at input when input type is "password"', () => {
		const subject = mount(
			<FloatingLayerController>
				<Input open type="password" />
			</FloatingLayerController>
		);

		const expected = 'password';
		const actual = subject.find('input').prop('type');

		expect(actual).toBe(expected);
	});

	test('should set disabled at button when popup is disabled', () => {
		const subject = mount(<Input disabled />);

		const expected = true;
		const actual = subject.find('[role="button"]').prop('disabled');

		expect(actual).toBe(expected);
	});

	// describe('Input specs', () => {
	test('should be rendered opened if open is set to true', () => {
		const subject = mount(
			<FloatingLayerController>
				<Input type="number" open length={4} />
			</FloatingLayerController>
		);

		const expected = true;
		const actual = subject.find('FloatingLayer').prop('open');

		expect(actual).toBe(expected);
	});

	test('should set title when there is title text', () => {
		const str = 'title text';
		const subject = mount(
			<FloatingLayerController>
				<Input type="number" open length={4} title={str} />
			</FloatingLayerController>
		);

		const expected = str;
		const actual = subject.find(`.${css.title}`).first().text();

		expect(actual).toBe(expected);
	});

	test('should set title below when there is title below text', () => {
		const str = 'title below text';
		const subject = mount(
			<FloatingLayerController>
				<Input type="number" open length={4} subtitle={str} />
			</FloatingLayerController>
		);

		const expected = str;
		const actual = subject.find(`.${css.subtitle}`).first().text();

		expect(actual).toBe(expected);
	});

	test('should set value at input when there is value text', () => {
		const str = '1234';
		const subject = mount(
			<FloatingLayerController>
				<Input type="number" open length={4} value={str} />
			</FloatingLayerController>
		);

		const expected = str;
		const actual = subject.find(`.${css.numberField}`).first().text();

		expect(actual).toBe(expected);
	});

	test('should set disabled at button when the component is disabled', () => {
		const subject = mount(<Input type="number" length={4} disabled />);

		const expected = true;
		const actual = subject.find('[role="button"]').prop('disabled');

		expect(actual).toBe(expected);
	});
});
