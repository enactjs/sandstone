import MediaOverlay from '../../../../MediaOverlay';
import React from 'react';

import img from '../../images/600x600.png';

const MediaOverlayTests = [
	// Base Tests
	<MediaOverlay />,
	<MediaOverlay imageOverlay={img} caption="DTV 7-1" title="Program Name" subtitle="07:00 AM - 08:00 AM" disabled />,
	{
		locale: 'ar-SA',
		component: <MediaOverlay imageOverlay={img} caption="DTV 7-1" title="Program Name" subtitle="07:00 AM - 08:00 AM" />
	},

	// Caption / Title / Subtitle combinations
	<MediaOverlay imageOverlay={img} caption="DTV 7-1" />,
	<MediaOverlay imageOverlay={img} caption="DTV 7-1" title="Program Name" />,
	<MediaOverlay imageOverlay={img} caption="DTV 7-1" subtitle="07:00 AM - 08:00 AM" />,
	<MediaOverlay imageOverlay={img} caption="DTV 7-1" title="Program Name" subtitle="07:00 AM - 08:00 AM" />,
	<MediaOverlay imageOverlay={img} title="Program Name" />,
	<MediaOverlay imageOverlay={img} title="Program Name" subtitle="07:00 AM - 08:00 AM" />,
	<MediaOverlay imageOverlay={img} subtitle="07:00 AM - 08:00 AM" />

];
export default MediaOverlayTests;
