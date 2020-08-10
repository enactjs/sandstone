import React, {Component} from 'react';
import {VideoPlayer} from '@enact/sandstone/VideoPlayer';

const sources = [
	'http://192.168.0.3/enact/performance/videoplayer-memory/video/forEach.MOV',
	'http://192.168.0.3/mock/NEW_ves_GatsbyR2_205356_3840x2160_25000Kbps_hevc_A_NBC_re.mp4',
	'http://192.168.0.3/enact/performance/videoplayer-memory/video/reduce.MOV'
];

class UseCaseVideoPlayer extends Component {
	constructor (props) {
		super(props);
		this.state = {index: null};
	}

	componentDidMount = () => {
		this.setState({index: 0});
	};

	playNext = () => {
		let nextIdx = this.state.index + 1;
		if (nextIdx >= sources.length) {
			nextIdx = 0;
		}
		this.setState({index: nextIdx});
	};

	render = () => {
		const src = sources[this.state.index];

		return (
			<VideoPlayer title="hello">
				<source src={src} type="video/mp4" />
			</VideoPlayer>
		);
	};
}

export default UseCaseVideoPlayer;
