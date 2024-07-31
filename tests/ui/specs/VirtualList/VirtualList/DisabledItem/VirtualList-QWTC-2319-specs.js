const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('Disabled item', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should navigate disabled and enabled items with native scrollmode [QWTC-2319]', async function () {
		// Step 2: Toggle on DisabledItems.(DisabledItem Button for this test.)
		await Page.buttonDisabledItem.moveTo();
		await Page.spotlightSelect();
		// Step 3: 5-way Spot the first item ('Item 000').
		await Page.buttonLeft.moveTo();
		await Page.spotlightRight();
		await expectFocusedItem(0);
		// Step 4: 5-way Down several times to the next enabled item.
		let index = 1;
		for (; index < 15; index++) {
			await Page.fiveWayToItem(index);
			expect(await Page.itemDisabled()).toBe(true);
		}
		await Page.fiveWayToItem(index);
		expect(await Page.itemDisabled()).toBe(false);
		// Step 4-3: Spotlight displays on the next Enabled item.
		await expectFocusedItem(15);
		// Step 5: 5-way Up several times.
		for (index = 14; index > 0; index--) {
			await Page.fiveWayToItem(index);
			expect(await Page.itemDisabled()).toBe(true);
		}
		await Page.fiveWayToItem(index);
		expect(await Page.itemDisabled()).toBe(false);
		// Step 5-2: Spotlight displays on the previous Enabled item.
		await expectFocusedItem(0);
	});
});
