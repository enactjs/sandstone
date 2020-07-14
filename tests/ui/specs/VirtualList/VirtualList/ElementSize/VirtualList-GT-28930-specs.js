const Page = require('../VirtualListPage');

describe('LTR locale', function () {
	beforeEach(function () {
		Page.open();
	});

	// TODO: Need to api for Scrollbar and List size checking in sandstone.
	it.skip('should have same height list and scrollbar [GT-28930]', function () {
		// Verify: The scrollbar size fit to the size of the list.
		expect(Page.listSize.height).to.equal(Page.scrollBarSize.height);
	});
});
