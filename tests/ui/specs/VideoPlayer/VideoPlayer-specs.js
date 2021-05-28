const Page = require('./VideoPlayerPage');

describe('VideoPlayer', function () {

    beforeEach(function () {
        Page.open();
    });

    const {
        videoPlayerDefault,
    } = Page.components;

    describe('default', function () {
        it('should have the play/pause button focused', function () {
            browser.pause(2000);
            videoPlayerDefault.focus();
            // Page.delay(1000);
            // console.log(videoPlayerDefault.playButton);
            // console.log(videoPlayerDefault);
            // expect(videoPlayerDefault.playButton.isFocused()).to.be.true();
            // expect(videoPlayerDefault.isFocused()).to.be.true();
        });
    })
});