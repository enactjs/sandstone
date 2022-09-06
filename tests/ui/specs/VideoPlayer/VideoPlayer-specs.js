const Page = require('./VideoPlayerPage');

describe('VideoPlayer', function () {

	const {
		videoPlayerDefault,
		videoPlayerDisabled,
		videoPlayerSpotlightDisabled,
		videoPlayerProps,
		videoPlayerProps2
	} = Page.components;

	describe('default', function () {

		beforeEach(async function () {
			await Page.open();
		});

		it('should have the play/pause button focused', async function () {
			await Page.delay(1000);
			const mediaControlsOpacity = await videoPlayerDefault.mediaControlsFrame.getCSSProperty('opacity');

			if (await mediaControlsOpacity.value === 0) {
				await Page.spotlightDown();
				await Page.delay(1000);
			}

			expect(await videoPlayerDefault.playButton.isFocused()).to.be.true();
		});

		it('should play media on playButton click', async function () {
			await Page.delay(1000);
			const initialSliderWidth = await videoPlayerDefault.slider.getCSSProperty('width');
			expect(await initialSliderWidth.value).to.equal('0px');

			await videoPlayerDefault.playButton.click();
			await Page.delay(5000);

			const sliderWidth = await videoPlayerDefault.slider.getCSSProperty('width');

			expect(await sliderWidth.value).to.not.equal('0px');
		});

		it('should skip forwards/backwards on previous/next button click', async function () {
			await Page.delay(1000);
			const initialSliderWidth = await videoPlayerDefault.slider.getCSSProperty('width');
			expect(await initialSliderWidth.value).to.equal('0px');

			await videoPlayerDefault.nextButton.click();
			const sliderWidth = await videoPlayerDefault.slider.getCSSProperty('width');
			expect(await sliderWidth.value).to.not.equal('0px');

			await videoPlayerDefault.previousButton.click();
			const sliderWidthSecond = await videoPlayerDefault.slider.getCSSProperty('width');
			expect(await sliderWidthSecond.value).to.equal('0px');
		});

		it('should hide controls after 5 seconds', async function () {
			await Page.delay(1000);

			const mediaControlsOpacity = await videoPlayerDefault.mediaControlsFrame.getCSSProperty('opacity');
			expect(await mediaControlsOpacity.value).to.equal(1);

			await Page.delay(5000);
			const delayedMediaControlsOpacity = await videoPlayerDefault.mediaControlsFrame.getCSSProperty('opacity');
			expect(await delayedMediaControlsOpacity.value).to.equal(0);
		});

		describe('5-way', function () {
			it('should focus `play` button on 5-way back, then down', async function () {
				await Page.delay(1000);
				await Page.backKey();
				await Page.spotlightDown();

				expect(await videoPlayerDefault.playButton.isFocused()).to.be.true();
			});

			it('should focus `previous` buttons on 5-way left', async function () {
				await Page.delay(1000);
				expect(await videoPlayerDefault.playButton.isFocused()).to.be.true();

				await Page.spotlightLeft();

				expect(await videoPlayerDefault.previousButton.isFocused()).to.be.true();
			});

			it('should focus `next` button on 5-way right', async function () {
				await Page.delay(1000);
				expect(await videoPlayerDefault.playButton.isFocused()).to.be.true();

				await Page.spotlightRight();

				expect(await videoPlayerDefault.nextButton.isFocused()).to.be.true();
			});

			it('should focus `list` button on 5-way down 2 times', async function () {
				await Page.delay(1000);
				expect(await videoPlayerDefault.playButton.isFocused()).to.be.true();
				await Page.spotlightDown();
				await Page.spotlightDown();

				await Page.delay(500);

				expect(await videoPlayerDefault.mediaControlsListButton.isFocused()).to.be.true();
			});

			it('should block 5-way key when playcontrols transitioning [QWTC-2524]', async function () {
				await Page.delay(1000);
				// Step3 Precondition: The Play Controls do not show.
				const mediaControlsOpacity = await videoPlayerDefault.mediaControlsFrame.getCSSProperty('opacity');

				if (await mediaControlsOpacity.value === 0) {
					// Step 4-1: 5-way Down.
					await Page.spotlightDown();
					await Page.delay(1000);
				}

				expect(await videoPlayerDefault.playButton.isFocused()).to.be.true();
				// Setp 4-2: 5-way Down again.
				// Step 4-3: 5-way Up quickly.
				await Page.spotlightDown();
				await Page.spotlightUp;

				await Page.delay(500);
				// Step 4 Verify: Spotlight is on the First button (first controls icon) in the 'more' components.
				expect(await videoPlayerDefault.mediaControlsListButton.isFocused()).to.be.true();
			});

			it('should focus slider knob on 5-way up and seek on 5-way right and left', async function () {
				await Page.delay(1000);
				expect(await videoPlayerDefault.playButton.isFocused()).to.be.true();
				await Page.spotlightUp();

				await Page.delay(500);

				expect(await videoPlayerDefault.sliderComponent.isFocused()).to.be.true();
				const initialSliderWidth = await videoPlayerDefault.slider.getCSSProperty('width');
				expect(await initialSliderWidth.value).to.equal('0px');
				await Page.spotlightRight();
				await Page.spotlightSelect();

				await Page.delay(500);
				const sliderWidth = await videoPlayerDefault.slider.getCSSProperty('width');
				expect(await sliderWidth.value).to.not.equal('0px');

				await Page.spotlightLeft();
				await Page.spotlightSelect();
				await Page.delay(500);
				const sliderWidthSecond = await videoPlayerDefault.slider.getCSSProperty('width');
				expect(await sliderWidthSecond.value).to.equal('0px');
			});
		});
	});

	describe('disabled', function () {
		beforeEach(async function () {
			await Page.open('Disabled');
		});

		it('should not display controls', async function () {
			await Page.delay(1000);
			const mediaControlsOpacity = await videoPlayerDisabled.mediaControlsFrame.getCSSProperty('opacity');

			expect(await mediaControlsOpacity.value).to.equal(0);
		});

		it('should not display controls on click', async function () {
			await Page.delay(1000);
			await videoPlayerDisabled.videoPlayerContainer.click();
			await Page.delay(250);
			const mediaControlsOpacity = await videoPlayerDisabled.mediaControlsFrame.getCSSProperty('opacity');

			expect(await mediaControlsOpacity.value).to.equal(0);
		});

		it('should display poster', async function () {
			await Page.delay(1000);

			expect(await videoPlayerDisabled.video.getAttribute('poster')).to.equal('http://media.w3.org/2010/05/sintel/poster.png');
		});

		describe('5-way', function () {
			it('should not display controls on 5-way down', async function () {
				await Page.delay(1000);
				await Page.spotlightDown();

				await Page.delay(250);

				const mediaControlsOpacity = await videoPlayerDisabled.mediaControlsFrame.getCSSProperty('opacity');
				expect(await mediaControlsOpacity.value).to.equal(0);
			});
		});
	});


	describe('spotlightDisabled', function () {
		beforeEach(async function () {
			await Page.open('SpotlightDisabled');
		});

		it('should not have the play/pause button focused', async function () {
			await Page.delay(1000);

			expect(await videoPlayerSpotlightDisabled.playButton.isFocused()).to.not.be.true();
		});

		it('should play media on playButton click', async function () {
			await Page.delay(1000);
			const initialSliderWidth = await videoPlayerSpotlightDisabled.slider.getCSSProperty('width');
			expect(await initialSliderWidth.value).to.equal('0px');

			await videoPlayerSpotlightDisabled.playButton.click();
			await Page.delay(3000);

			const sliderWidth = await videoPlayerSpotlightDisabled.slider.getCSSProperty('width');
			expect(await sliderWidth.value).to.not.equal('0px');
		});

		it('should skip forwards/backwards on previous/next button click', async function () {
			await Page.delay(1000);
			const initialSliderWidth = await videoPlayerSpotlightDisabled.slider.getCSSProperty('width');
			expect(await initialSliderWidth.value).to.equal('0px');

			await videoPlayerSpotlightDisabled.nextButton.click();

			const sliderWidth = await videoPlayerSpotlightDisabled.slider.getCSSProperty('width');
			expect(await sliderWidth.value).to.not.equal('0px');

			await videoPlayerSpotlightDisabled.previousButton.click();
			const sliderWidthSecond = await videoPlayerSpotlightDisabled.slider.getCSSProperty('width');
			expect(await sliderWidthSecond.value).to.equal('0px');
		});

		describe('5-way', function () {
			it('should not show controls on 5-way down', async function () {
				await Page.delay(1000);
				const initialMediaControlsOpacity = await videoPlayerSpotlightDisabled.mediaControlsFrame.getCSSProperty('opacity');

				if (await initialMediaControlsOpacity.value === 1) {
					await videoPlayerSpotlightDisabled.videoPlayerContainer.click();
					await Page.delay(250);
				}

				const mediaControlsOpacity = await videoPlayerSpotlightDisabled.mediaControlsFrame.getCSSProperty('opacity');
				expect(await mediaControlsOpacity.value).to.equal(0);

				await Page.spotlightDown();
				await Page.delay(250);

				const mediaControlsOpacitySecond = await videoPlayerSpotlightDisabled.mediaControlsFrame.getCSSProperty('opacity');
				expect(await mediaControlsOpacitySecond.value).to.equal(0);
			});
		});
	});

	describe('props', function () {
		beforeEach(async function () {
			await Page.open('Props');
		});

		it('should hide controls after 3 seconds', async function () {
			await Page.delay(1000);
			const initialMediaControlsOpacity = await videoPlayerProps.mediaControlsFrame.getCSSProperty('opacity');
			expect(await initialMediaControlsOpacity.value).to.equal(1);

			await Page.delay(3000);
			const mediaControlsOpacity = await videoPlayerProps.mediaControlsFrame.getCSSProperty('opacity');
			expect(await mediaControlsOpacity.value).to.equal(0);
		});

		it('should jump 10 seconds on next/previous button click', async function () {
			await Page.delay(1000);
			expect(await videoPlayerProps.mediaControlsTime.getText()).to.equal('00:00');
			await videoPlayerProps.nextButton.click();

			expect(await videoPlayerProps.mediaControlsTime.getText()).to.equal('00:10');
			await videoPlayerProps.previousButton.click();
			expect(await videoPlayerProps.mediaControlsTime.getText()).to.equal('00:00');

		});

		it('should have title', async function () {
			await Page.delay(1000);

			expect(await videoPlayerProps.title.getText()).to.equal('Sandstone VideoPlayer Sample Video');
		});

		it('should hide title after 1 second', async function () {
			const initialTitleOpacity = await videoPlayerProps.titleFrame.getCSSProperty('opacity');
			expect(await initialTitleOpacity.value).to.equal(1);

			await Page.delay(2000);
			const titleOpacity = await videoPlayerProps.titleFrame.getCSSProperty('opacity');
			expect(await titleOpacity.value).to.equal(0);
		});

		describe('5-way', function () {
			it('should not jump on 5-way right', async function () {
				await Page.delay(1000);

				const mediaControlsOpacity = await videoPlayerProps.mediaControlsFrame.getCSSProperty('opacity');
				if (await mediaControlsOpacity.value === 1) {
					await Page.backKey();
					await Page.delay(250);
				}

				await Page.spotlightRight();
				await Page.delay(250);

				const sliderWidth = await videoPlayerProps.slider.getCSSProperty('width');
				expect(await sliderWidth.value).to.equal('0px');
			});
		});
	});

	describe('props2', function () {
		beforeEach(async function () {
			await Page.open('Props2');
		});

		it('should not autoshow controls', async function () {
			await Page.delay(1000);

			expect(await videoPlayerProps2.mediaControlsFrame.isExisting()).to.equal(false);
		});

		it('should not display slider controls', async function () {
			await Page.delay(1000);
			await Page.spotlightDown();
			await Page.delay(250);

			expect(await videoPlayerProps2.slider.isExisting()).to.equal(false);
		});

		it('should have seek functionality disabled', async function () {
			await Page.delay(1000);
			await Page.spotlightDown();
			await videoPlayerProps2.nextButton.click();
			await Page.delay(250);

			expect(await videoPlayerProps2.mediaControlsTime.getText()).to.equal('00:00');
		});

		it('should display info component', async function () {
			await Page.delay(1000);
			await Page.spotlightDown();
			await Page.spotlightDown();
			await Page.delay(250);

			expect(await videoPlayerProps2.mediaTitleInfoComponent.isExisting()).to.equal(true);
		});
	});
});
