const Page = require('../VirtualGridListPage');
const {expectFocusedItem, waitUntilFocused, waitUntilVisible, expectNoFocusedItem} = require('../../VirtualList-utils');

describe('scrollTo()', function () {
	beforeEach(function () {
		Page.open('ScrollTo');
	});

	it('should focus after calling scrollTo() [GT-34044]', function () {
		// wait for view open.
		waitUntilFocused(0);
		// Step 2-1: Press Page Down a few times until 'Click me' item  is visible.
		Page.pageDown();
		Page.delay(1000);
		Page.pageDown();
		Page.delay(1000);
		Page.pageDown();
		Page.delay(1000);
		// Step 2-2: Set to pointer mode.
		// Step 2-3: Hover the 'Click me' item.
		Page.showPointerByKeycode();
		Page.item(20).moveTo();
		// Step 3: Click 'Click me' item.
		browser.positionClick();
		Page.delay(500);
		// Step 3-1 Verify: list is scrolled to first item.
		expect(Page.topLeftVisibleItemId()).to.equal('item0');
		// Step 3-2 Verify: There is no spotlight on any item.
		expectNoFocusedItem();
		// Step 4: Press 5-way Left.
		// Step 4-1 Verify: Set to 5-way mode.
		Page.hidePointerByKeycode();
		Page.spotlightLeft();
		// Step 4-2 Verify: Spotlight on item0.
		expectFocusedItem(0);
		// Step 5: Press 5-way down 5 times.
		for (let i = 1; i < 6; i++) {
			Page.spotlightDown();
			waitUntilFocused(i * 4);
			waitUntilVisible(i * 4);
			Page.delay(500);
		}
		// Step 6: Press 5-way OK.
		Page.spotlightSelect();
		// Step 6-1 Verify: list is scrolled to first item.
		expect(Page.topLeftVisibleItemId()).to.equal('item0');
		// Step 6-2 Verify: Spotlight on item0.
		expectFocusedItem(0);
	});
});

