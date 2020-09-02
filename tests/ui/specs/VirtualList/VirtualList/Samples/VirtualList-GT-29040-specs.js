const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('VirtualList Samples', function () {
	beforeEach(function () {
		Page.open();
	});

	it('Navigate between inside and outside of a list [GT-29040]', function () {
		// Step 2: 5-way Down to the 10th item.
		Page.buttonLeft.moveTo();
		Page.spotlightRight();
		Page.fiveWayToItem(10);
		// Step 3: 5-way Spot Item 000.
		Page.fiveWayToItem(0);
		// Step 3 Verify: Spotlight displays on Item 000.
		expectFocusedItem(0);
		// Step 4: 5-way Up twice.
		// Step 4 Verify: Spotlight displays on the (x) Closing button. Since (x) button is replaced Top button in UI Test View, this test performed 5-way Up once.
		Page.spotlightUp();
		expect(Page.buttonTop.isFocused()).to.be.true();
	});
});
