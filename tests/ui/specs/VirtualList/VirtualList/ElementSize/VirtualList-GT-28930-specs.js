const Page = require('../VirtualListPage');

describe('LTR locale', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should have same height list and scrollbar [GT-28930]', function () {
		// Verify: The scrollbar size fit to the size of the list.
		expect(Page.getListRect().height).to.equal(Page.getScrollbarRect().withPadding.height);
	});
});
