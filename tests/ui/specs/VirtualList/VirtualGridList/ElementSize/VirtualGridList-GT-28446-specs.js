const Page = require('../VirtualGridListPage');

describe('Change Sapcing', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should change spotlight size when spaceing change [GT-28446]', function () {
		// Check default item size.
		const defaultItemWidth = Page.getItemSize().width;
		const defaultItemHeight = Page.getItemSize().height;
		const defaultSpacingWidth = Page.itemSpacing(0, 1).width;
		const defaultSpacingHeight = Page.itemSpacing(0, 5).height;
		Page.item(0).moveTo();
		Page.spotlightSelect();
		const defaultSpotlightWidth = Page.spotlightSize().width;
		const defaultSpotlightHeight = Page.spotlightSize().height;
		// Step 3: Knobs > VirtualGridList > spacing > 200
		Page.inputSpacing.moveTo();
		Page.spotlightSelect();
		Page.backSpace();
		Page.numPad(0);
		Page.numPad(0);
		Page.spotlightRight();
		// Check item size when spacing increase.
		const newItemWidth = Page.getItemSize().width;
		const newItemHeight = Page.getItemSize().height;
		const newSpacingWidth = Page.itemSpacing(0, 1).width;
		const newSpacingHeight = Page.itemSpacing(0, 4).height;
		Page.item(0).moveTo();
		Page.spotlightSelect();
		const newSpotlightWidth = Page.spotlightSize().width;
		const newSpotlightHeight = Page.spotlightSize().height;
		// Step 3-1 Verify: The gap between items grow bigger.
		expect(newSpacingWidth).to.be.above(defaultSpacingWidth);
		expect(newSpacingHeight).to.be.above(defaultSpacingHeight);
		// Step 3-2 Verify: ItemSize is bigger.
		expect(newItemWidth).to.be.above(defaultItemWidth);
		expect(newItemHeight).to.be.above(defaultItemHeight);
		// Step 3-3 Verfiy: SpotlightSize is grow bigger.
		expect(newSpotlightWidth).to.be.above(defaultSpotlightWidth);
		expect(newSpotlightHeight).to.be.above(defaultSpotlightHeight);
		// Step 4: Knobs > VirtualGridList > spacing > 2
		Page.inputSpacing.moveTo();
		Page.spotlightSelect();
		Page.backSpace();
		Page.backSpace();
		Page.backKey();
		Page.spotlightRight();
		// Step 4-1 Verify: The gap between items grow shrink.
		expect(Page.itemSpacing(0, 1).width).to.be.below(newSpacingWidth);
		expect(Page.itemSpacing(0, 4).height).to.be.below(newSpacingHeight);
		// Step 4-2 Verify: ItemSize is shrink.
		expect(Page.getItemSize().width).to.be.below(newItemWidth);
		expect(Page.getItemSize().height).to.be.below(newItemHeight);
		Page.item(0).moveTo();
		Page.spotlightSelect();
		// Step 4-3 Verfiy: SpotlightSize is grow shrink.
		expect(Page.spotlightSize().width).to.be.below(newSpotlightWidth);
		expect(Page.spotlightSize().height).to.be.below(newSpotlightHeight);
	});
});
