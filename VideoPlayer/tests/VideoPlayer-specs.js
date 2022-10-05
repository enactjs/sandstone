/* global HTMLMediaElement */

import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import VideoPlayer from '../VideoPlayer';
// import MediaControls from '../../MediaPlayer/MediaControls';
// import Button from '../../Button';

describe('VideoPlayer', () => {
	beforeEach(() => {
		jest.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => true);
	});

	afterEach(() => {
		HTMLMediaElement.prototype.load.mockRestore();
	});
	describe('handle event', () => {
		test('should fire `onControlsAvailable` with `onControlsAvailable` type when screen clicked', () => {
			const handleControlsAvailable = jest.fn();
			const handleToggleMore = jest.fn();

			render(
				<VideoPlayer data-testid="videoplayer-id" onControlsAvailable={handleControlsAvailable} onToggleMore={handleToggleMore} />
			);

			const overlay = screen.getByTestId('videoplayer-id').nextElementSibling;
			userEvent.click(overlay);

			const expected = {type: 'onControlsAvailable'};
			const actual = handleControlsAvailable.mock.calls.length && handleControlsAvailable.mock.calls[0][0];

			expect(actual).toMatchObject(expected);


		});
		test('should fire `onBack` with `onBack` type when back button clicked', async () => {
			const handleBack = jest.fn();

			render(
				<VideoPlayer data-testid="videoplayer-id" backButtonAriaLabel="go to previous" onBack={handleBack} />
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
				<VideoPlayer data-testid="videoplayer-id" backButtonAriaLabel="go to previous" />
			);

			const overlay = screen.getByTestId('videoplayer-id').nextElementSibling;
			userEvent.click(overlay);

			await screen.findByLabelText('go to previous');
			userEvent.click(overlay);

			const backButton  = screen.queryByLabelText('go to previous');
			expect(backButton).toBeNull();
		});
		/* test('should fire `onToggleMore` with `onToggleMore` type when downkey pressed during pause button focus', async () => {
			const handleToggleMore = jest.fn();
			const handleControlsAvailable = jest.fn();

			const timeOut = 10000000;
			render(
				<VideoPlayer data-testid="videoplayer-id" autoCloseTimeout={timeOut} title="Sandstone VideoPlayer" onControlsAvailable={handleControlsAvailable} onToggleMore={handleToggleMore}>
					<source src="http://media.w3.org/2010/05/video/movie_300.mp4" type="video/mp4" />
					<infoComponents>
						Information.
					</infoComponents>
					<MediaControls>
						<Button size="small" icon="list" />
					</MediaControls>
				</VideoPlayer>
			);

			const vp = screen.getByTestId('videoplayer-id').parentElement;
			// const video = screen.getByTestId('videoplayer-id');
			const overlay = screen.getByTestId('videoplayer-id').nextElementSibling;

			userEvent.click(overlay);

			await screen.findByLabelText('go to previous');

			const info = screen.getByText('Information.');
			expect(info).toHaveClass('hidden');

			expect(handleControlsAvailable).toBeCalled();

			const pauseButton = screen.getByLabelText('Pause');

			act(() => pauseButton.focus());

			fireEvent.keyDown(pauseButton, {which: 40, keyCode: 40, code: 40});
			fireEvent.keyDown(vp, {which: 40, keyCode: 40, code: 40});
			fireEvent.keyDown(overlay, {which: 40, keyCode: 40, code: 40});

			expect(handleToggleMore).toBeCalled();
		}); */
	});
});
