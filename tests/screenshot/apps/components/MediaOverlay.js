import MediaOverlay from '../../../../MediaOverlay';
import React from 'react';

const MediaOverlayTests = [
	<MediaOverlay />,
	<MediaOverlay caption="DTV 7-1" imageOverlay="https://picsum.photos/1280/720?image=1080" subtitle="07:00 AM - 08:00 AM" title="Program Name">
		<source src="http://media.w3.org/2010/05/sintel/trailer.mp4" />
	</MediaOverlay>,
	<MediaOverlay disabled />

];
export default MediaOverlayTests;
