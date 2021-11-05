import Button from '@enact/sandstone/Button';
import {MediaControls} from '@enact/sandstone/MediaPlayer';
import VideoPlayer, {Video} from '@enact/sandstone/VideoPlayer';
import {select} from '@enact/storybook-utils/addons/controls';
import {Component} from 'react';

const videoPlayerOption =  [
  '',
  'Next Proload Video',
  'Non Preload Video',
  'Next Preload Video without changing preload',
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
    const args = this.props.args;
    const videoPlayerOption = args['videoPlayerOption'];
    
	if (videoPlayerOption !== prevProps.args.videoPlayerOption) {
      if (videoPlayerOption == 'Next Proload Video') {
        this.nextVideo();
      } else if (videoPlayerOption == 'Non Preload Video') {
        this.differentVideo();
      } else if (videoPlayerOption == 'Next Preload Video without changing preload') {
        this.nextPreloadVideoKeepVideo();
      } else if (videoPlayerOption == 'Change Preload without changing video') {
        this.nextPreloadVideoKeepVideo();
      } else if (videoPlayerOption == 'Reset Sources') {
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

export const PreloadVideos = (args) => <VideoSourceSwap args={args}/>;

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
					<MediaControls actionGuideLabel="Press Down Button">
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