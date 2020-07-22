const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('Wrap Knobs', function () {
	beforeEach(function () {
		Page.open();
	});

	// Since visual test(Animation, Pointer disappears) is not able to verify by UI Test, This TC is partialy automated.
	it('should prevent bubbling when wrapping[GT-28463]', function () {
		// Step 3: Knobs > VirtualList > wrap > true
		Page.buttonWrap.moveTo();
		Page.spotlightSelect();
		// Step 5: 5-way Spot the first item.
		Page.buttonLeft.moveTo();
		Page.spotlightRight();
		expectFocusedItem(0, 'focus');
		// Step 6: 5-Way Up to move focus to the last item in the list.
		Page.spotlightUp();
		Page.delay(1500);  // TODO: Need better way to detect scroll end
		// Step 6-2 Verify: Spotlight displays on the last item.
		expectFocusedItem(99, 'focus 2');
		// Step 7: 5-Way Down to move focus to the first item in the list.
		Page.spotlightDown();
		Page.delay(1500);  // TODO: Need better way to detect scroll end
		// Step 7-2 Verify: Spotlight displays on the first item.
		expectFocusedItem(0, 'focus 3');
	});
});
