const {expectFocusedItem, expectNoFocusedItem} = require('../../VirtualList/VirtualList-utils');
const ScrollerPage = require('../ScrollerPage');

describe('Scroller List Of Things', function () {
	beforeEach(async function () {
		await ScrollerPage.open('ListOfThings');
	});

	it('should spotlightDisabled disables with focusableScrollbar [QWTC-2086]', async function () {
		// Step 3-1: Knobs > Scroller > focusableScrollbar > true
		// In this view, It is default setting that scrollbar is visible.
		await ScrollerPage.dropdownFocusableScrollbar.moveTo();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.spotlightDown();
		await ScrollerPage.spotlightSelect();

		// Step 4-1: 5-way Spot Item 0.
		await ScrollerPage.buttonTop.moveTo();
		await ScrollerPage.spotlightDown();
		expectFocusedItem(0);
		// Step 4-2: 5-way Right.
		await ScrollerPage.spotlightRight();
		// Step 4 Verify: Spotlight is on the verticalScrollbar Scroll Thumb..
		expect(await ScrollerPage.verticalScrollThumb.isFocused()).toBe(true);

		// Step 5-1: Knobs > Scroller > spotlightDisabled > check
		await ScrollerPage.buttonSpotlightDisabled.moveTo();
		await ScrollerPage.spotlightSelect();
		// Step 5-2: 5-way Spot Item 0.
		await $('#item0').moveTo();
		// Step 5-2 Verify: Item 0 cannot be spotted.
		await expectNoFocusedItem();
		// Step 5-3: 5-way Right.
		await ScrollerPage.spotlightRight();
		// Step 5-3 Verify: verticalScrollbar Scroll Thumb cannot be spotted.
		expect(await ScrollerPage.verticalScrollThumb.isFocused()).toBe(false);

		// Step 6-1: Knobs > Scroller > spotlightDisabled > uncheck
		await ScrollerPage.buttonSpotlightDisabled.moveTo();
		await ScrollerPage.spotlightSelect();
		await ScrollerPage.buttonTop.moveTo();
		await ScrollerPage.spotlightDown();
		// Step 6-2: 5-way Spot Item 99.
		for (let i = 0; i < 19; i++) {
			await ScrollerPage.pageDown();
			await ScrollerPage.delay(700);
		}
		await ScrollerPage.spotlightUp();
		await expectFocusedItem(99);
		// Step 6-3: 5-way Down.
		await ScrollerPage.spotlightDown();
		// Step 6 Verify: Spotlight is on the horizontalScrollbar Scroll Thumb.
		expect(await ScrollerPage.horizontalScrollThumb.isFocused()).toBe(true);

		// Step 7-1: Knobs > Scroller > spotlightDisabled > check
		await ScrollerPage.buttonSpotlightDisabled.moveTo();
		await ScrollerPage.spotlightSelect();
		// In UI test view, it is not able to verify that 5-way spot item99 visually.
		// So verify 7-2 and 7-3 are replaced with below code that spotlight is not on any item in list when press 5-way up on bottom button.
		await ScrollerPage.buttonBottom.moveTo();
		await ScrollerPage.spotlightUp();
		expect(await ScrollerPage.buttonTop.isFocused()).toBe(true);
	});
});
