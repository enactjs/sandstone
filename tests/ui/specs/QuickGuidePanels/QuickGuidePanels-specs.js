const Page = require('./QuickGuidePanelsPage');

describe('QuickGuidePanels', function () {
	const quickGuidePanels = Page.components.quickGuidePanels;

	beforeEach(async function () {
		await Page.open();
	});

	describe('5-way', function () {
		it('should focus in order of the last focused button, the next button, and the close button', async function () {
			expect(await quickGuidePanels.view1.isExisting()).to.be.true();
			expect(await (await quickGuidePanels.nextButton()).isFocused()).to.be.true();
			await Page.spotlightSelect();

			expect(await quickGuidePanels.view2.isExisting()).to.be.true();
			expect(await (await quickGuidePanels.nextButton()).isFocused()).to.be.true();
			await Page.spotlightSelect();

			expect(await quickGuidePanels.view3.isExisting()).to.be.true();
			expect(await (await quickGuidePanels.closeButton()).isFocused()).to.be.true();
			await Page.spotlightLeft();
			await Page.spotlightSelect();

			expect(await quickGuidePanels.view2.isExisting()).to.be.true();
			expect(await (await quickGuidePanels.prevButton()).isFocused()).to.be.true();
			await Page.spotlightSelect();

			expect(await quickGuidePanels.view1.isExisting()).to.be.true();
			expect(await (await quickGuidePanels.nextButton()).isFocused()).to.be.true();
		});
	});
});
