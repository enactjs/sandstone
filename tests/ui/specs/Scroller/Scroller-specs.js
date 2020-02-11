
const ScrollerPage = require('./ScrollerPage');

describe('Scroller', function () {

	beforeEach(function () {
		ScrollerPage.open();
	});

	it('should meet initial conditions', function () {
		ScrollerPage.open();
		expect(ScrollerPage .button1.hasFocus(), 'Button 1 has focus initially').to.be.true();
	});

	it('should set correct focus after Page Up [ENYO-6281]', function () {
		// 5-way focus to "page 1 button" (the button is in the center of the screen)
		ScrollerPage.spotlightRight();
		// expect focus on 'Page 1 Button'
		expect(ScrollerPage.button1.hasFocus(), 'button 1 has focus').to.be.true();
		// 5-way "down" to set focus to "page 2 button" (the button is on the bottom edge of the screen)
		ScrollerPage.spotlightDown();
		expect(ScrollerPage.button2.hasFocus(), 'button 2 has focus').to.be.true();
		// page Up
		ScrollerPage.pageUp();
		ScrollerPage.delay(1500);
		// expect focus to "page 1 button"
		expect(ScrollerPage.button1.hasFocus(), 'button 1 has focus again').to.be.true();
	});
});
