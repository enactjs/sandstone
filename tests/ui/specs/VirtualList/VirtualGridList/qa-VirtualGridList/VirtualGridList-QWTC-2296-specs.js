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
		expect(await Page.itemOffsetBottomById(10)).to.be.above(itemSize.height);

		// Step 5: Hover the Scroll thumb on the verticalScrollbar track.
		await Page.scrollThumb.moveTo();
		// Step 5 Verify: Spotlight hides.
		await expectNoFocusedItem();

		// Step 6: Press Channel Down.
		await Page.pageDown();
		await Page.delay(1000);
		// Step 6 Verify: Image 20 is the first item on the first fully visible row.
		expect(await Page.itemOffsetBottomById(20)).to.be.above(itemSize.height);

		// Step 7: Position the pointer between image18 and image19.
		await (await Page.item(18)).moveTo({xOffset: itemSize.width + 1, yOffset: itemSize.height - 1});
		// Step 7 Verify: Spotlight hides.
		await expectNoFocusedItem();

		// Step 8: Press Channel Up.
		await Page.pageUp();
		await Page.delay(1000);
		// Step 8 Verify: Image 10 is the first item on the first fully visible row.
		expect(await Page.itemOffsetBottomById(10)).to.be.above(itemSize.height);

		// Step 9: Hover the Scroll thumb on the verticalScrollbar track.
		await Page.scrollThumb.moveTo();
		// Step 9 Verify: Spotlight hides.
		await expectNoFocusedItem();

		// Step 10: Press Channel Up.
		await Page.pageUp();
		await Page.delay(1000);
		// Step 10 Verify: Image 0 is the first item on the first fully visible row.
		expect(await Page.itemOffsetBottomById(0)).to.be.equal(itemSize.height);

	});
});
