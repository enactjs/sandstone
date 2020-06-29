const Page = require('./VirtualListPage');
const {expectFocusedItem} = require('../VirtualList-utils');

describe('VirtualList elementSize', function () {

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		describe('scrollbar size', function () {

			//	TODO: Need to api for Scrollbar and List size checking in sandstone.
			it.skip('should have same height list and scrollbar [GT-28930]', function () {
				// Verify: The scrollbar size fit to the size of the list.
				expect(Page.listSize.height).to.equal(Page.scrollBarSize.height);
			});
		});

		describe('spotlight size compare', function () {

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

			it('should change spotlight size when item`s size changing [GT-28459]', function () {
				// Step 3 Verify: The default value for the 'itemSize' knob is itemSizeValue(default size is 156 for 4k) or half of 4k(78 for 2k).
				const defaultItemSize = Page.getItemSize();
				expect(defaultItemSize.height).to.equal(78);
				expect(defaultItemSize.width).to.equal(1200);
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
	});
});
