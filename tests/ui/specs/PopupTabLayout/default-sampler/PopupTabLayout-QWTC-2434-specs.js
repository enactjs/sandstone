const {getFocusedText} = require('../../utils');
const Page = require('../PopupTabLayoutPage');

describe('default sampler', function () {

	beforeEach(async function () {
		await Page.open('NonAutoFocus');
	});

	describe('PopupTabLayout', function () {

		it('should display spotlight on panel [QWTC-2434]', async function () {
			// Step 4: 5-way Spot and 5-way Select Picture Modes under Display Settings.
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await Page.delay(500);
			// Step 4 Verify: Spotlight is on the Tab Vivid under Picture Modes.
			expect(await browser.execute(getFocusedText)).toBe('Vivid');
		});
	});
});
