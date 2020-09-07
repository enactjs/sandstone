const Page = require('../VirtualListPage');
const {waitUntilFocused, expectFocusedItem} = require('../../VirtualList-utils');

describe('Navigate Items with Channel Up/Down', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should spotlight on top/end item with channel up/down[GT-28478]', function () {
		// UI Test's item default size is 100.
		// Step 4-1: Position the pointer on an item.
		Page.item(0).moveTo();
		// Step 4-2: 5-way Left to change into 5-way key mode. In this case, If press 5-way left, spotlight move to left button. Therefore 5-way left is replaced 5-way down.
		Page.spotlightDown();
		expectFocusedItem(1);
		// Step 5: Press Channel Down continuously until the bottom of the list displays.
		let i = 0;
		for (; i < 16; i++) {
			Page.checkScrollbyPagekey('down');
		}
		waitUntilFocused(99, 'focus Item 99');
		// Step5 Verify: Spotlight is on the last item Item 99.
		expectFocusedItem(99);
		Page.delay(200);
		// Step6: Press Channel Up continuously until the top of the list displays.
		for (; i > 0; i--) {
			Page.checkScrollbyPagekey('up');
		}
		waitUntilFocused(0, 'focus Item 0');
		// Step6 Verify: Spotlight is on the first item Item 00.
		expectFocusedItem(0);
	});
});
