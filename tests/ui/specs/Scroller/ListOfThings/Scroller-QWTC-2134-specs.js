const ScrollerPage = require('../ScrollerPage');

describe('Scroller List Of Things', function () {
	beforeEach(async function () {
		await ScrollerPage.open('ListOfThings');
	});

	it('should spotlight on x closing button with spotlight disabled [QWTC-2134]', async function () {
		// Step 3: Knobs > Scroller > spotlightDisabled > check
		await ScrollerPage.buttonSpotlightDisabled.moveTo();
		await ScrollerPage.spotlightSelect();

		// Step 4-1: Wheel Down on the items. Wheel action is replaced PageDown key in this test.
		await ScrollerPage.verticalScrollThumb.moveTo();
		for (let i = 0; i < 5; i++) {
			await ScrollerPage.pageDown();
			await ScrollerPage.delay(700);
		}
		// Step 4-2: Click Item 29
		await $('#item29').click();
		// Step 4-3: Press 5-way Up.
		await ScrollerPage.spotlightUp();

		// Step 4 Verify: Spotlight is on the Close (x) button. (x) button is replaced top bottom in this view.
		expect(await ScrollerPage.buttonTop.isFocused()).toBe(true);
	});
});
