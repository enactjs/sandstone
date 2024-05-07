import '@testing-library/jest-dom';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {PageViews, Page} from '../';

describe('PageViews Specs', () => {
	test(
		'should show next button and hide previous button on the first page',
		() => {
			render(
				<PageViews index={0}>
					<Page>I gots contents</Page>
					<Page>I gots contents</Page>
				</PageViews>
			);

			const nextButton = screen.getByLabelText('Next');
			const prevButton = screen.queryByLabelText('Previous');

			expect(nextButton).toBeInTheDocument();
			expect(prevButton).toBeNull();
		}
	);

	test(
		'should show previous button and hide next button on the last page',
		() => {
			render(
				<PageViews index={1}>
					<Page>I gots contents</Page>
					<Page>I gots contents</Page>
				</PageViews>
			);

			const prevButton = screen.getByLabelText('Previous');
			const nextButton = screen.queryByLabelText('Next');

			expect(prevButton).toBeInTheDocument();
			expect(nextButton).toBeNull();
		}
	);

	test(
		'should fire onTransition with target index and type',
		async () => {
			const spy = jest.fn();
			let index = 0;
			const {rerender} = render(
				<PageViews index={index} onTransition={spy} noAnimation>
					<Page>I gots contents</Page>
					<Page>I gots contents2</Page>
				</PageViews>
			);

			spy.mockClear();
			index++;

			rerender(
				<PageViews index={index} onTransition={spy} noAnimation>
					<Page>I gots contents</Page>
					<Page>I gots contents2</Page>
				</PageViews>
			);

			const expected = {index, type: 'onTransition'};
			const actual = spy.mock.calls.length && spy.mock.calls[0][0];

			await waitFor(() => {
				expect(actual).toMatchObject(expected);
			});
		}
	);

	test(
		'should fire onWillTransition with target index and type',
		async () => {
			const spy = jest.fn();
			let index = 0;
			const {rerender} = render(
				<PageViews index={index} onWillTransition={spy} noAnimation>
					<Page>I gots contents</Page>
					<Page>I gots contents2</Page>
				</PageViews>
			);

			spy.mockClear();
			index++;

			rerender(
				<PageViews index={index} onWillTransition={spy} noAnimation>
					<Page>I gots contents</Page>
					<Page>I gots contents2</Page>
				</PageViews>
			);

			const expected = {index, type: 'onWillTransition'};
			const actual = spy.mock.calls.length && spy.mock.calls[0][0];

			await waitFor(() => {
				expect(actual).toMatchObject(expected);
			});
		}
	);

	test(
		'should fire `onNextClick` and `onChange` with type when go to the next page',
		async () => {
			const handleChange = jest.fn();
			const handleNextClick = jest.fn();
			const user = userEvent.setup();

			render(
				<PageViews index={1} onChange={handleChange} onNextClick={handleNextClick}>
					<Page />
					<Page />
					<Page />
				</PageViews>
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
		'should fire `onPrevClick` and `onChange` with type when go to the previous page',
		async () => {
			const handleChange = jest.fn();
			const handlePrevClick = jest.fn();
			const user = userEvent.setup();

			render(
				<PageViews index={2} onChange={handleChange} onPrevClick={handlePrevClick}>
					<Page />
					<Page />
					<Page />
				</PageViews>
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
		'should show steps if `pageIndicatorType` is "dot" and total pages are more than one',
		() => {
			render(
				<PageViews total={2} pageIndicatorType="dot">
					<Page />
					<Page />
				</PageViews>
			);

			const steps = screen.getByRole('list');
			expect(steps).toBeInTheDocument();
		}
	);

	test(
		'should not show steps if `pageIndicatorType` is "dot" and total page is one',
		() => {
			render(
				<PageViews total={1} pageIndicatorType="dot">
					<Page />
				</PageViews>
			);

			const steps = screen.queryByRole('list');
			expect(steps).toBeNull();
		}
	);

	test(
		'should show steps if `pageIndicatorType` is "number" and total pages are more than one',
		() => {
			const total = 2;
			render(
				<PageViews total={total} pageIndicatorType="number">
					<Page />
					<Page />
				</PageViews>
			);

			const pageNumber = screen.getByText(1);
			const separator = screen.getByText('/');
			const totalNumber = screen.getByText(total);
			expect(pageNumber).toBeInTheDocument();
			expect(separator).toBeInTheDocument();
			expect(totalNumber).toBeInTheDocument();
		}
	);

	test(
		'should show steps if `pageIndicatorType` is "number" and total page is one',
		() => {
			const total = 1;
			render(
				<PageViews total={total} pageIndicatorType="number">
					<Page />
				</PageViews>
			);

			const pageNumber = screen.getAllByText(1)[0];
			const separator = screen.getByText('/');
			const totalNumber = screen.getAllByText(total)[1];
			expect(pageNumber).toBeInTheDocument();
			expect(separator).toBeInTheDocument();
			expect(totalNumber).toBeInTheDocument();
		}
	);
});
