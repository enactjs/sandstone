const Page = require('./PanelPage');

describe('Panel', function () {

	beforeEach(function () {
		Page.open();
	});

	function waitForFocused (node, timeout, message = 'timed out waiting for focus', delay = 250) {
		browser.waitUntil(function () {
			return node.isFocused();
		}, timeout, message, delay);
	}

	describe('focus management', () => {
		it('should focus header buttons when no focusable content exists', () => {
			expect(Page.panel1.nextButton.isFocused()).to.be.true();
		});

		it('should focus the first button in the body when navigating forward and `autoFocus="last-focused"` ', () => {
			Page.focus(Page.panel1.nextButton);
			Page.spotlightSelect();

			Page.panel2.waitForEnter();
			Page.delay(1000);

			const expected = 'Panel2 Button 1';
			const actual = Page.focusedText;

			expect(actual).to.equal(expected);
		});

		// this test passed manually but fails in automation because the 'last-focused' element
		// isn't preserved.
		it.skip('should restore focus when navigating backward and `autoFocus="last-focused"`', () => {
			Page.focus(Page.panel1.nextButton);
			Page.spotlightSelect();

			Page.panel2.waitForEnter();

			Page.focus(Page.panel2.nextButton);
			Page.spotlightSelect();

			Page.panel3.waitForEnter();

			Page.focus(Page.panel3.prevButton);
			Page.spotlightSelect();

			Page.panel2.waitForEnter();

			waitForFocused(Page.panel2.nextButton);
		});

		it('should focus `.spottable-default` within body when `autoFocus="default-element"` ', () => {
			Page.focus(Page.panel1.nextButton);
			Page.spotlightSelect();

			Page.panel2.waitForEnter();

			Page.focus(Page.panel2.nextButton);
			Page.spotlightSelect();

			Page.panel3.waitForEnter();

			const expected = 'Panel3 Button 2';
			const actual = Page.focusedText;

			expect(actual).to.equal(expected);
		});

		it('should focus nothing when `autoFocus="none"` ', () => {
			Page.focus(Page.panel1.nextButton);
			Page.spotlightSelect();

			Page.panel2.waitForEnter();

			Page.focus(Page.panel2.nextButton);
			Page.spotlightSelect();

			Page.panel3.waitForEnter();

			Page.focus(Page.panel3.nextButton);
			Page.spotlightSelect();

			Page.panel4.waitForEnter();

			const expected = null;
			const actual = Page.focusedText;

			expect(actual).to.equal(expected);
		});

		// this fails because Panel's spotOnRender fires while the previous Panel's next button
		// still has focus.
		it.skip('should focus the first button when `hideChildren=false` ', () => {
			Page.focus(Page.panel1.nextButton);
			Page.spotlightSelect();

			Page.panel2.waitForEnter();

			Page.focus(Page.panel2.nextButton);
			Page.spotlightSelect();

			Page.panel3.waitForEnter();

			Page.focus(Page.panel3.nextButton);
			Page.spotlightSelect();

			Page.panel4.waitForEnter();

			Page.focus(Page.panel4.nextButton);
			Page.spotlightSelect();

			Page.panel5.waitForEnter();

			const expected = 'Panel5 Button 1';
			const actual = Page.focusedText;

			expect(actual).to.equal(expected);
		});
	});
});
