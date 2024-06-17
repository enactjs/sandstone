const {getFocusedText} = require('../../utils');
const Page = require('../PopupTabLayoutPage');

describe('qa sampler', function () {

	beforeEach(async function () {
		await Page.open('WithButton');
	});

	describe('PopupTabLayout', function () {

		it('should have enough padding at bottom [QWTC-2410]', async function () {
			// Step  3: 5-way Spot the bottom button.
			await Page.spotlightRight();
			await Page.spotlightDown();
			await Page.spotlightDown();
			await Page.spotlightDown();
			expect(await browser.execute(getFocusedText)).toBe('button');

			// Step 3 Verify: There is enough padding between the last button and the Popup.
			expect(await Page.buttonPadding()).toBe(27);
		});
	});
});
