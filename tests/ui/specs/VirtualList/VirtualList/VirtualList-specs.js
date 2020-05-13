const Page = require('./VirtualListPage'),
	{expectFocusedItem, expectNoFocusedItem, fiveWayToItem, waitForScrollStartStop, waitUntilFocused} = require('../VirtualList-utils');

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
			Page.spotlightDown();
			Page.spotlightRight();
			expectFocusedItem(0);
		});

		// TODO: Failing on Jenkins
		it.skip('should focus and Scroll with Up/Down and 5-way [GT-28491]', function () {
			Page.spotlightDown(); // is on Left button
			Page.spotlightRight(); // is on 'Item 000'
			// Step 3. 5-way Spot the second item 'Item 001'.
			Page.spotlightDown();
			// Verify Step 3: Spotlight displays on the second item 'item 001'.
			expectFocusedItem(1, 'step 3 focus');
			// Step 4. Press Channel Down.
			Page.pageDown();
			waitForScrollStartStop();
			// Verify Step 4: Spotlight is on the *Item* closest to the previously focused Item's location.
			expectFocusedItem(7, 'step 4 focus'); // this works in headless + tv  - must comment to run in debug
			// Step 5. 5-way Down several times to the last visible item on the current viewport.
			fiveWayToItem(Page, 17);
			// Verify Step 5: Spotlight is on the last visible item. *** it is not
			waitForScrollStartStop();
			Page.delay(100);
			expectFocusedItem(17, 'step 5 focus');
			// Step 6. Press Channel Down.
			Page.pageDown();
			waitForScrollStartStop();
			// Verify Step 6: Spotlight is on the *Item* closest to the previously focused Item's location  ?
			expectFocusedItem(23, 'step 6 focus');
			// Step 7. Press Channel Up.
			Page.pageUp();
			waitForScrollStartStop();
			// Verify Step 7: Spotlight is on the *Item* closest to the previously focused Item's location.
			expectFocusedItem(17, 'step 7 focus');
			// Step 8. 5-way Up several times to the first visible item on the current viewport.
			fiveWayToItem(Page, 7);
			waitForScrollStartStop();
			// Verify Step 8: Spotlight is on the first visible item.
			expectFocusedItem(7, 'step 8 focus');
			// Step 9. Press Channel Up.
			Page.pageUp();
			waitForScrollStartStop();
			// Verify Step 9: Spotlight is on the *Item* closest to the previously focused Item's location.
			expectFocusedItem(1, 'step 9 focus');
			// Step 10. Wave the pointer. Step 11. Hover on an item.
			$('#item3').moveTo(302, 50);
			// Verify Step 10, Step 11: Spotlight is on 'Item 003'
			expectFocusedItem(3, 'step 11 focus');
			// Step 12. Press Channel Down.
			Page.pageDown();
			waitForScrollStartStop();
			// Verify Step 12: 1. Spotlight hides. 2. The list Scrolls Up by page with animation. 3. The list stops scrolling. 4. Spotlight still hides (for a few seconds).
			expectNoFocusedItem();  // Check that Spotlight hides only.
		});

		it('should not scroll when leaving list with 5-way up/down [GT-28473]', function () {
			// Step 3. Set dataSize to 100. Step 4: change to 5-way mode
			Page.spotlightDown();
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
			fiveWayToItem(Page, 99);
			// Step 7: 2. Click the last item.
			Page.spotlightSelect();
			// Verify Step 7: Spotlight is on the last item.
			Page.delay(1000);
			expectFocusedItem(99, 'step 7 focus');
			// Step 8: 5-way Down
			Page.spotlightDown();
			Page.spotlightDown(); // 1 extra 5-way down to check Spotlight does not pass buttonBottom when wrap is off.
			Page.delay(1000);
			// Verify Step 8: 1. The list *does not* Scroll to the Top. 2. Spotlight stays on the last item.
			// Checking focus is on buttonBottom instead of last item since 5-way Down on last item using this app takes Spotlight to buttonBottom.
			expect(Page.buttonBottom.isFocused(), 'step 8 focus').to.be.true();
		});

		/*
		//	TODO: Need to api for Scrollbar and List size checking.
		it('should have same height list and scrollbar [GT-22079]', function () {
			// Verify: The scrollbar size fit to the size of the list.
			expect(Page.listSize.height).to.equal(Page.scrollBarSize.height);
		});

		// TODO: Need to Check LTR
		it('should position Paging Controls on right side in LTR [GT-21271]', function () {
			Page.spotlightSelect();
			Page.spotlightDown();
			Page.spotlightDown();
			expectFocusedItem(1); // Check that Spotlight is on an item
			Page.spotlightRight();
			expect(Page.buttonScrollUp.isFocused(), 'step 2.2 focus').to.be.true();
			Page.spotlightDown();
			expect(Page.buttonScrollDown.isFocused(), 'step 2.2 focus').to.be.true();
		});
		*/

		// Need mochaOpts - timeout set to 60000 to pass
		it('should position Scroll thumb on top/bottom when reaching to the edge with 5-way and Channel Down [GT-28564]', function () {
			// Test (Jira) calls for 30 items only. Test uses default of 100 items.
			// Step 4. Move focus to the first item ('Item 00').
			// Verify Step 4: 1. Spotlight displays on the first item.
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
			fiveWayToItem(Page, 30);
			expectFocusedItem(30, 'focus Item 30');
			// Step 9. 5-way Spot the last item.
			fiveWayToItem(Page, 99);
			// Verify Step 9: 1. Spotlight displays on the last item.
			Page.delay(1000);
			expectFocusedItem(99, 'focus Item 99');
			// Verify Step 10: Scroll thumb's position appears shortly at the bottom of the Scrollbar track.
			Page.delay(2000);
			expect(Page.getScrollThumbPosition(), 'Down').to.be.equal('1');
			// Step 11: 5-way Spot the first item.
			fiveWayToItem(Page, 0);
			// Verify Step 11: Spotlight displays on the first item.
			Page.delay(2000);
			expectFocusedItem(0, 'focus Item 0');
			// Verify Step 12: Scroll thumb's position appears shortly at the top of the Scrollbar track.
			Page.delay(1000);
			expect(Page.getScrollThumbPosition(), 'Up').to.be.equal('0');
		});

		// TODO : should Fix issue that bottomVisibleItem is not properly displaying.
		// TODO: Will need lots of comments update to match the TC in JIra
		it.skip('should Items Animate via 5-way Up and Down on Last Item on the page - vertical [GT-28481]', function () {
			let bottomId;
			Page.spotlightSelect();
			Page.spotlightDown();
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
			fiveWayToItem(Page, 0);
			// Verify Step 6:  1. The list Scroll Down. 2. The Spotted item is placed on the Top.
			expectFocusedItem(Number((Page.topVisibleItemId().slice(4))), 'focus Item 00');
			expectFocusedItem(0, 'focus Item 00');  // to double check it is really top item
		});

		describe('onKeyDown event behavior [GT-28490]', function () {
			/*
			it('should prevent bubbling while navigating within a list', function () {
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightRight();
				expectFocusedItem(0, 'focus 1');
				Page.spotlightDown();
				expectFocusedItem(1, 'focus 2');
				Page.spotlightUp();
				expectFocusedItem(0, 'focus 3');
				Page.spotlightRight();
				expect(Page.buttonScrollUp.isFocused(), 'focus 4').to.be.true();
				Page.spotlightDown();
				expect(Page.buttonScrollDown.isFocused(), 'focus 5').to.be.true();
				Page.spotlightUp();
				expect(Page.buttonScrollUp.isFocused(), 'focus 6').to.be.true();
				Page.spotlightLeft();
				expectFocusedItem(0, 'focus 7');
				expect(Page.list.getAttribute('data-keydown-events')).to.equal('0');
			});

			it('should prevent bubbling when wrapping', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightRight();
				expectFocusedItem(0, 'focus 1');
				Page.spotlightUp();
				Page.delay(1500);  // TODO: Need better way to detect scroll end
				expectFocusedItem(99, 'focus 2');
				Page.spotlightDown();
				Page.delay(1500);  // TODO: Need better way to detect scroll end
				expectFocusedItem(0, 'focus 3');
				expect(Page.list.getAttribute('data-keydown-events')).to.equal('0');
			});

			it('should allow bubbling while navigating out of a focusableScrollbar list via scroll buttons', function () {
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightRight();
				Page.spotlightRight();
				expect(Page.buttonScrollUp.isFocused(), 'focus 1').to.be.true();
				Page.spotlightRight();
				Page.spotlightLeft();
				Page.spotlightUp();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightRight();
				Page.spotlightLeft();
				Page.spotlightDown();
				expect(Page.list.getAttribute('data-keydown-events'), 'step 8').to.equal('4');
			});
			*/
			it('should allow bubbling while navigating out of a list using visible focusableScrollbar via items', function () {
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightRight();
				expectFocusedItem(0, 'focus 1');
				Page.spotlightUp();
				Page.spotlightDown();
				Page.spotlightLeft();
				Page.spotlightRight();
				expectFocusedItem(0, 'focus 2');
				fiveWayToItem(Page, 99);
				expectFocusedItem(99, 'focus 3');
				Page.spotlightDown();
				expect(Page.list.getAttribute('data-keydown-events')).to.equal('3');
			});

			// Need mochaOpts - timeout set to 60000 to pass
			it('should allow bubbling while navigating out of a list using hidden focusableScrollbar via items', function () {
				Page.spotlightSelect();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightRight();
				expectFocusedItem(0, 'focus 1');
				Page.spotlightUp();
				expect(Page.buttonTop.isFocused(), 'focus 2').to.be.true();
				Page.spotlightDown();
				Page.spotlightLeft();
				expect(Page.buttonLeft.isFocused(), 'focus 3').to.be.true();
				Page.spotlightRight();
				Page.spotlightRight();
				expect(Page.buttonRight.isFocused(), 'focus 4').to.be.true();
				Page.spotlightLeft();
				expectFocusedItem(0, 'focus 5');
				fiveWayToItem(Page, 99);
				expectFocusedItem(99, 'focus 6');
				Page.delay(1500);
				Page.spotlightDown();
				expect(Page.buttonBottom.isFocused(), 'focus 7').to.be.true();
				expect(Page.list.getAttribute('data-keydown-events')).to.equal('4');
			});

			// Need mochaOpts - timeout set to 60000 to pass
			it('should allow bubbling while navigating out of a list using non-focusableScrollbar via items', function () {
				Page.spotlightDown();
				Page.spotlightRight();
				expectFocusedItem(0, 'focus 1');
				Page.spotlightUp();
				expect(Page.buttonTop.isFocused(), 'focus 2').to.be.true();
				Page.spotlightDown();
				Page.spotlightLeft();
				expect(Page.buttonLeft.isFocused(), 'focus 3').to.be.true();
				Page.spotlightRight();
				Page.spotlightRight();
				expect(Page.buttonRight.isFocused(), 'focus 4').to.be.true();
				Page.spotlightLeft();
				expectFocusedItem(0, 'focus 5');
				fiveWayToItem(Page, 99);
				expectFocusedItem(99, 'focus 6');
				Page.delay(1500);
				Page.spotlightDown();
				expect(Page.buttonBottom.isFocused(), 'focus 7').to.be.true();
				expect(Page.list.getAttribute('data-keydown-events')).to.equal('4');
			});
		});
		/*
		describe('Change `wrap` dynamically' , function () {
		// TODO: this TC number is not matching the JIRA TC - remove number?
			it('should prevent bubbling when wrapping[GT-28463]', function () {
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
		describe('VirtualList with Wheeling', function () {
			it('Items Animate via Clicking on Page Controls [GT-21571]', function () {
				const scrollDistance = Math.round(Page.listSize.height * 0.66);
				let elementId, initialTop, newTop, travelDistance;
				Page.spotlightDown();
				Page.spotlightRight();
				Page.spotlightRight();
				// Step 3. Click on Down Paging Control (∨).
				expect(Page.listSize.height).to.equal(Page.scrollBarSize.height);
				elementId = Page.bottomVisibleItemId();
				initialTop = Page.itemOffsetTopById(elementId);
				Page.buttonScrollDown.click();
				Page.delay(1500);
				expect(Page.buttonScrollUp.getAttribute('disabled'), 'Up is enabled').to.be.null();
				// Verify Step 3: The list Scrolls 66% of the Scroller height Up.
				newTop = Page.itemOffsetTopById(elementId);
				travelDistance = Math.round(initialTop - newTop);
				expect(travelDistance).to.equal(scrollDistance);
				// scroll down to get a valid test for the next step
				Page.buttonScrollDown.click();
				Page.delay(1500);
				// Step 4. Click on Up Paging Control (∧).
				elementId = Page.topVisibleItemId();
				initialTop = Page.itemOffsetTopById(elementId);
				Page.buttonScrollUp.click();
				Page.delay(1500);
				// Verify Step 4: The list Scrolls 66% of the Scroller height Down.
				newTop = Page.itemOffsetTopById(elementId);
				if (initialTop < 0) {
					travelDistance = Math.abs(initialTop) + newTop;
				} else {
					travelDistance = newTop - initialTop;
				}
				expect(Math.round(travelDistance)).to.equal(scrollDistance);
			});
		});
		describe('RTL locale', function () {
			beforeEach(function () {
				Page.open('?locale=ar-SA');
			});
			it('should position Paging Controls on left side in RTL [GT-21270]', function () {
				Page.spotlightSelect();
				Page.spotlightDown();
				// Step 3: The list is Right aligned so Spotlight needs to move to the left
				Page.spotlightLeft();
				Page.spotlightDown();
				// Verify Step 3.1:  The list displays Right aligned.
				expectFocusedItem(1);
				Page.spotlightLeft();
				// Verify Step 3.2: Paging Controls display left aligned.
				expect(Page.buttonScrollUp.isFocused(), 'step 3 focus').to.be.true();
				// Verify Up Paging Control (∧) is Disabled.
				expect(Page.buttonScrollUp.getAttribute('disabled'), 'Up disabled').to.be.equal('true');
				// Verify Step 9: 3. Down Paging Control (∨) is Enabled.
				expect(Page.buttonScrollDown.getAttribute('disabled'), 'Down enabled').to.be.null();
			});
		});
		*/
		describe('onScrollStart/Stop Events behavior ', function () {
			beforeEach(function () {
				Page.open();
			});

			it('should display Scroll Events in Action with 5-way Down and Up [GT-28470]', function () {
				// Verify Step 3 : Spotlight displays on the Item 006 or 007.
				Page.item(7).moveTo();
				expectFocusedItem(7, 'step 3 focus');
				// Step 4:5-way Down se	veral times(approximately 10 times) until the entire list starts to scroll.
				for (let i = 0; i < 10; i++) {
					Page.spotlightDown();
					// Verify Step 4.1: Displays 'onScrollStart'
					// Verify Step 4.2: Displays 'onScrollStop' as soon as the list stops.
					waitForScrollStartStop();
				}
				// Step 5:5-way Up several times(approximately 10 times) until the entire list starts to scroll.
				for (let j = 0; j < 10; j++) {
					Page.spotlightUp();
					if (j > 6) {
					// Verify Step 5.1: Displays 'onScrollStart'
					// Verify Step 5.2: Displays 'onScrollStop' as soon as the list stops.
					// Verify no error on waitForScrollStartStop
						waitForScrollStartStop();
					}
				}
			});
		});

		describe('Item Animates', function () {
			beforeEach(function () {
				Page.open();
			});

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
	});
});
