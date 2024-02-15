import spotlight from '@enact/spotlight';

import {Button} from '../../../../Button';
import {MediaControls} from '../../../../MediaPlayer';
import ThemeDecorator from '../../../../ThemeDecorator';
import VideoPlayer from '../../../../VideoPlayer';

import {posterUrl, videoUrl} from './VideoPlayerVariables';

import {Component} from 'react';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

class app extends Component {
	constructor (props) {
		super(props);
		this.state = {
			playbackRate: 1
		};
	}

	changePlaybackSpeed = () => {
		this.setState({playbackRate: 2});
	};
	handleFastforward = () => {
		this.setState({playbackRate: 1.25});
	};
	handlePause = () => {
		this.setState({playbackRate: 1});
	};
	handlePlay = () => {
		this.setState({playbackRate: 1});
	};

	render () {
		return (
			<div
				style={{
					transformOrigin: 'top',
					height: '70vh'
				}}
				id="videoPlayerPlaybackSpeed"
			>
				<VideoPlayer
					title="Video Playback Test"
					playbackRate={this.state.playbackRate}
					poster={posterUrl}
					onPause={this.handlePause}
					onPlay={this.handlePlay}
				>
					<source src={videoUrl} type="video/mp4" />
					<infoComponents>
						A video about some things happening to and around some characters. Very exciting stuff.
					</infoComponents>
					<MediaControls>
						<Button
							icon="forward"
							onClick={this.handleFastforward}
						/>
						<Button
							icon="playspeed"
							onClick={this.changePlaybackSpeed}
						/>
					</MediaControls>
				</VideoPlayer>
			</div>
		);
	}
}

export default ThemeDecorator(app);
