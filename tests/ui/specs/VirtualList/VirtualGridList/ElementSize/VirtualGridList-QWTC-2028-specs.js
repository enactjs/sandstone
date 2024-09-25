const Page = require('../VirtualGridListPage');

describe('Change ItemSize', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should change minWidth and minHeight [QWTC-2028]', async function () {
		// Step 3: Knobs > VirtualGridList  > ItemSize.minWidth > 800
		await Page.inputMinWidth.moveTo();
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.backSpace();
		await Page.backSpace();
		await Page.numPad(8);
		await Page.numPad(0);
		await Page.numPad(0);
		await Page.spotlightDown();

		// Step 3 Verify: The width of items grow bigger.
		expect((await Page.getItemSize()).width).toBeGreaterThan(400);

		// Step 4: Knobs > VirtualGridList > ItemSize.minHeight > 700
		await Page.inputMinHeight.moveTo();
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.backSpace();
		await Page.backSpace();
		await Page.numPad(7);
		await Page.numPad(0);
		await Page.numPad(0);
		await Page.backKey();

		// Step4 Verify: The height of items grow bigger.
		expect((await Page.getItemSize()).height).toBeGreaterThan(350);
	});
});
