const Page = require('./FlexiblePopupPanelsPage');

function getFocusedText () {
	return browser.execute(() => {
		return document.activeElement === document.body ? null : document.activeElement.textContent;
	});
}

describe('FlexiblePopupPanels', function () {
	const Interface = Page.flexiblePopupPanels;

	beforeEach(function () {
		Page.open();
	});

	describe('5-way', function () {
		it('should open FlexiblePopupPanels and navigate to Panel', function () {
			expect(Interface.openButton.isFocused(), 'focus Open button').to.be.true();

			Page.spotlightSelect();

			Page.waitForFocus(Interface.singleItem);

			// verifies that focus enters the panel body by default
			Page.spotlightRight();

			expect(Interface.nextButton.isFocused(), 'focus Next button').to.be.true();

			Page.spotlightSelect();
			Interface.waitForPanelBody(2);

			// should retain focus on navigation buttons - [GT-32184]
			expect(Interface.nextButton.isFocused(), 'focus Next button 2').to.be.true();

			Page.spotlightLeft();
			Page.spotlightLeft();
			expect(Interface.prevButton.isFocused(), 'focus Prev button').to.be.true();

			Page.spotlightSelect();
			Interface.waitForPanelBody(1);

			// should retain focus on navigation buttons - [GT-32184]
			expect(Interface.prevButton.isFocused(), 'focus Prev button 2').to.be.true();
		});

		// [GT-32185]
		it('should respect Panel autoFocus setting', function () {
			expect(Interface.openButton.isFocused(), 'focus Open button').to.be.true();

			Page.spotlightSelect();

			Page.waitForFocus(Interface.singleItem);

			Page.spotlightLeft();
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
