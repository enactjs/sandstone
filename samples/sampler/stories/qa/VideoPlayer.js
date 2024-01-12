import Button from '@enact/sandstone/Button';
import {MediaControls} from '@enact/sandstone/MediaPlayer';
import VideoPlayer, {Video} from '@enact/sandstone/VideoPlayer';
import {select} from '@enact/storybook-utils/addons/controls';
import Popup from '@enact/sandstone/Popup';
import PropTypes from 'prop-types';
import {Component} from 'react';

const videoPlayerOption =  [
	'',
	'Next Preload Video',
	'Next Preload Video without changing preload',
	'Non Preload Video',
	'Change Preload without changing video',
	'Reset Sources'
];

const videoTabLabel = 'VideoPlayer';

class VideoSourceSwap extends Component {
	constructor (props) {
		super(props);

		this.state = {
			videoTitles: ['Big Buck Bunny', 'Sintel', 'VideoTest'],
			playlist: [
				'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
				'http://media.w3.org/2010/05/sintel/trailer.mp4',
				'http://media.w3.org/2010/05/video/movie_300.mp4'
			],
			cursor: 0,
			preloadCursor: 1
		};
		this.lastIndex = this.state.playlist.length - 1;
	}

	componentDidUpdate (prevProps) {
		const option = this.props.args['videoPlayerOption'];

		if (option !== prevProps.args.videoPlayerOption) {
			if (option === 'Next Preload Video') {
				this.nextVideo();
			} else if (option === 'Non Preload Video') {
				this.differentVideo();
			} else if (option === 'Next Preload Video without changing preload') {
				this.nextVideoKeepPreload();
			} else if (option === 'Change Preload without changing video') {
				this.nextPreloadVideoKeepVideo();
			} else if (option === 'Reset Sources') {
				this.resetSources();
			}
		}
	}

	nextVideo = () => {
		this.setState(({cursor, preloadCursor}) => ({
			cursor: cursor === this.lastIndex ? 0 : cursor + 1,
			preloadCursor: preloadCursor === this.lastIndex ? 0 : preloadCursor + 1
		}));
	};

	differentVideo = () => {
		this.setState(({cursor, playlist, preloadCursor}) => ({
			cursor: (cursor + 2) % playlist.length,
			preloadCursor: (preloadCursor + 2) % playlist.length
		}));
	};

	nextVideoKeepPreload = () => {
		this.setState(({cursor}) => ({
			cursor: cursor === this.lastIndex ? 0 : cursor + 1
		}));
	};

	nextPreloadVideoKeepVideo = () => {
		this.setState(({preloadCursor}) => ({
			preloadCursor: preloadCursor === this.lastIndex ? 0 : preloadCursor + 1
		}));
	};

	resetSources = () => {
		this.setState({
			cursor: 0,
			preloadCursor: 1
		});
	};

	render () {
		return (
			<div>
				<VideoPlayer
					muted
					onJumpBackward={this.differentVideo}
					onJumpForward={this.nextVideo}
					title={this.state.videoTitles[this.state.cursor]}
				>
					<Video>
						<source src={this.state.playlist[this.state.cursor]} />
						<source src={this.state.playlist[this.state.preloadCursor]} slot="preloadSource" />
					</Video>
					<infoComponents>
						A video about some things happening to and around some characters. Very exciting stuff.
					</infoComponents>
				</VideoPlayer>
			</div>
		);
	}
}

export default {
	title: 'Sandstone/VideoPlayer',
	component: 'VideoPlayer'
};

VideoSourceSwap.propTypes = {
	args: PropTypes.object
};

export const PreloadVideos = (args) => <VideoSourceSwap args={args} />;

select('videoPlayerOption', PreloadVideos, videoPlayerOption, videoTabLabel, '');

PreloadVideos.storyName = 'Preload Videos';

class VideoPlayerWithfastForwardMode extends Component {
	constructor (props) {
		super(props);
	}

