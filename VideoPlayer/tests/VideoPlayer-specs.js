import '@testing-library/jest-dom';
import {act, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import VideoPlayer from '../VideoPlayer';
import {Button} from '../../Button';
import {MediaControls} from '../../MediaPlayer';

describe('VideoPlayer', () => {
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

	test('should fire `onToggleMore` with `onToggleMore` type when ActionGide button clicked', async () => {
		const handleToggleMore = jest.fn();

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

		userEvent.click(overlay);

		await screen.findByLabelText('go to previous');

		const actionGuideButton = screen.getByLabelText('This is ActionGide button');
		const expected = {type: 'onToggleMore'};

		userEvent.click(actionGuideButton);

		await waitFor(() => {
			const actual = handleToggleMore.mock.calls.length && handleToggleMore.mock.calls[0][0];
			expect(actual).toMatchObject(expected);
		});
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

	test('should not to show the title after the delay', () => {
		jest.useFakeTimers();
		const timeout = 100;
		render(
			<VideoPlayer data-testid="videoplayer-id" title="Video Test" titleHideDelay={timeout} />
		);

		const overlay = screen.getByTestId('videoplayer-id').nextElementSibling;
		userEvent.click(overlay);

		const titleFrame = screen.getByText('Video Test').parentElement.parentElement.parentElement;

		expect(titleFrame).toHaveClass('visible');

		act(() => jest.advanceTimersByTime(150));

		expect(titleFrame).toHaveClass('hidden');

		jest.useRealTimers();
	});
});
