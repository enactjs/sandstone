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
			Page.spotlightDown();
			Page.spotlightRight();
			expectFocusedItem(0);
		});

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
			Page.fiveWayToItem(99);
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

		//	TODO: Need to api for Scrollbar and List size checking in sandstone.
		it.skip('should have same height list and scrollbar [GT-28930]', function () {
			// Verify: The scrollbar size fit to the size of the list.
			expect(Page.listSize.height).to.equal(Page.scrollBarSize.height);
		});

		it('should position Scrollbar Track on right side in LTR [GT-28562]', function () {
			let ListwidthSize = Page.getScrollOffsetLeft() + Page.getScrollbarWidth();
			// Verify Step 2.2: The Scrollbar track displays shortly right aligned.
			expect(Page.getListwidthSize()).to.equal(ListwidthSize);
		});

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
			waitUntilFocused(6, 'focus Item 6');
			// Step 7. Press Channel Down.
			Page.pageDown();
			// Verify Step 7: 1. Spotlight hides.
			expectNoFocusedItem();
			waitUntilFocused(12, 'focus Item 12');
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
			Page.fiveWayToItem(0);
			// Verify Step 6:  1. The list Scroll Down. 2. The Spotted item is placed on the Top.
			expectFocusedItem(Number((Page.topVisibleItemId().slice(4))), 'focus Item 00');
			expectFocusedItem(0, 'focus Item 00');  // to double check it is really top item
		});

		it('should Spotlight with Pointer wave [GT-28476]', function () {
			// Step 3-1: Position the pointer on 'item 004'.
			// Step 3-2: 5-way Spot 'Item 004'(while leaving the pointer on 'item 004').
			$('#item4').moveTo();
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
			$('#item3').moveTo();
			expectFocusedItem(3, 'focus Item 03');
			$('#item1').moveTo();
			expectFocusedItem(1, 'focus Item 01');
			$('#item5').moveTo();
			expectFocusedItem(5, 'focus Item 05');
		});

		describe('onKeyDown event behavior [GT-28490]', function () {

			it('should prevent bubbling while navigating within a list', function () {
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightRight();
				expectFocusedItem(0, 'focus 1');
				Page.spotlightDown();
				expectFocusedItem(1, 'focus 2');
				Page.spotlightUp();
				expectFocusedItem(0, 'focus 3');
				expect(Page.list.getAttribute('data-keydown-events')).to.be.null();
				Page.spotlightRight();
				Page.spotlightLeft();
				expectFocusedItem(0, 'focus 7');
				expect(Page.list.getAttribute('data-keydown-events')).to.equal('1');
			});

			// TODO: Fix to wrap bug [ENYO-6468]
			it.skip('should prevent bubbling when wrapping', function () {
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

			// TODO: Need to check another way for PagingControl.
			it.skip('should allow bubbling while navigating out of a focusableScrollbar list via scroll buttons', function () {
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
				Page.fiveWayToItem(99);
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
				Page.fiveWayToItem(99);
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
				Page.fiveWayToItem(99);
				expectFocusedItem(99, 'focus 6');
				Page.delay(1500);
				Page.spotlightDown();
				expect(Page.buttonBottom.isFocused(), 'focus 7').to.be.true();
				expect(Page.list.getAttribute('data-keydown-events')).to.equal('4');
			});
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

		describe('RTL locale', function () {
			beforeEach(function () {
				Page.open('?locale=ar-SA');
			});

			it('should position Scrollbar Track on left side in RTL [GT-28563], [GT-28480]', function () {
				// Verify 3-2: The Scrollbar track displays shortly left aligned.
				expect(Page.getScrollOffsetLeft()).to.equal(0);
			});
		});

		describe('Verify locale Change', function () {
			beforeEach(function () {
				Page.open('?locale=ur-PK');
			});

			// Since 'ar-sA' and 'en-US' have tests to check on the other side, this test only check 'ur-PK'.
			it('should Verify RTL functionality [GT-28480]', function () {
				// Verify 5-1: VirtualList sample displays in RTL (Right to Left.)
				// Check that the button's position is Right-> Left.(in case RTL, button position is 'Right' - 'Left')
				Page.spotlightDown();
				expect(Page.buttonLeft.isFocused(), 'focus left');
				Page.spotlightLeft();
				Page.spotlightLeft();
				expect(Page.buttonRight.isFocused(), 'focus Right');
				// Verify 5-2: Vertical Scrollbar displays on the left side.
				expect(Page.getScrollOffsetLeft()).to.equal(0);
			});
		});

		describe('onScrollStart/Stop Events behavior ', function () {
			beforeEach(function () {
				Page.open();
			});

			it.skip('should display Scroll Events in Action with 5-way Down and Up [GT-28470]', function () {
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
		describe('Datasize change', function () {
			beforeEach(function () {
				Page.open();
			});

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
				Page.spotlightRight();
				// Check First item
				expectFocusedItem(0, 'focus item0');
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightDown();
				expectFocusedItem(3, 'focus item3');
				Page.spotlightDown();
				expect(Page.buttonLeft.isFocused(), 'lastitem verify').to.be.true();
				// Step 4-1: Place the mouse cursor/pointer underneath the last item.
				// TODO: Need to Flick event handling api.
				Page.showPointerByKeycode();
				$('#item3').moveTo();
				expectFocusedItem(3, 'focus Item 03');
				// Step 4-3: Move the pointer over any of the items.
				// Verify 4: Spotlight displays on any of the items.
				$('#item1').moveTo();
				expectFocusedItem(1, 'focus Item 01');
				$('#item0').moveTo();
				expectFocusedItem(0, 'focus Item 00');
			});
		});

		describe('spotlight size compare', function () {
			beforeEach(function () {
				Page.open();
			});

			it('should maintain spotlight size when spacing 100[GT-28462]', function () {
				// The default size of Spotlight is 156 for 4k and 78 for FHD.
				Page.spotlightDown();
				Page.spotlightRight();
				const defaultSpotlightSize = Page.spotlightSize();
				// Step 3 Verify: The default value for the 'spacing' knob is 0.
				const defaultSpacing = Page.itemSpacing();
				expect(defaultSpacing).to.equal(0);
				// Step 4: Knobs > VirtualList > spacing > 100
				Page.inputfieldSpacing.moveTo();
				Page.spotlightSelect();
				Page.backSpace();
				Page.numPad(1);
				Page.numPad(0);
				Page.numPad(0);
				// In case of TV, VKB is opened when inputfield clicking. So add escape key for VKB closing.
				Page.backKey();
				// 100 spacing value is 50 for 4k and 25 for FHD.
				// Step 4 Verify: The gap between items grows bigger.
				const changedSpacing = Page.itemSpacing();
				expect(changedSpacing).to.equal(50);
				// Step5-1: Hover an item.
				Page.spotlightDown();
				Page.spotlightRight();
				$('#item5').moveTo();
				expectFocusedItem(5);
				// Step5 Verify: The spotlight size does not change.
				expect(Page.spotlightSize()).to.equal(defaultSpotlightSize);
				// Step 6: Knobs > VirtualList > spacing > 50
				Page.inputfieldSpacing.moveTo();
				Page.spotlightSelect();
				Page.backSpace();
				Page.backSpace();
				Page.backSpace();
				Page.numPad(5);
				Page.numPad(0);
				Page.backKey();
				// 50 spacing value is 50 for 4k and 25 for FHD.
				const newSpacing = Page.itemSpacing();
				expect(newSpacing).to.equal(25);
				// Step7-1: Hover an item.
				Page.spotlightDown();
				Page.spotlightRight();
				$('#item3').moveTo();
				expectFocusedItem(3);
				// Step7 Verify: The spotlight size does not change.
				expect(Page.spotlightSize()).to.equal(defaultSpotlightSize);
			});

			it('should change spotlight size when item`s size changing [GT-28459]', function () {
				// Step 3 Verify: The default value for the 'itemSize' knob is itemSizeValue(default size is 156 for 4k) or half of 4k(78 for 2k).
				const defaultItemSize = Page.getItemSize();
				expect(defaultItemSize.height).to.equal(78);
				expect(defaultItemSize.width).to.equal(1200);
				// The default size of Spotlight is 156 for 4k and 78 for FHD.
				Page.spotlightDown();
				Page.spotlightRight();
				const defaultSpotlightSize = Page.spotlightSize();
				expect(defaultSpotlightSize).to.equal(78);
				// Step 4: Knobs > VirtualList > itemSize > 300
				Page.inputfieldItemSize.moveTo();
				Page.spotlightSelect();
				Page.backSpace();
				Page.backSpace();
				Page.backSpace();
				Page.numPad(3);
				Page.numPad(0);
				Page.numPad(0);
				Page.backKey();
				// Verify item size
				const curItemSize = Page.getItemSize();
				expect(curItemSize.height).to.equal(150);
				expect(curItemSize.width).to.equal(defaultItemSize.width);
				Page.spotlightDown();
				Page.spotlightRight();
				$('#item2').moveTo();
				expectFocusedItem(2);
				const curSpotlightSize = Page.spotlightSize();
				expect(curSpotlightSize).to.equal(150);
				// Step 4: Knobs > VirtualList > itemSize > 50
				Page.inputfieldItemSize.moveTo();
				Page.spotlightSelect();
				Page.backSpace();
				Page.backSpace();
				Page.backSpace();
				Page.numPad(5);
				Page.numPad(0);
				Page.backKey();
				// Verify item size
				const newItemSize = Page.getItemSize();
				expect(newItemSize.height).to.equal(25);
				expect(newItemSize.width).to.equal(defaultItemSize.width);
				Page.spotlightDown();
				Page.spotlightRight();
				$('#item4').moveTo();
				expectFocusedItem(4);
				const newSpotlightSize = Page.spotlightSize();
				expect(newSpotlightSize).to.equal(25);
			});
		});
		describe('cbScrollTo VirtualList Samples', function () {
			beforeEach(function () {
				Page.open();
			});

			// Since it is not the same as the view of samples, we made a button to go directly to the corresponding item.
			it('should Jump to item when press cbScrollTo button [GT-28936]', function () {
				// Step2-1: 5-way Spot the '010 - 한국어 - 한국'(item10 for this test) item.
				// Check if item10 is located at the top of the list.
				Page.buttonJumpToItem.moveTo();
				Page.spotlightSelect();
				const topId = Page.topVisibleItemId();
				expect(topId).to.equal('item10');
				expectFocusedItem(10);
				// Step2-2: 5-way Spot the '035 - Čeština - Česká republika'(item35 for this test) item.
				Page.fiveWayToItem(35);
				expectFocusedItem(35);
				// Step3-1: 5-way Spot the '034 - Čeština - Česká republika'(item34 for this test) item.
				Page.spotlightUp();
				expectFocusedItem(34);
				// Step3-2: 5-way Up until Spotlight displays on the '000 - 한국어 - 한국'(item0 for this test) item.
				Page.fiveWayToItem(0);
				expectFocusedItem(0);
			});
		});
	});
});
