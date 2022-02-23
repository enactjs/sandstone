const Page = require('./AlertPage');
const {expectClosed, expectOpen, validateTitle} = require('./Alert-utils.js');

describe('Alert', () => {

	const {alertCommon, components} = Page;
	beforeEach(() => {
		Page.open();
	});

	// Using 5-way
	describe('using 5-way', () => {
		it('should spot the fullscreen alert button', () => {
			expect(alertCommon.buttonFullscreen.isFocused()).to.be.true();
		});

		it('should spot the cancel button', () => {
			Page.spotlightSelect();
			Page.spotlightRight();

			expect(components.alertFullscreen.buttonCancel.isFocused()).to.be.true();
		});

		it('should close the fullscreen alert using the ok button', () => {
			Page.spotlightSelect();
			Page.spotlightSelect();

			expect(alertCommon.buttonFullscreen.isFocused()).to.be.true();
		});

		it('should close the fullscreen alert using the back key', () => {
			Page.spotlightSelect();
			Page.backKey();

			expect(alertCommon.buttonFullscreen.isFocused()).to.be.true();
		});

		it('should spot the cancel button', () => {
			Page.spotlightRight();
			Page.spotlightSelect();
			Page.spotlightDown();

			expect(components.alertOverlay.buttonCancel.isFocused()).to.be.true();
		});

		it('should close the overlay alert using the close button', () => {
			Page.spotlightRight();
			Page.spotlightSelect();
			Page.spotlightDown();
			Page.spotlightSelect();

			expect(alertCommon.buttonOverlay.isFocused()).to.be.true();
		});

		it('should close the overlay alert using the back key', () => {
			Page.spotlightRight();
			Page.spotlightSelect();
			Page.backKey();

			expect(alertCommon.buttonOverlay.isFocused()).to.be.true();
		});
	});

	// Using pointer
	describe('using pointer', () => {
		it('should focus the fullscreen alert button', () => {
			expect(alertCommon.buttonFullscreen.isFocused()).to.be.true();
		});

		it('should open the fullscreen alert', () => {
			alertCommon.buttonFullscreen.click();

			browser.pause(100);
			expectOpen(alertCommon);
			validateTitle(components.alertFullscreen, 'Fullscreen Alert\nOk\nCancel');
		});

		it('should open and close the fullscreen alert', () => {
			alertCommon.buttonFullscreen.click();

			browser.pause(100);
			expectOpen(alertCommon);
			components.alertFullscreen.buttonOK.click();

			browser.pause(100);
			expectClosed(alertCommon);
		});

		it('should open the overlay alert', () => {
			alertCommon.buttonOverlay.click();

			browser.pause(100);
			expectOpen(alertCommon);
			validateTitle(components.alertOverlay, 'Overlay Alert\nOk\nCancel');
		});

		it('should open and close the overlay alert', () => {
			alertCommon.buttonOverlay.click();

			browser.pause(100);
			expectOpen(alertCommon);

			components.alertOverlay.buttonOK.click();

			browser.pause(100);
			expectClosed(alertCommon);
		});

		it('should open and close the overlay alert by clicking the background', () => {
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
