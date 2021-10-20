const Page = require('../VirtualGridListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('qa-VirtualGridList', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should spotlight stays via Channel up/down [QWT-2347]', function () {
		// Step 2: Change datasize to 30.
		Page.inputNumItems.moveTo();
		Page.spotlightSelect();
		Page.backSpace();
		Page.backSpace();
		Page.backSpace();
		Page.numPad(3);
		Page.numPad(0);
		Page.spotlightRight();

		// Step 3 Note: This test needs to be adjusted itemSize so that at least 8 items are placed in a row.
		Page.inputMinWidth.moveTo();
		Page.spotlightSelect();
		Page.backSpace();
		Page.backSpace();
		Page.backSpace();
		Page.numPad(3);
		Page.numPad(8);
		Page.numPad(0);
		Page.spotlightRight();

		// Step 3-1: 5-way Spot on '8 This is the longest...' item.
		Page.item(8).moveTo();
		Page.spotlightSelect();
		expectFocusedItem(8);
		// Step 3-2: Channel Up.
		Page.pageUp();
		Page.delay(300);
		// Step 3 Verify: Spotlight stays on the item.
		expectFocusedItem(8);

		// Step 4-1: 5-way Spot '27 Subcaption' item.
		Page.item(18).moveTo();
		Page.spotlightDown();
		Page.delay(200);
		expectFocusedItem(27);
		// Step 4-2: Channel Down.
		Page.pageDown();
		Page.delay(300);
		// Step 4 Verify: Spotlight stays on the item.
		expectFocusedItem(27);
	});
});
