import VideoPlayer from '../../../../VideoPlayer';
import {MediaControls} from '../../../../MediaPlayer';

const posterUrl = 'http://media.w3.org/2010/05/sintel/poster.png';
const videoUrl = 'http://media.w3.org/2010/05/sintel/trailer.mp4';
const videoTitle = 'Sandstone VideoPlayer Sample Video';

const videoPlayer1 = (props) => (
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
		component: videoPlayer1({src: ''}),
		wrapper: {full: true}
	},
	{
		component: videoPlayer1({src: 'differentSrc'}),
		wrapper: {full: true},
		focus: true
	},
	{
		component: videoPlayer1({src: '', disabled: true}),
		wrapper: {full: true}
	},
	{
		component: videoPlayer1({src: '', poster: posterUrl}),
		wrapper: {full: true}
	},
	{
		component: videoPlayer1({src: '', poster: posterUrl, title: videoTitle}),
		wrapper: {full: true}
	},
	{
		component: videoPlayer1({src: videoUrl, noAutoPlay: true}),
		wrapper: {full: true}
	},
	{
		component: videoPlayer1({src: videoUrl, noSlider: true}),
		wrapper: {full: true}
	},
	{
		component: videoPlayer1({src: '', poster: posterUrl, title: videoTitle, noSlider: true}),
		wrapper: {full: true}
	},
	{
		component: videoPlayer1({src: '', noButtonComponent: true}),
		wrapper: {full: true}
	}
];
export default VideoPlayerTests;
