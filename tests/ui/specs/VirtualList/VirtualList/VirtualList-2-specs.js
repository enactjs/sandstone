const Page = require('./VirtualListPage');
const {expectFocusedItem, waitForScrollStartStop} = require('../VirtualList-utils');

describe('VirtualList 2', function () {

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
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

		describe('onScrollStart/Stop Events behavior ', function () {
			beforeEach(function () {
				Page.open();
			});

			it('should display Scroll Events in Action with 5-way Down and Up [GT-28470]', function () {
				// Verify Step 3 : Spotlight displays on the Item 006 or 007.
				Page.item(7).moveTo();
				expectFocusedItem(7, 'step 3 focus');
				// Step 4:5-way Down se	veral times(approximately 10 times) until the entire list starts to scroll.
				let index = 1;
				for (; index < 11; index++) {
					Page.spotlightDown();
					// Verify Step 4.1: Displays 'onScrollStart'
					// Verify Step 4.2: Displays 'onScrollStop' as soon as the list stops.
					Page.delay(500);
					expect(Page.list.getAttribute('data-scrolling-events')).to.equal(String(index));
				}
				// Step 5:5-way Up several times(approximately 10 times) until the entire list starts to scroll.
				for (; index < 21; index++) {
					Page.spotlightUp();
					if (index > 17) {
						// Verify Step 5.1: Displays 'onScrollStart'
						// Verify Step 5.2: Displays 'onScrollStop' as soon as the list stops.
						Page.delay(500);
						// five-way Up 10 times to item17> item 7. Until the list wii be able to scrolled up, scroll event does not occur(7 times).
						expect(Page.list.getAttribute('data-scrolling-events')).to.equal(String(index - 7));
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

		describe('spotlight size compare', function () {
			beforeEach(function () {
				Page.open();
			});

			it('should maintain spotlight size when spacing 100[GT-28462]', function () {
				// The default size of Spotlight is 156 for 4k and 78 for FHD.
				Page.buttonLeft.moveTo();
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
				Page.item(5).moveTo();
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
				Page.item(3).moveTo();
				expectFocusedItem(3);
				// Step7 Verify: The spotlight size does not change.
				expect(Page.spotlightSize()).to.equal(defaultSpotlightSize);
			});

			it('should change spotlight size when item`s size changing [GT-28459]', function () {
				// Step 3 Verify: The default value for the 'itemSize' knob is itemSizeValue(default size is 156 for 4k) or half of 4k(78 for 2k).
				const defaultItemSize = Page.getItemSize();
				// The default size of Spotlight is 156 for 4k and 78 for FHD.
				Page.buttonLeft.moveTo();
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
				Page.item(2).moveTo();
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
				Page.item(4).moveTo();
				expectFocusedItem(4);
				const newSpotlightSize = Page.spotlightSize();
				expect(newSpotlightSize).to.equal(25);
			});
		});

		describe('VirtualList Samples', function () {
			beforeEach(function () {
				Page.open();
			});

			// Since it is not the same as the view of samples, we made a button to go directly to the corresponding item.
			it.skip('should Jump to item when press JumpToItem10 button [GT-28936]', function () {
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

			it('should Navigate Disabled and Enabled items [GT-29029]', function () {
				// Step 3: Click on DisabledItems CheckboxItem.(DisabledItem Button for this test.)
				Page.buttonDisabledItem.moveTo();
				Page.spotlightSelect();
				// Step 4: 5-way Spot the first item ('Item 000').
				Page.buttonLeft.moveTo();
				Page.spotlightRight();
				expectFocusedItem(0);
				// Step 5: 5-way Down several times to the next enabled item.
				// Step 5-2 Verify: Spotlight displays on each Item (Disabled and Enabled) as the list scrolls up.
				// Page.fiveWayToItem and Page.itemDisabled function included Step 5's Verify(5-2).
				let index = 1;
				for (; index < 15; index++) {
					Page.fiveWayToItem(index);
					expect(Page.itemDisabled()).to.be.true();
				}
				Page.fiveWayToItem(index);
				expect(Page.itemDisabled()).to.be.false();
				// Step 5-3: Spotlight displays on the next Enabled item.
				expectFocusedItem(15);
				// Step 6: 5-way Up several times to the previous enabled item.
				// Step 6-2: Spotlight displays on each Item (Disabled and Enabled) as the list scrolls down.
				for (index = 14; index > 0; index--) {
					Page.fiveWayToItem(index);
					expect(Page.itemDisabled()).to.be.true();
				}
				Page.fiveWayToItem(index);
				expect(Page.itemDisabled()).to.be.false();
				// Step 6-3: Spotlight displays on the previous Enabled item.
				expectFocusedItem(0);
			});

			it('should  display childProps [GT-29028]', function () {
				// Verify 1-2:The first item shows 'Item 000'.
				Page.buttonLeft.moveTo();
				Page.spotlightRight();
				expectFocusedItem(0);
				expect(Page.textContent()).to.equal('Item 00');
				// Verify 1-3: The second item shows 'Item 001'.
				Page.spotlightDown();
				expectFocusedItem(1);
				expect(Page.textContent()).to.equal('Item 01');
				// Step 3: 5-way Spot and Select 'Chid Props' toggle button.
				Page.buttonChildProps.click();
				// Verify 3-1: The first item shows 'Item 000 child props'.
				Page.item(0).moveTo();
				expectFocusedItem(0);
				expect(Page.textContent()).to.equal('Item 00 child props');
				// Verify 3-2: The second item shows 'Item 001 child props'.
				Page.spotlightDown();
				expectFocusedItem(1);
				expect(Page.textContent()).to.equal('Item 01 child props');
			});
		});
	});
});
