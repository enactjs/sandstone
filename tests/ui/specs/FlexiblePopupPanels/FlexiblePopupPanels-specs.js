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
			Interface.waitForOpen();

			Interface.focusNextButton();
			expect(Interface.nextButton.isFocused(), 'focus Next button').to.be.true();
			Page.spotlightSelect();

			Interface.waitForEnter(2);
			expect(Interface.panel2.isExisting(), 'navigate to the second Panel').to.be.true();

			Interface.focusPrevButton();
			Page.spotlightSelect();

			Interface.waitForEnter(1);
			expect(Interface.panel1.isExisting(), 'navigate back to the first Panel').to.be.true();
		});
	});

	describe('Pointer', function () {
		it('should open FlexiblePopupPanels and navigate to Panel', function () {
			Interface.openButton.click();
			Interface.waitForEnter(1);

			Interface.waitForTransition(Interface.nextButton.click());
			Interface.waitForEnter(2);
			expect(Interface.panel2.isExisting(), 'navigate to the second Panel').to.be.true();

			Interface.waitForTransition(Interface.prevButton.click());
			Interface.waitForEnter(1);
			expect(Interface.panel1.isExisting(), 'navigate back to the first Panel').to.be.true();
		});
	});
});
