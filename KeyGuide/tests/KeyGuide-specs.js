import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {render} from '@testing-library/react';

import KeyGuide from '../KeyGuide';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('KeyGuide Specs', () => {
	test('should not error with undefined children', () => {
		const {queryAllByRole} = render(
			<FloatingLayerController>
				<KeyGuide open />
			</FloatingLayerController>
		);

		const keyGuide = queryAllByRole('list');
		const expected = 0;
		const actual = keyGuide.length;

		expect(actual).toBe(expected);
	});

	test('should not render open floating layer if open with no children', () => {
		const {queryAllByRole} = render(
			<FloatingLayerController>
				<KeyGuide open>
					{[]}
				</KeyGuide>
			</FloatingLayerController>
		);

		const keyGuide = queryAllByRole('list');
		const expected = 0;
		const actual = keyGuide.length;

		expect(actual).toBe(expected);
	});

	test('should not render open floating layer if not open with children', () => {
		const {queryAllByRole} = render(
			<FloatingLayerController>
				<KeyGuide>
					{[{icon: 'red', children: 'a', key: 'a'}]}
				</KeyGuide>
			</FloatingLayerController>
		);

		const keyGuide = queryAllByRole('list');
		const expected = 0;
		const actual = keyGuide.length;

		expect(actual).toBe(expected);
	});

	test('should render open floating layer if open with children', () => {
		const {getByRole} = render(
			<FloatingLayerController>
				<KeyGuide open>
					{[{icon: 'red', children: 'a', key: 'a'}]}
				</KeyGuide>
			</FloatingLayerController>
		);

		const keyGuide = getByRole('list');
		const expected = 'keyGuide';
		const actual = keyGuide.className;

		expect(keyGuide).toBeInTheDocument();
		expect(actual).toContain(expected);
	});

	test('should apply color class if a color key is in the icon slot', () => {
		const {getByRole} = render(
			<FloatingLayerController>
				<KeyGuide open>
					{[{icon: 'red', children: 'a', key: 'a'}]}
				</KeyGuide>
			</FloatingLayerController>
		);

		const item = getByRole('list').children.item(0);
		const expected = 'red';
		const actual = item.children.item(1).children.item(0).className;

		expect(actual).toContain(expected);
	});

	test('should create an icon if asked to', () => {
		const {getByRole} = render(
			<FloatingLayerController>
				<KeyGuide open>
					{[{icon: 'plus', children: 'a', key: 'a'}]}
				</KeyGuide>
			</FloatingLayerController>
		);

		const item = getByRole('list').children.item(0);
		const expected = '+';
		const actual = item.children.item(1).children.item(0).textContent;

		expect(actual).toContain(expected);
	});

	test('should not create an icon if a color is specified', () => {
		const {getByRole} = render(
			<FloatingLayerController>
				<KeyGuide open>
					{[{icon: 'green', children: 'a', key: 'a'}]}
				</KeyGuide>
			</FloatingLayerController>
		);

		const item = getByRole('list').children.item(0);
		const expected = 'icon';
		const actual = item.children.item(1).children.item(0).className;

		expect(actual).not.toContain(expected);
	});
});
