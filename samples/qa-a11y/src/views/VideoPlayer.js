import Button from '@enact/sandstone/Button';
import ImageItem from '@enact/sandstone/ImageItem';
import {MediaControls} from '@enact/sandstone/MediaPlayer';
import VideoPlayer from '@enact/sandstone/VideoPlayer';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';

const items = [];

const svgGenerator = (width, height, bgColor, textColor, customText) => (
	`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' width='${width}' height='${height}'%3E` +
	`%3Crect width='${width}' height='${height}' fill='%23${bgColor}'%3E%3C/rect%3E` +
	`%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='36px' fill='%23${textColor}'%3E${customText}%3C/text%3E%3C/svg%3E`
);

for (let i = 0; i < 20; i++) {
	const
		color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
		source = svgGenerator(300, 300, color, 'ffffff', `Image ${i}`);

	items.push({source});
}

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

const VideoPlayerView = () => (
	<div style={{width: ri.scaleToRem(1280), height: ri.scaleToRem(800)}}>
		<VideoPlayer poster="http://media.xiph.org/cosmoslaundromat/Cosmos_Laundromat_1-2k-png/07580.png" title="Cosmos Laundromat">
			<source src="http://media.xiph.org/cosmoslaundromat/Pilot_Trailer_Cosmos_Laundromat.mp4" type="video/mp4" />
			<infoComponents>DTV REC 08:22 THX 16:9</infoComponents>
			<MediaControls actionGuideButtonAriaLabel="More">
				<bottomComponents>
					<VirtualGridList
						dataSize={20}
						direction="horizontal"
						horizontalScrollbar="hidden"
						itemRenderer={renderItem}
						itemSize={{
							minWidth: ri.scale(320),
							minHeight: ri.scale(270)
						}}
						spacing={ri.scale(12)}
						style={{height: ri.scaleToRem(240), marginTop: ri.scaleToRem(60)}}
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
