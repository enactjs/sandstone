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
				selection: [currentTime],
				selecting: true
			});
		} else {
			this.setState({
				selection: [selection[0], currentTime].sort((a, b) => a - b),
				selecting: false
			});
		}
	};

	handleTimeUpdate = () => {
		const {selecting, selection} = this.state;
		const {currentTime} = this.video.getMediaState();

		if (!selecting && selection.length === 2) {
			const [selectionStart, selectionEnd] = selection;

			if (currentTime > selectionEnd || currentTime < selectionStart) {
				// seek to start
				this.video.seek(selectionStart);

				// ... or pause() and lock at end
				// this.video.pause();
				// this.video.seek(selectionEnd);
			}
		}
	};

	handleSeekOutsideSelection = (ev) => {

		// prevent the action and seek to the beginning or end
		const {selecting, selection} = this.state;
		const [selectionStart, selectionEnd] = selection;
		ev.preventDefault();

		if (!selecting) {
			if (ev.time < selectionStart) {
				// this.video.pause();
				this.video.seek(selectionStart);
			} else if (ev.time > selectionEnd) {
				// this.video.pause();
				this.video.seek(selectionEnd);
			}

			// or remove the selection and allow the default behavior
			// this.setState({
			// 	selection: []
			// });
		}
	};

	setVideo = (video) => {
		this.video = video;
	};

	render () {
		const {selecting} = this.state;

		return (
			<VideoPlayer
				{...this.props}
				loop
				onSeekOutsideSelection={this.handleSeekOutsideSelection}
				onTimeUpdate={this.handleTimeUpdate}
				selection={this.state.selection}
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
