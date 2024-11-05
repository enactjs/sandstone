'use strict';
const {getComponent, Page} = require('@enact/ui-test-utils/utils');
class VideoPlayerInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	async focus () {
		return await browser.execute((el) => el.focus(), await $('.VideoPlayer_VideoPlayer_videoPlayer'));
	}

	get self () {
		return $(this.selector);
	}

	get slider () {
		return $(this.selector + ' .MediaPlayer_MediaSlider_fill');
	}

	get sliderComponent () {
		return getComponent({component: 'Slider', child: 'slider'}, this.self);
	}

	get knob () {
		return getComponent({component: 'Slider', child: 'knob'}, this.self);
	}

	get sliderKnob () {
		return $(this.selector + ' .Slider_Slider_knob');
	}

	get playButton () {
		return $(this.selector + ' .MediaPlayer_MediaControls_mediaControls>div[aria-label=Play]');
	}

	get nextButton () {
		return $(this.selector + ' .MediaPlayer_MediaControls_mediaControls>div[aria-label=Next]');
	}

	get previousButton () {
		return $(this.selector + ' .MediaPlayer_MediaControls_mediaControls>div[aria-label=Previous]');
	}

	get mediaControlsFrame () {
		return $(this.selector + ' .MediaPlayer_MediaControls_controlsFrame');
	}

	get mediaControlsActionGuideButton () {
		return $(this.selector + ' .MediaPlayer_MediaControls_actionGuide>div[aria-label=More]');
	}

	get mediaControlsListButton () {
		return $(this.selector + ' #MediaControls_listButton');
	}

	get video () {
		return $(this.selector + ' .VideoPlayer_VideoPlayer_video');
	}

	get videoPlayerContainer () {
		return $(this.selector + ' .VideoPlayer_VideoPlayer_videoPlayer ');
	}

	get titleFrame () {
		return $(this.selector + ' .VideoPlayer_MediaTitle_titleFrame ');
	}

	get title () {
		return $(this.selector + ' .VideoPlayer_MediaTitle_title .enact_ui_Marquee_Marquee_text');
	}

	get mediaControlsTime () {
		return $(this.selector + ' .MediaPlayer_Times_times time');
	}

	get mediaTitleInfoComponent () {
		return $(this.selector + ' .VideoPlayer_MediaTitle_infoComponents');
	}
}

class VideoPlayerPage extends Page {
	constructor () {
		super();
		this.title = 'VideoPlayer Test';
		const videoPlayerDefault = new VideoPlayerInterface('videoPlayerDefault');
		const videoPlayerDisabled = new VideoPlayerInterface('videoPlayerDisabled');
		const videoPlayerSpotlightDisabled = new VideoPlayerInterface('videoPlayerSpotlightDisabled');
		const videoPlayerProps = new VideoPlayerInterface('videoPlayerProps');
		const videoPlayerProps2 = new VideoPlayerInterface('videoPlayerProps2');
		const videoPlayerPlaybackSpeed = new VideoPlayerInterface('videoPlayerPlaybackSpeed');
		this.components = {
			videoPlayerDefault,
			videoPlayerDisabled,
			videoPlayerSpotlightDisabled,
			videoPlayerProps,
			videoPlayerProps2,
			videoPlayerPlaybackSpeed
		};
	}

	async open (specification = '', urlExtra) {
		await super.open(`VideoPlayer${specification}-View`, urlExtra);
	}
}

module.exports = new VideoPlayerPage();
