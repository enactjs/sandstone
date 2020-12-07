const Page = require('../VirtualListPage');
const {waitUntilFocused} = require('../../VirtualList-utils');

describe('Navigate Items with Channel Up/Down', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should navigate item with channel up/down [GT-29974]', function () {
		// Step3-1: 5-way Spot an item.
		Page.buttonLeft.moveTo();
		Page.spotlightRight();
		// Step3-2: Press Channel Down several times.
		// Step3 Verify: The list Scrolls Up by page.
		Page.checkScrollbyPagekey('down');
		waitUntilFocused(6, 'focus Item 6');
		Page.checkScrollbyPagekey('down');
		waitUntilFocused(12, 'focus Item 12');
		Page.checkScrollbyPagekey('down');
		waitUntilFocused(18, 'focus Item 18');
		// Step4: Press Channel Up several times.
		// Step4 Verify: The list Scrolls Down by page.
		Page.checkScrollbyPagekey('up');
		waitUntilFocused(12, 'focus Item 12');
		Page.checkScrollbyPagekey('up');
		waitUntilFocused(6, 'focus Item 6');
		Page.checkScrollbyPagekey('up');
		waitUntilFocused(0, 'focus Item 0');
	});
});
