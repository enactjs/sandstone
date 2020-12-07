const Page = require('../VirtualListPage');
const {expectFocusedItem, waitUntilFocused} = require('../../VirtualList-utils');

describe('Wrap Knobs', function () {
	beforeEach(function () {
		Page.open();
	});

	// Since visual test(Animation, Pointer disappears) is not able to verify by UI Test, This TC is partialy automated.
	it('should not scroll when leaving list with 5-way up/down [GT-28473]', function () {
		// Step 3 is 'Set dataSize to 100' but set dataSize to 20 for Speed up Test.
		Page.inputfieldNumItems.moveTo();
		Page.spotlightSelect();
		Page.backSpace();
		Page.backSpace();
		Page.backSpace();
		Page.numPad(2);
		Page.numPad(0);
		Page.backKey();
		Page.spotlightDown();
		// Step 4: change to 5-way mode
		Page.buttonLeft.moveTo();
		// Step 5: 5-way Spot the first item.
		Page.spotlightRight();
		// Verify Step 5: Spotlight displays on the first item.
		expectFocusedItem(0, 'step 5 focus');
		// Step 6: 5-way Up.
		Page.spotlightUp();
		// Verify Step 6: 1. The list *does not* Scroll to the Bottom. 2. Spotlight is on the close button 'x'.
		expect(Page.buttonTop.isFocused(), 'step 6 focus').to.be.true();  // buttonTop replaces the X button
		// Step 7: 1. Wheel Down on the list to the last item.
		// Page.mouseWheel(40, Page.item(6));   currently not working as expected so using 5-way Down temporary
		// Wheeling will not be implemented - see ENYO-6178
		Page.spotlightDown();
		expectFocusedItem(0);
		Page.pageDown();
		waitUntilFocused(6, 'focus Item 6');
		Page.pageDown();
		waitUntilFocused(19, 'focus Item 19');
		// Step 7: 2. Click the last item.
		Page.spotlightSelect();
		// Verify Step 7: Spotlight is on the last item.
		Page.delay(1000);
		expectFocusedItem(19, 'step 7 focus');
		// Step 8: 5-way Down
		Page.spotlightDown();
		Page.spotlightDown(); // 1 extra 5-way down to check Spotlight does not pass buttonBottom when wrap is off.
		Page.delay(1000);
		// Verify Step 8: 1. The list *does not* Scroll to the Top. 2. Spotlight stays on the last item.
		// Checking focus is on buttonBottom instead of last item since 5-way Down on last item using this app takes Spotlight to buttonBottom.
		expect(Page.buttonBottom.isFocused(), 'step 8 focus').to.be.true();
	});
});
