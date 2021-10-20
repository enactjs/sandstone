const Page = require('./FlexiblePopupPanelsPage');

describe('FlexiblePopupPanels', function () {
	const Interface = Page.flexiblePopupPanels;

	beforeEach(function () {
		Page.open();
	});

	describe('5-way', function () {
		it('should open FlexiblePopupPanels and navigate to Panel - [QWT-2143]', function () {
			expect(Interface.openButton.isFocused(), 'focus Open button').to.be.true();

			Page.spotlightSelect();

			Page.waitForFocused(Interface.singleItem);

			// verifies that focus enters the panel body by default
			Page.spotlightRight();

			Page.waitForFocused(Interface.nextButton, {targetName: 'next button'});

			Page.spotlightSelect();
			Interface.waitForPanelBody(2);

			// should retain focus on navigation buttons
			Page.waitForFocused(Interface.nextButton, {targetName: 'next button 2'});

			Page.spotlightLeft();
			Page.spotlightLeft();
			Page.waitForFocused(Interface.prevButton, {targetName: 'prev button'});

			Page.spotlightSelect();
			Interface.waitForPanelBody(1);

			// should retain focus on navigation buttons
			Page.waitForFocused(Interface.prevButton, {targetName: 'prev button 2'});
		});

		it('should respect Panel autoFocus setting - [QWT-2142]', function () {
			expect(Interface.openButton.isFocused(), 'focus Open button').to.be.true();

			Page.spotlightSelect();

			Page.waitForFocused(Interface.singleItem);

			Page.spotlightLeft();
			Page.spotlightSelect();
			Interface.waitForPanelBody(7);

			Page.waitForFocused($('#item2'), {targetName: 'item 2'});
		});
	});

	describe('Pointer', function () {
		it('should open FlexiblePopupPanels and navigate to Panel', function () {
			Page.waitTransitionEnd(1000, 'wait for FlexiblePopupPanels to open', () => {
				Interface.openButton.click();
			});

			Interface.waitForPanelBody(1);
			Page.delay(500);
			Interface.nextButton.click();
			Interface.waitForPanelBody(2);
			Page.delay(500);
			Interface.prevButton.click();
			Interface.waitForEnter(1);
		});

		it('should close when clicking below the panel', function () {
			Page.waitTransitionEnd(1000, 'wait for FlexiblePopupPanels to open', () => {
				Interface.openButton.click();
			});

			Interface.waitForPanelBody(1);
			Page.delay(500);
			Interface.clickBelowPopup();
			Interface.waitForClose();
		});
	});
});
