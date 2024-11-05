const {expectFocusedItem} = require('../../VirtualList-utils');
const Page = require('../VirtualGridListPage');

describe('Page scroll via 5-way', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should scroll via 5-way on last item on the page [QWTC-2032]', async function () {
		const initVerticalScrollThumbPosition = await Page.scrollThumbPosition();
		// Step 3: Position the pointer on the last item in a current page.
		await (await Page.item(Number((await Page.bottomRightVisibleItemId()).slice(4)))).moveTo();
		await Page.spotlightSelect();
		// Step 3 Verify: Spotlight is on the item.
		await expectFocusedItem(14);
		// Step 4: 5-way Down to the item below the last item on the current page.
		await Page.spotlightDown();
		await Page.delay(500);
		// Step 4-1 Verify: The list Scrolled Up
		const curVerticalScrollThumbPosition = await Page.scrollThumbPosition();
		expect(curVerticalScrollThumbPosition > initVerticalScrollThumbPosition).toBe(true);
		// Step 4-2 Verify: The Spotted item is placed on the Bottom.
		await expectFocusedItem(19);
		expect(await Page.bottomRightVisibleItemId()).toBe('item19');
		// Step 5: 5-way Up to the previous item.
		await Page.spotlightUp();
		await Page.delay(500);
		// Step 5-1 Verify: The list does not Scroll Down.
		expect(await Page.scrollThumbPosition()).toBe(curVerticalScrollThumbPosition);
		// Step 5-2 Verify: Spotlight is on the item above.
		await expectFocusedItem(14);
		// Step 6: Knobs > VirtualGridList > direction > horizontal
		await Page.buttonDirectionChange.moveTo();
		await Page.spotlightSelect();
		const initHorizontalScrollThumbPosition = await Page.scrollThumbPosition();
		await (await Page.item(Number((await Page.bottomRightVisibleItemId()).slice(4)))).moveTo();
		await Page.spotlightSelect();
		await Page.spotlightRight();
		await Page.delay(500);
		// Step 7-1 Verify: The list Scrolls Right
		const curHorizontalScrollThumbPosition = await Page.scrollThumbPosition();
		expect(curHorizontalScrollThumbPosition > initHorizontalScrollThumbPosition).toBe(true);
		// Step 7-2 Verify: The Spotted item is placed on the Right end.
		await expectFocusedItem(9);
		expect(await Page.bottomRightVisibleItemId()).toBe('item9');
		// Step 8: 5-way Left to the previous item.
		await Page.spotlightLeft();
		await Page.delay(500);
		// Step 8-1 Verify: The list does not Scroll Left.
		expect(await Page.scrollThumbPosition()).toBe(curHorizontalScrollThumbPosition);
		// Step 8-2 Verify: The spotted item is placed next to the rightest item.
		await expectFocusedItem(7);
	});
});
