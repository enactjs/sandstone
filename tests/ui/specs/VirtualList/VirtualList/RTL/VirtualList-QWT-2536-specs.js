const Page = require('../VirtualListPage');

describe('RTL locale', function () {
	beforeEach(async function () {
		await Page.open('', '?locale=ar-SA');
	});

	it('should position Scrollbar Track on left side in RTL [QWT-2536]', async function () {
		// Verify 3-2: The Scrollbar track displays shortly left aligned.
		expect((await Page.getListRect()).left).to.equal((await Page.getVerticalScrollbarRect()).left);
	});
});
