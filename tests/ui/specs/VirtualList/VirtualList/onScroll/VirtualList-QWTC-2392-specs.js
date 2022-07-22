const Page = require('../VirtualListPage');
const {waitUntilFocused} = require('../../VirtualList-utils');

describe('Navigate Items with Channel Up/Down', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should navigate item with channel up/down [QWTC-2392]', async function () {
		// Step3-1: 5-way Spot an item.
		await Page.buttonLeft.moveTo();
		await Page.spotlightRight();
		// Step3-2: Press Channel Down several times.
		// Step3 Verify: The list Scrolls Up by page.
		await Page.checkScrollbyPagekey('down');
		await waitUntilFocused(6, 'focus Item 6');
		await Page.checkScrollbyPagekey('down');
		await waitUntilFocused(12, 'focus Item 12');
		await Page.checkScrollbyPagekey('down');
		await waitUntilFocused(18, 'focus Item 18');
		// Step4: Press Channel Up several times.
		// Step4 Verify: The list Scrolls Down by page.
		await Page.checkScrollbyPagekey('up');
		await waitUntilFocused(12, 'focus Item 12');
		await Page.checkScrollbyPagekey('up');
		await waitUntilFocused(6, 'focus Item 6');
		await Page.checkScrollbyPagekey('up');
		await waitUntilFocused(0, 'focus Item 0');
	});
});
