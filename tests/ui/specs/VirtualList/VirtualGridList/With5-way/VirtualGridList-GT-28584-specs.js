const {expectFocusedItem} = require('../../VirtualList-utils');
const Page = require('../VirtualGridListPage');

describe('Navigate with 5-way', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should navigate from and to last item via 5-way [GT-28584]', function () {
		// Step 3-1:  Knobs > VirtualGridList > dataSize > 17
		Page.inputNumItems.moveTo();
		Page.spotlightSelect();
		Page.backSpace();
		Page.backSpace();
		Page.numPad(7);
		Page.spotlightLeft();
		// Step 4-1: 5-way Spot Image 16.
		Page.item(Number(Page.bottomRightVisibleItemId().slice(4))).moveTo();
		Page.spotlightDown();
		// Step 4-2: Quickly 5-way Right.
		Page.spotlightRight();
		// Step 4-3: Quickly 5-way Down.
		Page.spotlightDown();
		// Step 4-3 Verify: Spotlight is on Image 16.
		expectFocusedItem(16);
	});

	describe('RTL', function () {
		beforeEach(function () {
			// Step 5: Knobs > Global Knobs > locale > ar-SA - Arabic, RTL and standard font
			Page.open('', '?locale=ar-SA');
		});

		it('should navigate from and to last item via 5-way with RTL[GT-28584]', function () {
			Page.inputNumItems.moveTo();
			Page.spotlightSelect();
			Page.backSpace();
			Page.backSpace();
			Page.numPad(7);
			Page.spotlightDown();
			// Step 6-1: 5-way Spot Image 16.
			Page.item(Number(Page.bottomRightVisibleItemId().slice(4))).moveTo();
			Page.spotlightDown();
			Page.spotlightLeft();
			// Step 6-2: Quickly 5-way Right.
			Page.spotlightLeft();
			// Step 6-3: Quickly 5-way Down.
			Page.spotlightDown();
			// Step 6-3 Verify: Spotlight is on Image 16.
			expectFocusedItem(16);
		});
	});
});
