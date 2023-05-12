import {getPointerMode} from '@enact/spotlight/src/pointer';
import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '../../Button';
import {ContextualPopupDecorator} from '../ContextualPopupDecorator';

const ContextualButton = ContextualPopupDecorator(Button);

const keyDown = (keyCode) => (picker) => fireEvent.keyDown(picker, {keyCode});

const leftKeyDown = keyDown(37);

describe('ContextualPopupDecorator Specs', () => {
	beforeEach(() => {
		global.Element.prototype.getBoundingClientRect = jest.fn(() => {
			return {
				width: 1800,
				height: 1000,
				top: 500,
				left: 500,
				bottom: 0,
				right: 0
			};
		});
	});

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

	test('should emit onClose event with type when clicking on contextual button', async () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		const user = userEvent.setup();
		render(
			<Root>
				<ContextualButton onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualButton = screen.getByRole('button');

		await user.click(contextualButton);

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

	test('should not close popup when clicking outside if noAutoDismiss is true', async () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		const user = userEvent.setup();
		render(
			<Root data-testid="outsideArea">
				<ContextualButton noAutoDismiss onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const outsideArea = screen.getByTestId('outsideArea');

		await user.click(outsideArea);

		expect(handleClose).not.toHaveBeenCalled();
	});

	test('should have \'below\' className when direction is set to \'below\'', () => {
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

	test('should have \'below center\' className when direction is set to \'below center\'', () => {
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

	test('should have \'below left\' className when direction is set to \'below left\'', () => {
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

	test('should have \'below right\' className when direction is set to \'below right\'', () => {
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

	test('should have \'right bottom\' className when direction is set to \'right bottom\'', () => {
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

	test('should have \'right middle\' className when direction is set to \'right middle\'', () => {
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

	test('should have \'right top\' className when direction is set to \'right top\'', () => {
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

	test('should have \'above\' className when direction is set to \'above\'', () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="above" onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'above';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should have \'above center\' className when direction is set to \'above center\'', () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="above center" onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'above center';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should have \'above left\' className when direction is set to \'above left\'', () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="above left" onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'above left';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should have \'above right\' className when direction is set to \'above right\'', () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="above right" onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'above right';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should have \'left bottom\' className when direction is set to \'left bottom\'', () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="left bottom" onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'left bottom';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should have \'left middle\' className when direction is set to \'left middle\'', () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="left middle" onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'left middle';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should have \'left top\' className when direction is set to \'left top\'', () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="left top" onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'left top';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should set pointerMode to be false when directional key is pressed', () => {
		const Root = FloatingLayerDecorator('div');
		render(
			<Root>
				<ContextualButton open popupComponent={() => <div><Button>first</Button><Button>second</Button></div>}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualButton = screen.getByRole('alert');

		leftKeyDown(contextualButton);

		const expected = false;
		const pointerMode = getPointerMode();

		expect(pointerMode).toBe(expected);
	});

	test('should close popup if prop \'open\' is omitted on rerender', () => {
		const Root = FloatingLayerDecorator('div');
		const {rerender} = render(
			<Root>
				<ContextualButton open popupComponent={() => <div><Button>first</Button><Button>second</Button></div>}>
					Hello
				</ContextualButton>
			</Root>
		);
		const firstRender = screen.getAllByRole('button').length;
		const expectedFirst = 3;

		rerender(
			<Root>
				<ContextualButton popupComponent={() => <div><Button>first</Button><Button>second</Button></div>}>
					Hello
				</ContextualButton>
			</Root>
		);
		const secondRender = screen.getAllByRole('button').length;
		const expectedSecond = 1;

		expect(firstRender).toBe(expectedFirst);
		expect(secondRender).toBe(expectedSecond);
	});

	test('should open popup if prop \'open\' is added on rerender', () => {
		const Root = FloatingLayerDecorator('div');
		const {rerender} = render(
			<Root>
				<ContextualButton popupComponent={() => <div><Button>first</Button><Button>second</Button></div>}>
					Hello
				</ContextualButton>
			</Root>
		);
		const firstRender = screen.getAllByRole('button').length;
		const expectedFirst = 1;

		rerender(
			<Root>
				<ContextualButton open popupComponent={() => <div><Button>first</Button><Button>second</Button></div>}>
					Hello
				</ContextualButton>
			</Root>
		);
		const secondRender = screen.getAllByRole('button').length;
		const expectedSecond = 3;

		expect(firstRender).toBe(expectedFirst);
		expect(secondRender).toBe(expectedSecond);
	});

	test('should capture \'onKeyDown\' event from outside of popup', () => {
		const handleOnKeyDown = jest.fn();
		const Root = FloatingLayerDecorator('div');
		render(
			<Root>
				<ContextualButton onKeyDown={handleOnKeyDown} open popupComponent={() => <div><Button>first</Button><Button>second</Button></div>}>
					Hello
				</ContextualButton>
			</Root>
		);

		const button = screen.getAllByRole('button')[0];
		leftKeyDown(button);

		expect(handleOnKeyDown).toHaveBeenCalled();
	});

	test('should render floatingLayer according to prop \'scrimType\'', () => {
		const Root = FloatingLayerDecorator('div');
		const {rerender} = render(
			<Root>
				<ContextualButton scrimType="holepunch" open popupComponent={() => <div><Button>Button</Button></div>}>
					Hello
				</ContextualButton>
			</Root>
		);

		const scrimDivFirst = screen.getByRole('alert').previousElementSibling;
		const expectedFirst = 'holePunchScrim';

		rerender(
			<Root>
				<ContextualButton scrimType="transparent" open popupComponent={() => <div><Button>Button</Button></div>}>
					Hello
				</ContextualButton>
			</Root>
		);

		const scrimDivSecond = screen.getByRole('alert').previousElementSibling;
		const expectedSecond = 'transparent';

		expect(scrimDivFirst).toHaveClass(expectedFirst);
		expect(scrimDivSecond).toHaveClass(expectedSecond);
	});
});
