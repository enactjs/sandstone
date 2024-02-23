import '@testing-library/jest-dom';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {Panel, QuickGuidePanels} from '../';

describe('QuickGuidePanel Specs', () => {
	test(
		'should hide next button on the last view',
		() => {
			render(
				<QuickGuidePanels index={2}>
					<Panel>I gots contents</Panel>
					<Panel>I gots contents2</Panel>
					<Panel>Last!</Panel>
				</QuickGuidePanels>
			);

			const buttons = screen.getAllByRole('button');

			const expected = 2;
			const actual = buttons.length;

			expect(actual).toBe(expected);
			expect(buttons[0]).toHaveAttribute('aria-label', 'Exit Quick Guide');
			expect(buttons[1]).toHaveAttribute('aria-label', 'Previous');
		}
	);

	test(
		'should hide previous button on the first view',
		async () => {
			render(
				<QuickGuidePanels index={0}>
					<Panel>I gots contents</Panel>
					<Panel>I gots contents2</Panel>
					<Panel>Last!</Panel>
				</QuickGuidePanels>
			);

			const buttons = screen.getAllByRole('button');

			const expected = 2;
			const actual = buttons.length;

			expect(actual).toBe(expected);
			expect(buttons[0]).toHaveAttribute('aria-label', 'Exit Quick Guide');
			expect(buttons[1]).toHaveAttribute('aria-label', 'Next');
		}
	);

	test(
		'should show next button on the first view',
		async () => {
			render(
				<QuickGuidePanels index={0}>
					<Panel>I gots contents</Panel>
					<Panel>I gots contents2</Panel>
					<Panel>Last!</Panel>
				</QuickGuidePanels>
			);

			const nextButton = screen.getByLabelText('Next');

			await waitFor(() => {
				expect(nextButton).toBeInTheDocument();
			});
		}
	);

	test(
		'should fire onWillTransition with target index and type',
		async () => {
			const spy = jest.fn();
			let index = 0;
			const {rerender} = render(
				<QuickGuidePanels index={index} onWillTransition={spy} noAnimation>
					<Panel>I gots contents</Panel>
					<Panel>I gots contents2</Panel>
				</QuickGuidePanels>
			);

			spy.mockClear();
			index++;

			rerender(
				<QuickGuidePanels index={index} onWillTransition={spy} noAnimation>
					<Panel>I gots contents</Panel>
					<Panel>I gots contents2</Panel>
				</QuickGuidePanels>
			);

			const expected = {index, type: 'onWillTransition'};
			const actual = spy.mock.calls.length && spy.mock.calls[0][0];

			await waitFor(() => {
				expect(actual).toMatchObject(expected);
			});
		}
	);

	test(
		'should fire onTransition with target index and type',
		async () => {
			const spy = jest.fn();
			let index = 0;
			const {rerender} = render(
				<QuickGuidePanels index={index} onTransition={spy} noAnimation>
					<Panel>I gots contents</Panel>
					<Panel>I gots contents2</Panel>
				</QuickGuidePanels>
			);

			spy.mockClear();
			index++;

			rerender(
				<QuickGuidePanels index={index} onTransition={spy} noAnimation>
					<Panel>I gots contents</Panel>
					<Panel>I gots contents2</Panel>
				</QuickGuidePanels>
			);

			const expected = {index, type: 'onTransition'};
			const actual = spy.mock.calls.length && spy.mock.calls[0][0];

			await waitFor(() => {
				expect(actual).toMatchObject(expected);
			});
		}
	);

	test(
		'should fire `onNextClick` and `onChange` with type when go to the next panel',
		async () => {
			const handleChange = jest.fn();
			const handleNextClick = jest.fn();
			const user = userEvent.setup();

			render(
				<QuickGuidePanels index={1} onChange={handleChange} onNextClick={handleNextClick}>
					<Panel />
					<Panel />
					<Panel />
				</QuickGuidePanels>
			);

			const nextButton = screen.getByLabelText('Next');
			const expected = {type: 'onNextClick'};

			await user.click(nextButton);

			await waitFor(() => {
				expect(handleChange).toBeCalledWith({index: 2, type: 'onChange'});
			});
			await waitFor(() => {
				const actual = handleNextClick.mock.calls.length && handleNextClick.mock.calls[0][0];

				expect(actual).toMatchObject(expected);
			});
		}
	);

	test(
		'should fire `onPrevClick` and `onChange` with type when go to the previous panel',
		async () => {
			const handleChange = jest.fn();
			const handlePrevClick = jest.fn();
			const user = userEvent.setup();

			render(
				<QuickGuidePanels index={2} onChange={handleChange} onPrevClick={handlePrevClick}>
					<Panel />
					<Panel />
					<Panel />
				</QuickGuidePanels>
			);

			const prevButton = screen.getByLabelText('Previous');
			const expected = {type: 'onPrevClick'};

			await user.click(prevButton);

			await waitFor(() => {
				expect(handleChange).toBeCalledWith({index: 1, type: 'onChange'});
			});
			await waitFor(() => {
				const actual = handlePrevClick.mock.calls.length && handlePrevClick.mock.calls[0][0];

				expect(actual).toMatchObject(expected);
			});
		}
	);

	test(
		'should return a ref to the root Panel node',
		() => {
			const ref = jest.fn();
			render(
				<QuickGuidePanels ref={ref}>
					<Panel />
				</QuickGuidePanels>
			);

			const expected = 'ARTICLE';
			const actual = ref.mock.calls[0][0].nodeName;

			expect(actual).toBe(expected);
		}
	);

	test(
		'should fire `onClose` when close button is clicked',
		async () => {
			const handleClose = jest.fn();
			const user = userEvent.setup();

			render(
				<QuickGuidePanels onClose={handleClose}>
					<Panel />
				</QuickGuidePanels>
			);

			const closeButton = screen.getByLabelText('Exit Quick Guide');
			const expected = {type: 'onClose'};

			await user.click(closeButton);

			await waitFor(() => {
				const actual = handleClose.mock.calls.length && handleClose.mock.calls[0][0];

				expect(actual).toMatchObject(expected);
			});
		}
	);
});