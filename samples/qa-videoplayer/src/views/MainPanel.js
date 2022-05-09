import kind from '@enact/core/kind';
import Button from '@enact/sandstone/Button';
import {MediaControls} from '@enact/sandstone/MediaPlayer';
import VideoPlayer from '@enact/sandstone/VideoPlayer';
import {useCallback, useRef, useState} from 'react';

const SelectableVideoPlayer = (props) => {
	const videoRef = useRef(null);

	const [selection, setSelection] = useState([]);

	const handleToggleSelection = useCallback(() => {
		const {currentTime} = videoRef.current.getMediaState();

		if (selection.length !== 1) {
			setSelection([currentTime]);
		} else {
			setSelection([selection[0], currentTime].sort((a, b) => a - b));
		}
	}, [selection]);

	const handleTimeUpdate = useCallback(() => {
		if (selection.length === 2) {
			const [selectionStart, selectionEnd] = selection;
			const {currentTime} = videoRef.current.getMediaState();

			if (currentTime > selectionEnd || currentTime < selectionStart) {
				// Seek to starting position if current time is out of selection during playback
				videoRef.current.seek(selectionStart);
			}
		}
	}, [selection]);

	const handleSeekOutsideSelection = useCallback((ev) => {
		// prevent the action and seek to the beginning or end
		ev.preventDefault();

		if (selection.length === 2) {
			const [selectionStart, selectionEnd] = selection;
			const {time: currentTime} = ev;

			// Seek to nearest selection position among starting and ending if current time is out of selection
			if (currentTime < selectionStart) {
				videoRef.current.seek(selectionStart);
			} else if (currentTime > selectionEnd) {
				// If a video is playing, position will be moved to starting point by handleTimeUpdate().
				// If a video is paused, position will remain at ending position.
				videoRef.current.seek(selectionEnd);
			}
		}
	}, [selection]);

	const setVideo = (video) => {
		videoRef.current = video;
	};

	const selecting = selection.length === 1;

	return (
		<VideoPlayer
			{...props}
			loop
			onSeekOutsideSelection={handleSeekOutsideSelection}
			onTimeUpdate={handleTimeUpdate}
			selection={selection}
			ref={setVideo}
		>
			<MediaControls>
				<Button onClick={handleToggleSelection} selected={selecting}>{selecting ? 'Play Loop' : 'Set End Time'}</Button>
			</MediaControls>
			<source src="http://media.w3.org/2010/05/video/movie_300.mp4" />
		</VideoPlayer>
	);

};

const MainPanel = kind({
	name: 'MainPanel',

	render: () => (
		<SelectableVideoPlayer />
	)
});

export default MainPanel;
