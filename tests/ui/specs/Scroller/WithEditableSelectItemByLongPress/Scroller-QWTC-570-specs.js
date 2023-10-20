const ScrollerPage = require('../ScrollerPage');
const {enableEditModeLongPress, expectFocusedItem} = require('../Scroller-utils');

describe('Scroller With Editable Select Item By Long Press', function () {
	beforeEach(async function () {
		await ScrollerPage.open('WithEditableSelectItemByLongPress');
	});

	it('should change item position with editableCentered [QWTC-570]', async function () {
		// Set datasize 3.
		await ScrollerPage.inputFieldNumItems.moveTo();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.backSpace();
		await ScrollerPage.backSpace();
		await ScrollerPage.numPad(3);
		await ScrollerPage.backKey();

		// In this test, partially automated(step5~6). Step3~4 will be worked in screenshot test.
		// Step 5: 5-way Spot and Select on item 0.
		await ScrollerPage.spotlightDown();
		// Check for leftmost item's position.
		const leftmostItemRect = Math.floor((await ScrollerPage.getActiveElementRect()).left / 100) * 100;
		await enableEditModeLongPress();
		await expectFocusedItem(0);
		// Step5-2 Verify: Image 0 rises upper.
		await expect(await ScrollerPage.checkEditableItem()).to.be.true();

		// Step 6: 5-way Right.
		await ScrollerPage.spotlightRight();
		// Step 6-1 Verify: Position of image 0 and image 1 are switched.
		await ScrollerPage.spotlightSelect();
		await expectFocusedItem(0);
		await ScrollerPage.spotlightLeft();
		await expectFocusedItem(1);

		// Step 6-2 Verify: Items still horizontally center align in Scroller.
		await expect(leftmostItemRect).to.be.equal(Math.floor((await ScrollerPage.getActiveElementRect()).left / 100) * 100);

	});
});
