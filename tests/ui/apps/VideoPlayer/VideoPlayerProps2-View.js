import spotlight from '@enact/spotlight';

import ThemeDecorator from '../../../../ThemeDecorator';

import videoPlayer from './VideoPlayerComponents';
import {posterUrl, videoUrl} from './VideoPlayerVariables';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	{videoPlayer({
		id: 'videoPlayerProps2',
		noAutoPlay: true,
		poster: posterUrl,
		src: videoUrl,
		noAutoShowMediaControls: true,
		noSlider: true,
		seekDisabled: true
	})}
</div>;

export default ThemeDecorator(app);
