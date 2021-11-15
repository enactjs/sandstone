const Page = require('../VirtualGridListPage');

describe('Navigate with 5-way', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should spotlight move `X` button with 5-way [QWT-2612]', function () {
		// Step 4-1: Knobs > VirtualGridList > dataSize > 3
		// As this View doesn't have 'x' button, Set the data size to 2 so that we can replace it with the top button.
		Page.inputNumItems.moveTo();
		Page.spotlightSelect();
		Page.backSpace();
		Page.backSpace();
		Page.backSpace();
		Page.numPad(2);
		Page.spotlightLeft();
		// Step 4-3: Focus on the top (last) right item of the first row (if more than 1 row displays).
		Page.item(1).moveTo();
		// Step 4-4: 5-way Right.
		Page.spotlightRight();
		// Step 4 Verify: Spotlight is on the '*X*' close button.
		expect(Page.buttonTop.isFocused()).to.be.true();
	});
});
