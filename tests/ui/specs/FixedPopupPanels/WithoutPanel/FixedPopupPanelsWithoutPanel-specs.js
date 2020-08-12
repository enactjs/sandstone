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

			Page.waitForFocus(Interface.item1);

			Page.waitTransitionEnd(1000, 'wait for FixedPopupPanels to close', () => {
				Page.backKey();
			});

			Page.waitForFocus(Interface.openButton, {targetName: 'open button'});
		});
	});
});
