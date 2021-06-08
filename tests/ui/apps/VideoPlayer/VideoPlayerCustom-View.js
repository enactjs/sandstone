import ThemeDecorator from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';
import _videoPlayer from './VideoPlayerComponents';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const posterUrl = 'http://media.w3.org/2010/05/sintel/poster.png';
const videoUrl = 'http://media.w3.org/2010/05/sintel/trailer.mp4';
const videoTitle = 'Sandstone VideoPlayer Sample Video';

const app = (props) => <div {...props}>
	{_videoPlayer({
		id: 'videoPlayerCustom',
		noAutoPlay: true,
		poster: posterUrl,
		src: videoUrl,
		autoCloseTimeout: 3000,
		jumpBy: 10,
		no5WayJump: true,
		titleHideDelay: 1000,
		title: videoTitle
	})}
</div>;

export default ThemeDecorator(app);
