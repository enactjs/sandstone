// const Page = require('../VirtualListPage');
import Page from '../VirtualListPage.js';

describe('RTL locale', function () {
	beforeEach(async function () {
		await Page.open('', '?locale=ar-SA');
	});

	it('should position Scrollbar Track on left side in RTL [QWTC-2114]', async function () {
		// Verify 3-2: The Scrollbar track displays shortly left aligned.
		expect((await Page.getListRect()).left).to.equal((await Page.getVerticalScrollbarRect()).left);
	});
});