	setVideoPlayer = (node) => {
		this.videoPlayer = node;
	};

	fastforward = () => {
		this.videoPlayer.fastForward();
	};

	rewind = () => {
		this.videoPlayer.rewind();
	};

	render () {
		return (
			<div>
				<VideoPlayer
					feedbackHideDelay={0}
					muted
					playbackRateHash={{
						fastForward: [1.25, '3/2', '2', '2.5', '4', '8'],
						rewind: ['-2', '-4', '-8', '-16'],
						slowForward: ['1/4', '1/2'],
						slowRewind: ['-1/2', '-1']
					}}
					ref={this.setVideoPlayer}
					title={'Big Buck Bunny'}
				>
					<Video>
						<source src={'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'} />
					</Video>
					<MediaControls>
						<Button
							icon="backward"
							onClick={this.rewind}
						/>
						<Button
							icon="forward"
							onClick={this.fastforward}
						/>
					</MediaControls>
				</VideoPlayer>
			</div>
		);
	}
}

export const FastForwardWithVariousPlaybackRates = () => <VideoPlayerWithfastForwardMode />;

FastForwardWithVariousPlaybackRates.storyName = 'Fastforward with various playback rates';
FastForwardWithVariousPlaybackRates.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

class VideoPlayerWithLayer extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<div>
				<VideoPlayer
					feedbackHideDelay={0}
					muted
					title={'Big Buck Bunny'}
				>
					<Video>
						<source src={'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'} />
					</Video>
				</VideoPlayer>
				<div style={{left: 0, top: 0, bottom: 0, width: 500, backgroundColor: "green", position: "absolute"}}>{"screen saver"}</div>
			</div>
		);
	}
}

export const ShowBackbutton = () => <VideoPlayerWithLayer />;

ShowBackbutton.storyName = 'Show a back button and a control panel';
class VideoPlayerWithExpandedMediaControls extends Component {
	constructor (props) {
		super(props);
		this.state = {
			openExtention: false,
			openSelectingPlayback: false,
			selectedSpeed: 1
		};
		this.playbackSpeedArray = [0.25, 0.75, 1, 1.25, 2];
	}

	componentDidUpdate (_, prevState) {
		if (prevState.selectedSpeed !== this.state.selectedSpeed) {
			this.videoPlayer.setPlaybackSpeed(this.state.selectedSpeed);
		}
	}

	setVideoPlayer = (node) => {
		this.videoPlayer = node;
	};

	handleMoreButton = () => {
		this.setState(({openExtention}) => ({
			openExtention: !openExtention
		}));
	};

	handlePlaySpeedButton = () => {
		this.setState(({openSelectingPlayback}) => ({
			openSelectingPlayback: !openSelectingPlayback
		}));
	};

	handleClickSpeed = (speed) => {
		this.setState({openSelectingPlayback: false, selectedSpeed: speed});
	};

	render () {
		return (
			<div>
				<VideoPlayer
					feedbackHideDelay={0}
					muted
					ref={this.setVideoPlayer}
					title="Sintel"
				>
					<Video>
						<source src="http://media.w3.org/2010/05/sintel/trailer.mp4" />
					</Video>
					<MediaControls>
						<Button
							icon="list"
							onClick={this.handleMoreButton}
						/>
						{this.state.openExtention &&
						<Button
							icon="playspeed"
							onClick={this.handlePlaySpeedButton}
						/>}
						<Popup open={this.state.openSelectingPlayback} position="bottom">
							<div> Select Playback Speed </div>
							<br />
							<div>
								{this.playbackSpeedArray.map((speed) => (
									<Button onClick={() => this.handleClickSpeed(speed)}>{speed}</Button>
								))}
							</div>
						</Popup>
					</MediaControls>
				</VideoPlayer>
			</div>
		);
	}
}

export const WithExpandedMediaControls = () => <VideoPlayerWithExpandedMediaControls />;

WithExpandedMediaControls.storyName = 'with expanded media controls';
