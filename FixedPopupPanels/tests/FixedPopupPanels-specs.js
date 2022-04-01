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

	test('should close on back key', () => {
		const map = {};

		window.addEventListener = jest.fn((event, cb) => {
			map[event] = cb;
		});
		const handleClose = jest.fn();

		render(
			<FloatingLayerController>
				<FixedPopupPanels onClose={handleClose} open />
			</FloatingLayerController>
		);

		map.keyup({type: 'keyup', currentTarget: window, keyCode: 27});

		const expectedEvent = {type: 'onClose'};
		const actualEvent = handleClose.mock.calls.length && handleClose.mock.calls[0][0];

		expect(handleClose).toHaveBeenCalled();
		expect(actualEvent).toMatchObject(expectedEvent);
	});
});
