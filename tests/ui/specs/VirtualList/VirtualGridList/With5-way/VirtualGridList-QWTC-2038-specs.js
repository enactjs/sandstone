const Page = require('../VirtualGridListPage');

describe('Navigate with 5-way', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should spotlight move `X` button with 5-way [QWTC-2038]', async function () {
		// Step 4-1: Knobs > VirtualGridList > dataSize > 3
		// As this View doesn't have 'x' button, Set the data size to 2 so that we can replace it with the top button.
		await Page.inputNumItems.moveTo();
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.backSpace();
		await Page.backSpace();
		await Page.numPad(2);
		await Page.spotlightLeft();
		// Step 4-3: Focus on the top (last) right item of the first row (if more than 1 row displays).
		await (await Page.item(1)).moveTo();
		// Step 4-4: 5-way Right.
		await Page.spotlightRight();
		// Step 4 Verify: Spotlight is on the '*X*' close button.
		expect(await Page.buttonTop.isFocused()).toBe(true);
	});
});
