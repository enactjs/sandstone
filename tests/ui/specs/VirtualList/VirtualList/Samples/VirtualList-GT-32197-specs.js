const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('VirtualList Samples', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should focus last item when entering from outside after scrolling via 5way [GT-32197]', function () {
		// Step 1. Move focus to the first item ('Item 00').
		Page.buttonLeft.moveTo();
		Page.spotlightRight();

		// Step2. 5-way Down to the 21st item ('Item 20').
		Page.fiveWayToItem(20);

		// Step3. Position the pointer on 'JumpToItem10WithoutFocus' button and select
		Page.buttonJumpToItemWithoutFocus.moveTo();
		Page.spotlightSelect();

		// Step4. Move focus to the list
		Page.buttonLeft.moveTo();
		Page.spotlightRight();

		// Verify Spotlight displays on the 21st item ('Itme 20');
		expectFocusedItem(Number((Page.bottomVisibleItemId().slice(4))));
	});
});
