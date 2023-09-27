const ScrollerPage = require('./EditableScrollerItemPage');
const {expectFocusedItem} = require('../Scroller-utils');

describe('Editable Scroller Item', function () {
	beforeEach(async function () {
		await ScrollerPage.open();
		await ScrollerPage.spotlightDown();
		await ScrollerPage.buttonEditMode.isFocused();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.spotlightDown();
		await expectFocusedItem(0);
	});

	it('Should remove item with remove button onSelect', async function () {
		await ScrollerPage.spotlightSelect();

		// 5-way Up.
		// Verify: Spotlight is on 'trash' icon.
		await ScrollerPage.spotlightUp();
		await ScrollerPage.buttonRemoveItem.isFocused();

		// 5-way Select remove button.
		await ScrollerPage.spotlightSelect();
		// Verify: Item 0 is removed.
		await expectFocusedItem(1);
		// 5-way Select Item 1.
		await ScrollerPage.spotlightSelect();

		// 5-way Left few times.
		// Verify: First item is Item 1.
		await ScrollerPage.moveSpotlight(4, 'spotlightLeft');
		await ScrollerPage.spotlightDown();
		await expectFocusedItem(1);
	});

	it('Should remove item with remove button onFocus', async function () {
		// 5-way Up.
		// Verify: Spotlight is on 'trash' icon.
		await ScrollerPage.spotlightUp();
		await ScrollerPage.buttonRemoveItem.isFocused();

		// 5-way Select remove button.
		await ScrollerPage.spotlightSelect();
		// Verify: Item 0 is removed.
		await expectFocusedItem(1);

		// 5-way Left few times and Down.
		// Verify: First item is Item 1.
		await ScrollerPage.moveSpotlight(2, 'spotlightLeft')
		await ScrollerPage.spotlightDown()
		await expectFocusedItem(1);
	});

	it('Should hide and show item', async function () {
		await ScrollerPage.spotlightSelect();

		// 5-way Up and Right to focus Hide button.
		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightRight();

		// 5-way Select Hide button.
		await ScrollerPage.spotlightSelect();
		// Verify: Item 0 is hidden and it's in the last position.
		await expectFocusedItem(1);
		// 5-way Right few times.
		await ScrollerPage.moveSpotlight(5)
		await expectFocusedItem(0);
		// Verify: Spotlight is on 'plus' icon.
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.spotlightUp();
		await ScrollerPage.buttonShowItem.isFocused();

		// 5-way Up and Select Edit Mode to disable it.
		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightSelect();
		// Verify: Item 0 is hidden.
		await ScrollerPage.verifyShownItems(1, 4)

		// 5-way Up and Select Edit Mode ot enable it.
		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightSelect();
		// Select hidden Item 0.
		await ScrollerPage.spotlightDown();
		await ScrollerPage.moveSpotlight(5)
		await expectFocusedItem(0);
		// Select Show button to add hidden Item.
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.spotlightUp();
		await ScrollerPage.buttonShowItem.isFocused();
		await ScrollerPage.spotlightSelect();
		await expectFocusedItem(0);
		// Verify: Item 0 is not hidden and it's in the last position.
		// 5-way Up and Select Edit Mode to disable it.
		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.spotlightDown();
		await ScrollerPage.verifyShownItems(1, 4);
		await ScrollerPage.spotlightRight();
		await expectFocusedItem(0);
	});

	it('Should change item position', async function () {
		await ScrollerPage.spotlightSelect();

		// 5-way Right 2 times to move Item 0.
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightSelect();

		// Verify: On the right side of Item 0 is Item 3.
		await ScrollerPage.spotlightRight();
		await expectFocusedItem(3);

		// 5-way Left 3 times to check first item.
		await ScrollerPage.moveSpotlight(2, 'spotlightLeft')
		// Verify: On the left side of Item 0 is Item 2.
		await expectFocusedItem(2);
		await ScrollerPage.spotlightLeft();
		// Verify: On the left side of Item 2 is Item 1.
		await expectFocusedItem(1);
		// Verify: First item is Item 1.
		await ScrollerPage.spotlightLeft();
		await ScrollerPage.spotlightDown();
		await expectFocusedItem(1);

		// Switch position of Item 1 and Item 2.
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightSelect();
		await expectFocusedItem(1);
		// Verify: On the right side of Item 1 is Item 0.
		await ScrollerPage.spotlightRight();
		await expectFocusedItem(0);
		// Verify: Positions of Item 1 and Item 2 are switched and Item 2 is in the first position.
		await ScrollerPage.moveSpotlight(2, 'spotlightLeft')
		await expectFocusedItem(2);
		await ScrollerPage.moveSpotlight(2, 'spotlightLeft')
		await ScrollerPage.spotlightDown();
		await expectFocusedItem(2);
		await ScrollerPage.spotlightRight();
		await expectFocusedItem(1);
	});

	it ('Should change item position with editableCentered', async function () {
		// Set data size 1.
		await ScrollerPage.inputFieldNumItems.moveTo();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.backSpace();
		await ScrollerPage.backSpace();
		await ScrollerPage.numPad(1);

		await ScrollerPage.spotlightDown();
		await ScrollerPage.spotlightDown();
		await expectFocusedItem(0);

		// Verify: Distance on the left and right side of the Item 0.
		const itemLeftDistanceCentered = (await ScrollerPage.getActiveElementRect()).left
		const itemRightDistanceCentered = (await ScrollerPage.getActiveElementRect()).right - (await ScrollerPage.getActiveElementRect()).width
		await expect(itemLeftDistanceCentered).to.be.equal(itemRightDistanceCentered);

		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.spotlightDown();
		await ScrollerPage.spotlightDown();

		const itemLeftDistanceNotCentered = (await ScrollerPage.getActiveElementRect()).left
		await expect(itemLeftDistanceCentered).not.to.be.equal(itemLeftDistanceNotCentered);
	});

	it ('Should scroll through list', async function () {
		// Set data size 10.
		await ScrollerPage.inputFieldNumItems.moveTo();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.backSpace();
		await ScrollerPage.backSpace();
		await ScrollerPage.numPad(10);

		await ScrollerPage.spotlightDown();
		await ScrollerPage.spotlightDown();
		await ScrollerPage.moveSpotlight(9);
		await browser.pause(600);

		await expectFocusedItem(9);

		const element = await browser.$('#item9');
		await expect(await element.isDisplayedInViewport()).to.be.true();
	});
});
