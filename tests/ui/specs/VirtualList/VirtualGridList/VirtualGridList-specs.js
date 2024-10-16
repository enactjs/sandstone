const Page = require('./VirtualGridListPage'),
	{expectFocusedItem /* , expectNoFocusedItem, waitForScrollStartStop, waitUntilFocused*/} = require('../VirtualList-utils');

describe('VirtualGridList', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should meet initial conditions', async function () {
		expect(await Page.buttonHideScrollbar.isFocused()).toBe(true);
	});

	describe('LTR locale', function () {
		it('should focus first item on first focus', async function () {
			await Page.spotlightDown();
			await Page.spotlightDown();
			await expectFocusedItem(0);
		});
	});

	describe('Minimal DataSize', function () {
		it('should not display scrollbar when minimal datasize [QWTC-2067]', async function () {
			// Step 3: Knobs > VirtualGridList > dataSize > 4
			await Page.inputNumItems.moveTo();
			await Page.spotlightSelect();
			await Page.backSpace();
			await Page.backSpace();
			await Page.backSpace();
			await Page.numPad(4);
			await Page.spotlightLeft();
			// Step 4 Verify: Scrollbar track does not display to the right as the data size is the minimal size of 4.
			expect((await Page.scrollBar).error.message.slice(0, 21)).toBe('Couldn\'t find element');
		});
	});
});
