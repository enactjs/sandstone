import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {ContextualPopupDecorator} from '../ContextualPopupDecorator';
import Button from '../../Button';

const ContextualButton = ContextualPopupDecorator(Button);

describe('ContextualPopupDecorator Specs', () => {
	test('should emit onClose event when clicking on contextual button', () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		const {getByRole} = render(
			<Root>
				<ContextualButton onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualButton = getByRole('button');

		userEvent.click(contextualButton);

		expect(handleClose).toHaveBeenCalled();
	});

	test('should render component into FloatingLayer if open', () => {
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		const {getByRole} = render(
			<Root>
				<ContextualButton open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = getByRole('alert');

		const expected = message;
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveTextContent(expected);
	});

	test('should not render into FloatingLayer if not open', () => {
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';

		render(
			<Root>
				<ContextualButton popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);

		const popup = screen.queryByText(message);

		expect(popup).toBeNull();
	});

	test('should not close popup when clicking outside if noAutoDismiss is true', () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		const {getByTestId} = render(
			<Root data-testid="outsideArea">
				<ContextualButton noAutoDismiss onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const outsideArea = getByTestId('outsideArea');

		userEvent.click(outsideArea);

		expect(handleClose).not.toHaveBeenCalled();
	});

	test('should have "below right" className when direction is set to "below right"', () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		const {getByRole} = render(
			<Root>
				<ContextualButton direction="below right" onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = getByRole('alert');

		const expected = 'below right';
		const actual = contextualPopup.children.item(0).className;

		expect(actual).toContain(expected);
	});
});
