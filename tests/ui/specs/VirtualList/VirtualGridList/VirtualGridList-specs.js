const Page = require('./VirtualGridListPage'),
	{expectFocusedItem /* , expectNoFocusedItem, waitForScrollStartStop, waitUntilFocused*/} = require('../VirtualList-utils');

describe('VirtualGridList', function () {

	it('should meet initial conditions', function () {
		Page.open();
		expect(Page.buttonHideScrollbar.isFocused(), 'focus').to.be.true();
	});

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		it('should focus first item on first focus', function () {
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightRight();
			expectFocusedItem(0);
		});
	});
});
