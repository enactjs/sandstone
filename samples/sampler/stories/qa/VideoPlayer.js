import Button from '@enact/sandstone/Button';
import {MediaControls} from '@enact/sandstone/MediaPlayer';
import VideoPlayer, {Video} from '@enact/sandstone/VideoPlayer';
import {button} from '@enact/storybook-utils/addons/knobs';
import {Component} from 'react';

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
				{button('Next Preload Video', this.nextVideo, videoTabLabel)}
				{button('Non Preload Video', this.differentVideo, videoTabLabel)}
				{button(
					'Next Preload Video without changing preload',
					this.nextVideoKeepPreload,
					videoTabLabel
				)}
				{button(
					'Change Preload without changing video',
					this.nextPreloadVideoKeepVideo,
					videoTabLabel
				)}
				{button('Reset Sources', this.resetSources, videoTabLabel)}
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

export const PreloadVideos = () => <VideoSourceSwap />;

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
