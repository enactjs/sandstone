import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';

import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {FloatingPopup} from '../FloatingPopup';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('FloatingPopup specs', () => {
	test('should be rendered opened if open is set to true', () => {
		render(
			<FloatingLayerController>
                <FloatingPopup open><div>floatingPopup</div></FloatingPopup>
			</FloatingLayerController>
		);

		const floatingPopup = screen.getByText('floatingPopup');

		expect(floatingPopup).toBeInTheDocument();
	});

	test('should not be rendered if open is set to false', () => {
		render(
			<FloatingLayerController>
				<FloatingPopup><div>FloatingPopup</div></FloatingPopup>
			</FloatingLayerController>
		);

		const floatingPopup = screen.queryByText('FloatingPopup');

		expect(floatingPopup).toBeNull();
	});
});

