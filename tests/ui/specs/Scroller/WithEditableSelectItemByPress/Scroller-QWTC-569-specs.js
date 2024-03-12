const ScrollerPage = require('../ScrollerPage');
const {expectFocusedItem, expectItemWrapperClass} = require('../Scroller-utils');

describe('Scroller With Editable Select Item By Press', function () {
	beforeEach(async function () {
		await ScrollerPage.open('WithEditableSelectItemByPress');
	});

	it('should change item position with 5-way mode [QWTC-569]', async function () {
		// Step 3: 5-way Spot and Select Image 0.
		await ScrollerPage.spotlightDown();
		// Step 3-1 Verify: Spotlight is on Image 0.
		await expectFocusedItem(0);
		await ScrollerPage.spotlightSelect();
		// Step 3-2 Verify: Image 0 rises upper
		await expectItemWrapperClass('tests_ui_apps_Scroller_WithEditableSelectItemByPress_ScrollerWithEditableSelectItemByPress_selected');

		// Step 4: 5-way Right.
		await ScrollerPage.spotlightRight();
		// Step 4 Verify: Position of Image 0 and Image 1 are switched.
		await ScrollerPage.spotlightSelect();
		await expectFocusedItem(0);
		await ScrollerPage.spotlightLeft();
		await expectFocusedItem(1);

		// Step 5: 5-way Right 3 times.
		// Step 5 Verify: Image are switched for each 5-way right.
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightSelect();
		await expectFocusedItem(0);
		await ScrollerPage.spotlightRight();
		await expectFocusedItem(5);

		// 5-way spot Item0.
		await ScrollerPage.spotlightLeft();
		await ScrollerPage.spotlightSelect();
		await expectFocusedItem(0);
		// Step 6: 5-way Left.
		// Step 6 Verify: Position of Image 0 and Image 4 are switched.
		await ScrollerPage.spotlightLeft();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.spotlightRight();
		await expectFocusedItem(4);
	});
});
