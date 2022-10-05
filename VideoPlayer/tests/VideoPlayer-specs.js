/* global HTMLMediaElement */

import '@testing-library/jest-dom';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import VideoPlayer from '../VideoPlayer';

const keyDown = (keyCode) => (button) => fireEvent.keyDown(button, {keyCode});
const downKeyDown = keyDown(40);

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

			render(
				<VideoPlayer data-testid="videoplayer-id" onControlsAvailable={handleControlsAvailable} />
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
		test('should fire `onToggleMore` with `onToggleMore` type when downkey pressed during pause button focus', async () => {
			const handleToggleMore = jest.fn();

			render(
				<VideoPlayer data-testid="videoplayer-id" backButtonAriaLabel="go to previous" onToggleMore={handleToggleMore} />
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
});
