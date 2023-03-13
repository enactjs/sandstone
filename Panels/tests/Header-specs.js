import '@testing-library/jest-dom';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';

import Header from '../Header';

describe('Header Specs', () => {
	test('should render with title text without changing case', () => {
		const expected = 'cRaZy-cased super Header';

		render(<Header><title>{expected}</title></Header>);

		const header = screen.getByText(expected);

		expect(header).toBeInTheDocument();
	});

	test('should support "wizard" type', () => {
		render(<Header data-testid="header" type="wizard"><title>Wizard Header</title></Header>);

		const expected = 'wizard';
		const header = screen.getByTestId('header');

		expect(header).toHaveClass(expected);
	});

	test('should support "compact" type', () => {
		render(<Header data-testid="header" type="compact"><title>Compact Header</title></Header>);

		const expected = 'compact';
		const header = screen.getByTestId('header');

		expect(header).toHaveClass(expected);
	});

	test('should have centered class applied when the centered prop is true', () => {
		render(<Header data-testid="header" centered><title>Centered Header</title></Header>);

		const expected = 'centered';
		const header = screen.getByTestId('header');

		expect(header).toHaveClass(expected);
	});

	test('should support `slotAbove`', () => {
		const expected = 'slot above';

		render(
			<Header>
				<slotAbove>
					{expected}
				</slotAbove>
				<title>Slotted Header</title>
			</Header>
		);

		const slotAbove = screen.getByText(expected);
		const expectedClass = 'slotAbove';

		expect(slotAbove).toHaveClass(expectedClass);
	});

	test('should support `slotBefore`', () => {
		const expected = 'slot before';

		render(
			<Header>
				<slotBefore>
					{expected}
				</slotBefore>
				<title>Slotted Header</title>
			</Header>
		);

		const slotBefore = screen.getByText(expected).parentElement;
		const expectedClass = 'slotBefore';

		expect(slotBefore).toHaveClass(expectedClass);
	});

	test('should support `slotAfter`', () => {
		const expected = 'slot after';

		render(
			<Header noCloseButton>
				<title>Slotted Header</title>
				<slotAfter>
					{expected}
				</slotAfter>
			</Header>
		);

		const slotAfter = screen.getByText(expected).parentElement;
		const expectedClass = 'slotAfter';

		expect(slotAfter).toHaveClass(expectedClass);
	});

	test('should not render back button', () => {
		render(<Header />);

		const backButton = screen.queryByLabelText('go to previous');

		expect(backButton).toBeNull();
	});

	test('should render close button when \'noCloseButton\' is not specified', () => {
		render(<Header />);

		const closeButton = screen.getByLabelText('Exit app');

		expect(closeButton).toBeInTheDocument();
	});

	test('should not render close button when \'noCloseButton\' is set to true', () => {
		render(<Header noCloseButton />);

		const closeButton = screen.queryByLabelText('Exit app');

		expect(closeButton).toBeNull();
	});

	test('should call onClose when close button is clicked', async () => {
		const handleClose = jest.fn();
		render(<Header onClose={handleClose} />);

		fireEvent.click(screen.getByRole('button'));

		expect(handleClose).toHaveBeenCalled();

		await waitFor(() => {
			expect(handleClose).toHaveBeenCalledTimes(1);
		});
	});

	test('should set close button "aria-label" to closeButtonAriaLabel', () => {
		const label = 'custom close button label';
		render(<Header closeButtonAriaLabel={label} />);

		const closeButtonAriaLabel = screen.getByLabelText(label);
		const slotAfter = closeButtonAriaLabel.parentElement.parentElement;

		expect(closeButtonAriaLabel).toBeInTheDocument();
		expect(slotAfter).toHaveClass('slotAfter');
	});

	test ('should set close button `shadowed` to true when `shadowed` is set to true', () => {
		render(<Header shadowed><title>title</title></Header>);

		const button = screen.getByRole('button');
		const expected = 'button shadowed';

		expect(button).toHaveClass(expected);
	});
});
