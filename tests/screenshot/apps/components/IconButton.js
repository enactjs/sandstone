import IconButton from '../../../../IconButton';
import React from 'react';

import buttonstate from '../../images/button-state.svg';

const IconButtonTests = [
	// Change 'backgroundOpacity' dynamically - GT-27526
	<IconButton backgroundOpacity="translucent">plus</IconButton>,
	<IconButton backgroundOpacity="lightTranslucent">plus</IconButton>,
	<IconButton backgroundOpacity="transparent">plus</IconButton>,

	// Color Underbar displays on IconButton (LTR) - GT-22247
	// Step 3
	<IconButton color="red">plus</IconButton>,
	// Step 4
	<IconButton color="green">plus</IconButton>,
	// Step 5
	<IconButton color="yellow">plus</IconButton>,
	// Step 6
	<IconButton color="blue">plus</IconButton>,

	// Color Underbar displays with 'Disabled' IconButton - GT-22248
	<IconButton color="red" disabled>plus</IconButton>,

	// testing 'custom-icon' using unicode character
	<IconButton>💣</IconButton>,

	// Source Images Display - [GT-21155]
	<IconButton>{buttonstate}</IconButton>,

	// Color Underbar displays on Small and Large icon in Selected state - [GT-21156]
	// Step 3
	<IconButton selected>plus</IconButton>,
	// Step 4 and Step 5
	<IconButton selected color="green">plus</IconButton>,
	// Step 6
	<IconButton selected color="green" size="large">plus</IconButton>,

	<IconButton size="large">plus</IconButton>,
	<IconButton selected size="large">plus</IconButton>,
	<IconButton selected size="large" disabled>plus</IconButton>,

	<IconButton flip="vertical">question</IconButton>,
	<IconButton flip="horizontal">question</IconButton>,
	<IconButton flip="both">repeat</IconButton>,
	<IconButton flip="both" size="large">repeat</IconButton>,

	<IconButton>arrowcurveright</IconButton>,
	<IconButton>arrowextend</IconButton>,
	<IconButton>arrowhookleft</IconButton>,
	<IconButton>arrowhookright</IconButton>,
	<IconButton>arrowlargedown</IconButton>,
	<IconButton>arrowlargeleft</IconButton>,
	<IconButton>arrowlargeright</IconButton>,
	<IconButton>arrowlargeup</IconButton>,
	<IconButton>arrowleftprevious</IconButton>,
	<IconButton>arrowrightskip</IconButton>,
	<IconButton>arrowshrink</IconButton>,
	<IconButton>arrowshrinkleft</IconButton>,
	<IconButton>arrowshrinkright</IconButton>,
	<IconButton>arrowsmalldown</IconButton>,
	<IconButton>arrowsmallleft</IconButton>,
	<IconButton>arrowsmallright</IconButton>,
	<IconButton>arrowsmallup</IconButton>,
	<IconButton>arrowupdown</IconButton>,
	<IconButton>audio</IconButton>,
	<IconButton>back15</IconButton>,
	<IconButton>backward</IconButton>,
	<IconButton>bluetoothoff</IconButton>,
	<IconButton>brightness</IconButton>,
	<IconButton>bulletlist</IconButton>,
	<IconButton>cc</IconButton>,
	<IconButton>ccoff</IconButton>,
	<IconButton>ccon</IconButton>,
	<IconButton>check</IconButton>,
	<IconButton>checkselection</IconButton>,
	<IconButton>chinesesubtitles</IconButton>,
	<IconButton>circle</IconButton>,
	<IconButton>closex</IconButton>,
	<IconButton>continousplay</IconButton>,
	<IconButton>contrast</IconButton>,
	<IconButton>densedrawer</IconButton>,
	<IconButton>denselist</IconButton>,
	<IconButton>download</IconButton>,
	<IconButton>drawer</IconButton>,
	<IconButton>edit</IconButton>,
	<IconButton>ellipsis</IconButton>,
	<IconButton>exitfullscreen</IconButton>,
	<IconButton>files</IconButton>,
	<IconButton>flag</IconButton>,
	<IconButton>font</IconButton>,
	<IconButton>forward</IconButton>,
	<IconButton>forward15</IconButton>,
	<IconButton>fullscreen</IconButton>,
	<IconButton>funnel</IconButton>,
	<IconButton>gear</IconButton>,
	<IconButton>halfstar</IconButton>,
	<IconButton>hollowstar</IconButton>,
	<IconButton>home</IconButton>,
	<IconButton>image</IconButton>,
	<IconButton>info</IconButton>,
	<IconButton>jumpbackward</IconButton>,
	<IconButton>jumpforward</IconButton>,
	<IconButton>koreansubtitles</IconButton>,
	<IconButton>languages</IconButton>,
	<IconButton>list</IconButton>,
	<IconButton>liveflagone</IconButton>,
	<IconButton>liveplay</IconButton>,
	<IconButton>liveplayback</IconButton>,
	<IconButton>liveplaybackoff</IconButton>,
	<IconButton>liverecord</IconButton>,
	<IconButton>liverecordone</IconButton>,
	<IconButton>livezoom</IconButton>,
	<IconButton>lock</IconButton>,
	<IconButton>minus</IconButton>,
	<IconButton>movecursor</IconButton>,
	<IconButton>music</IconButton>,
	<IconButton>musicoff</IconButton>,
	<IconButton>musicon</IconButton>,
	<IconButton>notification</IconButton>,
	<IconButton>notificationoff</IconButton>,
	<IconButton>pause</IconButton>,
	<IconButton>pausebackward</IconButton>,
	<IconButton>pauseforward</IconButton>,
	<IconButton>pausejumpbackward</IconButton>,
	<IconButton>pausejumpforward</IconButton>,
	<IconButton>picture</IconButton>,
	<IconButton>play</IconButton>,
	<IconButton>playlist</IconButton>,
	<IconButton>playlistadd</IconButton>,
	<IconButton>playlistedit</IconButton>,
	<IconButton>plug</IconButton>,
	<IconButton>plus</IconButton>,
	<IconButton>question</IconButton>,
	<IconButton>questionreversed</IconButton>,
	<IconButton>recordings</IconButton>,
	<IconButton>refresh</IconButton>,
	<IconButton>repeat</IconButton>,
	<IconButton>repeatall</IconButton>,
	<IconButton>repeatdownload</IconButton>,
	<IconButton>repeatnone</IconButton>,
	<IconButton>repeatoff</IconButton>,
	<IconButton>repeatone</IconButton>,
	<IconButton>repeattrack</IconButton>,
	<IconButton>resumeplay</IconButton>,
	<IconButton>rollbackward</IconButton>,
	<IconButton>rollforward</IconButton>,
	<IconButton>s</IconButton>,
	<IconButton>scroll</IconButton>,
	<IconButton>search</IconButton>,
	<IconButton>searchfilled</IconButton>,
	<IconButton>series</IconButton>,
	<IconButton>shuffle</IconButton>,
	<IconButton>skipbackward</IconButton>,
	<IconButton>skipforward</IconButton>,
	<IconButton>sleep</IconButton>,
	<IconButton>speakers</IconButton>,
	<IconButton>star</IconButton>,
	<IconButton>starminus</IconButton>,
	<IconButton>stop</IconButton>,
	<IconButton>sub</IconButton>,
	<IconButton>trash</IconButton>,
	<IconButton>trashlock</IconButton>,
	<IconButton>verticalellipsis</IconButton>,
	<IconButton>view360</IconButton>,
	<IconButton>view360off</IconButton>,
	<IconButton>volumecycle</IconButton>,
	<IconButton>warning</IconButton>,
	<IconButton>zoomin</IconButton>,
	<IconButton>zoomout</IconButton>,
	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************
	{
		locale: 'ar-SA',
		component: <IconButton>plus</IconButton>
	},

	// Change 'backgroundOpacity' dynamically - GT-27526
	{
		locale: 'ar-SA',
		component: <IconButton backgroundOpacity="translucent">plus</IconButton>
	},
	{
		locale: 'ar-SA',
		component: <IconButton backgroundOpacity="lightTranslucent">plus</IconButton>
	},
	{
		locale: 'ar-SA',
		component: <IconButton backgroundOpacity="transparent">plus</IconButton>
	},

	// Color Underbar displays on IconButton (RTL) - [GT-21213]
	// Step 5
	{
		locale: 'ar-SA',
		component: <IconButton color="red">plus</IconButton>
	},
	// Step 6
	{
		locale: 'ar-SA',
		component: <IconButton color="green">plus</IconButton>
	},
	// Step 7
	{
		locale: 'ar-SA',
		component: <IconButton color="yellow">plus</IconButton>
	},
	// Step 8
	{
		locale: 'ar-SA',
		component: <IconButton color="blue">plus</IconButton>
	},

	// Color Underbar displays with 'Disabled' IconButton - GT-22248
	{
		locale: 'ar-SA',
		component: <IconButton color="red" disabled>plus</IconButton>
	},

	// testing 'custom-icon' using unicode character
	{
		locale: 'ar-SA',
		component: <IconButton>💣</IconButton>  // testing 'custom-icon' using unicode character
	},
	// Source Images Display - [GT-21155]
	{
		locale: 'ar-SA',
		component: <IconButton>{buttonstate}</IconButton>
	},

	{
		locale: 'ar-SA',
		component: <IconButton size="large">plus</IconButton>
	},
	{
		locale: 'ar-SA',
		component: <IconButton selected size="large">plus</IconButton>
	},
	{
		locale: 'ar-SA',
		component: <IconButton selected size="large" disabled>plus</IconButton>
	},

	// Color Underbar displays on Small and Large icon in Selected state - [GT-21156]
	// Step 3
	{
		locale: 'ar-SA',
		component: <IconButton selected>plus</IconButton>
	},
	// Step 4 and Step 5
	{
		locale: 'ar-SA',
		component: <IconButton selected color="green">plus</IconButton>
	},
	// Step 6
	{
		locale: 'ar-SA',
		component: <IconButton selected color="green" size="large">plus</IconButton>
	},

	{
		locale: 'ar-SA',
		component: <IconButton flip="vertical">question</IconButton>
	},
	{
		locale: 'ar-SA',
		component: <IconButton flip="horizontal">question</IconButton>
	},
	{
		locale: 'ar-SA',
		component: <IconButton flip="both">repeat</IconButton>
	},
	{
		locale: 'ar-SA',
		component: <IconButton flip="both" size="large">repeat</IconButton>
	}
];
export default IconButtonTests;
