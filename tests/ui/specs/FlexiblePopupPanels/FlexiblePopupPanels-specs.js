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

			// Looks like the button doesn't get focus quick enough so sometimes one of the spotlight
			// rights is lost.
			Interface.waitForFocused(Interface.prevButton);

			Page.spotlightRight();
			Page.spotlightRight();

			expect(Interface.nextButton.isFocused(), 'focus Next button').to.be.true();

			Page.waitTransitionEnd(1000, 'wait for second panel to open', () => {
				Page.spotlightSelect();
			});
			Interface.waitForPanelBody(2);

			// should retain focus on navigation buttons
			expect(Interface.nextButton.isFocused(), 'focus Next button 2').to.be.true();

			Page.spotlightLeft();
			Page.spotlightLeft();

			expect(Interface.prevButton.isFocused(), 'focus Prev button').to.be.true();

			Page.waitTransitionEnd(1000, 'wait for first panel to open', () => {
				Page.spotlightSelect();
			});
			Interface.waitForPanelBody(1);

			// should retain focus on navigation buttons
			expect(Interface.prevButton.isFocused(), 'focus Prev button 2').to.be.true();
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
			Page.waitTransitionEnd(1000, 'wait for second panel to open', () => {
				Interface.nextButton.click();
			});
			Interface.waitForPanelBody(2);

			Page.waitTransitionEnd(1000, 'wait for first panel to open', () => {
				Interface.prevButton.click();
			});
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
