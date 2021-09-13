const ScrollerPage = require('../ScrollerPage');
const {expectFocusedItem, expectNoFocusedItem} = require('../Scroller-utils');

describe('Scroller List Of Things', function () {
	beforeEach(function () {
		ScrollerPage.open('ListOfThings');
	});

	it('spotlight disabled in spotlight container [GT-28390]', function () {
		// Step 3: Hover 'Item 0'
		ScrollerPage.showPointerByKeycode();
		$('#item0').moveTo();
		// Step 3's Verify: Spotlight is on the 'Item 0'.
		expectFocusedItem(0);

		// Step 4-1: Knobs > Scroller > spotlightDisabled > Check.
		ScrollerPage.buttonSpotlightDisabled.moveTo();
		ScrollerPage.spotlightSelect();

		// Step 4=2: Hover item 0.
		$('#item0').moveTo();
		// Step 4's Verify: Spotlight is not on the 'Item 0'.
		expectNoFocusedItem();

		// Step 5: Click item 0.
		$('#item0').click();
		// Step 5's Verify: Spotlight is not on the 'Item 0'.
		expectNoFocusedItem();
	});
});
