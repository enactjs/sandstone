const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('Disabled item', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should navigate disabled and enabled items with native scrollmode [GT-29035]', function () {
		// Step 2: Toggle on DisabledItems.(DisabledItem Button for this test.)
		Page.buttonDisabledItem.moveTo();
		Page.spotlightSelect();
		// Step 3: 5-way Spot the first item ('Item 000').
		Page.buttonLeft.moveTo();
		Page.spotlightRight();
		expectFocusedItem(0);
		// Step 4: 5-way Down several times to the next enabled item.
		let index = 1;
		for (; index < 15; index++) {
			Page.fiveWayToItem(index);
			expect(Page.itemDisabled()).to.be.true();
		}
		Page.fiveWayToItem(index);
		expect(Page.itemDisabled()).to.be.false();
		// Step 4-3: Spotlight displays on the next Enabled item.
		expectFocusedItem(15);
		// Step 5: 5-way Up several times.
		for (index = 14; index > 0; index--) {
			Page.fiveWayToItem(index);
			expect(Page.itemDisabled()).to.be.true();
		}
		Page.fiveWayToItem(index);
		expect(Page.itemDisabled()).to.be.false();
		// Step 5-2: Spotlight displays on the previous Enabled item.
		expectFocusedItem(0);
	});
});
