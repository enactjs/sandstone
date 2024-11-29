const Page = require('../VirtualGridListPage');

describe('Change Spacing', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should change spotlight size when spaceing change [QWTC-2029]', async function () {
		// Check default Spacing size.
		const defaultSpacingWidth = (await Page.itemSpacing(0, 1)).width;
		const defaultSpacingHeight = (await Page.itemSpacing(0, 5)).height;
		expect(defaultSpacingHeight).toBe(12);
		expect(defaultSpacingWidth).toBe(12);

		// Step 3: Knobs > VirtualGridList > spacing > 200
		await Page.inputSpacing.moveTo();
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.numPad(0);
		await Page.numPad(0);
		await Page.spotlightUp();

		// Step 3-1 Verify: The gap between items grow bigger. The spacing should be 100 for FHD.
		expect((await Page.itemSpacing(0, 1)).width).toBe(100);
		expect((await Page.itemSpacing(0, 4)).height).toBe(100);

		// Step 4: Knobs > VirtualGridList > spacing > 2
		await Page.spotlightDown();
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.backSpace();
		await Page.backKey();
		await Page.spotlightRight();

		// Step 4-1 Verify: The gap between items grow shrink. The spacing should be 1 for FHD.
		expect((await Page.itemSpacing(0, 1)).width).toBe(1);
		expect((await Page.itemSpacing(0, 5)).height).toBe(1);
	});
});
