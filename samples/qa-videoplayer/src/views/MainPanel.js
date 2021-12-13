import Button from '@enact/sandstone/Button';
import kind from '@enact/core/kind';
import {Component} from 'react';
import VideoPlayer from '@enact/sandstone/VideoPlayer';
import {MediaControls} from '@enact/sandstone/MediaPlayer';

const SelectableVideoPlayer = class extends Component {

	static displayName = 'SelectableVideoPlayer';

	state = {
		selection: []
	};

	handleToggleSelection = () => {
		const {selection} = this.state;
		const {currentTime} = this.video.getMediaState();

		if (selection.length !== 1) {
			this.setState({
				selection: [currentTime]
			});
		} else {
			this.setState({
				selection: [selection[0], currentTime].sort((a, b) => a - b)
			});
		}
	};

	handleTimeUpdate = () => {
		const {selection} = this.state;

		if (selection.length === 2) {
			const [selectionStart, selectionEnd] = selection;
			const {currentTime} = this.video.getMediaState();

			if (currentTime > selectionEnd || currentTime < selectionStart) {
				// Seek to starting position if current time is out of selection during playback
				this.video.seek(selectionStart);
			}
		}
	};

	handleSeekOutsideSelection = (ev) => {
		// prevent the action and seek to the beginning or end
		const {selection} = this.state;
		ev.preventDefault();

		if (selection.length === 2) {
			const [selectionStart, selectionEnd] = selection;
			const {time: currentTime} = ev;

			// Seek to nearest selection position among starting and ending if current time is out of selection
			if (currentTime < selectionStart) {
				this.video.seek(selectionStart);
			} else if (currentTime > selectionEnd) {
				// If a video is playing, position will be moved to starting point by handleTimeUpdate().
				// If a video is paused, position will remain at ending position.
				this.video.seek(selectionEnd);
			}
		}
	};

	setVideo = (video) => {
		this.video = video;
	};

	render () {
		const {selection} = this.state;
		const selecting = selection.length === 1;

		return (
			<VideoPlayer
				{...this.props}
				loop
				onSeekOutsideSelection={this.handleSeekOutsideSelection}
				onTimeUpdate={this.handleTimeUpdate}
				selection={selection}
				ref={this.setVideo}
			>
				<MediaControls>
					<Button onTap={this.handleToggleSelection} selected={selecting}>{selecting ? 'Play Loop' : 'Set End Time'}</Button>
				</MediaControls>
				<source src="http://media.w3.org/2010/05/video/movie_300.mp4" />
			</VideoPlayer>
		);
	}
};

const MainPanel = kind({
	name: 'MainPanel',

	render: () => (
		<SelectableVideoPlayer />
	)
});

export default MainPanel;
