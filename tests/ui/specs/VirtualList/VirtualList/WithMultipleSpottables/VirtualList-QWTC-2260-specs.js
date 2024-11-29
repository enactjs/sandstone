const Page = require('../VirtualListPage');

describe('VirtualList with multiple spottables in an item', function () {
	beforeEach(async function () {
		await Page.open('WithMultipleSpottables');
	});

	it('should navigates between the same spottable controls of items [QWTC-2260]', async function () {
		// Step 1: 5-way Spot a star icon (★) of the first ('Item 000').
		await Page.spotlightDown();
		await Page.spotlightRight();
		await Page.spotlightRight();
		// Step 1 Verify: Spotlight displays on a star icon(★) of the first item ('item 000').
		expect((await Page.getElementAttribute('id')).slice(0, 8)).toBe('starIcon');
		expect(Number(await Page.getElementAttribute('data-index'))).toBe(0);
		// 5-way Down hold for 1 second.
		await Page.delay(500);
		await browser.keys('Down Arrow');
		// Spotlight still on any item's starIcon.
		// '5-way down' long pressure is too fast to catch focus element in Jenkins. Therefore, test to catch focus properly with 5-way down.
		await Page.delay(1000);
		await Page.spotlightDown();
		expect((await Page.getElementAttribute('id')).slice(0, 8)).toBe('starIcon');
		expect(Number(await Page.getElementAttribute('data-index'))).toBeGreaterThan(5);
	});
});
