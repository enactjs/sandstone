import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import {render} from '@testing-library/react';

import FixedPopupPanels from '../FixedPopupPanels';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('FixedPopupPanels', () => {

	it('should have the default width when nothing is assigned', function () {
		const {getByTestId} = render(
			<FloatingLayerController>
				<FixedPopupPanels data-testid="panels-id" open />
			</FloatingLayerController>
		);

		const expected = 'narrow';
		const actual = getByTestId('panels-id').parentElement.parentElement;

		expect(actual.className).toContain(expected);
	});

	it('should have narrow width applied when width="narrow"', function () {
		const {getByTestId} = render(
			<FloatingLayerController>
				<FixedPopupPanels data-testid="panels-id" open width="narrow" />
			</FloatingLayerController>
		);

		const expected = 'narrow';
		const actual = getByTestId('panels-id').parentElement.parentElement;

		expect(actual.className).toContain(expected);
	});

	it('should have half width applied when width="half"', function () {
		const {getByTestId} = render(
			<FloatingLayerController>
				<FixedPopupPanels data-testid="panels-id" open width="half" />
			</FloatingLayerController>
		);

		const expected = 'half';
		const actual = getByTestId('panels-id').parentElement.parentElement;

		expect(actual.className).toContain(expected);
	});

	it('should correctly assign the fullHeight class', function () {
		const {getByTestId} = render(
			<FloatingLayerController>
				<FixedPopupPanels data-testid="panels-id" fullHeight open />
			</FloatingLayerController>
		);

		const expected = 'fullHeight';
		const actual = getByTestId('panels-id').parentElement.parentElement;

		expect(actual.className).toContain(expected);
	});
});
