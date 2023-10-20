const ScrollerPage = require('../ScrollerPage');
const {expectFocusedIconItem, expectDisabledItem, expectItemWrapperClass} = require('../Scroller-utils');

describe('Editable Scroller', function () {
	beforeEach(async function () {
		await ScrollerPage.open('WithEditableSelectItemByPress');
	});

	it('Should be able to hide all items', async function () {
		await ScrollerPage.spotlightDown();
		await ScrollerPage.spotlightSelect();
		await expectFocusedIconItem('0');

		/* hide 10 items: note that 10 items are minimal set to make the scroller overflows */
		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightSelect();

		/* move focus out of the scroller */
		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightUp();

		/* expected no item is displayed */
		await ScrollerPage.spotlightDown();
		await expectDisabledItem('0');
	});

	it('Should set class to hide left arrow of the first item in LTR locales', async function () {
		await ScrollerPage.spotlightDown();
		await ScrollerPage.spotlightSelect();
		await expectItemWrapperClass('tests_ui_apps_Scroller_WithEditableSelectItemByPress_ScrollerWithEditableSelectItemByPress_noBefore');
	});

	it('Should hide item with hide button', async function () {
		await ScrollerPage.spotlightDown();
		await ScrollerPage.spotlightSelect();
		await expectFocusedIconItem('0');

		/* hide item 0: expected next item(=item 1) is focused */
		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightSelect();
		await expectFocusedIconItem('1');

		/* expected last item is disabled */
		for (let i = 0; i < 9; i++) {
			await ScrollerPage.spotlightRight();
		}
		await expectDisabledItem('0');
	});

	it('Should focus item properly when move with 5-way keys', async function () {
		await ScrollerPage.spotlightDown();
		await expectFocusedIconItem('0');

		/* expected focused item is not changed when press the down key */
		await ScrollerPage.spotlightDown();
		await expectFocusedIconItem('0');

		/* expected next item is focused when press the right key once */
		await ScrollerPage.spotlightRight();
		await expectFocusedIconItem('1');

		/* expected last item is focused when press the right key more than the number of items */
		for (let i = 0; i < 11; i++) {
			await ScrollerPage.spotlightRight();
		}
		await expectFocusedIconItem('9');

		/* expected previous item is focused when press the left key once */
		await ScrollerPage.spotlightLeft();
		await expectFocusedIconItem('8');

		/* expected first item is focused when press the left key more than the number of items */
		for (let i = 0; i < 11; i++) {
			await ScrollerPage.spotlightLeft();
		}
		await expectFocusedIconItem('0');
	});

	it('Should release selected Item when focus leaves scroll container', async function () {
		await ScrollerPage.spotlightDown();
		await ScrollerPage.spotlightSelect();
		await expectFocusedIconItem('0');

		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightUp();

		expect(await ScrollerPage.buttonNativeScroll.isFocused()).to.be.true();
	});

	describe('Editable Scroller in RTL locales', function () {
		beforeEach(async function () {
			await ScrollerPage.open('WithEditableSelectItemByPress', '?locale=ar-SA');
		});

		it('Should set class to hide right arrow of the first item in RTL locales', async function () {
			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightSelect();
			await expectItemWrapperClass('tests_ui_apps_Scroller_WithEditableSelectItemByPress_ScrollerWithEditableSelectItemByPress_noBefore');
		});
	});

	describe('5-way', function () {
		beforeEach(async function () {
			await ScrollerPage.open('WithEditableSelectItemByPress');
			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightSelect();
			await ScrollerPage.spotlightDown();
			await expectFocusedItem(0);
		});

		it('should remove item with remove button when item is selected', async function () {
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

		it('should remove item with remove button when item is focused', async function () {
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
			await ScrollerPage.moveSpotlight(2, 'spotlightLeft');
			await ScrollerPage.spotlightDown();
			await expectFocusedItem(1);
		});

		it('should hide and show item', async function () {
			const item0 = await $('#item0');
			await ScrollerPage.spotlightSelect();

			// 5-way Up and Right to focus Hide button.
			await ScrollerPage.spotlightUp();
			await ScrollerPage.spotlightRight();

			// 5-way Select Hide button.
			await ScrollerPage.spotlightSelect();
			// Verify: Item 0 is hidden and it's in the last position.
			await expectFocusedItem(1);
			// 5-way Right few times.
			await ScrollerPage.moveSpotlight(5);
			await expectFocusedItem(0);
			// Verify: Spotlight is on 'plus' icon.
			await ScrollerPage.spotlightSelect();
			await ScrollerPage.spotlightUp();
			await expect(await ScrollerPage.buttonShowItem.isFocused()).to.be.true();

			// 5-way Up and Select Edit Mode to disable it.
			await ScrollerPage.spotlightUp();
			await ScrollerPage.spotlightSelect();
			await ScrollerPage.spotlightDown();
			await ScrollerPage.moveSpotlight(4);
			// Verify: Item 0 is hidden.
			await expect(await item0.isDisplayedInViewport()).to.be.false();

			// 5-way Up and Select Edit Mode ot enable it.
			await ScrollerPage.spotlightUp();
			await ScrollerPage.spotlightSelect();
			// Select hidden Item 0.
			await ScrollerPage.spotlightDown();
			await ScrollerPage.moveSpotlight(5);
			await expectFocusedItem(0);
			// Select Show button to add hidden Item.
			await ScrollerPage.spotlightSelect();
			await ScrollerPage.spotlightUp();
			await expect(await ScrollerPage.buttonShowItem.isFocused()).to.be.true();
			await ScrollerPage.spotlightSelect();
			await expectFocusedItem(0);
			// Verify: Item 0 is not hidden and it's in the last position.
			// 5-way Up and Select Edit Mode to disable it.
			await ScrollerPage.spotlightUp();
			await ScrollerPage.spotlightUp();
			await ScrollerPage.spotlightSelect();
			await ScrollerPage.spotlightDown();
			await ScrollerPage.moveSpotlight(4);
			await expect(await item0.isDisplayedInViewport()).to.be.true();
		});

		it('should change item position', async function () {
			await ScrollerPage.spotlightSelect();

			// 5-way Right 2 times to move Item 0.
			await ScrollerPage.spotlightRight();
			await ScrollerPage.spotlightRight();
			await ScrollerPage.spotlightSelect();

			// Verify: On the right side of Item 0 is Item 3.
			await ScrollerPage.spotlightRight();
			await expectFocusedItem(3);

			// 5-way Left 3 times to check first item.
			await ScrollerPage.moveSpotlight(2, 'spotlightLeft');
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
			await ScrollerPage.moveSpotlight(2, 'spotlightLeft');
			await expectFocusedItem(2);
			await ScrollerPage.moveSpotlight(2, 'spotlightLeft');
			await ScrollerPage.spotlightDown();
			await expectFocusedItem(2);
			await ScrollerPage.spotlightRight();
			await expectFocusedItem(1);
		});

		it('should change item position with editableCentered', async function () {
			// Set data size 1.
			await ScrollerPage.inputFieldNumItems.moveTo();
			await ScrollerPage.spotlightSelect();
			await ScrollerPage.backSpace();
			await ScrollerPage.numPad(1);

			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightDown();
			await expectFocusedItem(0);

			// Verify: Distance on the left and right side of the Item 0.
			const itemLeftDistanceCentered = (await ScrollerPage.getActiveElementRect()).left;
			const itemRightDistanceCentered = (await ScrollerPage.getActiveElementRect()).right - (await ScrollerPage.getActiveElementRect()).width;
			await expect(itemLeftDistanceCentered).to.be.equal(itemRightDistanceCentered);

			// Set Editable Center to false.
			await ScrollerPage.spotlightUp();
			await ScrollerPage.spotlightUp();
			await ScrollerPage.spotlightUp();
			await ScrollerPage.spotlightSelect();
			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightDown();

			// Verify: Item 0 is not centered.
			const itemLeftDistanceNotCentered = (await ScrollerPage.getActiveElementRect()).left;
			await expect(itemLeftDistanceCentered).not.to.be.equal(itemLeftDistanceNotCentered);
		});

		it('should scroll through list', async function () {
			// Set data size 10.
			await ScrollerPage.inputFieldNumItems.moveTo();
			await ScrollerPage.spotlightSelect();
			await ScrollerPage.backSpace();
			await ScrollerPage.numPad(10);

			// Move the spotlight to the last item that is not visible.
			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightDown();
			await ScrollerPage.moveSpotlight(9);
			await browser.pause(600);

			await expectFocusedItem(9);

			// Verify: Item 9 is displayed in Viewport.
			const element = await $('#item9');
			await expect(await element.isDisplayedInViewport()).to.be.true();
		});
	});

	describe('pointer', function () {
		beforeEach(async function () {
			// Enable Edit Mode with pointer.
			await ScrollerPage.open('WithEditableSelectItemByPress');
			const editButton = await $('#editMode');
			await editButton.click();
		});

		it('should remove item with remove button when item is clicked', async function () {
			// Click on Item 0.
			const item0 = await $('#item0');
			await item0.click();
			// Click on remove button.
			const removeButton = await $('#removeItem');
			await removeButton.click();

			// Verify: Item 0 is deleted.
			await expect(await item0.isExisting()).to.be.false();
		});

		it('should remove item with remove button when item is focused', async function () {
			// Focus Item 0 with pointer.
			const item0 = await $('#item0');
			await browser.performActions([
				{
					type: 'pointer',
					id: 'mouse',
					actions: [
						{type: 'pointerMove', duration: 0, x: 0, y: 0, origin: item0}
					]
				}
			]);
			// Click on Remove Button.
			const removeButton = await $('#removeItem');
			await removeButton.click();

			// Verify: Item 0 is deleted.
			await expect(await item0.isExisting()).to.be.false();
		});

		it('should hide and show item', async function () {
			// Click on Item 0.
			const item0 = await $('#item0');
			await item0.click();
			// Click on Hide Button.
			const hideButton = await $('#hideItem');
			await hideButton.click();
			const showButton = await $('#showItem');
			await item0.scrollIntoView();
			await item0.click();

			// Verify: Show Button is displayed.
			await expect(await showButton.isDisplayedInViewport()).to.be.true();

			// Disable Edit Mode.
			const editButton = await $('#editMode');
			await editButton.click();
			await item0.scrollIntoView();

			// Verify: Item 0 is not displayed.
			await expect(await item0.isDisplayedInViewport()).to.be.false();

			// Enable Edit Mode.
			await editButton.click();
			await item0.scrollIntoView();
			await item0.click();
			// Click on Show Button and disable Edit Mode.
			await showButton.click();
			await editButton.click();
			await item0.scrollIntoView();

			// Verify: Item 0 is displayed.
			await expect(await item0.isDisplayedInViewport()).to.be.true();
		});

		it('should change item position', async function () {
			const item0 = await $('#item0');
			const elementWidth = await item0.getSize('width');
			// Change position of Item 0.
			await browser.performActions([
				{
					type: 'pointer',
					id: 'mouse',
					actions: [
						{type: 'pointerMove', duration: 0, x: 0, y: 0, origin: item0},
						{type: 'pointerDown', button: 0},
						{type: 'pause', duration: 1000},
						{type: 'pointerUp', button: 0},
						{type: 'pointerMove', duration: 0, x: elementWidth * 3, y: 0, origin: item0},
						{type: 'pointerDown', button: 0}
					]
				}
			]);

			// Verify: Item 3 is on the right side of Item 0.
			await browser.performActions([
				{
					type: 'pointer',
					id: 'mouse',
					actions: [
						{type: 'pointerMove', duration: 0, x: elementWidth, y: 0, origin: item0},
						{type: 'pointerDown', button: 0},
						{type: 'pause', duration: 500},
						{type: 'pointerUp', button: 0}
					]
				}
			]);
			await expectFocusedItem(3);

			// Verify: Item 2 is on the left side of Item 0.
			await browser.performActions([
				{
					type: 'pointer',
					id: 'mouse',
					actions: [
						{type: 'pointerDown', button: 0},
						{type: 'pointerMove', duration: 0, x: -elementWidth, y: 0, origin: item0},
						{type: 'pointerDown', button: 0},
						{type: 'pause', duration: 500},
						{type: 'pointerUp', button: 0}
					]
				}
			]);
			await expectFocusedItem(2);

			// Switch position of Item 1 and Item 2.
			// Verify: Item 1 is on the right side of Item 2.
			const item2 = await $('#item2');
			await browser.performActions([
				{
					type: 'pointer',
					id: 'mouse',
					actions: [
						{type: 'pointerMove', duration: 0, x: -elementWidth, y: 0, origin: item2},
						{type: 'pointerDown', button: 0},
						{type: 'pointerMove', duration: 0, x: elementWidth, y: 0, origin: item2},
						{type: 'pointerDown', button: 0},
						{type: 'pause', duration: 500},
						{type: 'pointerUp', button: 0}
					]
				}
			]);
			await expectFocusedItem(1);
		});

		it('should change item position with editableCentered', async function () {
			// Change data size.
			const input = await $('#numItems');
			await input.click();
			await ScrollerPage.backSpace();
			await ScrollerPage.numPad(1);
			// Focus on Item 0;
			const item0 = await $('#item0');
			await item0.doubleClick();

			// Verify: Item 0 is centered.
			const itemLeftDistanceCentered = (await ScrollerPage.getActiveElementRect()).left;
			const itemRightDistanceCentered = (await ScrollerPage.getActiveElementRect()).right - (await ScrollerPage.getActiveElementRect()).width;
			await expect(itemLeftDistanceCentered).to.be.equal(itemRightDistanceCentered);

			// CLick on Editable Centered Button.
			const editableCenteredButton = await $('#editableCentered');
			await editableCenteredButton.click();

			// Verify: Item 0 is not centered.
			await item0.click();
			const itemLeftDistanceNotCentered = (await ScrollerPage.getActiveElementRect()).left;
			await expect(itemLeftDistanceCentered).not.to.be.equal(itemLeftDistanceNotCentered);
		});

		it('should scroll through list', async function () {
			// Change data size.
			const input = await $('#numItems');
			await input.click();
			await ScrollerPage.backSpace();
			await ScrollerPage.numPad(10);

			// Verify: Item 9 is displayed in Viewport.
			const item9 = await $('#item9');
			await item9.scrollIntoView();
			await expect(await item9.isDisplayedInViewport()).to.be.true();
		});
	});
});
