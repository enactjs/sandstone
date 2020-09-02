const Page = require('../VirtualListPage');

describe('scrollbar padding size', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should scrollbar has padding 30px [GT-29036]', function () {
		// Verify: The scrollbar size fit to the size of the list.
		expect(Page.getListRect().height).to.equal(Page.getVerticalScrollbarRect().height);
		// There is 30px padding of the top and bottom of the Scrollbar.
		// Check top Padding
		expect(Page.getVerticalScrollTrackRect().top - Page.getVerticalScrollbarRect().top).to.equal(15);
		// Check bottom Padding
		expect(Page.getVerticalScrollbarRect().bottom - Page.getVerticalScrollTrackRect().bottom).to.equal(15);
	});
});
