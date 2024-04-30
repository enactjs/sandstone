const Page = require('./FixedPopupPanelsWithPopupOpenPage');

describe('FixedPopupPanels', function () {
	const Interface = Page.fixedPopupPanels;

	beforeEach(async function () {
		await Page.open('WithPopupOpen');
	});

	describe('5-way', function () {

		it('should not set focus in the popup panel when the popup is closed', async function () {
			expect(await Interface.closeButton.isFocused(), 'focus Close button').to.be.true();

			await Page.spotlightSelect();
			await Page.delay(500);

			expect(await Interface.openButton.isFocused(), 'focus Open button').to.be.true();
		});
	});
});
