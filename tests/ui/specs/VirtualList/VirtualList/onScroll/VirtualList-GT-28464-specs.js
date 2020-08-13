const Page = require('../VirtualListPage');
const {expectFocusedItem, waitUntilFocused} = require('../../VirtualList-utils');

describe('Item Animates', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should animate Items via Channel Down [GT-28464]', function () {
		// Step 3: Position the pointer on the first item('Item 000)
		Page.item(0).moveTo();
		expectFocusedItem(0);
		// Step 4: Press Channel Down
		Page.checkScrollbyPagekey('down');
		waitUntilFocused(6);
		Page.delay(200);
		// Step 5: Press Channel Down again.
		Page.checkScrollbyPagekey('down');
		waitUntilFocused(12);
		Page.delay(200);
		Page.checkScrollbyPagekey('up');
		waitUntilFocused(6);
		Page.delay(200);
		Page.checkScrollbyPagekey('up');
		waitUntilFocused(0);
		Page.delay(200);
	});
});
