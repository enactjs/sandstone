const Page = require('../VirtualListPage');

describe('Scrollbar Size', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should have 30px padding for the top and bottom of the scrollbar[QWTC-2320], [QWTC-2051]', async function () {
		// Verify: The scrollbar size fit to the size of the list.
		expect((await Page.getListRect()).height).toBe((await Page.getVerticalScrollbarRect()).height);
		// There is 30px padding of the top and bottom of the Scrollbar.
		// Check top Padding
		expect((await Page.getVerticalScrollbarTrackRect()).top - (await Page.getVerticalScrollbarRect()).top).toBe(15);
		// Check bottom Padding
		expect((await Page.getVerticalScrollbarRect()).bottom - (await Page.getVerticalScrollbarTrackRect()).bottom).toBe(15);
	});
});
