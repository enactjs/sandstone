const {getFocusedText} = require('../../utils');
const Page = require('../PopupTabLayoutPage');

describe('default sampler', function () {

	beforeEach(async function () {
		await Page.open('NonAutoFocus');
	});

	describe('PopupTabLayout', function () {

		it('should return last focus with back key [QWTC-2523]', async function () {
			// Step 4: 5-way Right.
			await Page.spotlightRight();
			// Step 4 Verify: Spotlight is on the Tab Picture Modes in the Display Settings panel.

			// Step 5: 5-way Select.
			await Page.spotlightSelect();
			await Page.delay(500);
			// Step 5 Verify: Spotlight is on the Tab Vivid in the Picture Modes panel.
			expect(await browser.execute(getFocusedText)).to.equal('Vivid');

			// Step 6: Press Back key on MRCU.
			await Page.backKey();
			await Page.delay(500);
			// Step 6 Verify: Spotlight is on the Tab Picture Modes in the Display Settings panel.
			expect(await browser.execute(getFocusedText)).to.equal('Picture Modes');

			// Step 7: 5-way Down.
			await Page.spotlightDown();
			// Step 7 Verify: Spotlight is on the Tab Color Adjust in the Display Settings panel.
			expect(await browser.execute(getFocusedText)).to.equal('Color Adjust');

			// Step 8: 5-way Left.
			await Page.spotlightLeft();
			// Step 8 Verify: Spotlight is on the Left navigation Tab Display.
			expect(await browser.execute(getFocusedText)).to.equal('Display');

			// Step 9: 5-way Right.
			await Page.delay(200);
			await Page.spotlightRight();
			// Step 9 Verify: Spotlight is on the Tab Color Adjust in the Display Settings panel.
			expect(await browser.execute(getFocusedText)).to.equal('Color Adjust');
		});
	});
});
