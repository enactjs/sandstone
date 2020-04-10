const Page = require('./FlexiblePopupPanelsPage');


describe('FixedPopupPanels', function () {
	const Interface = Page.components.flexiblePopupPanels;

	beforeEach(function () {
		Page.open();
	});

	describe('5-way', function () {
		it('should open FlexiblePopupPanels and navigate to Panel', function () {
			Interface.focusOpenButton();
			expect(Interface.openButton.isFocused(), 'focus Open button').to.be.true();
			Page.spotlightSelect();

			Interface.waitForTransition(1000, 'wait for FlexiblePopupPanels to open', () => {
				Interface.focusNextButton();
				expect(Interface.nextButton.isFocused(), 'focus Next button').to.be.true();
				Page.spotlightSelect();
			});

			Interface.waitForTransition(1000, 'navigate to the second Panel', () => {
				Interface.focusPrevButton();
				expect(Interface.prevButton.isFocused(), 'focus Prev button').to.be.true();
				Page.spotlightSelect();
			});
			Interface.waitForEnter(2);

			Interface.waitForTransition(1000, 'navigate back to the first Panel', () => {
				Interface.focusPrevButton();
				expect(Interface.prevButton.isFocused(), 'focus Prev button').to.be.true();
				Page.spotlightSelect();
			});
			Interface.waitForEnter(1);
		});
	});

	describe('Pointer', function () {
		it('should open FlexiblePopupPanels and navigate to Panel', function () {
			Interface.openButton.click();
			Interface.waitForEnter(1);

			Interface.waitForTransition(1000, 'navigate to the second Panel', Interface.nextButton.click());
			Interface.waitForEnter(2);

			Interface.waitForTransition(1000, 'navigate back to the first Panel', Interface.prevButton.click());
			Interface.waitForEnter(1);
		});
	});
});
