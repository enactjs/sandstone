const {expectFocusedItem} = require('../../VirtualList-utils');
const Page = require('../VirtualGridListPage');

describe('Navigate with 5-way', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should navigate from and to last item via 5-way [QWTC-2132]', async function () {
		// ItemSize and dataSize size adjust to align in 3 lines as shown in the test view.
		// Step 3-1:  Knobs > VirtualGridList > dataSize > 17(In case, 14).
		await Page.inputNumItems.moveTo();
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.backSpace();
		await Page.numPad(4);
		await Page.spotlightLeft();

		await Page.inputMinHeight.moveTo();
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.backSpace();
		await Page.backSpace();
		await Page.numPad(8);
		await Page.numPad(0);
		await Page.numPad(0);
		await Page.spotlightLeft();

		// Step 4-1: 5-way Spot Image 16(In case, 13).
		await (await Page.item(Number((await Page.bottomRightVisibleItemId()).slice(4)))).moveTo();
		await Page.spotlightDown();
		// Step 4-2: Quickly 5-way Right.
		await Page.spotlightRight();
		// Step 4-3: Quickly 5-way Down.
		await Page.spotlightDown();
		// Step 4-3 Verify: Spotlight is on Image 16(In case, 13).
		await expectFocusedItem(13);

		// Wait for scroll animation
		await Page.delay(300);

		// check if the previous item partially cut off.
		expect(await Page.itemOffsetBottomById(8)).toBeLessThan((await Page.getItemSize()).height);
	});

	// describe('RTL', function () {
	// 	beforeEach(async function () {
	// 		// Step 5: Knobs > Global Knobs > locale > ar-SA - Arabic, RTL and standard font
	// 		await Page.open('', '?locale=ar-SA');
	// 	});
	//
	// 	it('should navigate from and to last item via 5-way with RTL[QWTC-2132]', async function () {
	// 		// ItemSize and dataSize size adjust to align in 3 lines as shown in the test view
	// 		await Page.inputNumItems.moveTo();
	// 		await Page.spotlightSelect();
	// 		await Page.backSpace();
	// 		await Page.backSpace();
	// 		await Page.numPad(4);
	// 		await Page.spotlightDown();
	//
	// 		await Page.inputMinHeight.moveTo();
	// 		await Page.spotlightSelect();
	// 		await Page.backSpace();
	// 		await Page.backSpace();
	// 		await Page.backSpace();
	// 		await Page.numPad(8);
	// 		await Page.numPad(0);
	// 		await Page.numPad(0);
	// 		await Page.spotlightLeft();
	//
	// 		// Step 6-1: 5-way Spot Image 16(In case, 13).
	// 		await (await Page.item(Number((await Page.bottomRightVisibleItemId()).slice(4)))).moveTo();
	// 		await Page.spotlightDown();
	// 		await Page.spotlightLeft();
	// 		await Page.spotlightLeft();
	// 		await Page.spotlightLeft();
	//
	// 		// Step 6-2: Quickly 5-way Left.
	// 		await Page.spotlightLeft();
	// 		// Step 6-3: Quickly 5-way Down.
	// 		await Page.spotlightDown();
	// 		// Step 6-3 Verify: Spotlight is on Image 16(In case, 13).
	// 		await expectFocusedItem(13);
	//
	// 		// Wait for scroll animation
	// 		await Page.delay(300);
	//
	// 		// check if the previous item partially cut off.
	// 		expect(await Page.itemOffsetBottomById(8)).toBeLessThan((await Page.getItemSize()).height);
	// 	});
	// });
});
