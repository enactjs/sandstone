import Button from '../../../../Button';
import {MediaControls} from '../../../../MediaPlayer';
import VideoPlayer from '../../../../VideoPlayer';

const videoPlayer = (props) => (
	<div
		style={{
			transformOrigin: 'top',
			height: '70vh'
		}}
		id={props.id}
	>
		<VideoPlayer
			disabled={props.disabled}
			spotlightDisabled={props.spotlightDisabled}
			noAutoPlay={props.noAutoPlay}
			poster={props.poster}
			title={props.title}
			autoCloseTimeout={props.autoCloseTimeout}
			initialJumpDelay={props.initialJumpDelay}
			jumpBy={props.jumpBy}
			jumpDelay={props.jumpDelay}
			no5WayJump={props.no5WayJump}
			noAutoShowMediaControls={props.noAutoShowMediaControls}
			noSlider={props.noSlider}
			seekDisabled={props.seekDisabled}
			titleHideDelay={props.titleHideDelay}
		>
			<source src={props.src} type="video/mp4" />
			<infoComponents>
				A video about some things happening to and around some characters. Very exciting stuff.
			</infoComponents>
			<MediaControls>
				<bottomComponents />
				<Button size="small" icon="list" id="MediaControls_listButton" />
				<Button size="small" icon="playspeed" />
				<Button size="small" icon="speakercenter" />
				<Button size="small" icon="miniplayer" />
				<Button size="small" icon="subtitle" />
			</MediaControls>
		</VideoPlayer>
	</div>
);

export default videoPlayer;
