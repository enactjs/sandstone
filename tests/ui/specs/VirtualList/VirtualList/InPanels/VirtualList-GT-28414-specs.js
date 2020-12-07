const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('VirtualList in Panels', function () {
	beforeEach(function () {
		Page.open('InPanels');
	});

	it('should Spotlight returns on Item when List has only 1 Item[GT-28414]', function () {
		// Step3-1: Knobs > VirtualList > dataSize > 1
		Page.inputfieldNumItems.moveTo();
		Page.spotlightSelect();
		Page.backSpace();
		Page.backSpace();
		Page.backKey();
		// Step3-2: 5-way Spot Item 0.
		Page.spotlightDown();
		expectFocusedItem(0);
		// Step 3-1 Verify: Only Item 0 shows in the viewport.
		// Step 3-2 Verify: Spotlight is on Item 0.
		Page.spotlightDown();
		expectFocusedItem(0);
		// Step 4: 5-way Select Item 0.
		Page.spotlightSelect();
		Page.delay(500);
		// Step 4 Verify: Spotlight is on Go Back.
		expect(Page.textContent()).to.equal('Go Back');
		// Step 5: 5-way Select Go Back.
		Page.spotlightSelect();
		Page.delay(500);
		// Step 5 Verify: Spotlight is on Item 0 again.
		expectFocusedItem(0);
	});
});
