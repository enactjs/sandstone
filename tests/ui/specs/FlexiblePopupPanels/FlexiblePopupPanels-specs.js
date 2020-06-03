const Page = require('./FlexiblePopupPanelsPage');


describe('FlexiblePopupPanels', function () {
	const Interface = Page.components.flexiblePopupPanels;

	beforeEach(function () {
		Page.open();
	});

	describe('5-way', function () {
		it('should open FlexiblePopupPanels and navigate to Panel', function () {
			expect(Interface.openButton.isFocused(), 'focus Open button').to.be.true();

			Page.waitTransitionEnd(1000, 'wait for FlexiblePopupPanels to open', () => {
				Page.spotlightSelect();
			});
			Page.spotlightRight();
			Page.spotlightRight();

			expect(Interface.nextButton.isFocused(), 'focus Next button').to.be.true();

			Page.spotlightSelect();
			Interface.waitForPanelBody(2);

			expect(Interface.prevButton.isFocused(), 'focus Prev button').to.be.true();

			Page.spotlightSelect();
			Interface.waitForEnter(1);
		});
	});

	describe('Pointer', function () {
		it('should open FlexiblePopupPanels and navigate to Panel', function () {
			Page.waitTransitionEnd(1000, 'wait for FlexiblePopupPanels to open', () => {
				Interface.openButton.click();
			});

			Interface.waitForPanelBody(1);
			Interface.nextButton.click();
			Interface.waitForPanelBody(2);
			Interface.prevButton.click();
			Interface.waitForEnter(1);
		});
	});
});
