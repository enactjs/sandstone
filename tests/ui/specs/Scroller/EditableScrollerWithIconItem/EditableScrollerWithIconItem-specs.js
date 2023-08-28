const ScrollerPage = require('./EditableScrollerWithIconItemPage');
const {expectFocusedItem, expectDisabledItem, expectItemWrapperClass} = require('./EditableScroller-utils');

describe('Editable Scroller', function () {
	beforeEach(async function () {
		await ScrollerPage.open();
	});

	it('Should be able to hide all items', async function () {
		await ScrollerPage.spotlightDown();
		await ScrollerPage.spotlightSelect();
		await expectFocusedItem('0');

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

	it('Should set class to hide left arrow at the first item in LTR locales', async function () {
		await ScrollerPage.spotlightDown();
		await ScrollerPage.spotlightSelect();
		await expectItemWrapperClass('tests_ui_apps_Scroller_EditableScrollerWithIconItem_EditableScrollerWithIconItem_noBefore');
	});

	describe('Editable Scroller in RTL locales', function () {
		beforeEach(async function () {
			await ScrollerPage.open('', '?locale=ar-SA');
		});

		it('Should set class to hide left arrow at the last item in RTL locales', async function () {
			await ScrollerPage.spotlightDown();
			await ScrollerPage.spotlightSelect();
			await expectItemWrapperClass('tests_ui_apps_Scroller_EditableScrollerWithIconItem_EditableScrollerWithIconItem_noAfter');
		});
	});
});
