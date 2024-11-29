const Page = require('../VirtualListPage');
const {focusedElement} = require('../../VirtualList-utils');

describe('VirtualList with another VirtualList', function () {
	beforeEach(async function () {
		await Page.open('WithAnother');
	});

	it('should keep focus when the other VirtualList is rendered (WRP-27604)', async function () {
		// 5-way Spot 9th item
		await Page.spotlightDown();
		await Page.spotlightDown();
		await Page.spotlightDown();
		await Page.spotlightDown();
		await Page.spotlightDown();
		await Page.spotlightDown();
		await Page.spotlightDown();
		await Page.spotlightDown();
		await expect(await focusedElement()).toBe('Item1 08');

		// Select the focused item to update the second list's number of items
		await Page.spotlightSelect();

		// Check if the focus is NOT moved
		await expect(await focusedElement()).toBe('Item1 08');
	});
});
