const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('Item Animates', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should animate Items via Channel Down [GT-28464]', function () {
		// Step 3: Position the pointer on the first item('Item 000)
		Page.showPointerByKeycode();
		Page.item(0).moveTo();
		expectFocusedItem(0);
		// Step 4: Press Channel Down
		Page.pageDown();
		Page.delay(700);
		// Check to scrolling event on VirtualList
		expect(Page.list.getAttribute('data-scrolling-events')).to.equal('1');
		// Step 5: Press Channel Down again.
		Page.pageDown();
		Page.delay(700);
		// Check to scrolling event on VirtualList
		expect(Page.list.getAttribute('data-scrolling-events')).to.equal('2');
	});
});
