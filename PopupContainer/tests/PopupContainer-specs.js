import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';

import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {PopupContainer} from '../PopupContainer';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('PopupContainer specs', () => {
	test('should be rendered opened if open is set to true', () => {
		render(
			<FloatingLayerController>
				<PopupContainer open><div>PopupContainer</div></PopupContainer>
			</FloatingLayerController>
		);

		const popupContainer = screen.getByText('PopupContainer');

		expect(popupContainer).toBeInTheDocument();
	});

	test('should not be rendered if open is set to false', () => {
		render(
			<FloatingLayerController>
				<PopupContainer><div>PopupContainer</div></PopupContainer>
			</FloatingLayerController>
		);

		const popupContainer = screen.queryByText('PopupContainer');

		expect(popupContainer).toBeNull();
	});
});

