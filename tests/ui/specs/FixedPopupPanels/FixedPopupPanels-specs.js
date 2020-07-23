/* global document */

const Page = require('./FixedPopupPanelsPage');


describe('FixedPopupPanels', function () {
	const Interface = Page.fixedPopupPanels;

	describe('5-way', function () {
		it('should open FixedPopupPanels and navigate to Panel', function () {
			Page.open();

			expect(Interface.openButton.isFocused(), 'focus Open button').to.be.true();

			Page.waitTransitionEnd(1000, 'wait for FixedPopupPanels to open', () => {
				Page.spotlightSelect();
			});

			expect(Interface.item1.isFocused(), 'focus item1 button').to.be.true();

			Interface.waitForEnter(2, () => {
				Page.spotlightSelect();
			});

			Interface.waitForEnter(1, () => {
				Page.backKey();
			});

			Page.backKey();
			Interface.waitForClose();
		});

		it('should not duplicate 5-way actions', function () {
			// using special configuration to allow spotlight to escape the popup if the test fails
			Page.open('?scrimType="none"&spotlightRestrict="self-only"');

			expect(Interface.openButton.isFocused(), 'focus Open button').to.be.true();

			Page.waitTransitionEnd(1000, 'wait for FixedPopupPanels to open', () => {
				Page.spotlightSelect();
			});

			// focus the right picker button
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightRight();

			// try to focus the left picker button
			Page.spotlightLeft();

			const pickerContainsFocused = browser.execute(
				picker => picker.contains(document.activeElement),
				$('[data-id="picker"]')
			);

			// Focus should remain in the picker 
			expect(pickerContainsFocused, 'Picker is focused').to.be.true();
		});

		it('should not allow 5-way navigation out and remain open when spotlightRestrict="self-only" and scrim="none"', function () {
			Page.open('?scrimType="none"&spotlightRestrict="self-only"');

			expect(Interface.openButton.isFocused(), 'focus Open button').to.be.true();

			Page.waitTransitionEnd(1000, 'wait for FixedPopupPanels to open', () => {
				Page.spotlightSelect();
			});

			Page.spotlightLeft();

			expect(Interface.item1.isFocused(), 'focus Item 1').to.be.true();
		});

		it('should allow 5-way navigation out and remain open when spotlightRestrict="self-first" and scrim="none"', function () {
			Page.open('?scrimType="none"&spotlightRestrict="self-first"');

			expect(Interface.openButton.isFocused(), 'focus Open button').to.be.true();

			Page.waitTransitionEnd(1000, 'wait for FixedPopupPanels to open', () => {
				Page.spotlightSelect();
			});

			Page.spotlightLeft();

			expect(Interface.openButton.isFocused(), 'focus Open button').to.be.true();

			// verify the popup remains open
			Interface.waitForOpen();
		});
	});

	describe('Pointer', function () {

		beforeEach(function () {
			Page.open();
		});

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
