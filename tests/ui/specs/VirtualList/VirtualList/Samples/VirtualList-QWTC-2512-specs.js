const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('VirtualList Samples', function () {
	beforeEach(async function () {
		await Page.open();
	});

	// As Ux change that 5-way and pointer mode had the different UX for restore focus, this test work with 5-way mode.
	it('should focus last item when entering from outside after scrolling via 5way [QWTC-2512]', async function () {
		// Step 1. Move focus to the first item ('Item 00').
		await Page.buttonLeft.moveTo();
		await Page.spotlightRight();

		// Step2. 5-way Down to the 21st item ('Item 20').
		await Page.fiveWayToItem(20);

		// Step3. 5-way spot 'JumpToItem10WithoutFocus' button and select
		await Page.spotlightLeft();
		await Page.spotlightUp();
		await Page.spotlightUp();
		await Page.spotlightRight();
		await Page.spotlightSelect();

		// Step4. Move focus to the list(In this view, Left button -> Item 0)
		await Page.spotlightDown();
		await Page.spotlightDown();
		await Page.spotlightRight();

		// Wait for scroll animation
		await Page.delay(500);

		// Verify Spotlight displays on the 21st item ('Item 20');
		await expectFocusedItem(Number((await Page.bottomVisibleItemId()).slice(4)));
		await expectFocusedItem(20);
	});
});
