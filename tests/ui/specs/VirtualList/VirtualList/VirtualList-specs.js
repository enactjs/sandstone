const Page = require('./VirtualListPage'),
	{expectFocusedItem, expectNoFocusedItem, waitForScrollStartStop} = require('../VirtualList-utils');

describe('VirtualList', function () {

	it('should meet initial conditions', function () {
		Page.open();
		expect(Page.buttonHideScrollbar.isFocused(), 'focus').to.be.true();
	});

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		// Need mochaOpts - timeout set to 60000 to pass
		it('should position Scroll thumb on top/bottom when reaching to the edge with 5-way and Channel Down [GT-28564]', function () {
			// Test (Jira) calls for 30 items only. Test uses default of 100 items.
			// Step 4. Move focus to the first item ('Item 00').
			// Verify Step 4: 1. Spotlight displays on the first item.
			Page.spotlightRight();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightRight();
			expectFocusedItem(0, 'focus Item 0');
			// Verify Step 5: Scroll thumb's position appears shortly at the top of the Scrollbar track.
			expect(Page.getScrollThumbPosition(), 'Up').to.be.equal('0');
			// Step 6. Press Channel Down.
			Page.pageDown();
			// Verify Step 6: 1. Spotlight hides.
			expectNoFocusedItem();
			Page.delay(1000);
			expectFocusedItem(6, 'focus Item 6');
			// Step 7. Press Channel Down.
			Page.pageDown();
			// Verify Step 7: 1. Spotlight hides.
			expectNoFocusedItem();
			Page.delay(1000);
			expectFocusedItem(12, 'focus Item 12');
			// Step 8. 5-way Down several times to scroll down the list.
			Page.fiveWayToItem(30);
			expectFocusedItem(30, 'focus Item 30');
			// Step 9. 5-way Spot the last item.
			Page.fiveWayToItem(99);
			// Verify Step 9: 1. Spotlight displays on the last item.
			Page.delay(1000);
			expectFocusedItem(99, 'focus Item 99');
			// Verify Step 10: Scroll thumb's position appears shortly at the bottom of the Scrollbar track.
			Page.delay(2000);
			expect(Page.getScrollThumbPosition(), 'Down').to.be.equal('1');
			// Step 11: 5-way Spot the first item.
			Page.fiveWayToItem(0);
			// Verify Step 11: Spotlight displays on the first item.
			Page.delay(2000);
			expectFocusedItem(0, 'focus Item 0');
			// Verify Step 12: Scroll thumb's position appears shortly at the top of the Scrollbar track.
			Page.delay(1000);
			expect(Page.getScrollThumbPosition(), 'Up').to.be.equal('0');
		});
	});
});
