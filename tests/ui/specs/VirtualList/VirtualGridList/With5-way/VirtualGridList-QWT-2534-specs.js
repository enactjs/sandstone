const {expectFocusedItem} = require('../../VirtualList-utils');
const Page = require('../VirtualGridListPage');

describe('Navigate with 5-way', function () {
	beforeEach(async function () {
		await Page.open('', '?locale=ar-SA');
	});

	it('should navigate item via 5-way with RTL [QWT-2534]', async function () {
		// Step 5-1: Position the pointer on the upper left item Image 0 in the screen.
		await (await Page.item(0)).moveTo();
		// Step 5-2: 5-way Right 3 (three) times.
		// Step 5 Verify: Spotlight stays on *Image 0* for all presses.
		await Page.spotlightRight();
		await expectFocusedItem(0);
		await Page.spotlightRight();
		await expectFocusedItem(0);
		await Page.spotlightRight();
		await expectFocusedItem(0);
		// Step 6: 5-way Left 3 (three) times,
		// Step 6 Verify: Spotlight is on item 1, then item 2, then item 3.
		await Page.spotlightLeft();
		await expectFocusedItem(1);
		await Page.spotlightLeft();
		await expectFocusedItem(2);
		await Page.spotlightLeft();
		await expectFocusedItem(3);
		// Step 7: Knobs > VirtualGridList > direction > horizontal
		await Page.buttonDirectionChange.moveTo();
		await Page.spotlightSelect();
		// Step 8-1: Position the pointer on the upper left item Image 0 in the screen.
		await (await Page.item(0)).moveTo();
		// Step 8-2: 5-way Right 3 (three) times.
		// Step 8 Verify: Spotlight stays on Image 0 for all presses.
		await Page.spotlightRight();
		await expectFocusedItem(0);
		await Page.spotlightRight();
		await expectFocusedItem(0);
		await Page.spotlightRight();
		await expectFocusedItem(0);
		// Step 9: 5-way Left 3 (three) times,
		// Step 9 Verify: Spotlight should move to the same row as Image 0.
		await Page.spotlightLeft();
		await expectFocusedItem(2);
		await Page.spotlightLeft();
		await expectFocusedItem(4);
		await Page.spotlightLeft();
		await expectFocusedItem(6);
	});
});
