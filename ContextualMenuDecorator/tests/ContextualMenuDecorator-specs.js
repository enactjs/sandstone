import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {ContextualMenuDecorator} from '../ContextualMenuDecorator';
import Button from '../../Button';

const ContextualButton = ContextualMenuDecorator(Button);
const items = new Array(3).fill().map((i, index) => `Option ${index + 1}`);

describe('ContextualMenuDecorator Specs', () => {
	test('should render component into FloatingLayer if open', () => {
		const Root = FloatingLayerDecorator('div');

		render(
			<Root>
				<ContextualButton menuItems={items} open>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualMenu = screen.getByRole('list');

		const expected = 'Option 1';
		const actual = contextualMenu.children.item(0);

		expect(actual).toHaveTextContent(expected);
	});

	test('should not render into FloatingLayer if not open', () => {
		const Root = FloatingLayerDecorator('div');

		render(
			<Root>
				<ContextualButton menuItems={items}>
					Hello
				</ContextualButton>
			</Root>
		);

		const menu = screen.queryByText('Option 1');

		expect(menu).toBeNull();
	});

	test('should emit onClose event when clicking outside the contextual menu', () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');

		render(
			<Root>
				<ContextualButton menuItems={items} onClose={handleClose} open>
					Hello
				</ContextualButton>
			</Root>
		);
		const floatingLayerScrim = screen.getByTestId('contextualMenu').nextElementSibling.children.item(0).children.item(0).children.item(0);

		userEvent.click(floatingLayerScrim);

		expect(handleClose).toHaveBeenCalled();
	});

	test('should not close menu when clicking outside if noAutoDismiss is true', () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');

		render(
			<Root data-testid="contextualMenu">
				<ContextualButton menuItems={items} noAutoDismiss onClose={handleClose} open>
					Hello
				</ContextualButton>
			</Root>
		);
		const floatingLayerScrim = screen.getByTestId('contextualMenu').nextElementSibling.children.item(0).children.item(0).children.item(0);

		userEvent.click(floatingLayerScrim);

		expect(handleClose).not.toHaveBeenCalled();
	});

	test('should have "below right" className when direction is set to "below right"', () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');

		render(
			<Root>
				<ContextualButton direction="below right" menuItems={items} onClose={handleClose} open>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualMenu = screen.getByRole('list');

		const expected = 'below right';
		const actual = contextualMenu.parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should have offset "none" when offset is set to "none"', () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');

		render(
			<Root>
				<ContextualButton menuItems={items} offset="none" onClose={handleClose} open>
					Hello
				</ContextualButton>
			</Root>
		);

		const contextualMenu = screen.getByRole('list').parentElement.parentElement;
		const expected = 'none';

		expect(contextualMenu).toHaveAttribute('offset', expected);
	});

	test('should have "large" className when popupWidth is set to "large"', () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');

		render(
			<Root>
				<ContextualButton menuItems={items} onClose={handleClose} open popupWidth="large" >
					Hello
				</ContextualButton>
			</Root>
		);

		const contextualMenu = screen.getByRole('list').parentElement;
		const expected = 'large';

		expect(contextualMenu).toHaveClass(expected);
	});
});
