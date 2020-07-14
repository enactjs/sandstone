const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('spotlight size compare', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should maintain spotlight size when spacing 100[GT-28462]', function () {
		// The default size of Spotlight is 156 for 4k and 78 for FHD.
		Page.buttonLeft.moveTo();
		Page.spotlightRight();
		const defaultSpotlightSize = Page.spotlightSize();
		// Step 3 Verify: The default value for the 'spacing' knob is 0.
		const defaultSpacing = Page.itemSpacing();
		expect(defaultSpacing).to.equal(0);
		// Step 4: Knobs > VirtualList > spacing > 100
		Page.inputfieldSpacing.moveTo();
		Page.spotlightSelect();
		Page.backSpace();
		Page.numPad(1);
		Page.numPad(0);
		Page.numPad(0);
		// In case of TV, VKB is opened when inputfield clicking. So add escape key for VKB closing.
		Page.backKey();
		// 100 spacing value is 50 for 4k and 25 for FHD.
		// Step 4 Verify: The gap between items grows bigger.
		const changedSpacing = Page.itemSpacing();
		expect(changedSpacing).to.equal(50);
		// Step5-1: Hover an item.
		Page.spotlightDown();
		Page.item(5).moveTo();
		expectFocusedItem(5);
		// Step5 Verify: The spotlight size does not change.
		expect(Page.spotlightSize()).to.equal(defaultSpotlightSize);
		// Step 6: Knobs > VirtualList > spacing > 50
		Page.inputfieldSpacing.moveTo();
		Page.spotlightSelect();
		Page.backSpace();
		Page.backSpace();
		Page.backSpace();
		Page.numPad(5);
		Page.numPad(0);
		Page.backKey();
		// 50 spacing value is 50 for 4k and 25 for FHD.
		const newSpacing = Page.itemSpacing();
		expect(newSpacing).to.equal(25);
		// Step7-1: Hover an item.
		Page.spotlightDown();
		Page.item(3).moveTo();
		expectFocusedItem(3);
		// Step7 Verify: The spotlight size does not change.
		expect(Page.spotlightSize()).to.equal(defaultSpotlightSize);
	});
});
