const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('VirtualList Samples', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('Navigate between inside and outside of a list [QWTC-2322]', async function () {
		// Step 2: 5-way Down to the 10th item.
		await Page.buttonLeft.moveTo();
		await Page.spotlightRight();
		await Page.fiveWayToItem(10);
		// Step 3: 5-way Spot Item 000.
		await Page.fiveWayToItem(0);
		// Step 3 Verify: Spotlight displays on Item 000.
		await expectFocusedItem(0);
		// Step 4: 5-way Up twice.
		// Step 4 Verify: Spotlight displays on the (x) Closing button. Since (x) button is replaced Top button in UI Test View, this test performed 5-way Up once.
		await Page.spotlightUp();
		expect(await Page.buttonTop.isFocused()).toBe(true);
	});
});
