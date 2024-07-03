const {expectFocusedItem} = require('../../VirtualList-utils');
const Page = require('../VirtualGridListPage');

describe('Navigate with 5-way', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should navigate from and to last item via 5-way [QWTC-2037]', async function () {
		// Adjust the dataSize to make sure 3 rows of items show with only 1 (one) item on the last row.
		// Adjust Minwidth
		await Page.inputMinWidth.moveTo();
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.backSpace();
		await Page.backSpace();
		await Page.numPad(4);
		await Page.numPad(0);
		await Page.numPad(0);
		await Page.spotlightRight();

		// Adjust MinHeight
		await Page.inputMinHeight.moveTo();
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.backSpace();
		await Page.backSpace();
		await Page.numPad(8);
		await Page.numPad(0);
		await Page.numPad(0);
		await Page.spotlightRight();

		// Step 3:  Knobs > VirtualGridList > dataSize > 17
		await Page.inputNumItems.moveTo();
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.backSpace();
		await Page.numPad(7);
		await Page.spotlightLeft();

		// Step 4: Focus on the last item.
		await (await Page.item(Number((await Page.bottomRightVisibleItemId()).slice(4)))).moveTo();
		await Page.spotlightDown();

		// Wait for scroll animation
		await Page.delay(300);

		// check if the previous item partially cut off.
		expect(await Page.itemOffsetBottomById(10)).toBeLessThan((await Page.getItemSize()).height);
		// Step 4 Verify: Spotlight is on the last item.
		await expectFocusedItem(16);

		// Step 5-1: 5-way Right.
		await Page.spotlightRight();
		// Step 5-2: 5-way Right again before the list stop scrolling.
		await Page.spotlightRight();
		// Step 5 Verify: The last item must show at least partially.
		expect(await Page.itemOffsetTopById(16)).toBeGreaterThan(0);
	});
});
