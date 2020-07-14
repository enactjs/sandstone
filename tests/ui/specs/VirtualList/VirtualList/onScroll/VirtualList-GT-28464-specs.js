const Page = require('../VirtualListPage');
const {expectFocusedItem, waitForScrollStartStop} = require('../../VirtualList-utils');

describe('Item Animates', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should animate Items via Channel Down [GT-28464]', function () {
		// Step 3: Position the pointer on the first item('Item 000)
		Page.showPointerByKeycode();
		Page.item(0).moveTo();
		expectFocusedItem(0);
		// Step 4: Press Channel Down
		Page.pageDown();
		// Verify no error on waitForScrollStartStop
		waitForScrollStartStop();
		// Step 5: Press Channel Down again.
		Page.pageDown();
		// Verify no error on waitForScrollStartStop
		waitForScrollStartStop();
	});
});
