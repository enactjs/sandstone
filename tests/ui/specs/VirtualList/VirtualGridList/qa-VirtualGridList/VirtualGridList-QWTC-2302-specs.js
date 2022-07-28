const Page = require('../VirtualGridListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('qa-VirtualGridList', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should spotlight stays via Channel up/down [QWTC-2302]', async function () {
		// Step 2: Change datasize to 30.
		await Page.inputNumItems.moveTo();
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.backSpace();
		await Page.backSpace();
		await Page.numPad(3);
		await Page.numPad(0);
		await Page.spotlightRight();

		// Step 3 Note: This test needs to be adjusted itemSize so that at least 8 items are placed in a row.
		await Page.inputMinWidth.moveTo();
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.backSpace();
		await Page.backSpace();
		await Page.numPad(3);
		await Page.numPad(8);
		await Page.numPad(0);
		await Page.spotlightRight();

		// Step 3-1: 5-way Spot on '8 This is the longest...' item.
		await (await Page.item(8)).moveTo();
		await Page.spotlightSelect();
		await expectFocusedItem(8);
		// Step 3-2: Channel Up.
		await Page.pageUp();
		await Page.delay(300);
		// Step 3 Verify: Spotlight stays on the item.
		await expectFocusedItem(8);

		// Step 4-1: 5-way Spot '27 Subcaption' item.
		await (await Page.item(18)).moveTo();
		await Page.spotlightDown();
		await Page.delay(200);
		await expectFocusedItem(27);
		// Step 4-2: Channel Down.
		await Page.pageDown();
		await Page.delay(300);
		// Step 4 Verify: Spotlight stays on the item.
		await expectFocusedItem(27);
	});
});
