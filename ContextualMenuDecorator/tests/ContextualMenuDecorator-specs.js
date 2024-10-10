import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {ContextualMenuDecorator} from '../ContextualMenuDecorator';
import Button from '../../Button';

const ContextualButton = ContextualMenuDecorator(Button);
const Root = FloatingLayerDecorator('div');
const items = new Array(3).fill().map((i, index) => `Option ${index + 1}`);

describe('ContextualMenuDecorator Specs', () => {
	test('should render component into FloatingLayer if open', () => {
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

	test('should emit onClose event when clicking outside the contextual menu', async () => {
		const handleClose = jest.fn();
		const user = userEvent.setup();

		render(
			<Root data-testid="contextualMenu">
				<ContextualButton menuItems={items} onClose={handleClose} open>
					Hello
				</ContextualButton>
			</Root>
		);

		const floatingLayerScrim = screen.getByTestId('contextualMenu').nextElementSibling.querySelector('.scrim');

		await user.click(floatingLayerScrim);

		expect(handleClose).toHaveBeenCalled();
	});

	test('should not close menu when clicking outside if noAutoDismiss is true', async () => {
		const handleClose = jest.fn();
		const user = userEvent.setup();

		render(
			<Root data-testid="contextualMenu">
				<ContextualButton menuItems={items} noAutoDismiss onClose={handleClose} open>
					Hello
				</ContextualButton>
			</Root>
		);
		const floatingLayerScrim = screen.getByTestId('contextualMenu').nextElementSibling.querySelector('.scrim');

		await user.click(floatingLayerScrim);

		expect(handleClose).not.toHaveBeenCalled();
	});

	test('should have \'below right\' className when direction is set to \'below right\'', () => {
		const handleClose = jest.fn();

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

	test('should have offset \'none\' when offset is set to \'none\'', () => {
		const handleClose = jest.fn();

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

	test('should have \'large\' className when popupWidth is set to \'large\'', () => {
		const handleClose = jest.fn();

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

	test('should wrap content in Scroller component if menuItem length exceeds MAX_VISIBLE_MENU_ITEMS', () => {
		const moreItems = new Array(8).fill().map((i, index) => `Option ${index + 1}`);

		render(
			<Root>
				<ContextualButton menuItems={moreItems} open>
					Hello
				</ContextualButton>
			</Root>
		);

		const scroller = screen.getByRole('list').parentElement;
		const expected = 'scroller';

		expect(scroller).toHaveClass(expected);
	});
});
