import {VideoPlayer} from '@enact/sandstone/VideoPlayer';
import React, {Component} from 'react';

const sources = [
	'http://media.w3.org/2010/05/sintel/trailer.mp4',
	'http://media.w3.org/2010/05/sintel/trailer.mp4',
	'http://media.w3.org/2010/05/sintel/trailer.mp4'
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
		this.setState(prevState => ({index: prevState.index === sources.length - 1 ? 0 : prevState.index + 1}));
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
