const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('spotlight size compare', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should change spotlight size when item`s size changing [QWTC-2041]', async function () {
		// Step 3 Verify: The default value for the 'itemSize' knob is itemSizeValue(default size is 156 for 4k) or half of 4k(78 for 2k).
		const defaultItemSize = await Page.getItemSize();
		// The default size of Spotlight is 156 for 4k and 78 for FHD.
		await Page.buttonLeft.moveTo();
		await Page.spotlightRight();
		const defaultSpotlightSize = await Page.spotlightSize();
		expect(defaultSpotlightSize).to.equal(78);
		// Step 4: Knobs > VirtualList > itemSize > 300
		await Page.inputfieldItemSize.moveTo();
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.backSpace();
		await Page.backSpace();
		await Page.numPad(3);
		await Page.numPad(0);
		await Page.numPad(0);
		await Page.backKey();
		// Verify item size
		const curItemSize = await Page.getItemSize();
		expect(curItemSize.height).to.equal(150);
		expect(curItemSize.width).to.equal(defaultItemSize.width);
		await Page.spotlightDown();
		await (await Page.item(2)).moveTo();
		await expectFocusedItem(2);
		const curSpotlightSize = await Page.spotlightSize();
		expect(curSpotlightSize).to.equal(150);
		// Step 4: Knobs > VirtualList > itemSize > 50
		await Page.inputfieldItemSize.moveTo();
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.backSpace();
		await Page.backSpace();
		await Page.numPad(5);
		await Page.numPad(0);
		await Page.backKey();
		// Verify item size
		const newItemSize = await Page.getItemSize();
		expect(newItemSize.height).to.equal(25);
		expect(newItemSize.width).to.equal(defaultItemSize.width);
		await Page.spotlightDown();
		await (await Page.item(4)).moveTo();
		await expectFocusedItem(4);
		const newSpotlightSize = await Page.spotlightSize();
		expect(newSpotlightSize).to.equal(25);
	});
});
