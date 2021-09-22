import spotlight from '@enact/spotlight';

import ThemeDecorator from '../../../../ThemeDecorator';

import videoPlayer from './VideoPlayerComponents';
import {posterUrl, videoUrl, videoTitle} from './VideoPlayerVariables';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	{videoPlayer({
		id: 'videoPlayerProps',
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
