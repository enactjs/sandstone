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

	it('drag and drop', async function () {
		const element = await $('#item1');
		const elementSize = await element.getSize();

		// Change position of Item0
		await browser.action('pointer')
			.move({duration: 500, x: elementSize.width, y: 300})
			.down({button: 0}) // left button
			.pause(600)
			.move({duration: 500, x: elementSize.width * 2, y: 300})
			.up({button: 0})
			.down({button: 0})
			.up({button: 0})
			.perform()
		await browser.pause(500);
		await expectFocusedItem(0);

		// Verify: Item1 is first in the list
		await browser.action('pointer')
			.move({duration: 0, x: elementSize.width, y: 300})
			.perform()
		await expectFocusedItem(1);

		// Verify: Item2 keeps its original position
		await browser.action('pointer')
			.move({duration: 0, x: elementSize.width * 3, y: 300})
			.perform()
		await expectFocusedItem(2);
	});
});
