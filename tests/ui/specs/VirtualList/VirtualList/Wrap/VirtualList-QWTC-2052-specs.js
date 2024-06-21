const Page = require('../VirtualListPage');
const {expectFocusedItem, waitUntilFocused} = require('../../VirtualList-utils');

describe('Wrap Knobs', function () {
	beforeEach(async function () {
		await Page.open();
	});

	// Since visual test(Animation, Pointer disappears) is not able to verify by UI Test, This TC is partialy automated.
	it('should not scroll when leaving list with 5-way up/down [QWTC-2052]', async function () {
		// Step 3 is 'Set dataSize to 100' but set dataSize to 20 for Speed up Test.
		await Page.inputfieldNumItems.moveTo();
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.backSpace();
		await Page.backSpace();
		await Page.numPad(2);
		await Page.numPad(0);
		await Page.backKey();
		await Page.spotlightDown();
		// Step 4: change to 5-way mode
		await Page.buttonLeft.moveTo();
		// Step 5: 5-way Spot the first item.
		await Page.spotlightRight();
		// Verify Step 5: Spotlight displays on the first item.
		await expectFocusedItem(0, 'step 5 focus');
		// Step 6: 5-way Up.
		await Page.spotlightUp();
		// Verify Step 6: 1. The list *does not* Scroll to the Bottom. 2. Spotlight is on the close button 'x'.
		expect(await Page.buttonTop.isFocused()).toBe(true);  // buttonTop replaces the X button
		// Step 7: 1. Wheel Down on the list to the last item.
		// Page.mouseWheel(40, Page.item(6));   currently not working as expected so using 5-way Down temporary
		// Wheeling will not be implemented - see ENYO-6178
		await Page.spotlightDown();
		await expectFocusedItem(0);
		await Page.pageDown();
		await waitUntilFocused(6, 'focus Item 6');
		await Page.pageDown();
		await waitUntilFocused(19, 'focus Item 19');
		// Step 7: 2. Click the last item.
		await Page.spotlightSelect();
		// Verify Step 7: Spotlight is on the last item.
		await Page.delay(1000);
		await expectFocusedItem(19, 'step 7 focus');
		// Step 8: 5-way Down
		await Page.spotlightDown();
		await Page.spotlightDown(); // 1 extra 5-way down to check Spotlight does not pass buttonBottom when wrap is off.
		await Page.delay(1000);
		// Verify Step 8: 1. The list *does not* Scroll to the Top. 2. Spotlight stays on the last item.
		// Checking focus is on buttonBottom instead of last item since 5-way Down on last item using this app takes Spotlight to buttonBottom.
		expect(await Page.buttonBottom.isFocused()).toBe(true);
	});
});
