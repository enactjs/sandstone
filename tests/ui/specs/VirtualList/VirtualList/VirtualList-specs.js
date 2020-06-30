const Page = require('./VirtualListPage'),
	{expectFocusedItem, expectNoFocusedItem, waitForScrollStartStop, waitUntilFocused} = require('../VirtualList-utils');

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

		it.skip('should focus and Scroll with Up/Down and 5-way [GT-28491]', function () {
			Page.buttonLeft.moveTo();
			Page.spotlightRight(); // is on 'Item 000'
			// Step 3. 5-way Spot the second item 'Item 001'.
			Page.spotlightDown();
			// Verify Step 3: Spotlight displays on the second item 'item 001'.
			expectFocusedItem(1, 'step 3 focus');
			// Step 4. Press Channel Down.
			Page.pageDown();
			waitForScrollStartStop();
			// Verify Step 4: Spotlight is on the *Item* closest to the previously focused Item's location.
			waitUntilFocused(7, 'step 4 focus'); // this works in headless + tv  - must comment to run in debug
			// Step 5. 5-way Down several times to the last visible item on the current viewport.
			Page.fiveWayToItem(17);
			// Verify Step 5: Spotlight is on the last visible item. *** it is not
			Page.delay(100);
			expectFocusedItem(17, 'step 5 focus');
			// Step 6. Press Channel Down.
			Page.pageDown();
			waitForScrollStartStop();
			// Verify Step 6: Spotlight is on the *Item* closest to the previously focused Item's location  ?
			waitUntilFocused(23, 'step 6 focus');
			// Step 7. Press Channel Up.
			Page.pageUp();
			waitForScrollStartStop();
			// Verify Step 7: Spotlight is on the *Item* closest to the previously focused Item's location.
			waitUntilFocused(17, 'step 7 focus');
			// Step 8. 5-way Up several times to the first visible item on the current viewport.
			Page.fiveWayToItem(7);
			// Verify Step 8: Spotlight is on the first visible item.
			expectFocusedItem(7, 'step 8 focus');
			// Step 9. Press Channel Up.
			Page.pageUp();
			waitForScrollStartStop();
			// Verify Step 9: Spotlight is on the *Item* closest to the previously focused Item's location.
			waitUntilFocused(1, 'step 9 focus');
			// Step 10. Wave the pointer. Step 11. Hover on an item.
			Page.item(3).moveTo();
			// Verify Step 10, Step 11: Spotlight is on 'Item 003'
			expectFocusedItem(3, 'step 11 focus');
			// Step 12. Press Channel Down.
			Page.pageDown();
			waitForScrollStartStop();
			// Verify Step 12: 1. Spotlight hides. 2. The list Scrolls Up by page with animation. 3. The list stops scrolling. 4. Spotlight still hides (for a few seconds).
			expectNoFocusedItem();  // Check that Spotlight hides only.
		});

		it('should not scroll when leaving list with 5-way up/down [GT-28473]', function () {
			// Step 3 is 'Set dataSize to 100' but set dataSize to 20 for Speed up Test.
			Page.inputfieldNumItems.moveTo();
			Page.spotlightSelect();
			Page.backSpace();
			Page.backSpace();
			Page.backSpace();
			Page.numPad(2);
			Page.numPad(0);
			Page.backKey();
			Page.spotlightDown();
			// Step 4: change to 5-way mode
			Page.buttonLeft.moveTo();
			// Step 5: 5-way Spot the first item.
			Page.spotlightRight();
			// Verify Step 5: Spotlight displays on the first item.
			expectFocusedItem(0, 'step 5 focus');
			// Step 6: 5-way Up.
			Page.spotlightUp();
			// Verify Step 6: 1. The list *does not* Scroll to the Bottom. 2. Spotlight is on the close button 'x'.
			expect(Page.buttonTop.isFocused(), 'step 6 focus').to.be.true();  // buttonTop replaces the X button
			// Step 7: 1. Wheel Down on the list to the last item.
			// Page.mouseWheel(40, Page.item(6));   currently not working as expected so using 5-way Down temporary
			// Wheeling will not be implemented - see ENYO-6178
			Page.spotlightDown();
			expectFocusedItem(0);
			Page.pageDown();
			waitUntilFocused(6, 'focus Item 6');
			Page.pageDown();
			waitUntilFocused(19, 'focus Item 6');
			// Step 7: 2. Click the last item.
			Page.spotlightSelect();
			// Verify Step 7: Spotlight is on the last item.
			Page.delay(1000);
			expectFocusedItem(19, 'step 7 focus');
			// Step 8: 5-way Down
			Page.spotlightDown();
			Page.spotlightDown(); // 1 extra 5-way down to check Spotlight does not pass buttonBottom when wrap is off.
			Page.delay(1000);
			// Verify Step 8: 1. The list *does not* Scroll to the Top. 2. Spotlight stays on the last item.
			// Checking focus is on buttonBottom instead of last item since 5-way Down on last item using this app takes Spotlight to buttonBottom.
			expect(Page.buttonBottom.isFocused(), 'step 8 focus').to.be.true();
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

		// TODO: Fix to wrap bug [ENYO-6468]
		describe('Change `wrap` dynamically', function () {
		// TODO: this TC number is not matching the JIRA TC - remove number?
			it.skip('should prevent bubbling when wrapping[GT-28463]', function () {
				// Wrap knobs Setting
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightRight();
				// TODO: expectFocusedItem is not working in case of wrap
				expectFocusedItem(0, 'focus');
				Page.spotlightUp();
				Page.spotlightUp();
				Page.delay(1500);  // TODO: Need better way to detect scroll end
				expectFocusedItem(99, 'focus 2');
				Page.spotlightDown();
				Page.delay(1500);  // TODO: Need better way to detect scroll end
				expectFocusedItem(0, 'focus 3');
				expect(Page.list.getAttribute('data-keydown-events')).to.equal('0');
			});
		});

		describe('Item Animates', function () {

			it('should animate Items via Channel Down [GT-28464]', function () {
				// Step 3: Position the pointer on the first item('Item 000)
				Page.showPointerByKeycode();
				Page.item(0).moveTo();
				expectFocusedItem(0);
				// Step 4: Press Channel Down
				Page.pageDown();
				// Verify no error on waitForScrollStartStop
				waitForScrollStartStop();
				// Step 5: Press Channel Down again.
				Page.pageDown();
				// Verify no error on waitForScrollStartStop
				waitForScrollStartStop();
			});
		});
		describe('Datasize change', function () {

			it('should spotlight displays on item after up quickly [GT-28417]', function () {
				// Step3 : datasize Knobs setting '4'
				Page.inputfieldNumItems.moveTo();
				Page.spotlightSelect();
				Page.backSpace();
				Page.backSpace();
				Page.backSpace();
				Page.numPad(4);
				// In case of TV, VKB is opened when inputfield clicking. So add escape key for VKB closing.
				Page.backKey();
				Page.spotlightDown();
				Page.item(0).moveTo();
				// Check First item
				expectFocusedItem(0, 'focus item0');
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightDown();
				expectFocusedItem(3, 'focus item3');
				Page.spotlightDown();
				// Check to go out of the list.
				expect(Page.buttonLeft.isFocused(), 'lastitem verify').to.be.true();
				// Step 4-1: Place the mouse cursor/pointer underneath the last item.
				// TODO: Need to Flick event handling api.
				Page.showPointerByKeycode();
				Page.item(3).moveTo();
				expectFocusedItem(3, 'focus Item 03');
				// Step 4-3: Move the pointer over any of the items.
				// Verify 4: Spotlight displays on any of the items.
				Page.item(1).moveTo();
				expectFocusedItem(1, 'focus Item 01');
				Page.item(0).moveTo();
				expectFocusedItem(0, 'focus Item 00');
			});
		});
	});
});
