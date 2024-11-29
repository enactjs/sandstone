import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {FlexiblePopupPanels, Panel} from '../';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('FlexiblePopupPanels Specs', () => {
	test('should hide previous and next buttons when there is only one panel', () => {
		render(
			<FloatingLayerController>
				<FlexiblePopupPanels open>
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const actual = screen.queryByRole('button');

		expect(actual).toBeNull();
	});

	test('should show previous and next buttons when there is more than one panel', () => {
		const {unmount} = render(
			<FloatingLayerController>
				<FlexiblePopupPanels open>
					<Panel />
					<Panel />
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const expected = 2;
		const actual = screen.getAllByRole('button').length;

		unmount();
		expect(actual).toBe(expected);
	});

	test('should show previous button when using `prevButton` on the only panel', () => {
		const {unmount} = render(
			<FloatingLayerController>
				<FlexiblePopupPanels open>
					<Panel prevButton />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const expected = 1;
		const actual = screen.getAllByRole('button').length;

		unmount();
		expect(actual).toBe(expected);
	});

	test('should show previous button when using `nextButton` on the only panel', () => {
		const {unmount} = render(
			<FloatingLayerController>
				<FlexiblePopupPanels open>
					<Panel nextButton />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const expected = 1;
		const actual = screen.getAllByRole('button').length;

		unmount();
		expect(actual).toBe(expected);
	});

	test('should hide previous button on all panels when `prevButtonVisibility` is set to "never"', () => {
		const {unmount} = render(
			<FloatingLayerController>
				<FlexiblePopupPanels prevButtonVisibility="never" open>
					<Panel />
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const expected = 1;
		const actual = screen.getAllByRole('button').length;

		unmount();
		expect(actual).toBe(expected);
	});

	test('should hide next button on all panels when `nextButtonVisibility` is set to "never"', () => {
		const {unmount} = render(
			<FloatingLayerController>
				<FlexiblePopupPanels nextButtonVisibility="never" open>
					<Panel />
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const expected = 1;
		const actual = screen.getAllByRole('button').length;

		unmount();
		expect(actual).toBe(expected);
	});

	test('should show previous button on the only panel when `prevButtonVisibility` set to "always"', () => {
		const {unmount} = render(
			<FloatingLayerController>
				<FlexiblePopupPanels prevButtonVisibility="always" open>
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const expected = 1;
		const actual = screen.getAllByRole('button').length;

		unmount();
		expect(actual).toBe(expected);
	});

	test('should show next button on the only panel when `nextButtonVisibility` set to "always"', () => {
		const {unmount} = render(
			<FloatingLayerController>
				<FlexiblePopupPanels nextButtonVisibility="always" open>
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const expected = 1;
		const actual = screen.getAllByRole('button').length;

		unmount();
		expect(actual).toBe(expected);
	});

	test('should hide previous button on panels that override using `prevButton={false}`', () => {
		const {unmount} = render(
			<FloatingLayerController>
				<FlexiblePopupPanels index={1} open>
					<Panel />
					<Panel prevButton={false} />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const expected = 1;
		const actual = screen.getAllByRole('button').length;

		unmount();
		expect(actual).toBe(expected);
	});

	test('should hide next button on panels that override using `nextButton={false}`', () => {
		const {unmount} = render(
			<FloatingLayerController>
				<FlexiblePopupPanels index={0} open>
					<Panel nextButton={false} />
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const expected = 1;
		const actual = screen.getAllByRole('button').length;

		unmount();
		expect(actual).toBe(expected);
	});

	test('should hide previous button when `prevButtonVisibility` prop is set to always and panel overrides using `prevButton={false}`', () => {
		const {unmount} = render(
			<FloatingLayerController>
				<FlexiblePopupPanels index={1} prevButtonVisibility="always" open>
					<Panel />
					<Panel prevButton={false} />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const expected = 1;
		const actual = screen.getAllByRole('button').length;

		unmount();
		expect(actual).toBe(expected);
	});

	test('should hide next button when `nextButtonVisibility` prop is set to always and panel overrides using `nextButton={false}`', () => {
		const {unmount} = render(
			<FloatingLayerController>
				<FlexiblePopupPanels index={0} nextButtonVisibility="always" open>
					<Panel nextButton={false} />
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const expected = 1;
		const actual = screen.getAllByRole('button').length;

		unmount();
		expect(actual).toBe(expected);
	});

	test('should fire `onNextClick` and `onChange` with each type in it when the next button is clicked', async () => {
		const handleNextClick = jest.fn();
		const handleChange = jest.fn();
		const user = userEvent.setup();

		render(
			<FloatingLayerController>
				<FlexiblePopupPanels open onNextClick={handleNextClick} onChange={handleChange}>
					<Panel />
					<Panel />
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		await user.click(screen.getByLabelText('Next'));

		const nextClickExpected = {type: 'onNextClick'};
		const changeExpected = {type: 'onChange'};

		await waitFor(() => {
			const nextClickActual = handleNextClick.mock.calls.length && handleNextClick.mock.calls[0][0];

			expect(nextClickActual).toMatchObject(nextClickExpected);
		});

		await waitFor(() => {
			const changeActual = handleChange.mock.calls.length && handleChange.mock.calls[0][0];

			expect(changeActual).toMatchObject(changeExpected);
		});
	});

	test('should fire `onPrevClick` with type `onPrevClick` when the previous button is clicked', async () => {
		const handlePrevClick = jest.fn();
		const user = userEvent.setup();

		render(
			<FloatingLayerController>
				<FlexiblePopupPanels open onPrevClick={handlePrevClick}>
					<Panel />
					<Panel />
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		await user.click(screen.getByLabelText('Previous'));

		const expected = {type: 'onPrevClick'};

		await waitFor(() => {
			const actual = handlePrevClick.mock.calls.length && handlePrevClick.mock.calls[0][0];

			expect(actual).toMatchObject(expected);
		});

	});

	test('should close on back key when on first panel', () => {
		const map = {};

		window.addEventListener = jest.fn((event, cb) => {
			map[event] = cb;
		});
		const spy = jest.fn();

		const {unmount} = render(
			<FloatingLayerController>
				<FlexiblePopupPanels index={0} onClose={spy} open>
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		map.keyup({type: 'keyup', currentTarget: window, keyCode: 27});

		const expectedEvent = {type: 'onClose'};
		const actualEvent = spy.mock.calls.length && spy.mock.calls[0][0];

		unmount();
		expect(spy).toHaveBeenCalled();
		expect(actualEvent).toMatchObject(expectedEvent);
	});

	test('should go back on back key when not on first panel', () => {
		const map = {};

		window.addEventListener = jest.fn((event, cb) => {
			map[event] = cb;
		});
		const spy = jest.fn();

		const {unmount} = render(
			<FloatingLayerController>
				<FlexiblePopupPanels index={1} onBack={spy} open>
					<Panel />
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		map.keyup({type: 'keyup', currentTarget: window, keyCode: 27});

		const expectedEvent = {type: 'onBack'};
		const actualEvent = spy.mock.calls.length && spy.mock.calls[0][0];

		unmount();
		expect(spy).toHaveBeenCalled();
		expect(actualEvent).toMatchObject(expectedEvent);
	});

	test('should correctly assign the fullHeight class', () => {
		render(
			<FloatingLayerController>
				<FlexiblePopupPanels data-testid="flexiblePopupPanels" fullHeight open>
					<Panel />
				</FlexiblePopupPanels>
			</FloatingLayerController>
		);

		const expected = 'fullHeight';
		const actual = screen.getByTestId('flexiblePopupPanels').parentElement.parentElement;

		expect(actual).toHaveClass(expected);
	});
});
