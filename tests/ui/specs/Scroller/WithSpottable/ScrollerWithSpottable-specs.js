const ScrollerPage = require('../ScrollerPage');

describe('Scroller', function () {

	beforeEach(async function () {
		await ScrollerPage.open('WithSpottable');
	});
	describe('with spottable', function () {

		it('should meet initial conditions', async function () {
			await ScrollerPage.open('WithSpottable');
			expect(await ScrollerPage.button1.isFocused()).toBe(true);
		});

		it('should set correct focus after Page Up [ENYO-6281]', async function () {
			// 5-way focus to "page 1 button" (the button is in the center of the screen)
			await ScrollerPage.spotlightLeft();
			// expect focus on 'Page 1 Button'
			expect(await ScrollerPage.button1.isFocused()).toBe(true);
			// 5-way "down" to set focus to "page 2 button" (the button is on the bottom edge of the screen)
			await ScrollerPage.spotlightDown();
			expect(await ScrollerPage.button2.isFocused()).toBe(true);
			// page Up
			await ScrollerPage.pageUp();
			await ScrollerPage.delay(1500);
			// expect focus to "page 1 button"
			expect(await ScrollerPage.button1.isFocused()).toBe(true);
		});
	});
});
