const Page = require('../PopupTabLayoutPage');
const {getFocusedText} = require('../../utils');

describe('qa sampler', function () {
	const {popupTabLayout} = Page.components;

	beforeEach(async function () {
		await Page.open('WithVariousItems');
	});

	describe('PopupTabLayout', function () {
		it('should navigate with left and right key [QWTC-2641]', async function () {
			// Step 3: Hover on Color Adjust inside Display Settings and 5-way right
			await $('#colorAdjust').moveTo();
			await Page.spotlightRight();
			// Step 3 Verify: The Panel Color Adjust displays and tabs are collapsed
			expect(await popupTabLayout.currentView.getAttribute('id')).toBe('display');
			await Page.delay(500);
			expect(await popupTabLayout.isCollapsed).toBe(true);

			// Step 4: Hover on the help button '?' and 5-way left two times
			const helpButton = await popupTabLayout.helpButton();
			await helpButton.moveTo();
			await Page.spotlightLeft();
			await Page.spotlightLeft();
			// Step 4 Verify: Spotlight moves to the back button and stays at the back button
			const backButton = await popupTabLayout.backButton();
			expect(await backButton.isFocused()).toBe(true);

			// Step 5: Hover on the collapsed tabs on the left
			await popupTabLayout.collapsedTabs.moveTo();
			// Wait for tabs to expand
			await Page.delay(500);
			await popupTabLayout.tabs.moveTo({xOffset: 20, yOffset: 20});
			// Step 5 Verify: Spotlight is on the Tab 'Display' and the tabs are expanded
			expect(await browser.execute(getFocusedText)).toBe('Display');
			expect(await popupTabLayout.isCollapsed).toBe(false);

			// Step 6: Hover on 'Button 3' button and press 5-way left two times
			await $('#button3').moveTo();
			await Page.spotlightLeft();
			await Page.spotlightLeft();
			await Page.delay(500);

			// Step 6 Verify: The previous panel 'Display Settings' is showing
			expect(await popupTabLayout.currentView.getAttribute('id')).toBe('display');
		});
	});
});
