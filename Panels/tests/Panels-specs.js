import '@testing-library/jest-dom';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Header from '../Header';
import Panel from '../Panel';
import Panels from '../Panels';

describe('Panels Specs', () => {
	test('should set {autoFocus} on child to "default-element" on first render', () => {
		const DivPanel = ({autoFocus, id}) => <div data-testid="panel" id={id}>{autoFocus}</div>;
		render(
			<Panels index={0}>
				<DivPanel />
			</Panels>
		);

		const expected = 'default-element';
		const actual = screen.getByTestId('panel').textContent;

		expect(actual).toBe(expected);
	});

	test('should set {autoFocus} on child to "default-element" when navigating to a higher index', () => {
		const DivPanel = ({autoFocus, id}) => <div data-testid="panel" id={id}>{autoFocus}</div>;
		const {rerender} = render(
			<Panels index={0}>
				<DivPanel />
				<DivPanel id="p2" />
			</Panels>
		);

		rerender(
			<Panels index={1}>
				<DivPanel />
				<DivPanel id="p2" />
			</Panels>
		);

		const expected = 'default-element';
		const actual = screen.getAllByTestId('panel')[0].textContent;

		expect(actual).toBe(expected);
	});

	test('should not set {autoFocus} on child when navigating to a higher index when it has an autoFocus prop set', () => {
		const DivPanel = ({autoFocus, id}) => <div data-testid="panel" id={id}>{autoFocus}</div>;
		const {rerender} = render(
			<Panels index={0}>
				<DivPanel />
				<DivPanel id="p2" autoFocus="last-focused" />
			</Panels>
		);

		rerender(
			<Panels index={1}>
				<DivPanel />
				<DivPanel id="p2" autoFocus="last-focused" />
			</Panels>
		);

		const expected = 'last-focused';
		const panel = screen.getAllByTestId('panel')[0];

		expect(panel.textContent).toBe(expected);
		expect(panel.id).toBe('p2');
	});

	test('should return a ref to the root Panel node', () => {
		const ref = jest.fn();
		render(<Panel ref={ref} />);

		const expected = 'ARTICLE';
		const actual = ref.mock.calls[0][0].nodeName;

		expect(actual).toBe(expected);
	});

	describe('with Panel and Header', () => {
		test('should not render back button on the first panel', () => {
			render(
				<Panels index={0}>
					<Panel>
						<Header />
					</Panel>
				</Panels>
			);

			const backButton = screen.queryByLabelText('go to previous');

			expect(backButton).toBeNull();
		});

		test('should render back button when not on the first panel', () => {
			render(
				<Panels index={1}>
					<Panel>
						<Header />
					</Panel>
					<Panel>
						<Header />
					</Panel>
				</Panels>
			);

			const backButton = screen.getByLabelText('go to previous');

			expect(backButton).toBeInTheDocument();
		});

		test('should fire `onBack` with `onBack` type when back clicked', async () => {
			const handleBack = jest.fn();
			const user = userEvent.setup();

			render(
				<Panels index={1} onBack={handleBack}>
					<Panel>
						<Header />
					</Panel>
					<Panel>
						<Header />
					</Panel>
				</Panels>
			);

			await user.click(screen.getByLabelText('go to previous'));

			const expected = {type: 'onBack'};

			await waitFor(() => {
				const actual = handleBack.mock.calls.length && handleBack.mock.calls[0][0];

				expect(actual).toMatchObject(expected);
			});
		});

		test('should not render back button when not on the first panel and \'noBackButton\' is set to true', () => {
			render(
				<Panels index={1} noBackButton>
					<Panel>
						<Header />
					</Panel>
					<Panel>
						<Header />
					</Panel>
				</Panels>
			);

			const backButton = screen.queryByLabelText('go to previous');

			expect(backButton).toBeNull();
		});

		test('should not render back button when \'noBackButton\' is set on `Panel` 2', () => {
			render(
				<Panels index={1}>
					<Panel>
						<Header />
					</Panel>
					<Panel noBackButton>
						<Header />
					</Panel>
				</Panels>
			);

			const backButton = screen.queryByLabelText('go to previous');

			expect(backButton).toBeNull();
		});

		test('should render back button on panel 3 when \'noBackButton\' is set on panel 2', () => {
			render(
				<Panels index={2}>
					<Panel>
						<Header />
					</Panel>
					<Panel noBackButton>
						<Header />
					</Panel>
					<Panel>
						<Header />
					</Panel>
				</Panels>
			);

			const backButton = screen.getByLabelText('go to previous');

			expect(backButton).toBeInTheDocument();
		});

		test('should set back button "aria-label" to backButtonAriaLabel', () => {
			const label = 'custom back button label';
			render(
				<Panels backButtonAriaLabel={label} index={1}>
					<Panel>
						<Header />
					</Panel>
					<Panel>
						<Header />
					</Panel>
				</Panels>
			);

			const backButton = screen.getByLabelText(label);
			const backButtonContainer = backButton.parentElement.parentElement;
			const expectedClass = 'slotBefore';

			expect(backButton).toBeInTheDocument();
			expect(backButtonContainer).toHaveClass(expectedClass);
		});

		test('should set back button "aria-label" to backButtonAriaLabel when defined only on a panel', () => {
			const label = 'custom back button label';
			render(
				<Panels index={1}>
					<Panel>
						<Header />
					</Panel>
					<Panel backButtonAriaLabel={label}>
						<Header />
					</Panel>
				</Panels>
			);

			const backButton = screen.getByLabelText(label);
			const backButtonContainer = backButton.parentElement.parentElement;
			const expectedClass = 'slotBefore';

			expect(backButton).toBeInTheDocument();
			expect(backButtonContainer).toHaveClass(expectedClass);
		});

		test('should render close button', () => {
			render(
				<Panels index={0}>
					<Panel>
						<Header />
					</Panel>
				</Panels>
			);

			const closeButton = screen.getByLabelText('Exit app');
			const closeButtonContainer = closeButton.parentElement.parentElement;
			const expectedClass = 'slotAfter';

			expect(closeButton).toBeInTheDocument();
			expect(closeButtonContainer).toHaveClass(expectedClass);
		});

		test('should not render close button when \'noCloseButton\' is set to true', () => {
			render(
				<Panels index={0} noCloseButton>
					<Panel>
						<Header />
					</Panel>
				</Panels>
			);

			const closeButton = screen.queryByLabelText('Exit app');

			expect(closeButton).toBeNull();
		});

		test('should set close button "aria-label" to closeButtonAriaLabel', () => {
			const label = 'custom close button label';
			render(
				<Panels closeButtonAriaLabel={label} index={0}>
					<Panel>
						<Header />
					</Panel>
				</Panels>
			);

			const closeButton = screen.getByLabelText(label);
			const closeButtonContainer = closeButton.parentElement.parentElement;
			const expectedClass = 'slotAfter';

			expect(closeButton).toBeInTheDocument();
			expect(closeButtonContainer).toHaveClass(expectedClass);
		});
	});
});
