const ScrollerPage = require('../ScrollerPage');

describe('Scroller List Of Things', function () {
	beforeEach(function () {
		ScrollerPage.open('ListOfThings');
	});

	it('should spotlight on x closing button with spotlight disabled [QWT-2516]', function () {
		// Step 3: Knobs > Scroller > spotlightDisabled > check
		ScrollerPage.buttonSpotlightDisabled.moveTo();
		ScrollerPage.spotlightSelect();

		// Step 4-1: Wheel Down on the items. Wheel action is replaced PageDown key in this test.
		ScrollerPage.verticalScrollThumb.moveTo();
		for (let i = 0; i < 5; i++) {
			ScrollerPage.pageDown();
			ScrollerPage.delay(700);
		}
		// Step 4-2: Click Item 29
		$('#item29').click();
		// Step 4-3: Press 5-way Up.
		ScrollerPage.spotlightUp();

		// Step 4 Verify: Spotlight is on the Close (x) button. (x) button is replaced top botton in this view.
		expect(ScrollerPage.buttonTop.isFocused()).to.be.true();
	});
});
