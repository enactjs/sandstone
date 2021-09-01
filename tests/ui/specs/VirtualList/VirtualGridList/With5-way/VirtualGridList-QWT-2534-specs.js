const {expectFocusedItem} = require('../../VirtualList-utils');
const Page = require('../VirtualGridListPage');

describe('Navigate with 5-way', function () {
	beforeEach(function () {
		Page.open('', '?locale=ar-SA');
	});

	it('should navigate item via 5-way with RTL [QWT-2534]', function () {
		// Step 5-1: Position the pointer on the upper left item Image 0 in the screen.
		Page.item(0).moveTo();
		// Step 5-2: 5-way Right 3 (three) times.
		// Step 5 Verify: Spotlight stays on *Image 0* for all presses.
		Page.spotlightRight();
		expectFocusedItem(0);
		Page.spotlightRight();
		expectFocusedItem(0);
		Page.spotlightRight();
		expectFocusedItem(0);
		// Step 6: 5-way Left 3 (three) times,
		// Step 6 Verify: Spotlight is on item 1, then item 2, then item 3.
		Page.spotlightLeft();
		expectFocusedItem(1);
		Page.spotlightLeft();
		expectFocusedItem(2);
		Page.spotlightLeft();
		expectFocusedItem(3);
		// Step 7: Knobs > VirtualGridList > direction > horizontal
		Page.buttonDirectionChange.moveTo();
		Page.spotlightSelect();
		// Step 8-1: Position the pointer on the upper left item Image 0 in the screen.
		Page.item(0).moveTo();
		// Step 8-2: 5-way Right 3 (three) times.
		// Step 8 Verify: Spotlight stays on Image 0 for all presses.
		Page.spotlightRight();
		expectFocusedItem(0);
		Page.spotlightRight();
		expectFocusedItem(0);
		Page.spotlightRight();
		expectFocusedItem(0);
		// Step 9: 5-way Left 3 (three) times,
		// Step 9 Verify: Spotlight should move to the same row as Image 0.
		Page.spotlightLeft();
		expectFocusedItem(2);
		Page.spotlightLeft();
		expectFocusedItem(4);
		Page.spotlightLeft();
		expectFocusedItem(6);
	});
});
