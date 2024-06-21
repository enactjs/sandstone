const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('VirtualList Samples', function () {
	beforeEach(async function () {
		await Page.open();
	});

	// Since it is not the same as the view of samples, we made a button to go directly to the corresponding item.
	it('should Jump to item when press JumpToItem10 button [QWTC-2286]', async function () {
		// Step2-1: 5-way Spot the '010 - 한국어 - 한국'(item10 for this test) item.
		// Check if item10 is located at the top of the list.
		await Page.buttonJumpToItem.moveTo();
		await Page.spotlightSelect();
		const topId = await Page.topVisibleItemId();
		expect(topId).toBe('item10');
		await expectFocusedItem(10);
		// Step2-2: 5-way Spot the '035 - Čeština - Česká republika'(item35 for this test) item.
		await Page.fiveWayToItem(35);
		await expectFocusedItem(35);
		// Step3-1: 5-way Spot the '034 - Čeština - Česká republika'(item34 for this test) item.
		await Page.spotlightUp();
		await expectFocusedItem(34);
		// Step3-2: 5-way Up until Spotlight displays on the '000 - 한국어 - 한국'(item0 for this test) item.
		await Page.fiveWayToItem(0);
		await expectFocusedItem(0);
	});
});
