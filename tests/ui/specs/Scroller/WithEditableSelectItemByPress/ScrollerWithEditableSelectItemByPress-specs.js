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
});
