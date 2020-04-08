import Button from '@enact/sandstone/Button';
import IconButton from '@enact/sandstone/IconButton';
import React from 'react';
import ri from '@enact/ui/resolution';
import VideoPlayer, {MediaControls} from '@enact/sandstone/VideoPlayer';

const VideoPlayerView = () => (
	<div style={{width: ri.scale(1280) + 'px', height: ri.scale(800) + 'px'}}>
		<VideoPlayer title="Downton Abbey" poster="http://media.w3.org/2010/05/sintel/poster.png">
			<source src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" type="video/mp4" />
			<infoComponents>DTV REC 08:22 THX 16:9</infoComponents>
			<MediaControls>
				<leftComponents><IconButton backgroundOpacity="translucent">star</IconButton></leftComponents>
				<rightComponents><IconButton backgroundOpacity="translucent">flag</IconButton></rightComponents>
				<Button backgroundOpacity="translucent">Add To Favorites</Button>
				<IconButton backgroundOpacity="translucent">search</IconButton>
			</MediaControls>
		</VideoPlayer>
	</div>
);

export default VideoPlayerView;
