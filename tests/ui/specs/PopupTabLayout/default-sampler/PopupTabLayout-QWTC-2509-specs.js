const {getFocusedText} = require('../../utils');
const Page = require('../PopupTabLayoutPage');

describe('default sampler', function () {

	beforeEach(async function () {
		await Page.open('NonAutoFocus');
	});

	describe('PopupTabLayout', function () {

		it('should stay spotlight within the popup [QWTC-2509]', async function () {
			// Step 3-2: 5-wayu Right to Pcitures Modes.
			await Page.spotlightRight();
			// Step 3-2 Verify: Spotlight is on Pictures Modes.
			expect(await browser.execute(getFocusedText)).toBe('Picture Modes');
			// Step 4: 5-way Up.
			await Page.spotlightUp();
			// Step 4 Verify: Spotlight stays on Pictures Modes
			expect(await browser.execute(getFocusedText)).toBe('Picture Modes');
		});
	});
});
