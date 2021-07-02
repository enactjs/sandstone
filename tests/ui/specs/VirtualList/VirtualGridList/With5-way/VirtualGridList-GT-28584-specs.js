const {expectFocusedItem} = require('../../VirtualList-utils');
const Page = require('../VirtualGridListPage');

describe('Navigate with 5-way', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should navigate from and to last item via 5-way [GT-28584]', function () {
		// ItemSize and dataSize size adjust to align in 3 lines as shown in the test view.
		// Step 3-1:  Knobs > VirtualGridList > dataSize > 17(In case, 14).
		Page.inputNumItems.moveTo();
		Page.spotlightSelect();
		Page.backSpace();
		Page.backSpace();
		Page.numPad(4);
		Page.spotlightLeft();

		Page.inputMinHeight.moveTo();
		Page.spotlightSelect();
		Page.backSpace();
		Page.backSpace();
		Page.backSpace();
		Page.numPad(8);
		Page.numPad(0);
		Page.numPad(0);
		Page.spotlightLeft();

		// Step 4-1: 5-way Spot Image 16(In case, 13).
		Page.item(Number(Page.bottomRightVisibleItemId().slice(4))).moveTo();
		Page.spotlightDown();
		// Step 4-2: Quickly 5-way Right.
		Page.spotlightRight();
		// Step 4-3: Quickly 5-way Down.
		Page.spotlightDown();
		// Step 4-3 Verify: Spotlight is on Image 16(In case, 13).
		expectFocusedItem(13);

		// Wait for scroll animation
		Page.delay(300);

		// check if the previous item partially cut off.
		expect(Page.itemOffsetBottomById(8)).to.be.below(Page.getItemSize().height);
	});

	describe('RTL', function () {
		beforeEach(function () {
			// Step 5: Knobs > Global Knobs > locale > ar-SA - Arabic, RTL and standard font
			Page.open('', '?locale=ar-SA');
		});

		it('should navigate from and to last item via 5-way with RTL[GT-28584]', function () {
			// ItemSize and dataSize size adjust to align in 3 lines as shown in the test view
			Page.inputNumItems.moveTo();
			Page.spotlightSelect();
			Page.backSpace();
			Page.backSpace();
			Page.numPad(4);
			Page.spotlightDown();

			Page.inputMinHeight.moveTo();
			Page.spotlightSelect();
			Page.backSpace();
			Page.backSpace();
			Page.backSpace();
			Page.numPad(8);
			Page.numPad(0);
			Page.numPad(0);
			Page.spotlightLeft();

			// Step 6-1: 5-way Spot Image 16(In case, 13).
			Page.item(Number(Page.bottomRightVisibleItemId().slice(4))).moveTo();
			Page.spotlightDown();
			Page.spotlightLeft();
			Page.spotlightLeft();
			Page.spotlightLeft();

			// Step 6-2: Quickly 5-way Left.
			Page.spotlightLeft();
			// Step 6-3: Quickly 5-way Down.
			Page.spotlightDown();
			// Step 6-3 Verify: Spotlight is on Image 16(In case, 13).
			expectFocusedItem(13);

			// Wait for scroll animation
			Page.delay(300);

			// check if the previous item partially cut off.
			expect(Page.itemOffsetBottomById(8)).to.be.below(Page.getItemSize().height);
		});
	});
});
