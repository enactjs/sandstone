const Page = require('./FixedPopupPanelsPage');


describe('FixedPopupPanels', function () {
	const Interface = Page.fixedPopupPanels;

	beforeEach(function () {
		Page.open();
	});

	describe('5-way', function () {
		it('should open FixedPopupPanels and navigate to Panel', function () {
			expect(Interface.openButton.isFocused(), 'focus Open button').to.be.true();

			Page.waitTransitionEnd(1000, 'wait for FixedPopupPanels to open', () => {
				Page.spotlightSelect();
			});

			Interface.waitForFocused(Interface.item1, 100, 'item1 focus');

			Interface.waitForEnter(2, () => {
				Page.spotlightSelect();
			});

			Interface.waitForEnter(1, () => {
				Page.backKey();
			});

			Page.backKey();
			Interface.waitForClose();
		});
	});

	describe('Pointer', function () {
		it('should open FixedPopupPanels and navigate to Panel', function () {
			Page.waitTransitionEnd(1000, 'wait for FixedPopupPanels to open', () => {
				Interface.openButton.click();
			});

			Interface.waitForEnter(2, () => {
				Interface.item1.click();
			});
			// TODO: Hover and click back button
		});

		it('should close when clicking below the panel', function () {
			Page.waitTransitionEnd(1000, 'wait for FixedPopupPanels to open', () => {
				Interface.openButton.click();
			});

			// Target a clickable element, offset down below visible area of popup
			Interface.clickBelowPopup();
			Interface.waitForClose();
		});
	});
});
