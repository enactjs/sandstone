import '@testing-library/jest-dom';
import {act, createEvent, fireEvent, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import VideoPlayer from '../VideoPlayer';
import {Button} from '../../Button';
import {MediaControls} from '../../MediaPlayer';

const focus = (slider) => fireEvent.focus(slider);

const keyDown = (keyCode) => (elm) => fireEvent.keyDown(elm, {keyCode});
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

		render(
			<VideoPlayer data-testid="videoplayer-id" onControlsAvailable={handleControlsAvailable} />
		);

		const overlay = screen.getByTestId('videoplayer-id').nextElementSibling;
		downKeyDown(overlay);

		const slider = screen.getByRole('slider', {hidden: true});
		focus(slider); // add to increase code coverage

		const expected = {type: 'onControlsAvailable'};
		const actual = handleControlsAvailable.mock.calls.length && handleControlsAvailable.mock.calls[0][0];

		expect(actual).toMatchObject(expected);
	});

	test('should not to show media slider when noslider is true', async () => {
		const user = userEvent.setup();
		render(
			<VideoPlayer data-testid="videoplayer-id" noSlider />
		);

		const overlay = screen.getByTestId('videoplayer-id').nextElementSibling;
		await user.click(overlay);

		await screen.findByLabelText('go to previous');

		const slider = screen.queryByRole('slider', {hidden: true});
		expect(slider).toBeNull();
	});

	test('should fire `onBack` with `onBack` type when clicking on back button', async () => {
		const handleBack = jest.fn();
		const user = userEvent.setup();

		render(
			<VideoPlayer data-testid="videoplayer-id" onBack={handleBack} />
		);

		const overlay = screen.getByTestId('videoplayer-id').nextElementSibling;
		await user.click(overlay);

		const expected = {type: 'onBack'};

		await screen.findByLabelText('go to previous');

		await user.click(screen.getByLabelText('go to previous'));

		const actual = handleBack.mock.calls.length && handleBack.mock.calls[0][0];
		expect(actual).toMatchObject(expected);
	});

	test('should toggle to show the media control', async () => {
		const user = userEvent.setup();
		render(
			<VideoPlayer data-testid="videoplayer-id" />
		);

		const overlay = screen.getByTestId('videoplayer-id').nextElementSibling;
		await user.click(overlay);

		await screen.findByLabelText('go to previous');
		await user.click(overlay);

		const backButton  = screen.queryByLabelText('go to previous');
		expect(backButton).toBeNull();
	});

	test('should not to show the media control when disable is true', async () => {
		const user = userEvent.setup();
		render(
			<VideoPlayer data-testid="videoplayer-id" disabled />
		);

		const overlay = screen.getByTestId('videoplayer-id').nextElementSibling;
		await user.click(overlay);

		const backButton  = screen.queryByLabelText('go to previous');
		expect(backButton).toBeNull();
	});

	test('should fire `onToggleMore` with `onToggleMore` type when ActionGide button clicked', async () => {
		const handleToggleMore = jest.fn();
		const user = userEvent.setup();

		render(
			<VideoPlayer data-testid="videoplayer-id" onToggleMore={handleToggleMore}>
				<MediaControls
					actionGuideButtonAriaLabel="This is ActionGide button"
				>
					<Button size="small" icon="list" />
				</MediaControls>
			</VideoPlayer>
		);

		const overlay = screen.getByTestId('videoplayer-id').nextElementSibling;

		await user.click(overlay);

		await screen.findByLabelText('go to previous');

		const actionGuideButton = screen.getByLabelText('This is ActionGide button');
		const expected = {type: 'onToggleMore'};

		await user.click(actionGuideButton);

		await waitFor(() => {
			const actual = handleToggleMore.mock.calls.length && handleToggleMore.mock.calls[0][0];
			expect(actual).toMatchObject(expected);
		});
	});

	test('should not to show the media control after the delay', async () => {
		jest.useFakeTimers();
		const timeout = 100;
		const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
		render(
			<VideoPlayer data-testid="videoplayer-id" autoCloseTimeout={timeout} />
		);

		const overlay = screen.getByTestId('videoplayer-id').nextElementSibling;
		await user.click(overlay);

		act(() => jest.advanceTimersByTime(250));

		const backButton  = screen.queryByLabelText('go to previous');
		expect(backButton).toBeNull();

		jest.useRealTimers();
	});

	test('should not to show the title after the delay', async () => {
		jest.useFakeTimers();
		const timeout = 100;
		const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
		render(
			<VideoPlayer data-testid="videoplayer-id" title="Video Test" titleHideDelay={timeout} />
		);

		const overlay = screen.getByTestId('videoplayer-id').nextElementSibling;
		await user.click(overlay);

		const titleFrame = screen.getByText('Video Test').parentElement.parentElement.parentElement;

		expect(titleFrame).toHaveClass('visible');

		act(() => jest.advanceTimersByTime(250));

		expect(titleFrame).toHaveClass('hidden');

		jest.useRealTimers();
	});
});
