const {getFocusedText} = require('../../utils');
const Page = require('../PopupTabLayoutPage');

describe('default sampler', function () {

	beforeEach(async function () {
		await Page.open('NonAutoFocus');
	});

	describe('PopupTabLayout', function () {

		it('should return last focus with 5way key [QWTC-2522]', async function () {
			// Step 4: 5-way Right.
			await Page.spotlightRight();
			// Step 4 Verify: Spotlight is on the Tab Picture Modes in the Display Settings panel.
			expect(await browser.execute(getFocusedText)).toBe('Picture Modes');

			// Step 5: 5-way Down.
			await Page.spotlightDown();
			// Step 5 Verify: Spotlight is on the Tab Color Adjust in the Display Settings panel.
			expect(await browser.execute(getFocusedText)).toBe('Color Adjust');

			// Step 6: 5-way Left.
			await Page.spotlightLeft();
			// Step 6 Verify: Spotlight is on the Left navigation Tab Display.
			expect(await browser.execute(getFocusedText)).toBe('Display');

			// Step 7: 5-way Right.
			await Page.spotlightRight();
			// Step 7 Verify: Spotlight is on the Tab Color Adjust in the Display Settings panel.
			expect(await browser.execute(getFocusedText)).toBe('Color Adjust');
		});
	});
});
