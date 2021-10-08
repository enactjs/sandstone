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
			expectFocusedItem(0);
		});
	});

	describe('Minimal DataSize', function () {
		beforeEach(function () {
			Page.open();
		});

		it('should not display scrollbar when minimal datasize [QWT-2583]', function () {
			// Step 3: Knobs > VirtualGridList > dataSize > 4
			Page.inputNumItems.moveTo();
			Page.spotlightSelect();
			Page.backSpace();
			Page.backSpace();
			Page.backSpace();
			Page.numPad(4);
			Page.spotlightLeft();
			// Step 4 Verify: Scrollbar track does not display to the right as the data size is the minimal size of 4.
			expect(Page.scrollBar.error.message.slice(0, 15)).to.equal('no such element');
		});
	});
});
