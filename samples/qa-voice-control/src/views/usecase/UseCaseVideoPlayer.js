import {VideoPlayer} from '@enact/sandstone/VideoPlayer';
import React, {Component} from 'react';


class UseCaseVideoPlayer extends Component {

	render = () => {
		const src = 'http://media.w3.org/2010/05/sintel/trailer.mp4';

		return (
			<VideoPlayer title="hello">
				<source src={src} type="video/mp4" />
			</VideoPlayer>
		);
	};
}

export default UseCaseVideoPlayer;
