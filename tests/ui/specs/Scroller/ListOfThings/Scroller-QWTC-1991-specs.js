const ScrollerPage = require('../ScrollerPage');
const {expectFocusedItem, expectNoFocusedItem} = require('../Scroller-utils');

describe('Scroller List Of Things', function () {
	beforeEach(async function () {
		await ScrollerPage.open('ListOfThings');
	});

	it('spotlight disabled in spotlight container [QWTC-1991]', async function () {
		// Step 3: Hover 'Item 0'
		await ScrollerPage.showPointerByKeycode();
		await $('#item0').moveTo();
		// Step 3's Verify: Spotlight is on the 'Item 0'.
		await expectFocusedItem(0);

		// Step 4-1: Knobs > Scroller > spotlightDisabled > Check.
		await ScrollerPage.buttonSpotlightDisabled.moveTo();
		await ScrollerPage.spotlightSelect();

		// Step 4=2: Hover item 0.
		await $('#item0').moveTo();
		// Step 4's Verify: Spotlight is not on the 'Item 0'.
		await expectNoFocusedItem();

		// Step 5: Click item 0.
		await $('#item0').click();
		// Step 5's Verify: Spotlight is not on the 'Item 0'.
		await expectNoFocusedItem();
	});
});
