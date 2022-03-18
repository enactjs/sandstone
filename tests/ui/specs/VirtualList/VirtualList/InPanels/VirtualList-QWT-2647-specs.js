const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('VirtualList in Panels', function () {
	beforeEach(async function () {
		await Page.open('InPanels');
	});

	it('should Spotlight returns on Item when List has only 1 Item[QWT-2647]', async function () {
		// Step3-1: Knobs > VirtualList > dataSize > 1
		await Page.inputfieldNumItems.moveTo();
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.backSpace();
		await Page.backKey();
		// Step3-2: 5-way Spot Item 0.
		await Page.spotlightDown();
		await expectFocusedItem(0);
		// Step 3-1 Verify: Only Item 0 shows in the viewport.
		// Step 3-2 Verify: Spotlight is on Item 0.
		await Page.spotlightDown();
		await expectFocusedItem(0);
		// Step 4: 5-way Select Item 0.
		await Page.spotlightSelect();
		await Page.delay(500);
		// Step 4 Verify: Spotlight is on Go Back.
		expect(await Page.textContent()).to.equal('Go Back');
		// Step 5: 5-way Select Go Back.
		await Page.spotlightSelect();
		await Page.delay(500);
		// Step 5 Verify: Spotlight is on Item 0 again.
		await expectFocusedItem(0);
	});
});
