import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {Item} from '../../Item';
import {PopupTabLayout, Tab, TabPanel, TabPanels} from '../PopupTabLayout';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('PopupTabLayout specs', () => {
	test('should be rendered opened if open is set to true', () => {
		render(
			<FloatingLayerController>
				<PopupTabLayout open><div>popupTabLayout</div></PopupTabLayout>
			</FloatingLayerController>
		);

		const popupTabLayout = screen.getByText('popupTabLayout');

		expect(popupTabLayout).toBeInTheDocument();
	});

	test('should not be rendered if open is set to false', () => {
		render(
			<FloatingLayerController>
				<PopupTabLayout><div>popupTabLayout</div></PopupTabLayout>
			</FloatingLayerController>
		);

		const popupTabLayout = screen.queryByText('popupTabLayout');

		expect(popupTabLayout).toBeNull();
	});

	test('should apply \'ease-in-out\' class when noAnimation is false', () => {
		render(
			<FloatingLayerController>
				<PopupTabLayout data-testid="popupTabLayout" noAnimation={false} open><div>popupTabLayout</div></PopupTabLayout>
			</FloatingLayerController>
		);

		const expected = 'ease-in-out';
		const actual = screen.getByTestId('popupTabLayout').parentElement.parentElement.parentElement.parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should not apply \'ease-in-out\' class when noAnimation is true', () => {
		render(
			<FloatingLayerController>
				<PopupTabLayout data-testid="popupTabLayout" noAnimation open><div>popupTabLayout</div></PopupTabLayout>
			</FloatingLayerController>
		);

		const expected = 'ease-in-out';
		const actual = screen.getByTestId('popupTabLayout').parentElement.parentElement.parentElement.parentElement;

		expect(actual).not.toHaveClass(expected);
	});

	test('should not close popupTabLayout on escape if noAutoDismiss is true', async () => {
		const handleClose = jest.fn();
		render(
			<FloatingLayerController>
				<PopupTabLayout noAutoDismiss onClose={handleClose} open><div>popupTabLayout</div></PopupTabLayout>
			</FloatingLayerController>
		);

		userEvent.keyboard('{esc}');

		await waitFor(() => {
			expect(handleClose).not.toHaveBeenCalled();
		});
	});

	test('should not close popupTabLayout on escape if noAutoDismiss is true', async () => {
		const handleClose = jest.fn();
		render(
			<FloatingLayerController>
				<PopupTabLayout noAutoDismiss onClose={handleClose} open><div>popupTabLayout</div></PopupTabLayout>
			</FloatingLayerController>
		);

		userEvent.keyboard('{esc}');

		await waitFor(() => {
			expect(handleClose).not.toHaveBeenCalled();
		});
	});

	test('should display items from second tab', async () => {
		render(
			<FloatingLayerController>
				<PopupTabLayout data-testid="popupTabLayout" open>
					<Tab title="First Tab Title">
						<TabPanels>
							<TabPanel>
								<Item>Item 1</Item>
								<Item>Item 2</Item>
							</TabPanel>
						</TabPanels>
					</Tab>
					<Tab title="Second Tab Title">
						<TabPanels>
							<TabPanel>
								<Item>Item 3</Item>
								<Item>Item 4</Item>
							</TabPanel>
						</TabPanels>
					</Tab>
				</PopupTabLayout>
			</FloatingLayerController>
		);

		let thirdItem = screen.queryByText('Item 3');
		let fourthItem = screen.queryByText('Item 4');

		expect(thirdItem).not.toBeInTheDocument();
		expect(fourthItem).not.toBeInTheDocument();

		const secondTab = screen.getByText('Second Tab Title');

		userEvent.click(secondTab);

		thirdItem = screen.getByText('Item 3');
		fourthItem = screen.getByText('Item 4');

		expect(thirdItem).toBeInTheDocument();
		expect(fourthItem).toBeInTheDocument();
	});
});
