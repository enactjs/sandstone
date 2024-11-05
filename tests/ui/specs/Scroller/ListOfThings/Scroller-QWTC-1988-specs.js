const {expectFocusedItem, expectNoFocusedItem, focusedElement} = require('../Scroller-utils.js');
const ScrollerPage = require('../ScrollerPage');

describe('Scroller List Of Things', function () {
	beforeEach(async function () {
		await ScrollerPage.open('ListOfThings');
	});

	it('should spotlight is on the item closest to the previously focused item [QWTC-1988]', async function () {
		// Step 3: 5-way Spot the second item ('Item 001').
		await $('#item0').moveTo();
		await ScrollerPage.spotlightDown();
		// Step3 Verify: Spotlight displays on the second item ('item 001').
		await expectFocusedItem(1);
		// Check previously focused item's location.
		const firstPrevItemLocation = Math.floor((await ScrollerPage.getActiveElementRect()).top / 100) * 100;

		// Step 4: Press Channel Down.
		await ScrollerPage.pageDown();
		await ScrollerPage.delay(1000);
		await expectFocusedItem(6);
		// Step 4 Verify: Spotlight is on the Item closest to the previously focused Item's location.
		expect(Math.floor((await ScrollerPage.getActiveElementRect()).top / 100) * 100).toBe(firstPrevItemLocation);

		// Step5: 5-way Down several times to the last visible item on the current viewport.
		const bottomVisibleIdNum = Number((await ScrollerPage.bottomVisibleItemId()).slice(4));
		for (let i = 0; i < 6; i++) {
			await ScrollerPage.spotlightDown();
			await ScrollerPage.delay(100);
		}
		// Step 5 Verify: Spotlight is on the last visible item.
		await expectFocusedItem(bottomVisibleIdNum);

		// Check previously focused item's location.
		const secondPrevItemLocation = Math.floor((await ScrollerPage.getActiveElementRect()).top / 100) * 100;
		// Step6: Press Channel Down.
		await ScrollerPage.pageDown();
		await ScrollerPage.delay(1000);
		await expectFocusedItem(17);
		// Step 6 Verify: Spotlight is on the Item closest to the previously focused Item's location.
		expect(Math.floor((await ScrollerPage.getActiveElementRect()).top / 100) * 100).toBe(secondPrevItemLocation);

		// Step 7:Press Channel Up.
		await ScrollerPage.pageUp();
		await ScrollerPage.delay(1000);
		await expectFocusedItem(12);
		// Step 7 Verify: Spotlight is on the Item closest to the previously focused Item's location.
		expect(Math.floor((await ScrollerPage.getActiveElementRect()).top / 100) * 100).toBe(secondPrevItemLocation);

		// Step 8: 5-way Up several times to the first visible item on the current viewport.
		const topVisibleItemIdNum = Number((await ScrollerPage.topVisibleItemId()).slice(4));
		for (let i = 0; i < 7; i++) {
			await ScrollerPage.spotlightUp();
			await ScrollerPage.delay(100);
		}
		// Step 8 Verify: Spotlight is on the first visible item.
		await expectFocusedItem(topVisibleItemIdNum);

		// Check previously focused item's location.
		const thirdPrevItemLocation = Math.floor((await ScrollerPage.getActiveElementRect()).top / 100) * 100;
		// Step 9: Press Channel Up.
		await ScrollerPage.pageUp();
		await ScrollerPage.delay(1000);
		await expectFocusedItem(0);
		// Step 9 Verify: Spotlight is on the Item closest to the previously focused Item's location.
		expect(Math.floor((await ScrollerPage.getActiveElementRect()).top / 100) * 100).toBe(thirdPrevItemLocation);

		// Step 10: Wave the Pointer.
		await ScrollerPage.showPointerByKeycode();
		// Step 11: Hover on an item.
		await $('#item3').moveTo();
		// Step 11 Verify: Spotlight is on item.
		await expectFocusedItem(3);

		// Step 12: Press Channel down.
		await ScrollerPage.pageDown();
		await ScrollerPage.delay(500);
		// Step 12-4 Verify: Spotlight still hides.
		await expectNoFocusedItem();
		// Spotlight will display again when the pointer hides.
		await ScrollerPage.hidePointerByKeycode();
		// Spotlight displays on top-level item.
		await expect(5).toBe(Number((await focusedElement()).slice(4)));
	});
});
