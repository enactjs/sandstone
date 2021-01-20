const Page = require('../VirtualListPage');

describe('With Container', function () {
	beforeEach(function () {
		Page.open('WithContainer');
	});

	it('should Spotlight Moves between Spottable Controls of Items [GT-28742]', function () {
		// Step 1: 5-way Spot a star icon (★) of the first ('Item 000').
		Page.spotlightDown();
		Page.spotlightRight();
		Page.spotlightRight();
		// STep 1 Verify: Spotlight displays on a star icon(★) of the first item ('item 000').
		expect(Page.getElementAttribute('id')).to.equal('starIcon');
		expect(Number(Page.getElementAttribute('data-index'))).to.equal(0);
		// 5-way Up hold for 1 second.
		setTimeout(() => {
			browser.keys('Down Arrow');
		}, 1500);
		// Spotlight still on any item's starIcon.
		// As Jenkins'result is unexpectable by performance, make sure that spotlight is in starIcon only.
		expect(Page.getElementAttribute('id')).to.equal('starIcon');
		expect(Number(Page.getElementAttribute('data-index'))).to.above(0);
	});
});
