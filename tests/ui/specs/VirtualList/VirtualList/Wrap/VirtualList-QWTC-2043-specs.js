const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

// TODO: Fix to wrap bug [ENYO-6468]
describe('Change `wrap` dynamically', function () {
	beforeEach(async function () {
		await Page.open();
	});

	// Since visual test(Animation, Pointer disappears) is not able to verify by UI Test, This TC is partialy automated.
	it('should prevent bubbling when wrapping[QWTC-2043]', async function () {
		// Step 3: Knobs > VirtualList > wrap > true
		await Page.buttonWrap.moveTo();
		await Page.spotlightSelect();
		// Step 5: 5-way Spot the first item.
		await Page.buttonLeft.moveTo();
		await Page.spotlightRight();
		// TODO: expectFocusedItem is not working in case of wrap
		await expectFocusedItem(0,);
		// Step 6: 5-Way Up to move focus to the last item in the list.
		await Page.spotlightUp();
		await Page.delay(1500);  // TODO: Need better way to detect scroll end
		// Step 6-2 Verify: Spotlight displays on the last item.
		await expectFocusedItem(99);
		// Step 7: 5-Way Down to move focus to the first item in the list.
		await Page.spotlightDown();
		await Page.delay(1500);  // TODO: Need better way to detect scroll end
		// Step 7-2 Verify: Spotlight displays on the first item.
		await expectFocusedItem(0);
	});
});
