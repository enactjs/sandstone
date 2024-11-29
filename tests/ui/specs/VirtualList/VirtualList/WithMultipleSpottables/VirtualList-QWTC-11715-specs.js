const Page = require('../VirtualListPage');

describe('VirtualList with multiple spottables in an item', function () {
	beforeEach(async function () {
		await Page.open('WithMultipleSpottables');
	});

	it('should navigates between the same spottable controls of items with Channel Up/Down [QWTC-11715]', async function () {
		// Step 3: Set the number of items to 20 for easy test
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.backSpace();
		await Page.backSpace();
		await Page.numPad(2);
		await Page.numPad(0);
		// Step 5: 5-way Spot a star icon (★) of the first ('Item 00')
		await Page.spotlightDown();
		await Page.spotlightRight();
		await Page.spotlightRight();
		expect((await Page.getElementAttribute('id')).slice(0, 8)).toBe('starIcon');
		expect(Number(await Page.getElementAttribute('data-index'))).toBe(0);
		// normal scroll down with channel down
		await Page.pageDown();
		await Page.delay(1000);
		expect((await Page.getElementAttribute('id')).slice(0, 8)).toBe('starIcon');
		expect(Number(await Page.getElementAttribute('data-index'))).toBe(6);
		// Step 6: scroll to the bottom with channel down
		await Page.pageDown();
		await Page.delay(1000);
		expect((await Page.getElementAttribute('id')).slice(0, 8)).toBe('starIcon');
		expect(Number(await Page.getElementAttribute('data-index'))).toBe(19);
		// normal scroll up with channel up
		await Page.pageUp();
		await Page.delay(1000);
		expect((await Page.getElementAttribute('id')).slice(0, 8)).toBe('starIcon');
		expect(Number(await Page.getElementAttribute('data-index'))).toBe(13);
		// Step 7: scroll to the top with channel up
		await Page.pageUp();
		await Page.delay(1000);
		expect((await Page.getElementAttribute('id')).slice(0, 8)).toBe('starIcon');
		expect(Number(await Page.getElementAttribute('data-index'))).toBe(0);
	});
});
