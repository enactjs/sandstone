// const Page = require('../VirtualListPage');
import Page from '../VirtualListPage.js';

describe('Horizontal VirtualList in Scroller', function () {
	beforeEach(async function () {
		await Page.open('InScroller');
	});

	it('should not scroll vertical scroller via 5-way key on inner horizontal VirtualList [QWTC-2141]', async function () {
		// Step 3-1: 5-way Down to the last Horizontal VirtualList.
		await Page.spotlightDown();
		await Page.spotlightDown();
		await Page.spotlightDown();
		await Page.delay(500);
		const initialVerticalThumbPosition = await Page.getScrollThumbPosition(3);
		// 5-way Right until occur scrolling in last Horizontal VirtualList.
		for (let i = 0; i < 24; i++) {
			await Page.spotlightRight();
		}
		await Page.delay(300);
		// Step 3 Verify: The last Horizontal VirtualList scrolls horizontally.
		expect(Number(await Page.getScrollThumbPosition(2))).to.above(0);
		// The Vertical Scroller does scroll.
		expect(initialVerticalThumbPosition).to.be.equal(await Page.getScrollThumbPosition(3));
	});
});
