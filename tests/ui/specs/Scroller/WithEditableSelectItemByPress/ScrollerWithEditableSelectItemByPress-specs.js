const ScrollerPage = require('../ScrollerPage');
const {expectDisabledItem, expectFocusedIconItem, expectFocusedItem, expectItemWrapperClass} = require('../Scroller-utils');

describe('Editable Scroller', function () {
	beforeEach(async function () {
		await ScrollerPage.open('WithEditableSelectItemByPress');
	});

	it('Should be able to hide all items', async function () {
		await ScrollerPage.spotlightDown();
		await ScrollerPage.spotlightSelect();
		await expectFocusedIconItem('0');

		/* hide 10 items: note that 10 items are minimal set to make the scroller overflows */
		for (let i = 0; i < 10; i++) {
			await ScrollerPage.spotlightUp();
			await ScrollerPage.spotlightRight();
			await ScrollerPage.spotlightSelect();
		}

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

	it('Should hide item with hide button [QWTC-12770]', async function () {
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

	it('Should focus item properly when move with 5-way keys[QWTC-12962]', async function () {
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

	it('Should release selected Item when focus leaves scroll container [QWTC-12789]', async function () {
		await ScrollerPage.spotlightDown();
		await ScrollerPage.spotlightSelect();
		await expectFocusedIconItem('0');

		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightUp();

		expect(await ScrollerPage.buttonNativeScroll.isFocused()).toBe(true);
	});

	it('should remove item with remove button when item is selected', async function () {
		await ScrollerPage.spotlightDown();
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
		await ScrollerPage.spotlightDown();
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

	it('should change item position', async function () {
		await ScrollerPage.spotlightDown();
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
		await ScrollerPage.backSpace();
		await ScrollerPage.backSpace();
		await ScrollerPage.numPad(1);

		await ScrollerPage.spotlightDown();
		await expectFocusedItem(0);
		await ScrollerPage.spotlightSelect();

		// Verify: Distance on the left and right side of the Item 0.
		const itemLeftDistanceCentered = (await ScrollerPage.getActiveElementRect()).left;
		const itemRightDistanceCentered = (await browser.getWindowSize()).width - (await ScrollerPage.getActiveElementRect()).right;

		const expectedResult = Math.floor(itemLeftDistanceCentered / 100) * 100;
		const result = Math.floor(itemRightDistanceCentered / 100) * 100;
		await expect(expectedResult).toBe(result);

		// Set Editable Center to false.
		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.spotlightDown();

		// Verify: Item 0 is not centered.
		const itemLeftDistanceNotCentered = (await ScrollerPage.getActiveElementRect()).left;
		await expect(itemLeftDistanceCentered).not.toBe(itemLeftDistanceNotCentered);
	});

	it('should scroll through list', async function () {
		// Move the spotlight to the last item that is not visible.
		await ScrollerPage.spotlightDown();
		await ScrollerPage.spotlightDown();
		await ScrollerPage.moveSpotlight(9, 'spotlightRight');
		await browser.pause(600);

		await expectFocusedItem(9);

		// Verify: Item 9 is displayed in Viewport.
		const element = await $('#item9');
		await expect(await element.isDisplayed([isWithinViewport = true])).toBe(true); // eslint-disable-line no-undef
	});

	it('Should unselect the selected item with 5-way down [QWTC-13660]', async function () {
		// Select the first item
		await ScrollerPage.spotlightDown();
		await ScrollerPage.spotlightSelect();
		await expectFocusedIconItem('0');
		await expectItemWrapperClass('tests_ui_apps_Scroller_WithEditableSelectItemByPress_ScrollerWithEditableSelectItemByPress_selected');

		// 5-way Right to move Item 0.
		await ScrollerPage.spotlightRight();
		await expectFocusedIconItem('0');

		// 5-way Down to finish editing
		await ScrollerPage.spotlightDown();
		await expectFocusedIconItem('0');
		await expectItemWrapperClass('tests_ui_apps_Scroller_WithEditableSelectItemByPress_ScrollerWithEditableSelectItemByPress_focused');

		// 5-way Left to check if no item is selected
		await ScrollerPage.spotlightLeft();
		await expectFocusedIconItem('1');
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

	describe('pointer', function () {
		beforeEach(async function () {
			// Enable Edit Mode with pointer.
			await ScrollerPage.open('WithEditableSelectItemByPress');
		});

		it('should remove item with remove button when item is clicked', async function () {
			// Click on Item 0.
			const item0 = await $('#item0');
			await item0.click();
			// Click on remove button.
			const removeButton = await $('#removeItem');
			await removeButton.click();

			// Verify: Item 0 is deleted.
			await expect(await item0.isExisting()).toBe(false);
		});

		// It will be checked after the Java version update on the TV.
		it.skip('should remove item with remove button when item is focused', async function () {
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
			await expect(await item0.isExisting()).toBe(false);
		});

		it('should hide item', async function () {
			// Click on Item 0.
			const item0 = await $('#item0');
			await item0.click();
			// Click on Hide Button.
			const hideButton = await $('#hideItem');
			await hideButton.click();
			const showButton = await $('#showItem');
			await item0.scrollIntoView();
			await item0.click();

			// Verify: Show Button is displayed - item is hidden.
			await expect(await showButton.isDisplayed([isWithinViewport = true])).toBe(true); // eslint-disable-line no-undef

			// Click on Show Button.
			await showButton.click();
			await item0.scrollIntoView();

			// Verify: Show Button is not displayed.
			await expect(await showButton.isDisplayed([isWithinViewport = true])).toBe(false); // eslint-disable-line no-undef
		});

		// It will be checked after the Java version update on the TV.
		it.skip('should change item position', async function () {
			const item0 = await $('#item0');
			const itemWidth = await item0.getSize('width');
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
						{type: 'pointerMove', duration: 0, x: itemWidth * 3, y: 0, origin: item0},
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
						{type: 'pointerMove', duration: 0, x: itemWidth, y: 0, origin: item0},
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
						{type: 'pointerMove', duration: 0, x: -itemWidth, y: 0, origin: item0},
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
						{type: 'pointerMove', duration: 0, x: -itemWidth * 2, y: 0, origin: item2},
						{type: 'pointerDown', button: 0},
						{type: 'pause', duration: 500},
						{type: 'pointerUp', button: 0},
						{type: 'pointerMove', duration: 0, x: 0, y: 0, origin: item2},
						{type: 'pointerMove', duration: 0, x: itemWidth, y: 0, origin: item2},
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
			await ScrollerPage.backSpace();
			await ScrollerPage.numPad(1);
			// Focus on Item 0;
			const item0 = await $('#item0');
			await item0.click();

			// Verify: Item 0 is centered.
			const itemLeftDistanceCentered = (await ScrollerPage.getActiveElementRect()).left;
			const itemRightDistanceCentered = (await browser.getWindowSize()).width - (await ScrollerPage.getActiveElementRect()).right;

			const expectedResult = Math.floor(itemLeftDistanceCentered / 100) * 100;
			const result = Math.floor(itemRightDistanceCentered / 100) * 100;
			await expect(expectedResult).toBe(result);

			// CLick on Editable Centered Button.
			const editableCenteredButton = await $('#editableCentered');
			await editableCenteredButton.click();

			// Verify: Item 0 is not centered.
			await item0.click();
			const itemLeftDistanceNotCentered = (await ScrollerPage.getActiveElementRect()).left;
			await expect(itemLeftDistanceCentered).not.toBe(itemLeftDistanceNotCentered);
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
			await expect(await item9.isDisplayed([isWithinViewport = true])).toBe(true); // eslint-disable-line no-undef
		});
	});
});
