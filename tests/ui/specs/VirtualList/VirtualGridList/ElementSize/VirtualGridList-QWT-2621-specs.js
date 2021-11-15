const Page = require('../VirtualGridListPage');

describe('Change Sapcing', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should change spotlight size when spaceing change [QWT-2621]', function () {
		// Check default Sapcing size.
		const defaultSpacingWidth = Page.itemSpacing(0, 1).width;
		const defaultSpacingHeight = Page.itemSpacing(0, 5).height;
		expect(defaultSpacingHeight).to.be.equal(12);
		expect(defaultSpacingWidth).to.be.equal(12);

		// Step 3: Knobs > VirtualGridList > spacing > 200
		Page.inputSpacing.moveTo();
		Page.spotlightSelect();
		Page.backSpace();
		Page.numPad(0);
		Page.numPad(0);
		Page.spotlightUp();

		// Step 3-1 Verify: The gap between items grow bigger. The spacing should be 100 for FHD.
		expect(Page.itemSpacing(0, 1).width).to.be.equal(100);
		expect(Page.itemSpacing(0, 4).height).to.be.equal(100);

		// Step 4: Knobs > VirtualGridList > spacing > 2
		Page.spotlightDown();
		Page.spotlightSelect();
		Page.backSpace();
		Page.backSpace();
		Page.backKey();
		Page.spotlightRight();

		// Step 4-1 Verify: The gap between items grow shrink. The spacing should be 1 for FHD.
		expect(Page.itemSpacing(0, 1).width).to.be.equal(1);
		expect(Page.itemSpacing(0, 5).height).to.be.equal(1);
	});
});
