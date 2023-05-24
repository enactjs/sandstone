// const Page = require('../VirtualListPage');
import Page from '../VirtualListPage.js';

describe('Horizontal VirtualList in Scroller', function () {
	beforeEach(async function () {
		await Page.open('InScroller');
	});

	it('should not scroll via Channel UP/Down on ScrollThumb in horizontalScrollbar [QWTC-2083]', async function () {
		// Step 3: Hover the Scroll thumb on the horizontal Scrollbar in the first list.
		await Page.showPointerByKeycode();
		await Page.scrollThumb.moveTo();
		// Step 4: Press Channel Down.
		await Page.pageDown();
		await Page.delay(500);
		// Step 4 Verify: The horizontal VirtualList does not scroll.
		expect(Number(await Page.getScrollThumbPosition())).to.equal(0);
		// The Vertical Scroller does scroll.
		expect(Number(await Page.getScrollThumbPosition(3))).to.above(0);
	});
});
