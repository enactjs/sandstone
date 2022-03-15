import {MediaControls} from '../../../../MediaPlayer';
import VideoPlayer from '../../../../VideoPlayer';
import posterUrl from '../../images/poster.png';
import videoUrl from '../../images/movie_90.mp4';

const videoTitle = 'Sandstone VideoPlayer Sample Video';

const commonVideoPlayer = (props) => (
	<div
		style={{
			transformOrigin: 'top',
			height: '70vh'
		}}
	>
		<VideoPlayer
			disabled={props.disabled}
			noAutoPlay={props.noAutoPlay}
			noSlider={props.noSlider}
			poster={props.poster}
			title={props.title}
		>
			<source src={props.src} type="video/mp4" />
			<infoComponents>
				A video about some things happening to and around some characters. Very exciting stuff.
			</infoComponents>
			<MediaControls>
				{!props.noButtonComponent &&
				<bottomComponents />
				}
			</MediaControls>
		</VideoPlayer>
	</div>
);

const VideoPlayerTests = [
	{
		component: commonVideoPlayer({src: ''}),
		wrapper: {full: true}
	},
	{
		component: commonVideoPlayer({src: 'differentSrc'}),
		wrapper: {full: true},
		focus: true
	},
	{
		component: commonVideoPlayer({src: '', disabled: true}),
		wrapper: {full: true}
	},
	{
		component: commonVideoPlayer({src: '', poster: posterUrl}),
		wrapper: {full: true}
	},
	{
		component: commonVideoPlayer({src: '', poster: posterUrl, title: videoTitle}),
		wrapper: {full: true}
	},
	{
		component: commonVideoPlayer({src: videoUrl, noAutoPlay: true}),
		wrapper: {full: true}
	},
	{
		component: commonVideoPlayer({src: videoUrl, noSlider: true}),
		wrapper: {full: true}
	},
	{
		component: commonVideoPlayer({src: '', poster: posterUrl, title: videoTitle, noSlider: true}),
		wrapper: {full: true}
	},
	{
		component: commonVideoPlayer({src: '', noButtonComponent: true}),
		wrapper: {full: true}
	}
];
export default VideoPlayerTests;
