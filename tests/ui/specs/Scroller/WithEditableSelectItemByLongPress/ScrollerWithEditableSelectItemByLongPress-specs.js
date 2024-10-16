const ScrollerPage = require('../ScrollerPage');
const {enableEditModeLongPress, expectFocusedItem} = require('../Scroller-utils');

describe('Scroller With Editable Select Item By Long Press', function () {
	beforeEach(async function () {
		await ScrollerPage.open('WithEditableSelectItemByLongPress');
	});

	it('should remove item with remove button', async function () {
		await ScrollerPage.spotlightDown();
		await ScrollerPage.spotlightDown();
		await expectFocusedItem(0);
		await enableEditModeLongPress();

		await ScrollerPage.spotlightUp();
		await expect(await ScrollerPage.buttonRemoveItem.isFocused()).toBe(true);

		await ScrollerPage.spotlightSelect();
		await expectFocusedItem(1);
		await ScrollerPage.spotlightLeft();
		await ScrollerPage.spotlightLeft();
		await ScrollerPage.spotlightLeft();
		await expectFocusedItem(1);
	});

	it('should change item position with 5-way mode', async function () {
		await ScrollerPage.spotlightDown();
		await expectFocusedItem(0);
		await enableEditModeLongPress();
		expect(await ScrollerPage.checkEditableItem()).toBe(true);

		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightSelect();
		await expectFocusedItem(0);
		await ScrollerPage.spotlightLeft();
		await expectFocusedItem(1);

		await ScrollerPage.spotlightRight();
		await enableEditModeLongPress();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightSelect();
		await expectFocusedItem(0);
		await ScrollerPage.spotlightRight();
		await expectFocusedItem(5);

		await ScrollerPage.spotlightLeft();
		await ScrollerPage.spotlightSelect();
		await expectFocusedItem(0);
		await ScrollerPage.spotlightLeft();
		await enableEditModeLongPress();
		await ScrollerPage.spotlightRight();
		await expectFocusedItem(4);
	});

	it('should change item position with editableCentered', async function () {
		await ScrollerPage.inputFieldNumItems.moveTo();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.backSpace();
		await ScrollerPage.backSpace();
		await ScrollerPage.numPad(3);
		await ScrollerPage.backKey();

		await ScrollerPage.spotlightDown();
		await ScrollerPage.spotlightLeft(); // ensure spotlight is on first item
		const leftmostItemRect = Math.floor((await ScrollerPage.getActiveElementRect()).left / 100) * 100;
		await enableEditModeLongPress();
		await expectFocusedItem(0);
		await expect(await ScrollerPage.checkEditableItem()).toBe(true);

		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightSelect();
		await expectFocusedItem(0);
		await ScrollerPage.spotlightLeft();
		await expectFocusedItem(1);

		await expect(leftmostItemRect).toBe(Math.floor((await ScrollerPage.getActiveElementRect()).left / 100) * 100);

	});
});
