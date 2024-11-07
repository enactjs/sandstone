const {getFocusedText} = require('../../utils');
const Page = require('../PopupTabLayoutPage');

describe('PopupTabLayout', function () {

	const {
		popupTabLayout
	} = Page.components;

	describe('default sampler', function () {

		beforeEach(async function () {
			await Page.open('NonAutoFocus');
		});

		describe('PopupTabLayout', function () {

			it('should navigate list of item in popuptablayout [QWTC-2415]', async function () {
				// Step 4: Click Color Adjust inside the Display Settings Popup.
				await $('#colorAdjust').click();
				await Page.delay(500);
				// Step 4 Verify: The Panel Picture Modes displays.
				expect(await popupTabLayout.currentView.getAttribute('id')).toBe('display');

				// Step 5-1: Position the Pointer inside the Picture Modes panel and 5-way Right to change to 5-way mode.
				const panelSize = await $('#display').getSize();
				await $('#display').moveTo({xOffset: panelSize.width / 2 - 1, yOffset: -panelSize.height / 2});
				await Page.spotlightRight();
				// Step 5-1 Verify: Spotlight is on the 'back' button
				expect(await Page.getAriaLabel()).toBe('go to previous');
				// Step 5-2: PRess -5way Right again.
				await Page.spotlightRight();
				// Step 5-2 Verify: Spotlight is on the text "Vivid"
				expect(await browser.execute(getFocusedText)).toBe('Vivid');

				// Step 6: 5-way Down/Up on the items inside Pciture Modes.
				// Step 6-1 Verify: List of items can be navigated inside the Scroller in Picture Modes
				// Step 6-2 Verify: Spotlight goes Down/Up on the items.
				await Page.spotlightDown();
				expect(await browser.execute(getFocusedText)).toBe('Standard');
				await Page.spotlightDown();
				expect(await browser.execute(getFocusedText)).toBe('Game');
				await Page.spotlightUp();
				expect(await browser.execute(getFocusedText)).toBe('Standard');
				await Page.spotlightUp();
				expect(await browser.execute(getFocusedText)).toBe('Vivid');
			});
		});
	});
});
