const Page = require('./FlexiblePopupPanelsPage');


describe('FlexiblePopupPanels', function () {
	const Interface = Page.flexiblePopupPanels;

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

			// should retain focus on navigation buttons
			expect(Interface.nextButton.isFocused(), 'focus Next button').to.be.true();

			Page.spotlightLeft();
			Page.spotlightLeft();

			expect(Interface.prevButton.isFocused(), 'focus Prev button').to.be.true();

			Page.spotlightSelect();
			Interface.waitForPanelBody(1);

			// should retain focus on navigation buttons
			expect(Interface.prevButton.isFocused(), 'focus Prev button').to.be.true();
		});

		it('should respect Panel autoFocus setting', function () {
			expect(Interface.openButton.isFocused(), 'focus Open button').to.be.true();

			Page.waitTransitionEnd(1000, 'wait for FlexiblePopupPanels to open', () => {
				Page.spotlightSelect();
			});

			expect(Interface.prevButton.isFocused(), 'focus Prev button').to.be.true();

			Page.spotlightSelect();
			Interface.waitForPanelBody(7);

			expect($('#item2').isFocused(), 'focus Item 2').to.be.true();
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

		it('should close when clicking below the panel', function () {
			Page.waitTransitionEnd(1000, 'wait for FlexiblePopupPanels to open', () => {
				Interface.openButton.click();
			});

			Interface.waitForPanelBody(1);

			Interface.clickBelowPopup();
			Interface.waitForClose();
		});
	});
});
