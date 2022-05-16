const ScrollerPage = require('../ScrollerPage');
const {expectFocusedItem} = require('../Scroller-utils');

describe('Editable Scroller', function () {
	beforeEach(async function () {
		await ScrollerPage.open('EditableItem');
	});

	it('Should change item position with editableCentered', async function () {
		// Set datasize 3.
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.backSpace();
		await ScrollerPage.backSpace();
		await ScrollerPage.numPad(3);
		await ScrollerPage.backKey();

		// Step 5: 5-way Spot and Select on item 0.
		await ScrollerPage.spotlightDown();
		await ScrollerPage.spotlightSelect();
		await expectFocusedItem(0);

		// Check for leftmost item's position.
		const leftmostItemRect = await ScrollerPage.getActiveElementRect().left;
		console.log(ScrollerPage.getActiveElementClass());
		// Step 6: 5-way Right.
		await ScrollerPage.spotlightRight();
		// Step 6-1 Verify: Position of image 0 and image 1 are switched.
		await ScrollerPage.spotlightSelect();
		await expectFocusedItem(0);
		await ScrollerPage.spotlightLeft();
		await expectFocusedItem(1);

		// Step 6-2 Verify: Items still horizontally center align in Scroller.
		await expect(leftmostItemRect).to.be.true(await ScrollerPage.getActiveElementClass().left);

	});
});
