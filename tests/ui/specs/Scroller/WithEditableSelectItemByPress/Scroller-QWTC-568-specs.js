const ScrollerPage = require('../ScrollerPage');
const {expectFocusedItem} = require('../Scroller-utils');

describe('Scroller With Editable Select Item By Press', function () {
	beforeEach(async function () {
		await ScrollerPage.open('WithEditableSelectItemByPress');
	});

	it('should remove item with remove button [QWTC-568]', async function () {
		// Step 3: 5-way Spot and Select Image 0.
		// Step 3-1 Verify: Spotlight is on image 0.
		await ScrollerPage.spotlightDown();
		await expectFocusedItem(0);
		await ScrollerPage.spotlightSelect();

		// Step 4-1: 5-way Up one time.
		// Step 4 Verify: Spotlight is on 'trash' icon.
		await ScrollerPage.spotlightUp();
		await expect(await ScrollerPage.buttonRemoveItem.isFocused()).toBe(true);

		// Step 5: 5-way Select
		await ScrollerPage.spotlightSelect();
		// Step 5-1 Verify: Image 0 is removed
		await expectFocusedItem(1);
		// Step 6: 5-way Left a few times.
		// Step 6 Verify: Spotlight is still on Image 1.
		await ScrollerPage.spotlightLeft();
		await ScrollerPage.spotlightLeft();
		await ScrollerPage.spotlightLeft();
		await expectFocusedItem(1);
	});
});
