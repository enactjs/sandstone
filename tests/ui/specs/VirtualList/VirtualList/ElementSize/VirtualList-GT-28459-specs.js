const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('spotlight size compare', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should change spotlight size when item`s size changing [GT-28459]', function () {
		// Step 3 Verify: The default value for the 'itemSize' knob is itemSizeValue(default size is 156 for 4k) or half of 4k(78 for 2k).
		const defaultItemSize = Page.getItemSize();
		// The default size of Spotlight is 156 for 4k and 78 for FHD.
		Page.buttonLeft.moveTo();
		Page.spotlightRight();
		const defaultSpotlightSize = Page.spotlightSize();
		expect(defaultSpotlightSize).to.equal(78);
		// Step 4: Knobs > VirtualList > itemSize > 300
		Page.inputfieldItemSize.moveTo();
		Page.spotlightSelect();
		Page.backSpace();
		Page.backSpace();
		Page.backSpace();
		Page.numPad(3);
		Page.numPad(0);
		Page.numPad(0);
		Page.backKey();
		// Verify item size
		const curItemSize = Page.getItemSize();
		expect(curItemSize.height).to.equal(150);
		expect(curItemSize.width).to.equal(defaultItemSize.width);
		Page.spotlightDown();
		Page.item(2).moveTo();
		expectFocusedItem(2);
		const curSpotlightSize = Page.spotlightSize();
		expect(curSpotlightSize).to.equal(150);
		// Step 4: Knobs > VirtualList > itemSize > 50
		Page.inputfieldItemSize.moveTo();
		Page.spotlightSelect();
		Page.backSpace();
		Page.backSpace();
		Page.backSpace();
		Page.numPad(5);
		Page.numPad(0);
		Page.backKey();
		// Verify item size
		const newItemSize = Page.getItemSize();
		expect(newItemSize.height).to.equal(25);
		expect(newItemSize.width).to.equal(defaultItemSize.width);
		Page.spotlightDown();
		Page.item(4).moveTo();
		expectFocusedItem(4);
		const newSpotlightSize = Page.spotlightSize();
		expect(newSpotlightSize).to.equal(25);
	});
});
