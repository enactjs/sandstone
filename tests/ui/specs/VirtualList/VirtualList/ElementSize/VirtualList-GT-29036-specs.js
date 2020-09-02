const Page = require('../VirtualListPage');

describe('scrollbar padding size', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should scrollbar has padding 30px [GT-29036]', function () {
		// Verify: The scrollbar size fit to the size of the list.
		expect(Page.getListRect().height).to.equal(Page.getScrollbarRect().withPadding.height);
		// There is 30px padding of the top and bottom of the Scrollbar.
		// Check top Padding
		expect(Page.getScrollbarRect().withoutPadding.top - Page.getScrollbarRect().withPadding.top).to.equal(15);
		// Check bottom Padding
		expect(Page.getScrollbarRect().withPadding.bottom - Page.getScrollbarRect().withoutPadding.bottom).to.equal(15);
	});
});
