const Page = require('./VirtualListPage'),
	{expectFocusedItem, expectNoFocusedItem, waitUntilFocused} = require('../VirtualList-utils');

describe('VirtualList', function () {

	it('should meet initial conditions', function () {
		Page.open();
		expect(Page.buttonHideScrollbar.isFocused(), 'focus').to.be.true();
	});

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		it('should focus first item on first focus', function () {
			Page.buttonLeft.moveTo();
			Page.spotlightRight();
			expectFocusedItem(0);
		});

		it('should position Scrollbar Track on right side in LTR [GT-28562]', function () {
			// Verify Step 2.2: The Scrollbar track displays shortly right aligned.
			expect(Page.getListRect().right).to.equal(Page.getVerticalScrollbarRect().right);
		});

		it('should position Scroll thumb on top/bottom when reaching to the edge with 5-way and Channel Down [GT-28564]', function () {
			// Step 3. Knobs > VirtualList > dataSize > 30
			Page.inputfieldNumItems.moveTo();
			Page.spotlightSelect();
			Page.backSpace();
			Page.backSpace();
			Page.backSpace();
			Page.numPad(3);
			Page.numPad(0);
			Page.backKey();
			Page.spotlightDown();
			// Step 4. Move focus to the first item ('Item 00').
			Page.buttonLeft.moveTo();
			Page.spotlightRight();
			// Verify Step 4: 1. Spotlight displays on the first item.
			expectFocusedItem(0, 'focus Item 0');
			// Verify Step 5: Scroll thumb's position appears shortly at the top of the Scrollbar track.
			expect(Page.getScrollThumbPosition(), 'Up').to.be.equal('0');
			// Step 6. Press Channel Down.
			Page.pageDown();
			// Verify Step 6: 1. Spotlight hides.
			expectNoFocusedItem();
			waitUntilFocused(6, 'focus Item 6');
			// Step 7. Press Channel Down.
			Page.pageDown();
			// Verify Step 7: 1. Spotlight hides.
			expectNoFocusedItem();
			waitUntilFocused(12, 'focus Item 12');
			// Step 8. 5-way Down several times to scroll down the list.
			Page.fiveWayToItem(20);
			// Step 9. 5-way Spot the last item.
			Page.fiveWayToItem(29);
			// Verify Step 9: 1. Spotlight displays on the last item.
			waitUntilFocused(29, 'focus last Item');
			Page.delay(1000);
			// Verify Step 10: Scroll thumb's position appears shortly at the bottom of the Scrollbar track.
			expect(Page.getScrollThumbPosition(), 'Down').to.be.equal('1');
			// Step 11: 5-way Spot the first item.
			Page.pageUp();
			waitUntilFocused(23, 'focus Item 23');
			Page.pageUp();
			waitUntilFocused(17, 'focus Item 17');
			Page.pageUp();
			waitUntilFocused(11, 'focus Item 11');
			Page.pageUp();
			// Verify Step 11: Spotlight displays on the first item.
			waitUntilFocused(0, 'focus Item 0');
			// Verify Step 12: Scroll thumb's position appears shortly at the top of the Scrollbar track.
			expect(Page.getScrollThumbPosition(), 'Up').to.be.equal('0');
		});

		// TODO: Will need lots of comments update to match the TC in JIra
		it('should Items Animate via 5-way Up and Down on Last Item on the page - vertical [GT-28481]', function () {
			let bottomId;
			Page.buttonLeft.moveTo();
			Page.spotlightRight(); // needed to focus Item 00 and get into that container
			// Step 3. 1. Position the pointer on the last item in a current page.
			bottomId = Page.bottomVisibleItemId();
			Page.showPointerByKeycode();
			Page.item(bottomId).moveTo();
			// Verify Step 3: Spotlight displays on the item.
			Page.delay(1000); // needed to run on mpc
			expectFocusedItem(Number((Page.bottomVisibleItemId().slice(4))), 'focus bottomId');
			// Step 4. 5-way Down to the item below the last item on the current page.
			Page.spotlightDown();
			// Verify Step 4: 1. The list Scrolled Up.  2 The Spotted item is placed on the Bottom.
			Page.delay(1000); // needed to run on mpc
			expectFocusedItem(Number((Page.bottomVisibleItemId().slice(4))), 'focus bottomId');
			// Step 5: 5-way Up to the previous item.
			Page.spotlightUp();
			// Verify Step 5: 1. The list *does not* Scroll Down.
			// Check the bottomVisibleItem is still the same as the one before 5-way Up to check the list did not scroll Down
			expect(Number(bottomId.slice(4)) === ((Number((Page.bottomVisibleItemId().slice(4))))) - 1).to.be.true();
			// Verify Step 5: 2. The Spotted item is placed above the item on the Bottom.
			expectFocusedItem(Number((bottomId.slice(4))), 'focus bottomId');
			// Step 6: 5-way Up to the first item ('*Item 000*').
			Page.fiveWayToItem(0);
			// Verify Step 6:  1. The list Scroll Down. 2. The Spotted item is placed on the Top.
			expectFocusedItem(Number((Page.topVisibleItemId().slice(4))), 'focus Item 00');
			expectFocusedItem(0, 'focus Item 00');  // to double check it is really top item
		});

		it('should Spotlight with Pointer wave [GT-28476]', function () {
			// Step 3-1: Position the pointer on 'item 004'.
			// Step 3-2: 5-way Spot 'Item 004'(while leaving the pointer on 'item 004').
			Page.item(4).moveTo();
			Page.spotlightSelect();
			// Verify Step 3: Spotlight displays on the '*Item 004*'.
			expectFocusedItem(4, 'focus Item 004');
			// Step 4-1: 5-way Down to 'Item 007'.
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			expectFocusedItem(7, 'focus Item 007');
			// Step 4-2: Wave the pointer.
			// Verify Step 4-1: Spotlight hides from 'Item 007'.
			// Verify Step 4-2: Spotlight displays on the item at the pointer's location.
			Page.showPointerByKeycode();
			Page.item(3).moveTo();
			expectFocusedItem(3, 'focus Item 03');
			Page.item(1).moveTo();
			expectFocusedItem(1, 'focus Item 01');
			Page.item(5).moveTo();
			expectFocusedItem(5, 'focus Item 05');
		});
	});
});
