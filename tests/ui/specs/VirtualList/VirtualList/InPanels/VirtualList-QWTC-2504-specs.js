const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('VirtualList in Panels', function () {
	beforeEach(async function () {
		await Page.open('InPanels');
	});

	it('should spotlight not be truncated [QWTC-2504]', async function () {
		// Step 3: Click on Show header children button in header.
		await Page.buttonHeaderChildren.moveTo();
		await Page.spotlightSelect();
		// Step 3 Verify: The Header Item shows.
		await Page.spotlightDown();
		expect(await Page.textContent()).toBe('Header Item');
		// Step 4-1: 5-way Spot the first Item on the list.
		await Page.spotlightDown();
		await expectFocusedItem(0);
		// Step 4-2: Keep 5-way Down until scroll happens.
		const bottomVisibleItem = (await Page.bottomVisibleItemId()).slice(4);
		await Page.fiveWayToItem(Number(bottomVisibleItem));
		await Page.delay(500);
		expect(Number(await Page.getScrollThumbPosition())).toBeGreaterThan(0);
		// Verify that the list is fully displayed.
		// Step 4 Verify: Focus on item is not truncated.
		// should bigger than item size(78 for 2k, 156 for 4k)
		expect(((await Page.getListRect()).bottom - (await Page.activeElementRect()).top)).toBeGreaterThan(78);
	});
});
