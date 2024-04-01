const Page = require('./MediaOverlayPage');

describe('MediaOverlay', function () {
	const mediaOverlay1 = Page.components.mediaOverlay1;
	const mediaOverlay2LongText = Page.components.mediaOverlay2LongText;

	beforeEach(async function () {
		await Page.open();
	});

	it('should have focus on first mediaOverlay at start', async function () {
		expect(await mediaOverlay1.self.isFocused()).toBe(true);
	});

	it('should move focus on second mediaOverlay on 5-way down', async function () {
		expect(await mediaOverlay1.self.isFocused()).toBe(true);
		await Page.spotlightDown();
		expect(await mediaOverlay2LongText.self.isFocused()).toBe(true);
	});

	it('should have animated Marquee when having long text', async function () {
		expect(await mediaOverlay2LongText.valueText).toBe('Media Overlay very long text');
		await browser.pause(3000);
		expect(await mediaOverlay2LongText.isMarqueeAnimated).toBe(true);
	});

});
