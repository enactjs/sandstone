const ScrollerPage = require('../ScrollerPage');
const expectFocusedItem = require('../Scroller-utils');

describe('Editable Scroller', function () {
	beforeEach(async function () {
		await ScrollerPage.open('EditableItem');
	});

	it('Should change item position with editableCentered', async function () {
		// Set datasize 3.
		await ScrollerPage.inputfieldNumItems.moveTo();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.backSpace();
		await ScrollerPage.backSpace();
		await ScrollerPage.numPad(3);
		await ScrollerPage.backKey();

		// Step 5: 5-way Spot and Select on item 0.
		await $('#item0').moveTo();
		await ScrollerPage.spotlightSelect();
		expectFocusedItem(0);

		// Check for leftmost item's position.
		const leftmostItemRect = ScrollerPage.getActiveElementRect().left;
		console.log(ScrollerPage.getActiveElementClass());
		// Step 6: 5-way Right.
		await ScrollerPage.spotlightRight();
		// Step 6-1 Verify: Position of image 0 and image 1 are switched.
		await ScrollerPage.spotlightSelect();
		expectFocusedItem(0);
		await ScrollerPage.spotlightLeft();
		expectFocusedItem(1);

		// Step 6-2 Verify: Items still horizontally center align in Scroller.
		expect(leftmostItemRect).to.be.true(ScrollerPage.getActiveElementClass().left);

	});
});
