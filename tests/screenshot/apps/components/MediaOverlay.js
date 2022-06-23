import MediaOverlay from '../../../../MediaOverlay';

import img from '../../images/600x600.png';

import {withConfig} from './utils';

const MediaOverlayTests = [
	// Base Tests
	<MediaOverlay />,
	<MediaOverlay imageOverlay={img} caption="DTV 7-1" title="Program Name" subtitle="07:00 AM - 08:00 AM" disabled />,

	// Caption / Title / Subtitle combinations
	<MediaOverlay imageOverlay={img} caption="DTV 7-1" />,
	<MediaOverlay imageOverlay={img} caption="DTV 7-1" title="Program Name" />,
	<MediaOverlay imageOverlay={img} caption="DTV 7-1" subtitle="07:00 AM - 08:00 AM" />,
	<MediaOverlay imageOverlay={img} caption="DTV 7-1" title="Program Name" subtitle="07:00 AM - 08:00 AM" />,
	<MediaOverlay imageOverlay={img} title="Program Name" />,
	<MediaOverlay imageOverlay={img} title="Program Name" subtitle="07:00 AM - 08:00 AM" />,
	<MediaOverlay imageOverlay={img} subtitle="07:00 AM - 08:00 AM" />,

	<MediaOverlay imageOverlay={img} text="The quick brown fox jumped over the lazy dog. The bean bird flies at sundown." textAlign="start" />,
	<MediaOverlay imageOverlay={img} text="The quick brown fox jumped over the lazy dog. The bean bird flies at sundown." textAlign="center" />,
	<MediaOverlay imageOverlay={img} text="The quick brown fox jumped over the lazy dog. The bean bird flies at sundown." textAlign="end" />,

	<MediaOverlay imageOverlay={img} caption="DTV 7-1" progress={0.5} showProgress />,
	<MediaOverlay imageOverlay={img} caption="DTV 7-1" progress={0.5} showProgress title="Program Name" subtitle="07:00 AM - 08:00 AM"  />,

	// Focused
	...withConfig({focus: true}, [
		<MediaOverlay imageOverlay={img} caption="Focused DTV 7-1" title="Focused Program Name" subtitle="07:00 AM - 08:00 AM" disabled />,

		// Caption / Title / Subtitle combinations
		<MediaOverlay imageOverlay={img} caption="Focused DTV 7-1" />,
		<MediaOverlay imageOverlay={img} caption="Focused DTV 7-1" title="Focused Program Name" />,
		<MediaOverlay imageOverlay={img} caption="Focused DTV 7-1" subtitle="07:00 AM - 08:00 AM" />,
		<MediaOverlay imageOverlay={img} caption="Focused DTV 7-1" title="Focused Program Name" subtitle="07:00 AM - 08:00 AM" />,
		<MediaOverlay imageOverlay={img} title="Focused Program Name" />,
		<MediaOverlay imageOverlay={img} title="Focused Program Name" subtitle="07:00 AM - 08:00 AM" />,
		<MediaOverlay imageOverlay={img} subtitle="Focused 07:00 AM - 08:00 AM" />,

		<MediaOverlay imageOverlay={img} text="Focused The quick brown fox jumped over the lazy dog. The bean bird flies at sundown." textAlign="start" />,
		<MediaOverlay imageOverlay={img} text="Focused The quick brown fox jumped over the lazy dog. The bean bird flies at sundown." textAlign="center" />,
		<MediaOverlay imageOverlay={img} text="Focused The quick brown fox jumped over the lazy dog. The bean bird flies at sundown." textAlign="end" />,

		<MediaOverlay imageOverlay={img} caption="Focused DTV 7-1" progress={0.5} showProgress />,
		<MediaOverlay imageOverlay={img} caption="Focused DTV 7-1" progress={0.5} showProgress title="Focused Program Name" subtitle="07:00 AM - 08:00 AM"  />,
	]),

	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************
	...withConfig({locale: 'ar-SA'}, [
		<MediaOverlay />,
		<MediaOverlay imageOverlay={img} caption="DTV 7-1" title="Program Name" subtitle="07:00 AM - 08:00 AM" disabled />,
		// Caption / Title / Subtitle combinations
		<MediaOverlay imageOverlay={img} caption="DTV 7-1" />,
		<MediaOverlay imageOverlay={img} caption="DTV 7-1" title="Program Name" />,
		<MediaOverlay imageOverlay={img} caption="DTV 7-1" subtitle="07:00 AM - 08:00 AM" />,
		<MediaOverlay imageOverlay={img} caption="DTV 7-1" title="Program Name" subtitle="07:00 AM - 08:00 AM" />,
		<MediaOverlay imageOverlay={img} title="Program Name" />,
		<MediaOverlay imageOverlay={img} title="Program Name" subtitle="07:00 AM - 08:00 AM" />,
		<MediaOverlay imageOverlay={img} subtitle="07:00 AM - 08:00 AM" />,

		<MediaOverlay imageOverlay={img} text="The quick brown fox jumped over the lazy dog. The bean bird flies at sundown." textAlign="start" />,
		<MediaOverlay imageOverlay={img} text="The quick brown fox jumped over the lazy dog. The bean bird flies at sundown." textAlign="center" />,
		<MediaOverlay imageOverlay={img} text="The quick brown fox jumped over the lazy dog. The bean bird flies at sundown." textAlign="end" />,

		<MediaOverlay imageOverlay={img} caption="DTV 7-1" progress={0.5} showProgress />,
		<MediaOverlay imageOverlay={img} caption="DTV 7-1" progress={0.5} showProgress title="Program Name" subtitle="07:00 AM - 08:00 AM"  />
	])

];
export default MediaOverlayTests;
