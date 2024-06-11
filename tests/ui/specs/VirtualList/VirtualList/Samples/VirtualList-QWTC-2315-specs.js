const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('VirtualList Samples', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should  display childProps [QWTC-2315]', async function () {
		// Set translate ScrollMode.
		await Page.buttonNativeScroll.moveTo();
		await Page.spotlightSelect();
		// Verify 1-2:The first item shows 'Item 000'.
		await Page.buttonLeft.moveTo();
		await Page.spotlightRight();
		await expectFocusedItem(0);
		expect(await Page.textContent()).toBe('Item 00');
		// Verify 1-3: The second item shows 'Item 001'.
		await Page.spotlightDown();
		await expectFocusedItem(1);
		expect(await Page.textContent()).toBe('Item 01');
		// Step 3: 5-way Spot and Select 'Chid Props' toggle button.
		await Page.buttonChildProps.click();
		// Verify 3-1: The first item shows 'Item 000 child props'.
		await (await Page.item(0)).moveTo();
		await expectFocusedItem(0);
		expect(await Page.textContent()).toBe('Item 00 child props');
		// Verify 3-2: The second item shows 'Item 001 child props'.
		await Page.spotlightDown();
		await expectFocusedItem(1);
		expect(await Page.textContent()).toBe('Item 01 child props');
	});
});
