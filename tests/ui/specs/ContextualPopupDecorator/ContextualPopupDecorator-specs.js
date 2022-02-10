const Page = require('./ContextualPopupDecoratorPage');

describe('ContextualPopupDecorator', function () {

	beforeEach(async function () {
		await Page.open();
	});

	const {
		button1
	} = Page.components;

	describe('not using open', function () {

		beforeEach(function () {
			button1.focus();
		});

		it('should focus the first button on start', async function () {
			expect(await button1.self.isFocused()).to.be.true();
		});

		describe('using 5-way', function () {
			// The menu is open and the first item has focus
			beforeEach(function () {
				Page.spotlightSelect();
			});

			it('should have Spotlight on close button when ContextualPopup opens - [QWT-2731]', async function () {
				// 5-waySelectableActivator: Button Retains Spotlight when Popup Hides
				let popupButton = $('#popupButton');

				expect(await popupButton.isFocused()).to.be.true();
			});
		});
	});
});
