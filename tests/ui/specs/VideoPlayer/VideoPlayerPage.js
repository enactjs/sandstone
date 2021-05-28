'use strict';
const {Page} = require('@enact/ui-test-utils/utils');
const {getComponent, getText} = require('@enact/ui-test-utils/utils');

class VideoPlayerInterface {
    constructor (id) {
        this.id = id;
        this.selector = `#${this.id}`;
    }

    focus () {
        console.log($(`.VideoPlayer_VideoPlayer_videoPlayer`));
        return browser.execute((el) => el.focus(), $(`.VideoPlayer_VideoPlayer_videoPlayer`));
    }
    //
    // hover (ariaLabel) {
    //     return $(this.selector + `>div>div[aria-label=${ariaLabel}]`).moveTo({xOffset: 0, yOffset: 0});
    // }
    //
    // get self () {
    //     return $(this.selector);
    // }
    //
    // get slider () {
    //     return getComponent({component: 'Slider', child: 'slider'}, this.self);
    // }
    //
    // get knob () {
    //     return getComponent({component: 'Slider', child: 'knob'}, this.self);
    // }
    //
    // get button () {
    //     return getComponent({component: 'Button', child: 'button'}, this.self);
    // }
    //
    // get icon () {
    //     return getComponent({component: 'Button', child: 'icon'}, this.self);
    // }

    get playButton () {
        // return $(this.selector + '>div>div.MediaPlayer_MediaControls_playPauseButton');
        // return $(this.selector + '>div>div.MediaControls_playPauseButton');
        // return $('.VideoPlayer_VideoPlayer_videoPlayer>div>div.MediaControls_playPauseButton');
        console.log($(this.selector + ' .MediaPlayer_MediaControls_mediaControls'))
        // return $(this.selector + '>div>.MediaPlayer_MediaControls_mediaControls>div[aria-label=Play]');
        // return element(`.DayPicker_DayPicker_item[data-index="${index}"]`, this.self);
        //
        // item (index) {
        //     return element(`.DayPicker_DayPicker_item[data-index="${index}"]`, this.self);
        // }
    }

    // get previousButton () {
    //     return $(this.selector + '>div>div[aria-label=Previous]');
    // }
    //
    // get nextButton () {
    //     return $(this.selector + '>div>div[aria-label=Next]');
    // }
    //
    // get shuffleButton () {
    //     return $(this.selector + '>div>div[aria-label=Shuffle]');
    // }
    //
    // get repeatButton () {
    //     return $(this.selector + '>div>div[aria-label=Repeat]');
    // }
    //
    // get repeatStatus () {
    //     return getText($(this.selector + '>div>div[aria-label=Repeat]' + '> .enact_ui_Button_Button_decoration > .Button_Button_badge'));
    // }
    //
    // get menuButton () {
    //     return $(this.selector + '>div>div[aria-label=Menu]');
    // }
    //
    // get source () {
    //     return $(this.selector + '>audio>source').getAttribute('src');
    // }
}

class VideoPlayerPage extends Page {
    constructor () {
        super();
        this.title = 'VideoPlayer Test';
        const videoPlayerDefault = new VideoPlayerInterface('videoPlayerDefault');
        // const videoPlayerDisabled = new MediaPlayerInterface('videoPlayerDisabled');
        // const videoPlayerSpotlightDisabled = new MediaPlayerInterface('videoPlayerSpotlightDisabled');
        this.components = {videoPlayerDefault};
    }
    //
    // waitForPlayMedia (mediaPlayer, timeout) {
    //     browser.waitUntil(function () {
    //         return mediaPlayer.knob.getCSSProperty('left').value !== '0px';
    //     }, {timeout});
    // }
    //
    // open (urlExtra) {
    //     super.open('MediaPlayer-View', urlExtra);
    // }
}

module.exports = new VideoPlayerPage();
