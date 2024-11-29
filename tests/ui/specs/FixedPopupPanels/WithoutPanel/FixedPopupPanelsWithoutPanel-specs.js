const Page = require('./FixedPopupPanelsWithoutPanelPage');


describe('FixedPopupPanelsWithoutPanel', function () {
	const Interface = Page.fixedPopupPanels;

	describe('5-way', function () {

		beforeEach(async function () {
			await Page.open();
		});

		it('should set focus to the activator when closed', async function () {
			expect(await Interface.openButton.isFocused()).toBe(true);

			await Page.spotlightSelect();

			await Page.waitForFocused(Interface.item1);

			await Page.backKey();

			await Page.waitForFocused(Interface.openButton, {targetName: 'open button'});
		});
	});
});
