import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import Header from '../Header';
import css from '../Header.module.less';

describe('Header Specs', () => {
	test('should render with title text without changing case', () => {
		const expected = 'cRaZy-cased super Header';

		render(<Header><title>{expected}</title></Header>);

		const header = screen.getByText(expected);

		expect(header).toBeInTheDocument();
	});

	test('should support "wizard" type', () => {
		render(<Header data-testid="header" type="wizard"><title>Wizard Header</title></Header>);

		const expected = css.wizard;
		const header = screen.getByTestId('header');

		expect(header).toHaveClass(expected);
	});

	test('should support "compact" type', () => {
		render(<Header data-testid="header" type="compact"><title>Compact Header</title></Header>);

		const expected = css.compact;
		const header = screen.getByTestId('header');

		expect(header).toHaveClass(expected);
	});

	test('should have centered class applied when the centered prop is true', () => {
		render(<Header data-testid="header" centered><title>Centered Header</title></Header>);

		const expected = css.centered;
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

		expect(slotAbove).toHaveClass(css.slotAbove);
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

		expect(slotBefore).toHaveClass(css.slotBefore);
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

		expect(slotAfter).toHaveClass(css.slotAfter);
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

	test('should call onClose when close button is clicked', () => {
		const handleClose = jest.fn();
		render(<Header onClose={handleClose} />);

		fireEvent.mouseDown(screen.getByRole('button'));
		fireEvent.mouseUp(screen.getByRole('button'));

		expect(handleClose).toHaveBeenCalled();
	});

	test('should set close button "aria-label" to closeButtonAriaLabel', () => {
		const label = 'custom close button label';
		render(<Header closeButtonAriaLabel={label} />);

		const closeButtonAriaLabel = screen.getByLabelText(label);
		const slotAfter = closeButtonAriaLabel.parentElement.parentElement;

		expect(closeButtonAriaLabel).toBeInTheDocument();
		expect(slotAfter).toHaveClass(css.slotAfter);
	});
});
