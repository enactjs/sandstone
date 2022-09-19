import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '../../Button';
import {ContextualPopupDecorator} from '../ContextualPopupDecorator';

const ContextualButton = ContextualPopupDecorator(Button);

describe('ContextualPopupDecorator Specs', () => {
	test('should emit onOpen event with type when opening', () => {
		const handleOpen = jest.fn();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton onOpen={handleOpen} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);

		const expected = 1;
		const expectedType = {type: 'onOpen'};
		const actual = handleOpen.mock.calls.length && handleOpen.mock.calls[0][0];

		expect(handleOpen).toHaveBeenCalledTimes(expected);
		expect(actual).toMatchObject(expectedType);
	});

	test('should emit onClose event with type when clicking on contextual button', () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualButton = screen.getByRole('button');

		userEvent.click(contextualButton);

		const expected = 1;
		const expectedType = {type: 'onClose'};
		const actual = handleClose.mock.calls.length && handleClose.mock.calls[0][0];

		expect(handleClose).toHaveBeenCalledTimes(expected);
		expect(actual).toMatchObject(expectedType);
	});

	test('should render component into FloatingLayer if open', () => {
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

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
		render(
			<Root data-testid="outsideArea">
				<ContextualButton noAutoDismiss onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const outsideArea = screen.getByTestId('outsideArea');

		userEvent.click(outsideArea);

		expect(handleClose).not.toHaveBeenCalled();
	});

	test('should have "below" className when direction is set to "below"', () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="below" onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'below';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should have "below center" className when direction is set to "below center"', () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="below center" onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'below center';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should have "below left" className when direction is set to "below left"', () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="below left" onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'below left';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should have "below right" className when direction is set to "below right"', () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="below right" onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'below right';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should have "right bottom" className when direction is set to "right bottom"', () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="right bottom" onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'right bottom';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should have "right middle" className when direction is set to "right middle"', () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="right middle" onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'right middle';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should have "right top" className when direction is set to "right top"', () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="right top" onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'right top';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});
});
