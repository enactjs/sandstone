import Button from '@enact/sandstone/Button';
import ImageItem from '@enact/sandstone/ImageItem';
import {MediaControls} from '@enact/sandstone/MediaPlayer';
import VideoPlayer from '@enact/sandstone/VideoPlayer';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import React from 'react';

const items = [];
const size = 20;
// eslint-disable-next-line enact/prop-types
const renderItem = ({index, ...rest}) => {
	const {source} = items[index];

	return (
		<ImageItem
			{...rest}
			src={source}
		/>
	);
};

const updateDataSize = (dataSize) => {
	items.length = 0;

	for (let i = 0; i < dataSize; i++) {
		const
			color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
			source = `http://placehold.it/300x300/${color}/ffffff&text=Image ${i}`;

		items.push({source});
	}
};

updateDataSize(size);

const VideoPlayerView = () => (
	<div style={{width: ri.scale(1280) + 'px', height: ri.scale(800) + 'px'}}>
		<VideoPlayer poster="http://media.w3.org/2010/05/bunny/poster.png" title="Downton Abbey">
			<source src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" type="video/mp4" />
			<infoComponents>DTV REC 08:22 THX 16:9</infoComponents>
			<MediaControls actionGuideLabel="Press Down Button to Scroll">
				<bottomComponents>
					<VirtualGridList
						style={{height: ri.scale(240), marginTop: ri.scale(60)}}
						horizontalScrollbar="hidden"
						dataSize={size}
						direction="horizontal"
						itemSize={{
							minWidth: ri.scale(320),
							minHeight: ri.scale(270)
						}}
						itemRenderer={renderItem}
						spacing={ri.scale(12)}
					/>
				</bottomComponents>
				<Button aria-label="list" icon="list" size="small" />
				<Button aria-label="playspeed" icon="playspeed" size="small" />
				<Button aria-label="speaker center" icon="speakercenter" size="small" />
				<Button aria-label="miniplayer" icon="miniplayer" size="small" />
				<Button aria-label="subtitle" icon="subtitle" size="small" />
			</MediaControls>
		</VideoPlayer>
	</div>
);

export default VideoPlayerView;
