const Page = require('../PopupTabLayoutPage');
const {getFocusedText} = require('../../utils');

describe('qa-sampler', function () {
	const {popupTabLayout} = Page.components;

	beforeEach(async function () {
		await Page.open('WithVariousItems', '?locale=ar-SA');
	});

	describe('PopupTabLayout', function () {
		it('should not navigate with left and right key in RTL - [QWTC-2649]', async function () {
			// Step 4: Hover on Color Adjust inside Display Settings and 5-way right
			await $('#colorAdjust').moveTo();
			await Page.spotlightRight();
			// Step 4 Verify: Spotlight stays at Color Adjust >
			expect(await browser.execute(getFocusedText)).toBe('Color Adjust');

			// Step 5: Hover on Color Adjust inside Display Settings and 5-was select
			await $('#colorAdjust').moveTo();
			await Page.spotlightSelect();
			// Step 5 Verify: The next panel Color Adjust is showing and tabs are collapsed
			expect(await popupTabLayout.currentView.getAttribute('id')).toBe('display');
			await Page.delay(500);
			expect(await popupTabLayout.isCollapsed).toBe(true);

			// Step 6: Hover on the help button '?' and 5-way right two times
			const helpButton = await popupTabLayout.helpButton();
			await helpButton.moveTo();
			await Page.spotlightRight();
			await Page.spotlightRight();
			// Step 6 Verify: Spotlight moves to the back button and stays at the back button
			const backButton = await popupTabLayout.backButton();
			expect(await backButton.isFocused()).toBe(true);

			// Step 7: Hove on the help button '?' and 5-way left
			await helpButton.moveTo({xOffset: 0, yOffset: 0});
			await Page.spotlightLeft();
			// Step 7 Verify: Spotlight is on the Tab 'Display' and tabs are expanded
			await Page.delay(500);
			expect(await browser.execute(getFocusedText)).toBe('Display');
			expect(await popupTabLayout.isCollapsed).toBe(false);
		});
	});
});
