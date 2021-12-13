const {expectFocusedItem} = require('../../VirtualList-utils');
const Page = require('../VirtualGridListPage');

describe('Page scroll via 5-way', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should scroll via 5-way on last item on the page [QWT-2618]', function () {
		const initVerticalScrollThumbPosition = Page.scrollThumbPosition();
		// Step 3: Position the pointer on the last item in a current page.
		Page.item(Number(Page.bottomRightVisibleItemId().slice(4))).moveTo();
		Page.spotlightSelect();
		// Step 3 Verify: Spotlight is on the item.
		expectFocusedItem(14);
		// Step 4: 5-way Down to the item below the last item on the current page.
		Page.spotlightDown();
		Page.delay(500);
		// Step 4-1 Verify: The list Scrolled Up
		const curVerticalScrollThumbPosition = Page.scrollThumbPosition();
		expect(curVerticalScrollThumbPosition > initVerticalScrollThumbPosition).to.be.true();
		// Step 4-2 Verify: The Spotted item is placed on the Bottom.
		expectFocusedItem(19);
		expect(Page.bottomRightVisibleItemId()).to.be.equal('item19');
		// Step 5: 5-way Up to the previous item.
		Page.spotlightUp();
		Page.delay(500);
		// Step 5-1 Verify: The list does not Scroll Down.
		expect(Page.scrollThumbPosition()).to.be.equal(curVerticalScrollThumbPosition);
		// Step 5-2 Verify: Spotlight is on the item above.
		expectFocusedItem(14);
		// Step 6: Knobs > VirtualGridList > direction > horizontal
		Page.buttonDirectionChange.moveTo();
		Page.spotlightSelect();
		const initHorizontalScrollThumbPosition = Page.scrollThumbPosition();
		Page.item(Number(Page.bottomRightVisibleItemId().slice(4))).moveTo();
		Page.spotlightSelect();
		Page.spotlightRight();
		Page.delay(500);
		// Step 7-1 Verify: The list Scrolls Right
		const curHorizontalScrollThumbPosition = Page.scrollThumbPosition();
		expect(curHorizontalScrollThumbPosition > initHorizontalScrollThumbPosition).to.be.true();
		// Step 7-2 Verify: The Spotted item is placed on the Right end.
		expectFocusedItem(9);
		expect(Page.bottomRightVisibleItemId()).to.be.equal('item9');
		// Step 8: 5-way Left to the previous item.
		Page.spotlightLeft();
		Page.delay(500);
		// Step 8-1 Verify: The list does not Scroll Left.
		expect(Page.scrollThumbPosition()).to.be.equal(curHorizontalScrollThumbPosition);
		// Step 8-2 Verify: The spotted item is placed next to the rightest item.
		expectFocusedItem(7);
	});
});
