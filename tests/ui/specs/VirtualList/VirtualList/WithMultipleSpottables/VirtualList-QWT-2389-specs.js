const Page = require('../VirtualListPage');

describe('VirtualList with multiple spottables in an item', function () {
	beforeEach(function () {
		Page.open('WithMultipleSpottables');
	});

	it('should navigates between the same spottable controls of items [QWT-2389]', function () {
		// Step 1: 5-way Spot a star icon (★) of the first ('Item 000').
		Page.spotlightDown();
		Page.spotlightRight();
		Page.spotlightRight();
		// STep 1 Verify: Spotlight displays on a star icon(★) of the first item ('item 000').
		expect(Page.getElementAttribute('id').slice(0, 8)).to.equal('starIcon');
		expect(Number(Page.getElementAttribute('data-index'))).to.equal(0);
		// 5-way Down hold for 1 second.
		browser.keys('Down Arrow');
		// Spotlight still on any item's starIcon.
		// '5-way down' long pressure is too fast to catch focus element in Jenkins. Therefore, test to catch focus properly with 5-way down.
		Page.spotlightDown();
		expect(Page.getElementAttribute('id').slice(0, 8)).to.equal('starIcon');
		expect(Number(Page.getElementAttribute('data-index'))).to.above(5);
	});
});
