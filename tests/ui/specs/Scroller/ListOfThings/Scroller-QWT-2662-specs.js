const {expectFocusedItem, expectNoFocusedItem} = require('../../VirtualList/VirtualList-utils');
const ScrollerPage = require('../ScrollerPage');

describe('Scroller List Of Things', function () {
	beforeEach(function () {
		ScrollerPage.open('ListOfThings');
	});

	it('should spotlight is on the item closest to the previously focused item [QWT-2662]', function () {
		// Step 3: 5-way Spot the second item ('Item 001').
		$('#item0').moveTo();
		ScrollerPage.spotlightDown();
		// Step3 Verify: Spotlight displays on the second item ('item 001').
		expectFocusedItem(1);
		// Check previously focused item's location.
		const firstPrevItemLocation = Math.floor(ScrollerPage.getActiveElementRect().top / 100) * 100;

		// Step 4: Press Channel Down.
		ScrollerPage.pageDown();
		ScrollerPage.delay(1000);
		expectFocusedItem(6);
		// Step 4 Verify: Spotlight is on the Item closest to the previously focused Item's location.
		expect(Math.floor(ScrollerPage.getActiveElementRect().top / 100) * 100).to.equal(firstPrevItemLocation);

		// Step5: 5-way Down several times to the last visible item on the current viewport.
		const bottomVisibleIdNum = Number(ScrollerPage.bottomVisibleItemId().slice(4));
		for (let i = 0; i < 6; i++) {
			ScrollerPage.spotlightDown();
			ScrollerPage.delay(100);
		}
		// Step 5 Verify: Spotlight is on the last visible item.
		expectFocusedItem(bottomVisibleIdNum);

		// Check previously focused item's location.
		const secondPrevItemLocation = Math.floor(ScrollerPage.getActiveElementRect().top / 100) * 100;
		// Step6: Press Channel Down.
		ScrollerPage.pageDown();
		ScrollerPage.delay(1000);
		expectFocusedItem(17);
		// Step 6 Verify: Spotlight is on the Item closest to the previously focused Item's location.
		expect(Math.floor(ScrollerPage.getActiveElementRect().top / 100) * 100).to.equal(secondPrevItemLocation);

		// Step 7:Press Channel Up.
		ScrollerPage.pageUp();
		ScrollerPage.delay(1000);
		expectFocusedItem(12);
		// Step 7 Verify: Spotlight is on the Item closest to the previously focused Item's location.
		expect(Math.floor(ScrollerPage.getActiveElementRect().top / 100) * 100).to.equal(secondPrevItemLocation);

		// Step 8: 5-way Up several times to the first visible item on the current viewport.
		const topVisibleItemIdNum = Number(ScrollerPage.topVisibleItemId().slice(4));
		for (let i = 0; i < 7; i++) {
			ScrollerPage.spotlightUp();
			ScrollerPage.delay(100);
		}
		// Step 8 Verify: Spotlight is on the first visible item.
		expectFocusedItem(topVisibleItemIdNum);

		// Check previously focused item's location.
		const thirdPrevItemLocation = Math.floor(ScrollerPage.getActiveElementRect().top / 100) * 100;
		// Step 9: Press Channel Up.
		ScrollerPage.pageUp();
		ScrollerPage.delay(1000);
		expectFocusedItem(0);
		// Step 9 Verify: Spotlight is on the Item closest to the previously focused Item's location.
		expect(Math.floor(ScrollerPage.getActiveElementRect().top / 100) * 100).to.equal(thirdPrevItemLocation);

		// Step 10: Wave the Pointer.
		ScrollerPage.showPointerByKeycode();
		// Step 11: Hover on an item.
		$('#item3').moveTo();
		// Step 11 Verify: Spotlight is on item.
		expectFocusedItem(3);

		// Step 12: Press Channel down.
		ScrollerPage.pageDown();
		ScrollerPage.delay(500);
		// Step 12-4 Verify: Spotlight still hides.
		expectNoFocusedItem();
		// Spotlight will display again when the pointer hides.
		ScrollerPage.hidePointerByKeycode();
		expectFocusedItem(8);
	});
});
