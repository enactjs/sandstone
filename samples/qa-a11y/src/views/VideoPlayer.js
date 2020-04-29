import Button from '@enact/sandstone/Button';
import React from 'react';
import ri from '@enact/ui/resolution';
import VideoPlayer, {MediaControls} from '@enact/sandstone/VideoPlayer';

const VideoPlayerView = () => (
	<div style={{width: ri.scale(1280) + 'px', height: ri.scale(800) + 'px'}}>
		<VideoPlayer title="Downton Abbey" poster="http://media.w3.org/2010/05/sintel/poster.png">
			<source src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" type="video/mp4" />
			<infoComponents>DTV REC 08:22 THX 16:9</infoComponents>
			<MediaControls>
				<Button backgroundOpacity="transparent" icon="star" />
				<Button backgroundOpacity="transparent" icon="flag" />
				<Button backgroundOpacity="transparent">Add To Favorites</Button>
				<Button icon="search" backgroundOpacity="transparent" />
			</MediaControls>
		</VideoPlayer>
	</div>
);

export default VideoPlayerView;
