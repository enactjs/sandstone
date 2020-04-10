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

			Interface.waitForLeave(1);
			expect(Interface.panel2.isExisting(), 'navigate to the second Panel').to.be.true();

			Interface.focusPrevButton();
			Page.spotlightSelect();

			Interface.waitForLeave(2);
			expect(Interface.panel1.isExisting(), 'navigate back to the first Panel').to.be.true();
		});
	});

	describe('Pointer', function () {
		it('should open FlexiblePopupPanels and navigate to Panel', function () {
			browser.moveToElement(Interface.openButton.ELEMENT);
			expect(Interface.openButton.isFocused(), 'focus Open button').to.be.true();
			Interface.openButton.click();
			Interface.waitForOpen();

			browser.moveToElement(Interface.nextButton.ELEMENT);
			expect(Interface.nextButton.isFocused(), 'focus Next button').to.be.true();
			Interface.nextButton.click();

			Interface.waitForLeave(1);
			expect(Interface.panel2.isExisting(), 'navigate to the second Panel').to.be.true();

			browser.moveToElement(Interface.prevButton.ELEMENT);
			Interface.prevButton.click();

			Interface.waitForLeave(2);
			expect(Interface.panel1.isExisting(), 'navigate back to the first Panel').to.be.true();
		});
	});
});
