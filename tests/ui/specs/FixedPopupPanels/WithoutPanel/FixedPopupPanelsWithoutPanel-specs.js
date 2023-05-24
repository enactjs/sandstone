//const Page = require('./FixedPopupPanelsWithoutPanelPage');
import Page from './FixedPopupPanelsWithoutPanelPage.js';


describe('FixedPopupPanelsWithoutPanel', function () {
	const Interface = Page.fixedPopupPanels;

	describe('5-way', function () {

		beforeEach(async function () {
			await Page.open();
		});

		it('should set focus to the activator when closed', async function () {
			expect(await Interface.openButton.isFocused(), 'focus Open button').to.be.true();

			await Page.spotlightSelect();

			await Page.waitForFocused(Interface.item1);

			await Page.backKey();

			await Page.waitForFocused(Interface.openButton, {targetName: 'open button'});
		});
	});
});
