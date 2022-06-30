const ScrollerPage = require('../ScrollerPage');
const {expectFocusedItem} = require('../Scroller-utils');

describe.skip('Editable Scroller', function () {
	beforeEach(async function () {
		await ScrollerPage.open('EditableItem');
	});

	it('Should remove item with remove button', async function () {
		// Step 3: 5-way Spot and Select Image 0.
		// Step 3-1 Verify: Spotlight is on image 0.
		await ScrollerPage.spotlightDown();
		await ScrollerPage.spotlightSelect();
		await expectFocusedItem(0);

		// Step 4-1: 5-way Up.
		// Step 4-2: 5-way Up a few times again.
		// Step 4 Verify: Spotlight is on 'trash' icon.
		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightUp();
		await ScrollerPage.buttonRemoveItem.isFocused();

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
