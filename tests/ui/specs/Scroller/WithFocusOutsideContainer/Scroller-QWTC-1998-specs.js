const ScrollerPage = require('../ScrollerPage');

describe('Scroller', function () {
	describe('5-way LTR', function () {
		beforeEach(async function () {
			await ScrollerPage.open('WithFocusOutsideContainer');
		});

		it('should spotlight an outside of container element with native scrollMode [QWTC-1998]', async function () {
			// Step 3: Spot one of the buttons (items) and 5-way left to 'focus to me' button
			await ScrollerPage.spotlightRight();
			await ScrollerPage.spotlightLeft();
			// Step 3 Verify: Spotlight is on 'focus to me' button
			const focusToMeButton = await $('#focusButton');
			expect(await focusToMeButton.isFocused()).toBe(true);
		});
	});

	describe('5-way RTL', function () {
		beforeEach(async function () {
			await ScrollerPage.open('WithFocusOutsideContainer', '?locale=ar-SA');
		});

		it('should spotlight an outside of container element with native scrollMode', async function () {
			// Spot one of the buttons (items) and 5-way right to 'focus to me' button
			await ScrollerPage.spotlightLeft();
			await ScrollerPage.spotlightRight();
			// Spotlight is on 'focus to me' button
			const focusToMeButton = await $('#focusButton');
			expect(await focusToMeButton.isFocused()).toBe(true);
		});
	});
});
