const Page = require('./FixedPopupPanelsWithoutPanelPage');


describe('FixedPopupPanelsWithoutPanel', function () {
	const Interface = Page.fixedPopupPanels;

	describe('5-way', function () {

		beforeEach(function () {
			Page.open();
		});

		it('should set focus to the activator when closed', function () {
			expect(Interface.openButton.isFocused(), 'focus Open button').to.be.true();

			Page.spotlightSelect();

			Page.waitForFocused(Interface.item1);

			Page.backKey();

			Page.waitForFocused(Interface.openButton, {targetName: 'open button'});
		});
	});
});
