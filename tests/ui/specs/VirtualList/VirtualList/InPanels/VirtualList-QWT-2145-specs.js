const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('VirtualList in Panels', function () {
	beforeEach(function () {
		Page.open('InPanels');
	});

	it('should spotlight not be truncated [QWT-2145]', function () {
		// Step 3: Click on Show header children button in header.
		Page.buttonHeaderChildren.moveTo();
		Page.spotlightSelect();
		// Step 3 Verify: The Header Item shows.
		Page.spotlightDown();
		expect(Page.textContent()).to.equal('Header Item');
		// Step 4-1: 5-way Spot the first Item on the list.
		Page.spotlightDown();
		expectFocusedItem(0);
		// Step 4-2: Keep 5-way Down until scroll happens.
		const bottomVisibleItem = Page.bottomVisibleItemId().slice(4);
		Page.fiveWayToItem(Number(bottomVisibleItem));
		Page.delay(500);
		expect(Number(Page.getScrollThumbPosition())).to.above(0);
		// Verify that the list is fully displayed.
		// Step 4 Verify: Focus on item is not truncated.
		// should bigger than item size(78 for 2k, 156 for 4k)
		expect((Page.getListRect().bottom - Page.activeElementRect().top)).to.above(78);
	});
});
