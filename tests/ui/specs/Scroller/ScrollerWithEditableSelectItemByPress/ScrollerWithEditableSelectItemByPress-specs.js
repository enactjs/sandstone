const ScrollerPage = require('./ScrollerWithEditableSelectItemByPressPage');

describe('Editable Scroller', function () {
	beforeEach(async function () {
		await ScrollerPage.open();
	});

	it('Should be able to hide all items', async function () {
		await ScrollerPage.spotlightDown();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.expectFocusedItem('0');

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
		await ScrollerPage.expectDisabledItem('0');
	});

	it('Should set class to hide left arrow of the first item in LTR locales', async function () {
		await ScrollerPage.spotlightDown();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.expectItemWrapperClass('tests_ui_apps_Scroller_ScrollerWithEditableSelectItemByPress_ScrollerWithEditableSelectItemByPress_noBefore');
	});

	it('Should hide item with hide button', async function () {
		await ScrollerPage.spotlightDown();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.expectFocusedItem('0');

		/* hide 1 item: expected next item is focused */
		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.expectFocusedItem('1');

		/* expected last item is disabled */
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.expectDisabledItem('0');
	});

	it('Should focus of item move properly with 5-way keys', async function () {
		await ScrollerPage.spotlightDown();
		await ScrollerPage.expectFocusedItem('0');

		/* expected focused item is not changed when press down key */
		await ScrollerPage.spotlightDown();
		await ScrollerPage.expectFocusedItem('0');

		/* expected next item is focused when press right key */
		await ScrollerPage.spotlightRight();
		await ScrollerPage.expectFocusedItem('1');

		/* expected item move properly to right */
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.expectFocusedItem('1');
		await ScrollerPage.spotlightRight();
		await ScrollerPage.expectFocusedItem('3');

		/* expected hidden item do not move */
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.expectDisabledItem('3');
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.spotlightLeft();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.spotlightRight();
		await ScrollerPage.expectDisabledItem('3');
		await ScrollerPage.spotlightLeft();
		await ScrollerPage.expectFocusedItem('9');
	});

	it('Should release selected Item when focus leaves scroll container', async function () {
		await ScrollerPage.spotlightDown();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.expectFocusedItem('0');
		await ScrollerPage.spotlightUp();
		await ScrollerPage.spotlightUp();
		await ScrollerPage.expectFocusedItem(null);
	});

	describe('Editable Scroller in RTL locales', function () {
		beforeEach(async function () {
			await ScrollerPage.open('', '?locale=ar-SA');
		});

		it('Should set class to hide right arrow of the first item in RTL locales', async function () {
			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightSelect();
			await ScrollerPage.expectItemWrapperClass('tests_ui_apps_Scroller_ScrollerWithEditableSelectItemByPress_ScrollerWithEditableSelectItemByPress_noBefore');
		});
	});
});
