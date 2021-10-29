import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import KeyGuide from '../KeyGuide';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('KeyGuide Specs', () => {
	test('should not error with undefined children', () => {
		render(
			<FloatingLayerController>
				<KeyGuide open />
			</FloatingLayerController>
		);
		const keyGuide = screen.queryByRole('list');

		expect(keyGuide).toBeNull();
	});

	test('should not render open floating layer if open with no children', () => {
		render(
			<FloatingLayerController>
				<KeyGuide open>
					{[]}
				</KeyGuide>
			</FloatingLayerController>
		);
		const keyGuide = screen.queryByRole('list');

		expect(keyGuide).toBeNull();
	});

	test('should not render open floating layer if not open with children', () => {
		render(
			<FloatingLayerController>
				<KeyGuide>
					{[{icon: 'red', children: 'a', key: 'a'}]}
				</KeyGuide>
			</FloatingLayerController>
		);
		const keyGuide = screen.queryByRole('list');

		expect(keyGuide).toBeNull();
	});

	test('should render open floating layer if open with children', () => {
		render(
			<FloatingLayerController>
				<KeyGuide open>
					{[{icon: 'red', children: 'a', key: 'a'}]}
				</KeyGuide>
			</FloatingLayerController>
		);
		const keyGuide = screen.getByRole('list');

		const expected = 'keyGuide';

		expect(keyGuide).toBeInTheDocument();
		expect(keyGuide).toHaveClass(expected);
	});

	test('should apply color class if a color key is in the icon slot', () => {
		render(
			<FloatingLayerController>
				<KeyGuide open>
					{[{icon: 'red', children: 'a', key: 'a'}]}
				</KeyGuide>
			</FloatingLayerController>
		);
		const item = screen.getByRole('list').children.item(0);

		const expected = 'red';
		const actual = item.children.item(1).children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should create an icon if asked to', () => {
		render(
			<FloatingLayerController>
				<KeyGuide open>
					{[{icon: 'plus', children: 'a', key: 'a'}]}
				</KeyGuide>
			</FloatingLayerController>
		);
		const icon = screen.getByText('+');

		const expected = 'icon';

		expect(icon).toHaveClass(expected);
	});

	test('should not create an icon if a color is specified', () => {
		render(
			<FloatingLayerController>
				<KeyGuide open>
					{[{icon: 'green', children: 'a', key: 'a'}]}
				</KeyGuide>
			</FloatingLayerController>
		);
		const item = screen.getByRole('list').children.item(0);
		const expected = 'icon';
		const actual = item.children.item(1).children.item(0);

		expect(actual).not.toHaveClass(expected);
	});
});
