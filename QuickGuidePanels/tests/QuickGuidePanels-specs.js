import Spotlight from '@enact/spotlight';
import '@testing-library/jest-dom';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {Panel as QuickGuidePanel, QuickGuidePanels} from '../';

describe('QuickGuidePanels Specs', () => {
	test(
		'should hide next button on the last view',
		() => {
			render(
				<QuickGuidePanels index={2}>
					<QuickGuidePanel>I got contents</QuickGuidePanel>
					<QuickGuidePanel>I got contents2</QuickGuidePanel>
					<QuickGuidePanel>Last!</QuickGuidePanel>
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
					<QuickGuidePanel>I got contents</QuickGuidePanel>
					<QuickGuidePanel>I got contents2</QuickGuidePanel>
					<QuickGuidePanel>Last!</QuickGuidePanel>
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
					<QuickGuidePanel>I got contents</QuickGuidePanel>
					<QuickGuidePanel>I got contents2</QuickGuidePanel>
					<QuickGuidePanel>Last!</QuickGuidePanel>
				</QuickGuidePanels>
			);

			const nextButton = screen.getByLabelText('Next');

			await waitFor(() => {
				expect(nextButton).toBeInTheDocument();
			});
		}
	);

	test(
		'should fire `onWillTransition` with target index and type in pointer mode',
		async () => {
			const spy = jest.fn();
			let index = 0;
			const {rerender} = render(
				<QuickGuidePanels index={index} onWillTransition={spy}>
					<QuickGuidePanel>I got contents</QuickGuidePanel>
					<QuickGuidePanel>I got contents2</QuickGuidePanel>
				</QuickGuidePanels>
			);

			spy.mockClear();
			index++;

			rerender(
				<QuickGuidePanels index={index} onWillTransition={spy}>
					<QuickGuidePanel>I got contents</QuickGuidePanel>
					<QuickGuidePanel>I got contents2</QuickGuidePanel>
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
		'should fire `onWillTransition` with target index and type in 5-way mode',
		async () => {
			Spotlight.setPointerMode(false);
			const spy = jest.fn();
			let index = 0;
			const {rerender} = render(
				<QuickGuidePanels index={index} onWillTransition={spy}>
					<QuickGuidePanel>I got contents</QuickGuidePanel>
					<QuickGuidePanel>I got contents2</QuickGuidePanel>
					<QuickGuidePanel>I got contents3</QuickGuidePanel>
				</QuickGuidePanels>
			);

			spy.mockClear();
			const nextButton = screen.getByLabelText('Next');
			Spotlight.focus(nextButton);
			index++;

			rerender(
				<QuickGuidePanels index={index} onWillTransition={spy}>
					<QuickGuidePanel>I got contents</QuickGuidePanel>
					<QuickGuidePanel>I got contents2</QuickGuidePanel>
					<QuickGuidePanel>I got contents3</QuickGuidePanel>
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
		'should fire `onTransition` with target index and type',
		async () => {
			const spy = jest.fn();
			let index = 0;
			const {rerender} = render(
				<QuickGuidePanels index={index} onTransition={spy}>
					<QuickGuidePanel>I got contents</QuickGuidePanel>
					<QuickGuidePanel>I got contents2</QuickGuidePanel>
				</QuickGuidePanels>
			);

			spy.mockClear();
			index++;

			rerender(
				<QuickGuidePanels index={index} onTransition={spy}>
					<QuickGuidePanel>I got contents</QuickGuidePanel>
					<QuickGuidePanel>I got contents2</QuickGuidePanel>
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
					<QuickGuidePanel />
					<QuickGuidePanel />
					<QuickGuidePanel />
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
					<QuickGuidePanel />
					<QuickGuidePanel />
					<QuickGuidePanel />
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
					<QuickGuidePanel />
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
					<QuickGuidePanel />
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
