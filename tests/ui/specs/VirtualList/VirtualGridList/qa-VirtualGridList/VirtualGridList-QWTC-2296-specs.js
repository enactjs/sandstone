const Page = require('../VirtualGridListPage');
const {expectNoFocusedItem} = require('../../VirtualList-utils');

describe('qa-VirtualGridList translate mode', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should scrolls via channel up/down when spotlight hides [QWTC-2296]', async function () {
		// Step 2: Uncheck the "Native Scrolling" CheckboxItem.
		await Page.buttonModeChange.moveTo();
		await Page.spotlightSelect();

		// Step 3: Position the pointer between image2 and image3.
		const itemSize = await Page.getItemSize();
		await (await Page.item(2)).moveTo({xOffset: itemSize.width + 1, yOffset: 0});
		// Step 3 Verify: Spotlight hides.
		await expectNoFocusedItem();

		// Step 4: Press Channel Down.
		await Page.pageDown();
		await Page.delay(1000);
		// Step 4 Verify: Image 10 is the first item on the first fully visible row.
		expect(await Page.itemOffsetBottomById(10)).toBeGreaterThan(itemSize.height);

		// Step 5: Position the pointer between image8 and image9.
		await (await Page.item(8)).moveTo({xOffset: itemSize.width + 1, yOffset: itemSize.height - 1});
		// Step 5 Verify: Spotlight hides.
		await expectNoFocusedItem();

		// Step 6: Press Channel Up.
		await Page.pageUp();
		await Page.delay(1000);
		// Step 6 Verify: Image 0 is the first item on the first fully visible row.
		expect(await Page.itemOffsetBottomById(0)).toBe(itemSize.height);
		await expectNoFocusedItem();

	});
});
