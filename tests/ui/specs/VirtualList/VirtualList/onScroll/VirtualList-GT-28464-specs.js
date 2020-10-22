const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('Item Animates', function () {
	beforeEach(function () {
		Page.open();
	});
	// TODO: Need to api for press holding page down/up key.
	it('should animate Items via Channel Down [GT-28464]', function () {
		// Step 3: Position the pointer on the first item('Item 000)
		Page.showPointerByKeycode();
		Page.item(0).moveTo();
		expectFocusedItem(0);
		// Step 4: Press Channel Down 2 times.
		// Step 4 Verify: The list Scrolls Up page by page.
		Page.checkScrollbyPagekey('down');
		Page.checkScrollbyPagekey('down');
		// Step 6: Channel Up 2 times
		// Step 6 Verify: The list Scrolls Up page by page.
		Page.checkScrollbyPagekey('up');
		Page.checkScrollbyPagekey('up');
	});
});
