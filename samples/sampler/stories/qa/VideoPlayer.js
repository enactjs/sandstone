import Button from '@enact/sandstone/Button';
import {MediaControls} from '@enact/sandstone/MediaPlayer';
import VideoPlayer, {Video, VideoPlayerBase} from '@enact/sandstone/VideoPlayer';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {select, number} from '@enact/storybook-utils/addons/controls';
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
			videoTitles: ['Cosmos Laundromat', 'Sintel', 'VideoTest'],
			playlist: [
				'http://media.xiph.org/cosmoslaundromat/Pilot_Trailer_Cosmos_Laundromat.mp4',
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
					title={'Cosmos Laundromat'}
				>
					<Video>
						<source src={'http://media.xiph.org/cosmoslaundromat/Pilot_Trailer_Cosmos_Laundromat.mp4'} />
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
					title={'Cosmos Laundromat'}
				>
					<Video>
						<source src={'http://media.xiph.org/cosmoslaundromat/Pilot_Trailer_Cosmos_Laundromat.mp4'} />
					</Video>
				</VideoPlayer>
				<div style={{left: 0, top: 0, bottom: 0, width: 500, backgroundColor: "green", position: "absolute"}}>{"screen saver"}</div>
			</div>
		);
	}
}

export const ShowBackbutton = () => <VideoPlayerWithLayer />;

ShowBackbutton.storyName = 'Show a back button and a control panel';

const Config = mergeComponentMetadata('VideoPlayer', VideoPlayerBase, VideoPlayer);

class VideoPlayerWithExpandedMediaControls extends Component {
	constructor (props) {
		super(props);
	}

	componentDidUpdate (prevProps) {
		const speed = this.props.args['playbackSpeed'];

		if (speed !== prevProps.args.playbackSpeed) {
			this.videoPlayer.setPlaybackSpeed(speed);
		}
	}

	setVideoPlayer = (node) => {
		this.videoPlayer = node;
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
				</VideoPlayer>
			</div>
		);
	}
}
VideoPlayerWithExpandedMediaControls.propTypes = {
	args: PropTypes.object
};

export const WithExpandedMediaControls = (args) => <VideoPlayerWithExpandedMediaControls args={args} />;

number('playbackSpeed', WithExpandedMediaControls, Config, 1);

WithExpandedMediaControls.storyName = 'with expanded media controls';


