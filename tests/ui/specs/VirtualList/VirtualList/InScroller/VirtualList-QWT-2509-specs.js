const Page = require('../VirtualListPage');

describe('Horizontal VirtualList in Scroller', function () {
	beforeEach(function () {
		Page.open('InScroller');
	});

	it('should not scroll vertical scroller via 5-way key on inner horizontal VirtualList [QWT-2509]', function () {
		// Step 3-1: 5-way Down to the last Horizontal VirtualList.
		Page.spotlightDown();
		Page.spotlightDown();
		Page.spotlightDown();
		Page.delay(500);
		const initialVerticalThumbPosition = Page.getScrollThumbPosition(3);
		// 5-way Right until occur scrolling in last Horizontal VirtualList.
		for (let i = 0; i < 24; i++) {
			Page.spotlightRight();
		}
		Page.delay(300);
		// Step 3 Verify: The last Horizontal VirtualList scrolls horizontally.
		expect(Number(Page.getScrollThumbPosition(2))).to.above(0);
		// The Vertical Scroller does scroll.
		expect(initialVerticalThumbPosition).to.be.equal(Page.getScrollThumbPosition(3));
	});
});
