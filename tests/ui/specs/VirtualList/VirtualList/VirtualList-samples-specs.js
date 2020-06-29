const Page = require('./VirtualListPage');
const {expectFocusedItem} = require('../VirtualList-utils');

describe('VirtualList samples', function () {

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		describe('VirtualList Samples', function () {

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
