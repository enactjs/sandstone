const Page = require('../VirtualListPage'),
	{expectFocusedItem, expectNoFocusedItem, waitUntilFocused} = require('../../VirtualList-utils');

describe('LTR locale', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should focus and Scroll with Up/Down and 5-way [GT-28491]', function () {
		Page.buttonLeft.moveTo();
		Page.spotlightRight(); // is on 'Item 000'
		// Step 3. 5-way Spot the second item 'Item 001'.
		Page.spotlightDown();
		// Verify Step 3: Spotlight displays on the second item 'item 001'.
		expectFocusedItem(1, 'step 3 focus');
		// Step 4. Press Channel Down.
		Page.pageDown();
		// Verify Step 4: Spotlight is on the *Item* closest to the previously focused Item's location.
		waitUntilFocused(7, 'step 4 focus'); // this works in headless + tv  - must comment to run in debug
		Page.delay(1000);
		expect(Page.list.getAttribute('data-scrolling-events')).to.equal(String(1));
		// Step 5. 5-way Down several times to the last visible item on the current viewport.
		Page.fiveWayToItem(14);
		// Verify Step 5: Spotlight is on the last visible item. *** it is not
		expectFocusedItem(14, 'step 5 focus');
		// Step 6. Press Channel Down.
		Page.pageDown();
		// Verify Step 6: Spotlight is on the *Item* closest to the previously focused Item's location  ?
		waitUntilFocused(20, 'step 6 focus');
		Page.delay(1000);
		expect(Page.list.getAttribute('data-scrolling-events')).to.equal(String(3));
		// Step 7. Press Channel Up.
		Page.pageUp();
		// Verify Step 7: Spotlight is on the *Item* closest to the previously focused Item's location.
		waitUntilFocused(14, 'step 7 focus');
		Page.delay(1000);
		expect(Page.list.getAttribute('data-scrolling-events')).to.equal(String(4));
		// Step 8. 5-way Up several times to the first visible item on the current viewport.
		Page.fiveWayToItem(7);
		// Verify Step 8: Spotlight is on the first visible item.
		expectFocusedItem(7, 'step 8 focus');
		// Step 9. Press Channel Up.
		Page.pageUp();
		// Verify Step 9: Spotlight is on the *Item* closest to the previously focused Item's location.
		waitUntilFocused(1, 'step 9 focus');
		Page.delay(1000);
		expect(Page.list.getAttribute('data-scrolling-events')).to.equal(String(5));
		// Step 10. Wave the pointer. Step 11. Hover on an item.
		Page.item(3).moveTo();
		// Verify Step 10, Step 11: Spotlight is on 'Item 003'
		expectFocusedItem(3, 'step 11 focus');
		// Step 12. Press Channel Down.
		Page.pageDown();
		// Verify Step 12: 1. Spotlight hides. 2. The list Scrolls Up by page with animation. 3. The list stops scrolling. 4. Spotlight still hides (for a few seconds).
		expectNoFocusedItem();  // Check that Spotlight hides only.
	});
});
