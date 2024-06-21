const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('Disabled item', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should navigate disabled and enabled items [QWTC-2316]', async function () {
		// Step 2: Uncheck the "Native Scrolling" Checkbox item.
		// Set translate ScrollMode.
		await Page.buttonNativeScroll.moveTo();
		await Page.spotlightSelect();
		// Step 3: Click on DisabledItems CheckboxItem.(DisabledItem Button for this test.)
		await Page.buttonDisabledItem.moveTo();
		await Page.spotlightSelect();
		// Step 4: 5-way Spot the first item ('Item 000').
		await Page.buttonLeft.moveTo();
		await Page.spotlightRight();
		await expectFocusedItem(0);
		// Step 5: 5-way Down several times to the next enabled item.
		// Step 5-2 Verify: Spotlight displays on each Item (Disabled and Enabled) as the list scrolls up.
		// Page.fiveWayToItem and Page.itemDisabled function included Step 5's Verify(5-2).
		let index = 1;
		for (; index < 15; index++) {
			await Page.fiveWayToItem(index);
			expect(await Page.itemDisabled()).toBe(true);
		}
		await Page.fiveWayToItem(index);
		expect(await Page.itemDisabled()).toBe(false);
		// Step 5-3: Spotlight displays on the next Enabled item.
		await expectFocusedItem(15);
		// Step 6: 5-way Up several times to the previous enabled item.
		// Step 6-2: Spotlight displays on each Item (Disabled and Enabled) as the list scrolls down.
		for (index = 14; index > 0; index--) {
			await Page.fiveWayToItem(index);
			expect(await Page.itemDisabled()).toBe(true);
		}
		await Page.fiveWayToItem(index);
		expect(await Page.itemDisabled()).toBe(false);
		// Step 6-3: Spotlight displays on the previous Enabled item.
		await expectFocusedItem(0);
	});
});
