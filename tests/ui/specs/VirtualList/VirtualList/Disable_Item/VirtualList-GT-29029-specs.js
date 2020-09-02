const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('Disalbed item', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should Navigate Disabled and Enabled items [GT-29029]', function () {
		// Step 2: Uncheck the "Native Scrolling" Checkbox item.
		// Set translate ScrollMode.
		Page.buttonNativeScroll.moveTo();
		Page.spotlightSelect();
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
});
