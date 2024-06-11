const Page = require('../VirtualGridListPage');
const {expectFocusedItem, waitUntilFocused, waitUntilVisible, expectNoFocusedItem} = require('../../VirtualList-utils');

describe('Focus after calling scrollTo()', function () {
	beforeEach(async function () {
		await Page.open('ScrollTo');
	});

	it('should focus after calling scrollTo() [QWTC-2543]', async function () {
		// wait for view open.
		await waitUntilFocused(0);
		// Step 2-1: Press Page Down a few times until 'Click me' item  is visible.
		await Page.checkScrollbyPagekey('down');
		await Page.checkScrollbyPagekey('down');
		await Page.checkScrollbyPagekey('down');
		// Step 2-2: Set to pointer mode.
		// Step 2-3: Hover the 'Click me' item.
		await Page.showPointerByKeycode();
		await (await Page.item(20)).moveTo();
		// Step 3: Click 'Click me' item.
		await (await Page.item(20)).click();
		await Page.delay(500);
		// Step 3-1 Verify: list is scrolled to first item.
		expect(await Page.topLeftVisibleItemId()).toBe('item0');
		// Step 3-2 Verify: There is no spotlight on any item.
		await expectNoFocusedItem();
		// Step 4: Press 5-way Left.
		// Step 4-1 Verify: Set to 5-way mode.
		await Page.hidePointerByKeycode();
		await Page.spotlightLeft();
		// Step 4-2 Verify: Spotlight on item0.
		await expectFocusedItem(0);
		// Step 5: Press 5-way down 5 times.
		for (let i = 1; i < 6; i++) {
			await Page.spotlightDown();
			await waitUntilFocused(i * 4);
			await waitUntilVisible(i * 4);
		}
		await Page.delay(500);
		// Step 6: Press 5-way OK.
		await Page.spotlightSelect();
		// Step 6-1 Verify: list is scrolled to first item.
		expect(await Page.topLeftVisibleItemId()).toBe('item0');
		// Step 6-2 Verify: Spotlight on item0.
		await expectFocusedItem(0);
	});
});

