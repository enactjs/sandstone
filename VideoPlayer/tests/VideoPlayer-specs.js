import '@testing-library/jest-dom';
import {act, createEvent, fireEvent, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import VideoPlayer from '../VideoPlayer';

const focus = (slider) => fireEvent.focus(slider);
const keyDown = (keyCode) => (button) => fireEvent.keyDown(button, {keyCode});
const downKeyDown = keyDown(40);

describe('VideoPlayer', () => {
	test('should fire `onPlaying` with `playing` type when playing event is fired', () => {
		const handlePlaying = jest.fn();

		render(
			<VideoPlayer data-testid="videoplayer-id" onPlaying={handlePlaying} />
		);

		const video = screen.getByTestId('videoplayer-id');

		const playingEvent = createEvent('playing', video);
		fireEvent(video, playingEvent);

		const expected = {type: 'playing'};
		const actual = handlePlaying.mock.calls.length && handlePlaying.mock.calls[0][0];

		expect(actual).toMatchObject(expected);
	});
	test('should fire `onControlsAvailable` with `onControlsAvailable` type when screen clicked', () => {
		const handleControlsAvailable = jest.fn();
		const selectTime = [0, 1];

		render(
			<VideoPlayer data-testid="videoplayer-id" onControlsAvailable={handleControlsAvailable} selection={selectTime}/>
		);

		const overlay = screen.getByTestId('videoplayer-id').nextElementSibling;
		userEvent.click(overlay);

		const slider = screen.getByRole('slider', {hidden: true});  // add to increase code coverage
		focus(slider);

		const expected = {type: 'onControlsAvailable'};
		const actual = handleControlsAvailable.mock.calls.length && handleControlsAvailable.mock.calls[0][0];

		expect(actual).toMatchObject(expected);


	});
	test('should not to show media slider when noslider is true', async () => {
		render(
			<VideoPlayer data-testid="videoplayer-id" noSlider />
		);

		const overlay = screen.getByTestId('videoplayer-id').nextElementSibling;
		userEvent.click(overlay);

		await screen.findByLabelText('go to previous');

		const slider = screen.queryByRole('slider', {hidden: true});
		expect(slider).toBeNull();
	});
	test('should fire `onBack` with `onBack` type when clicking on back button', async () => {
		const handleBack = jest.fn();

		render(
			<VideoPlayer data-testid="videoplayer-id" onBack={handleBack} />
		);

		const overlay = screen.getByTestId('videoplayer-id').nextElementSibling;
		userEvent.click(overlay);

		const expected = {type: 'onBack'};

		await screen.findByLabelText('go to previous');

		userEvent.click(screen.getByLabelText('go to previous'));

		const actual = handleBack.mock.calls.length && handleBack.mock.calls[0][0];
		expect(actual).toMatchObject(expected);
	});
	test('should toggle to show the media control', async () => {
		render(
			<VideoPlayer data-testid="videoplayer-id" />
		);

		const overlay = screen.getByTestId('videoplayer-id').nextElementSibling;
		userEvent.click(overlay);

		await screen.findByLabelText('go to previous');
		userEvent.click(overlay);

		const backButton  = screen.queryByLabelText('go to previous');
		expect(backButton).toBeNull();
	});
	test('should not to show the media control when disable is true', () => {
		render(
			<VideoPlayer data-testid="videoplayer-id" disabled />
		);

		const overlay = screen.getByTestId('videoplayer-id').nextElementSibling;
		userEvent.click(overlay);

		const backButton  = screen.queryByLabelText('go to previous');
		expect(backButton).toBeNull();
	});
	test('should not to show the media control after the delay', () => {
		jest.useFakeTimers();
		const timeout = 100;
		render(
			<VideoPlayer data-testid="videoplayer-id" autoCloseTimeout={timeout} />
		);

		const overlay = screen.getByTestId('videoplayer-id').nextElementSibling;
		userEvent.click(overlay);

		act(() => jest.advanceTimersByTime(150));

		const backButton  = screen.queryByLabelText('go to previous');
		expect(backButton).toBeNull();

		jest.useRealTimers();
	});
	test('should fire `onToggleMore` with `onToggleMore` type when downkey pressed during pause button focus', async () => {
		const handleToggleMore = jest.fn();

		render(
			<VideoPlayer data-testid="videoplayer-id" onToggleMore={handleToggleMore} />
		);

		const overlay = screen.getByTestId('videoplayer-id').nextElementSibling;

		userEvent.click(overlay);

		await screen.findByLabelText('go to previous');

		const pauseButton = screen.getByLabelText('Pause');
		const expected = {type: 'onToggleMore'};

		downKeyDown(pauseButton);

		await waitFor(() => {
			const actual = handleToggleMore.mock.calls.length && handleToggleMore.mock.calls[0][0];
			expect(actual).toMatchObject(expected);
		});
	});
});
