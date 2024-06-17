const Page = require('./AlertPage');
const {expectClosed, expectOpen, validateTitle} = require('./Alert-utils.js');

describe('Alert', () => {

	const {alertCommon, components} = Page;
	beforeEach(async () => {
		await Page.open();
	});

	// Using 5-way
	describe('using 5-way', () => {
		it('should spot the fullscreen alert button', async () => {
			expect(await alertCommon.buttonFullscreen.isFocused()).toBe(true);
		});

		it('should spot the cancel button', async () => {
			await Page.spotlightSelect();
			await Page.spotlightRight();

			expect(await components.alertFullscreen.buttonCancel.isFocused()).toBe(true);
		});

		it('should close the fullscreen alert using the ok button', async () => {
			await Page.spotlightSelect();
			await Page.spotlightSelect();

			expect(await alertCommon.buttonFullscreen.isFocused()).toBe(true);
		});

		it('should close the fullscreen alert using the back key', async () => {
			await Page.spotlightSelect();
			await Page.backKey();

			expect(await alertCommon.buttonFullscreen.isFocused()).toBe(true);
		});

		it('should spot the cancel button', async () => {
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.spotlightDown();

			expect(await components.alertOverlay.buttonCancel.isFocused()).toBe(true);
		});

		it('should close the overlay alert using the close button', async () => {
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.spotlightDown();
			await Page.spotlightSelect();
			browser.pause(100);

			expect(await alertCommon.buttonOverlay.isFocused()).toBe(true);
		});

		it('should close the overlay alert using the back key', async () => {
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.backKey();

			expect(await alertCommon.buttonOverlay.isFocused()).toBe(true);
		});
	});

	// Using pointer
	describe('using pointer', () => {
		it('should focus the fullscreen alert button', async () => {
			expect(await alertCommon.buttonFullscreen.isFocused()).toBe(true);
		});

		it('should open the fullscreen alert', async () => {
			alertCommon.buttonFullscreen.click();

			browser.pause(100);
			expectOpen(alertCommon);
			validateTitle(components.alertFullscreen, 'Fullscreen Alert\nOk\nCancel');
		});

		it('should open and close the fullscreen alert', async () => {
			alertCommon.buttonFullscreen.click();

			browser.pause(100);
			expectOpen(alertCommon);
			components.alertFullscreen.buttonOK.click();

			browser.pause(100);
			expectClosed(alertCommon);
		});

		it('should open the overlay alert', async () => {
			alertCommon.buttonOverlay.click();

			browser.pause(100);
			expectOpen(alertCommon);
			validateTitle(components.alertOverlay, 'Overlay Alert\nOk\nCancel');
		});

		it('should open and close the overlay alert', async () => {
			alertCommon.buttonOverlay.click();

			browser.pause(100);
			expectOpen(alertCommon);

			components.alertOverlay.buttonOK.click();

			browser.pause(100);
			expectClosed(alertCommon);
		});

		it('should open and close the overlay alert by clicking the background', async () => {
			alertCommon.buttonOverlay.click();

			browser.pause(100);
			expectOpen(alertCommon);

			const wrapper = $('.ThemeDecorator_ThemeDecorator_bg');
			wrapper.click({x: 0, y: 0});

			browser.pause(100);
			expectClosed(alertCommon);
		});
	});
});
