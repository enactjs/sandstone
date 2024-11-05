const Page = require('../VirtualGridListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('qa-VirtualGridList', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should spotlight is on the last item via 5-way on different column [QWTC-2301]', async function () {
		// Step 2-1: Increase the dataSize to 101.
		await Page.buttonAddItem.moveTo();
		await Page.spotlightSelect();
		// Step 2-1: Position the pointer on the 2nd item with 'Image 1' image.
		await (await Page.item(1)).moveTo();
		// Step 2 Verify: Spotlight is on the 2nd item.
		await expectFocusedItem(1);

		// Step 3: Keep pressing 5-way Down until the list reaches to the bottom.
		for (let i =  0; i < 20; i++) {
			await Page.spotlightDown();
			await Page.delay(200);
		}
		// Step 3-1 Verify: Spotlight is on the 101th item with 'Image 100'.
		await expectFocusedItem(100);

		// Wait for scroll animation
		await Page.delay(300);

		expect(await Page.scrollThumbPosition()).toBe('1');
		// Step 3-2 Verify: The 101th item with 'Image 100' sticks to the bottom in the list.
		await Page.spotlightDown();
		expect(await Page.buttonBottom.isFocused()).toBe(true);
	});
});
