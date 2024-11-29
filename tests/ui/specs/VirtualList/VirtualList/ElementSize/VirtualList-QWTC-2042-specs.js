const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('spotlight size compare', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should maintain spotlight size when spacing 100[QWTC-2042]', async function () {
		// The default size of Spotlight is 156 for 4k and 78 for FHD.
		await Page.buttonLeft.moveTo();
		await Page.spotlightRight();
		const defaultSpotlightSize = await Page.spotlightSize();
		// Step 3 Verify: The default value for the 'spacing' knob is 0.
		const defaultSpacing = await Page.itemSpacing();
		expect(defaultSpacing).toBe(0);
		// Step 4: Knobs > VirtualList > spacing > 100
		await Page.inputfieldSpacing.moveTo();
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.numPad(1);
		await Page.numPad(0);
		await Page.numPad(0);
		// In case of TV, VKB is opened when inputfield clicking. So add escape key for VKB closing.
		await Page.backKey();
		// 100 spacing value is 50 for 4k and 25 for FHD.
		// Step 4 Verify: The gap between items grows bigger.
		const changedSpacing = await Page.itemSpacing();
		expect(changedSpacing).toBe(50);
		// Step5-1: Hover an item.
		await Page.spotlightDown();
		await (await Page.item(5)).moveTo();
		await expectFocusedItem(5);
		// Step5 Verify: The spotlight size does not change.
		expect(await Page.spotlightSize()).toBe(defaultSpotlightSize);
		// Step 6: Knobs > VirtualList > spacing > 50
		await Page.inputfieldSpacing.moveTo();
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.backSpace();
		await Page.backSpace();
		await Page.numPad(5);
		await Page.numPad(0);
		await Page.backKey();
		// 50 spacing value is 50 for 4k and 25 for FHD.
		const newSpacing = await Page.itemSpacing();
		expect(newSpacing).toBe(25);
		// Step7-1: Hover an item.
		await Page.spotlightDown();
		await (await Page.item(3)).moveTo();
		await expectFocusedItem(3);
		// Step7 Verify: The spotlight size does not change.
		expect(await Page.spotlightSize()).toBe(defaultSpotlightSize);
	});
});
