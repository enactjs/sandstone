const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('VirtualList Samples', function () {
	beforeEach(function () {
		Page.open();
	});

	// Since it is not the same as the view of samples, we made a button to go directly to the corresponding item.
	it.skip('should Jump to item when press JumpToItem10 button [GT-28936]', function () {
		// Step2-1: 5-way Spot the '010 - 한국어 - 한국'(item10 for this test) item.
		// Check if item10 is located at the top of the list.
		Page.buttonJumpToItem.moveTo();
		Page.spotlightSelect();
		const topId = Page.topVisibleItemId();
		expect(topId).to.equal('item10');
		expectFocusedItem(10);
		// Step2-2: 5-way Spot the '035 - Čeština - Česká republika'(item35 for this test) item.
		Page.fiveWayToItem(35);
		expectFocusedItem(35);
		// Step3-1: 5-way Spot the '034 - Čeština - Česká republika'(item34 for this test) item.
		Page.spotlightUp();
		expectFocusedItem(34);
		// Step3-2: 5-way Up until Spotlight displays on the '000 - 한국어 - 한국'(item0 for this test) item.
		Page.fiveWayToItem(0);
		expectFocusedItem(0);
	});
});
