const Page = require('../VirtualListPage');

describe('RTL locale', function () {
	beforeEach(function () {
		Page.open('', '?locale=ar-SA');
	});

	it('should position Scrollbar Track on left side in RTL [GT-28563]', function () {
		// Verify 3-2: The Scrollbar track displays shortly left aligned.
		expect(Page.getListRect().left).to.equal(Page.getVerticalScrollbarRect().left);
	});
});
