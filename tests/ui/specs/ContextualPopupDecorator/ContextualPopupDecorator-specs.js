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

			// [GT-28276] - The menu expands (verify step 3 - part 1)
			it('should have Spotlight on close button when ContextualPopup opens', function () {
				let closeButton = browser.element(`.ContextualPopupDecorator_ContextualPopup_closeButton`);

				expect(closeButton.hasFocus()).to.be.true();

				Page.spotlightUp();
				expect(closeButton.hasFocus()).to.be.true();
			});
		});
	});


});
