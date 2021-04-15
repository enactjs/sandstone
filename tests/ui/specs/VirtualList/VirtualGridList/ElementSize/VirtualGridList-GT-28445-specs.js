const Page = require('../VirtualGridListPage');

describe('Change ItemSize', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should change minWidth and minHeight [GT-28445]', function () {
		const defaultItemWidth = Page.getItemSize().width;
		const defaultItemHeight = Page.getItemSize().height;
		// Step 3: Knobs > VirtualGridList  > ItemSize.minWidth > 800
		Page.inputMinWidth.moveTo();
		Page.spotlightSelect();
		Page.backSpace();
		Page.backSpace();
		Page.backSpace();
		Page.numPad(8);
		Page.numPad(0);
		Page.numPad(0);
		Page.spotlightDown();
		// Step 3 Verify: The width of items grow bigger.
		expect(Page.getItemSize().width).to.be.above(defaultItemWidth);
		// Step 4: Knobs > VirtualGridList > ItemSize.minHeight > 700
		Page.inputMinHeight.moveTo();
		Page.spotlightSelect();
		Page.backSpace();
		Page.backSpace();
		Page.backSpace();
		Page.numPad(7);
		Page.numPad(0);
		Page.numPad(0);
		Page.backKey();
		// Step4 Verify: The height of items grow bigger.
		expect(Page.getItemSize().height).to.be.above(defaultItemHeight);
	});
});
