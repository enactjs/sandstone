const Page = require('./VideoPlayerPage');

describe('VideoPlayer', function () {

	const {
		videoPlayerDefault,
		videoPlayerDisabled,
		videoPlayerSpotlightDisabled,
		videoPlayerCustom,
		videoPlayerCustom2
	} = Page.components;

	describe('default', function () {

		beforeEach(function () {
			Page.open();
		});

		it('should have the play/pause button focused', function () {
			Page.delay(1000);

			if (videoPlayerDefault.mediaControlsFrame.getCSSProperty('opacity').value === 0) {
				Page.spotlightDown();
				Page.delay(1000);
			}

			expect(videoPlayerDefault.playButton.isFocused()).to.be.true();
		});

		it('should play media on playButton click', function () {
			Page.delay(1000);
			expect(videoPlayerDefault.slider.getCSSProperty('width').value).to.equal('0px');

			videoPlayerDefault.playButton.click();
			Page.delay(2000);

			expect(videoPlayerDefault.slider.getCSSProperty('width').value).to.not.equal('0px');
		});

		it('should skip forwards/backwards on previous/next button click', function () {
			Page.delay(1000);
			expect(videoPlayerDefault.slider.getCSSProperty('width').value).to.equal('0px');

			videoPlayerDefault.nextButton.click();
			expect(videoPlayerDefault.slider.getCSSProperty('width').value).to.not.equal('0px');

			videoPlayerDefault.previousButton.click();
			expect(videoPlayerDefault.slider.getCSSProperty('width').value).to.equal('0px');
		});

		it('should hide controls after 5 seconds', function () {
			Page.delay(1000);
			expect(videoPlayerDefault.mediaControlsFrame.getCSSProperty('opacity').value).to.equal(1);
			Page.delay(5000);
			expect(videoPlayerDefault.mediaControlsFrame.getCSSProperty('opacity').value).to.equal(0);
		});

		describe('5-way', function () {
			it('should focus `play` button on 5-way back, then down', function () {
				Page.delay(1000);
				Page.backKey();
				Page.spotlightDown();

				expect(videoPlayerDefault.playButton.isFocused()).to.be.true();
			});

			it('should focus `previous` buttons on 5-way left', function () {
				Page.delay(1000);
				expect(videoPlayerDefault.playButton.isFocused()).to.be.true();

				Page.spotlightLeft();

				expect(videoPlayerDefault.previousButton.isFocused()).to.be.true();
			});

			it('should focus `next` button on 5-way right', function () {
				Page.delay(1000);
				expect(videoPlayerDefault.playButton.isFocused()).to.be.true();

				Page.spotlightRight();

				expect(videoPlayerDefault.nextButton.isFocused()).to.be.true();
			});

			it('should focus `list` button on 5-way down 2 times', function () {
				Page.delay(1000);
				expect(videoPlayerDefault.playButton.isFocused()).to.be.true();
				Page.spotlightDown();
				Page.spotlightDown();

				Page.delay(500);

				expect(videoPlayerDefault.mediaControlsListButton.isFocused()).to.be.true();
			});

			it('should focus slider knob on 5-way up and seek on 5-way right and left', function () {
				Page.delay(1000);
				expect(videoPlayerDefault.playButton.isFocused()).to.be.true();
				Page.spotlightUp();

				Page.delay(500);

				expect(videoPlayerDefault.sliderComponent.isFocused()).to.be.true();
				expect(videoPlayerDefault.slider.getCSSProperty('width').value).to.equal('0px');
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.delay(500);
				expect(videoPlayerDefault.slider.getCSSProperty('width').value).to.not.equal('0px');

				Page.spotlightLeft();
				Page.spotlightSelect();
				Page.delay(500);
				expect(videoPlayerDefault.slider.getCSSProperty('width').value).to.equal('0px');
			});
		});
	});

	describe('disabled', function () {
		beforeEach(function () {
			Page.open('Disabled');
		});

		it('should not display controls', function () {
			Page.delay(1000);
			expect(videoPlayerDisabled.mediaControlsFrame.getCSSProperty('opacity').value).to.equal(0);
		});

		it('should not display controls on click', function () {
			Page.delay(1000);
			videoPlayerDisabled.videoPlayerContainer.click();
			Page.delay(250);
			expect(videoPlayerDisabled.mediaControlsFrame.getCSSProperty('opacity').value).to.equal(0);
		});

		it('should display poster', function () {
			Page.delay(1000);
			expect(videoPlayerDisabled.video.getAttribute('poster')).to.equal('http://media.w3.org/2010/05/sintel/poster.png');
		});

		describe('5-way', function () {
			it('should not display controls on 5-way down', function () {
				Page.delay(1000);
				Page.spotlightDown();
				Page.delay(250);
				expect(videoPlayerDisabled.mediaControlsFrame.getCSSProperty('opacity').value).to.equal(0);
			});
		});
	});


	describe('spotlightDisabled', function () {
		beforeEach(function () {
			Page.open('SpotlightDisabled');
		});

		it('should not have the play/pause button focused', function () {
			Page.delay(1000);

			expect(videoPlayerSpotlightDisabled.playButton.isFocused()).to.not.be.true();
		});

		it('should play media on playButton click', function () {
			Page.delay(1000);
			expect(videoPlayerSpotlightDisabled.slider.getCSSProperty('width').value).to.equal('0px');

			videoPlayerSpotlightDisabled.playButton.click();
			Page.delay(2000);

			expect(videoPlayerSpotlightDisabled.slider.getCSSProperty('width').value).to.not.equal('0px');
		});

		it('should skip forwards/backwards on previous/next button click', function () {
			Page.delay(1000);
			expect(videoPlayerSpotlightDisabled.slider.getCSSProperty('width').value).to.equal('0px');
			videoPlayerSpotlightDisabled.nextButton.click();

			expect(videoPlayerSpotlightDisabled.slider.getCSSProperty('width').value).to.not.equal('0px');
			videoPlayerSpotlightDisabled.previousButton.click();
			expect(videoPlayerSpotlightDisabled.slider.getCSSProperty('width').value).to.equal('0px');
		});

		describe('5-way', function () {
			it('should not show controls on 5-way down', function () {
				Page.delay(1000);

				if (videoPlayerSpotlightDisabled.mediaControlsFrame.getCSSProperty('opacity').value === 1) {
					videoPlayerSpotlightDisabled.videoPlayerContainer.click();
					Page.delay(250);
				}

				expect(videoPlayerSpotlightDisabled.mediaControlsFrame.getCSSProperty('opacity').value).to.equal(0);
				Page.spotlightDown();
				Page.delay(250);
				expect(videoPlayerSpotlightDisabled.mediaControlsFrame.getCSSProperty('opacity').value).to.equal(0);
			});
		});
	});

	describe('custom', function () {
		beforeEach(function () {
			Page.open('Custom');
		});

		it('should hide controls after 3 seconds', function () {
			Page.delay(3500);
			expect(videoPlayerCustom.mediaControlsFrame.getCSSProperty('opacity').value).to.equal(0);
		});

		it('should jump 10 seconds on next/previous button click', function () {
			Page.delay(1000);
			expect(videoPlayerCustom.mediaControlsTime.getAttribute('innerHTML')).to.equal('00:00');
			videoPlayerCustom.nextButton.click();

			expect(videoPlayerCustom.mediaControlsTime.getAttribute('innerHTML')).to.equal('00:10');
			videoPlayerCustom.previousButton.click();
			expect(videoPlayerCustom.mediaControlsTime.getAttribute('innerHTML')).to.equal('00:00');

		});

		it('should have title', function () {
			Page.delay(1000);
			expect(videoPlayerCustom.title.getAttribute('innerHTML')).to.equal('Sandstone VideoPlayer Sample Video');
		});

		it('should hide title after 1 second', function () {
			Page.delay(2200);
			expect(videoPlayerCustom.titleFrame.getCSSProperty('opacity').value).to.equal(0);
		});

		describe('5-way', function () {
			it('should not jump on 5-way right', function () {
				Page.delay(1000);

				if (videoPlayerCustom.mediaControlsFrame.getCSSProperty('opacity').value === 1) {
					Page.backKey();
					Page.delay(250);
				}

				Page.spotlightRight();
				Page.delay(250);

				expect(videoPlayerCustom.slider.getCSSProperty('width').value).to.equal('0px');
			});
		});
	});

	describe('custom2', function () {
		beforeEach(function () {
			Page.open('Custom2');
		});

		it('should not autoshow controls', function () {
			Page.delay(1000);
			expect(videoPlayerCustom2.mediaControlsFrame.isExisting()).to.equal(false);
		});

		it('should not display slider controls', function () {
			Page.delay(1000);
			Page.spotlightDown();
			Page.delay(250);
			expect(videoPlayerCustom2.slider.isExisting()).to.equal(false);
		});

		it('should have seek functionality disabled', function () {
			Page.delay(1000);
			Page.spotlightDown();
			videoPlayerCustom2.nextButton.click();
			Page.delay(250);
			expect(videoPlayerCustom2.mediaControlsTime.getAttribute('innerHTML')).to.equal('00:00');
		});

		it('should display info component', function () {
			Page.delay(1000);
			Page.spotlightDown();
			Page.spotlightDown();
			Page.delay(250);

			expect(videoPlayerCustom2.mediaTitleInfoComponent.isExisting()).to.equal(true);
		});

	});
});
