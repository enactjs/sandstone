const {expectFocusedItem, expectNoFocusedItem} = require('../../VirtualList/VirtualList-utils');
const ScrollerPage = require('../ScrollerPage');

describe('Scroller List Of Things', function () {
	beforeEach(function () {
		ScrollerPage.open('ListOfThings');
	});

	it.skip('should spotlightDisabled disables with focusableScrollbar [GT-28530]', function () {
		// Step 3-1: Knobs > Scroller > focusableScrollbar > true
		// In this view, It is default setting that scrollbar is visible.
		ScrollerPage.dropdownFocusableScrollbar.moveTo();
		ScrollerPage.spotlightSelect();
		ScrollerPage.spotlightDown();
		ScrollerPage.spotlightSelect();

		// Step 4-1: 5-way Spot Item 0.
		ScrollerPage.buttonTop.moveTo();
		ScrollerPage.spotlightDown();
		expectFocusedItem(0);
		// Step 4-2: 5-way Right.
		ScrollerPage.spotlightRight();
		// Step 4 Verify: Spotlight is on the verticalScrollbar Scroll Thumb..
		expect(ScrollerPage.verticalScrollThumb.isFocused()).to.be.false();

		// Step 5-1: Knobs > Scroller > spotlightDisabled > check
		ScrollerPage.buttonSpotlightDisabled.moveTo();
		ScrollerPage.spotlightSelect();
		// Step 5-2: 5-way Spot Item 0.
		$('#item0').moveTo();
		// Step 5-2 Verify: Item 0 cannot be spotted.
		expectNoFocusedItem();
		// Step 5-3: 5-way Right.
		ScrollerPage.spotlightRight();
		// Step 5-3 Verify: verticalScrollbar Scroll Thumb cannot be spotted.
		expect(ScrollerPage.verticalScrollThumb.isFocused()).to.be.false();

		// Step 6-1: Knobs > Scroller > spotlightDisabled > uncheck
		ScrollerPage.buttonSpotlightDisabled.moveTo();
		ScrollerPage.spotlightSelect();
		ScrollerPage.buttonTop.moveTo();
		ScrollerPage.spotlightDown();
		// Step 6-2: 5-way Spot Item 99.
		for (let i = 0; i < 19; i++) {
			ScrollerPage.pageDown();
			ScrollerPage.delay(700);
		}
		expectFocusedItem(99);
		// Step 6-3: 5-way Down.
		ScrollerPage.spotlightDown();
		// Step 6 Verify: Spotlight is on the horizontalScrollbar Scroll Thumb.
		expect(ScrollerPage.horizontalScrollThumb.isFocused()).to.be.true();

		// Step 7-1: Knobs > Scroller > spotlightDisabled > check
		ScrollerPage.buttonSpotlightDisabled.moveTo();
		ScrollerPage.spotlightSelect();
		// Step 7-2: 5-way Spot Item 99.
		$('#item99').moveTo();
		// Step 7-3: 5-way Down.
		ScrollerPage.spotlightDown();
		// Step 7-2 Verify: Item 99 cannot be spotted.
		expectNoFocusedItem();
		// Step 7-3 Verify: horizontalScrollbar Scroll Thumb cannot be spotted.
		expect(ScrollerPage.horizontalScrollThumb.isFocused()).to.be.false();
	});
});
