const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('VirtualList Samples', function () {
	beforeEach(function () {
		Page.open();
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
