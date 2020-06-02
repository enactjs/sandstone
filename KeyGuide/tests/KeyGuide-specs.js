import React from 'react';
import {mount} from 'enzyme';
import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';

import KeyGuide from '../KeyGuide';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('KeyGuide Specs', () => {
	test('should apply color class if a color key is in the icon slot', () => {
		const subject = mount(
			<FloatingLayerController>
				<KeyGuide open>
					{[{icon: 'red', children: 'a', key: 'a'}]}
				</KeyGuide>
			</FloatingLayerController>
		);

		const expected = true;
		const actual = subject.find('.red').exists();

		expect(actual).toBe(expected);
	});

	test('should create an icon if asked to', () => {
		const subject = mount(
			<FloatingLayerController>
				<KeyGuide open>
					{[{icon: 'plus', children: 'a', key: 'a'}]}
				</KeyGuide>
			</FloatingLayerController>
		);

		const expected = true;
		const actual = subject.find('Icon').exists();

		expect(actual).toBe(expected);
	});

	test('should not create an icon if a color is specified', () => {
		const subject = mount(
			<FloatingLayerController>
				<KeyGuide open>
					{[{icon: 'green', children: 'a', key: 'a'}]}
				</KeyGuide>
			</FloatingLayerController>
		);

		const expected = false;
		const actual = subject.find('Icon').exists();

		expect(actual).toBe(expected);
	});
});
