const Page = require('./QuickGuidePanelsPage');

describe('QuickGuidePanels', function () {
	const quickGuidePanels = Page.components.quickGuidePanels;

	beforeEach(async function () {
		await Page.open();
	});

	describe('5-way', function () {
		it('should focus in order of the last focused button, the next button, and the close button', async function () {
			expect(await quickGuidePanels.view1.isExisting()).toBe(true);
			expect(await (await quickGuidePanels.nextButton()).isFocused()).toBe(true);
			await Page.spotlightSelect();

			expect(await quickGuidePanels.view2.isExisting()).toBe(true);
			expect(await (await quickGuidePanels.nextButton()).isFocused()).toBe(true);
			await Page.spotlightSelect();

			expect(await quickGuidePanels.view3.isExisting()).toBe(true);
			expect(await (await quickGuidePanels.closeButton()).isFocused()).toBe(true);
			await Page.spotlightLeft();
			await Page.spotlightSelect();

			expect(await quickGuidePanels.view2.isExisting()).toBe(true);
			expect(await (await quickGuidePanels.prevButton()).isFocused()).toBe(true);
			await Page.spotlightSelect();

			expect(await quickGuidePanels.view1.isExisting()).toBe(true);
			expect(await (await quickGuidePanels.nextButton()).isFocused()).toBe(true);
		});
	});
});
