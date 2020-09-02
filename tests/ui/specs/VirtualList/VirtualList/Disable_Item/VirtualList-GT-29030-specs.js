const Page = require('../VirtualListPage'),
	{expectFocusedItem} = require('../../VirtualList-utils');

describe('Disalbed item', function () {
	beforeEach(function () {
		Page.open();
	});

	// Partially automated: Step 3 A manual test on the TV is required to check if the Verify Pointer disappears.
	it('should Navigate Disabled and Enabled items [GT-29030]', function () {
		// Step 2: Uncheck the "Native Scrolling" Checkbox item.
		// Set translate ScrollMode.
		Page.buttonNativeScroll.moveTo();
		Page.spotlightSelect();
		// Step 3-1: Click on DisabledItems CheckboxItem.(DisabledItem Button for this test.)
		Page.buttonDisabledItem.moveTo();
		Page.spotlightSelect();
		// Step 3-2: Hover on Item 000 on the list.
		Page.item(0).moveTo();
		// 5-way Down.
		Page.spotlightDown();
		// Step 3 Verify: Focus is on Item 001 (the next item on the list).
		expectFocusedItem(1);
	});
});
