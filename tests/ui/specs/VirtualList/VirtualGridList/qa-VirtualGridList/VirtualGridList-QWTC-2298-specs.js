const Page = require('../VirtualGridListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('qa-VirtualGridList', function () {
	beforeEach(async function () {
		await Page.open('', '?locale=ar-SA');
	});

	it('should spotlight move on last item [QWTC-2298]', async function () {
		// Step 2-1: Select 'Horizontal'
		await Page.buttonDirectionChange.moveTo();
		await Page.spotlightSelect();

		// Step 3-1: 5-way spot item 0.
		await (await Page.item(0)).moveTo();
		await Page.spotlightRight();
		await expectFocusedItem(0);
		// Step 3-2: 5-way Left to Item 16.
		for (let i = 0; i < 8; i++) {
			await Page.spotlightLeft();
			await Page.delay(200);
		}
		await Page.delay(500);
		// Step 3-2 Verify: Spotlight is on item 16.
		await expectFocusedItem(16);
		const curScrollThumbPosition = await Page.scrollThumbPosition();

		// Step 4: 5-way Right to item 14.
		await Page.spotlightRight();
		// Step 4-1 Verify: The list does not Scroll Right.
		expect(await Page.scrollThumbPosition()).toBe(curScrollThumbPosition);
		// Step 4-2 Verify: Spotlight is on item 14.
		await expectFocusedItem(14);
	});
});
