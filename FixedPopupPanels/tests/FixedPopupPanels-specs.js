import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import FixedPopupPanels from '../FixedPopupPanels';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('FixedPopupPanels', () => {
	test('should have the default width when nothing is assigned', function () {
		render(
			<FloatingLayerController>
				<FixedPopupPanels data-testid="panels-id" open />
			</FloatingLayerController>
		);

		const expected = 'narrow';
		const actual = screen.getByTestId('panels-id').parentElement.parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should have narrow width applied when width="narrow"', function () {
		render(
			<FloatingLayerController>
				<FixedPopupPanels data-testid="panels-id" open width="narrow" />
			</FloatingLayerController>
		);

		const expected = 'narrow';
		const actual = screen.getByTestId('panels-id').parentElement.parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should have half width applied when width="half"', function () {
		render(
			<FloatingLayerController>
				<FixedPopupPanels data-testid="panels-id" open width="half" />
			</FloatingLayerController>
		);

		const expected = 'half';
		const actual = screen.getByTestId('panels-id').parentElement.parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should correctly assign the fullHeight class', function () {
		render(
			<FloatingLayerController>
				<FixedPopupPanels data-testid="panels-id" fullHeight open />
			</FloatingLayerController>
		);

		const expected = 'fullHeight';
		const actual = screen.getByTestId('panels-id').parentElement.parentElement;

		expect(actual).toHaveClass(expected);
	});
});
