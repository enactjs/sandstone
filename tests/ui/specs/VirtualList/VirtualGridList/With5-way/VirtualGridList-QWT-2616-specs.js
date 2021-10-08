const {expectFocusedItem} = require('../../VirtualList-utils');
const Page = require('../VirtualGridListPage');

describe('Navigate with 5-way', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should navigate item via 5-way [QWT-2616]', function () {
		// Step 4-1: Position the pointer on the upper left item Image 0 in the screen.
		Page.item(0).moveTo();
		// Step 4-2: 5-way Left 3 (three) times.
		// Step 4 Verify: Spotlight stays on *Image 0* for all presses.
		Page.spotlightLeft();
		expectFocusedItem(0);
		Page.spotlightLeft();
		expectFocusedItem(0);
		Page.spotlightLeft();
		expectFocusedItem(0);
		// Step 5: 5-way Right 3 (three) times,
		// Step 5 Verify: Spotlight is on item 1, then item 2, then item 3.
		Page.spotlightRight();
		expectFocusedItem(1);
		Page.spotlightRight();
		expectFocusedItem(2);
		Page.spotlightRight();
		expectFocusedItem(3);
		// Step 6: Knobs > VirtualGridList > direction > horizontal
		Page.buttonDirectionChange.moveTo();
		Page.spotlightSelect();
		// Step 7-1: Position the pointer on the upper left item Image 0 in the screen.
		Page.item(0).moveTo();
		// Step 7-2: 5-way Left 3 (three) times.
		// Step 7 Verify: Spotlight stays on Image 0 for all presses.
		Page.spotlightLeft();
		expectFocusedItem(0);
		Page.spotlightLeft();
		expectFocusedItem(0);
		Page.spotlightLeft();
		expectFocusedItem(0);
		// Step 8: 5-way Right 3 (three) times,
		// Step 8 Verify: Spotlight should move to the same row as Image 0.
		Page.spotlightRight();
		expectFocusedItem(2);
		Page.spotlightRight();
		expectFocusedItem(4);
		Page.spotlightRight();
		expectFocusedItem(6);
	});
});
