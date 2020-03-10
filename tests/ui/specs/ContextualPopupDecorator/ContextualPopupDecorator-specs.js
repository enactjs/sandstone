const Page = require('./ContextualPopupDecoratorPage');

describe('ContextualPopupDecorator', function () {

	beforeEach(function () {
		Page.open();
	});

	const {
		button1
	} = Page.components;

	describe('not using open', function () {

		beforeEach(function () {
			button1.focus();
		});

		it('should focus the first button on start', function () {
			expect(button1.self.hasFocus()).to.be.true();
		});

		describe('using 5-way', function () {
			// The menu is open and the first item has focus
			beforeEach(function () {
				Page.spotlightSelect();
			});

			// [GT-28289] - Spotlight remains on Close Button inside the Contextual Popup
			it('should have Spotlight on close button when ContextualPopup opens', function () {
				let closeButton = browser.element('.ContextualPopupDecorator_ContextualPopup_closeButton');

				expect(closeButton.hasFocus()).to.be.true();

				Page.spotlightUp();
				expect(closeButton.hasFocus()).to.be.true();
			});

			// [GT-28291] - 5-waySelectableActivator: Button Retains Spotlight when Popup Hides
			it('should have Spotlight on close button when ContextualPopup opens', function () {
				let closeButton = browser.element('.ContextualPopupDecorator_ContextualPopup_closeButton');

				expect(closeButton.hasFocus()).to.be.true();

				Page.spotlightSelect();
				expect(button1.self.hasFocus()).to.be.true();
			});
		});
	});


});
