const {expectFocusedItem} = require('../../VirtualList-utils');
const Page = require('../VirtualGridListPage');

describe('Navigate with 5-way', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should navigate from and to last item via 5-way [GT-28454]', function () {
		// Adjust the dataSize to make sure 3 rows of items show with only 1 (one) item on the last row.
		// Adjust Minwidth
		Page.inputMinWidth.moveTo();
		Page.spotlightSelect();
		Page.backSpace();
		Page.backSpace();
		Page.backSpace();
		Page.numPad(4);
		Page.numPad(0);
		Page.numPad(0);
		Page.spotlightRight();

		// Adjust MinHeight
		Page.inputMinHeight.moveTo();
		Page.spotlightSelect();
		Page.backSpace();
		Page.backSpace();
		Page.backSpace();
		Page.numPad(8);
		Page.numPad(0);
		Page.numPad(0);
		Page.spotlightRight();

		// Step 3:  Knobs > VirtualGridList > dataSize > 17
		Page.inputNumItems.moveTo();
		Page.spotlightSelect();
		Page.backSpace();
		Page.backSpace();
		Page.numPad(7);
		Page.spotlightLeft();

		// Step 4: Focus on the last item.
		Page.item(Number(Page.bottomRightVisibleItemId().slice(4))).moveTo();
		Page.spotlightDown();

		// Wait for scroll animation
		Page.delay(300);

		// check if the previous item partially cut off.
		expect(Page.itemOffsetBottomById(10)).to.be.below(Page.getItemSize().height);
		// Step 4 Verify: Spotlight is on the last item.
		expectFocusedItem(16);

		// Step 5-1: 5-way Right.
		Page.spotlightRight();
		// Step 5-2: 5-way Right again before the list stop scrolling.
		Page.spotlightRight();
		// Step 5 Verify: The last item must show at least partially.
		expect(Page.itemOffsetTopById(16)).to.be.above(0);
	});
});
