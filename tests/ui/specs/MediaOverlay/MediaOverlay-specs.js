const Page = require('./MediaOverlayPage');

describe('MediaOverlay', function () {
	const mediaOverlay1 = Page.components.mediaOverlay1;
	const mediaOverlay2LongText = Page.components.mediaOverlay2LongText;

	beforeEach(function () {
		Page.open();
	});

	it('should have focus on first mediaOverlay at start', function () {
		expect(mediaOverlay1.self.isFocused()).to.be.true();
	});

	it('should move focus on second mediaOverlay on 5-way down', function () {
		expect(mediaOverlay1.self.isFocused()).to.be.true();
		Page.spotlightDown();
		expect(mediaOverlay2LongText.self.isFocused()).to.be.true();
	});

	it('should have animated Marquee when having long text', function () {
		expect(mediaOverlay2LongText.valueText).to.equal('Media Overlay very long text');
		browser.pause(2000);
		expect(mediaOverlay2LongText.isMarqueeAnimated).to.be.true();
	});

});
