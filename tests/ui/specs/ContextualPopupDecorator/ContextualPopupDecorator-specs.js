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
			expect(button1.self.isFocused()).to.be.true();
		});

		describe('using 5-way', function () {
			// The menu is open and the first item has focus
			beforeEach(function () {
				Page.spotlightSelect();
			});

			it('should have Spotlight on close button when ContextualPopup opens - [QWT-2731]', function () {
				// 5-waySelectableActivator: Button Retains Spotlight when Popup Hides
				let popupButton = $('#popupButton');

				expect(popupButton.isFocused()).to.be.true();
			});
		});
	});
});
