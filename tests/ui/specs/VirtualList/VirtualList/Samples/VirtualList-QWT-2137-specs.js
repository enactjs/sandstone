const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('VirtualList Samples', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should focus last item when entering from outside after scrolling via 5way [QWT-2137]', async function () {
		// Step 1. Move focus to the first item ('Item 00').
		await Page.buttonLeft.moveTo();
		await Page.spotlightRight();

		// Step2. 5-way Down to the 21st item ('Item 20').
		await Page.fiveWayToItem(20);

		// Step3. Position the pointer on 'JumpToItem10WithoutFocus' button and select
		await Page.buttonJumpToItemWithoutFocus.moveTo();
		await Page.spotlightSelect();

		// Step4. Move focus to the list
		await Page.buttonLeft.moveTo();
		await Page.spotlightRight();

		// Wait for scroll animation
		await Page.delay(500);

		// Verify Spotlight displays on the 21st item ('Itme 20');
		await expectFocusedItem(Number((await Page.bottomVisibleItemId()).slice(4)));
	});
});
