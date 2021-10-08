const Page = require('../VirtualListPage');

describe('Horizontal VirtualList in Scroller', function () {
	beforeEach(function () {
		Page.open('InScroller');
	});

	it('should not scroll via Channel UP/Down on ScrollThumb in horizontalScrollbar [QWT-2567]', function () {
		// Step 3: Hover the Scroll thumb on the horizontal Scrollbar in the first list.
		Page.showPointerByKeycode();
		Page.scrollThumb.moveTo();
		// Step 4: Press Channel Down.
		Page.pageDown();
		Page.delay(500);
		// Step 4 Verify: The horizontal VirtualList does not scroll.
		expect(Number(Page.getScrollThumbPosition())).to.equal(0);
		// The Vertical Scroller does scroll.
		expect(Number(Page.getScrollThumbPosition(3))).to.above(0);
	});
});
