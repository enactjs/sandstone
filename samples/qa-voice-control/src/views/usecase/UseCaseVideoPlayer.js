import {VideoPlayer} from '@enact/sandstone/VideoPlayer';

const src = 'http://media.w3.org/2010/05/sintel/trailer.mp4';

const UseCaseVideoPlayer = () => {
	return (
		<VideoPlayer title="hello">
			<source src={src} type="video/mp4" />
		</VideoPlayer>
	);
};

export default UseCaseVideoPlayer;
