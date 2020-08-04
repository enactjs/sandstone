const Page = require('./PanelPage');

describe('Panel', function () {

	beforeEach(function () {
		Page.open();
	});

	function waitForFocused (node, timeout, timeoutMsg = 'timed out waiting for focus', interval = 250) {
		browser.waitUntil(function () {
			return node.isFocused();
		}, {timeout, timeoutMsg, interval});
	}

	describe('focus management', () => {
		it('should focus header buttons when no focusable content exists', () => {
			expect(Page.panel1.nextButton.isFocused()).to.be.true();
		});

		it('should focus the first button in the body when navigating forward and `autoFocus="last-focused"` ', () => {
			Page.focus(Page.panel1.nextButton);
			Page.spotlightSelect();

			Page.panel2.waitForEnter();

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

		it('should focus the first button when `hideChildren=false` ', () => {
			Page.open('?defaultIndex=3');

			Page.focus(Page.panel4.nextButton);
			Page.spotlightSelect();

			Page.panel5.waitForEnter();

			const expected = 'Panel5 Button 1';
			const actual = Page.focusedText;

			expect(actual).to.equal(expected);
		});

		it('should focus the `default-element` when moving forward', () => {
			Page.open('?defaultIndex=4');

			Page.focus(Page.panel5.nextButton);
			Page.spotlightSelect();

			Page.panel6.waitForEnter();

			const expected = 'Panel6 Button 2';
			const actual = Page.focusedText;

			expect(actual).to.equal(expected);
		});

		// this test passed manually but fails in automation because the 'last-focused' element
		// isn't preserved.
		it.skip('should focus the `last-focused` when moving backward', () => {
			Page.open('?defaultIndex=5');

			Page.focus(Page.panel6.nextButton);
			Page.spotlightSelect();

			Page.panel7.waitForEnter();

			Page.focus(Page.panel7.prevButton);
			Page.spotlightSelect();

			Page.panel6.waitForEnter();

			const expected = true;
			const actual = Page.panel6.prevButton.isFocused();

			expect(actual).to.equal(expected);
		});
	});
});
