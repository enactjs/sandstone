const Page = require('./PanelPage');

describe('Panel', function () {

	beforeEach(async function () {
		await Page.open();
	});

	async function waitForFocused (node, timeout, timeoutMsg = 'timed out waiting for focus', interval = 250) {
		await browser.waitUntil(function () {
			return node.isFocused();
		}, {timeout, timeoutMsg, interval});
	}

	describe('focus management', () => {
		it('should focus header buttons when no focusable content exists', async () => {
			expect(await Page.panel1.nextButton.isFocused()).toBe(true);
		});

		it('should focus the first button in the body when navigating forward and `autoFocus="last-focused"` ', async () => {
			await Page.focus(Page.panel1.nextButton);
			await Page.spotlightSelect();

			await Page.panel2.waitForEnter();

			const expected = 'Panel2 Button 1';
			const actual = Page.focusedText;

			expect(await actual).toBe(expected);
		});

		it('should restore focus when navigating backward and `autoFocus="last-focused"`', async () => {
			await Page.open('?defaultIndex=1');

			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightRight();

			await waitForFocused(Page.panel2.nextButton);

			await Page.spotlightSelect();

			await Page.panel3.waitForEnter();

			await Page.focus(Page.panel3.prevButton);
			await Page.spotlightSelect();

			await Page.panel2.waitForEnter();

			await waitForFocused(Page.panel2.nextButton);
		});

		it('should focus `.spottable-default` within body when `autoFocus="default-element"` ', async () => {
			await Page.focus(Page.panel1.nextButton);
			await Page.spotlightSelect();

			await Page.panel2.waitForEnter();

			await Page.focus(Page.panel2.nextButton);
			await Page.spotlightSelect();

			await Page.panel3.waitForEnter();

			const expected = 'Panel3 Button 2';
			const actual = Page.focusedText;

			expect(await actual).toBe(expected);
		});

		it('should focus nothing when `autoFocus="none"` ', async () => {
			await Page.focus(Page.panel1.nextButton);
			await Page.spotlightSelect();

			await Page.panel2.waitForEnter();

			await Page.focus(Page.panel2.nextButton);
			await Page.spotlightSelect();

			await Page.panel3.waitForEnter();

			await Page.focus(Page.panel3.nextButton);
			await Page.spotlightSelect();

			await Page.panel4.waitForEnter();

			const expected = null;
			const actual = Page.focusedText;

			expect(await actual).toBe(expected);
		});

		it('should focus the first button when `hideChildren=false` ', async () => {
			await Page.open('?defaultIndex=3');

			await Page.focus(Page.panel4.nextButton);
			await Page.spotlightSelect();

			await Page.panel5.waitForEnter();

			const expected = 'Panel5 Button 1';
			const actual = Page.focusedText;

			expect(await actual).toBe(expected);
		});

		it('should focus the `default-element` when moving forward', async () => {
			await Page.open('?defaultIndex=4');

			await Page.focus(Page.panel5.nextButton);
			await Page.spotlightSelect();

			await Page.panel6.waitForEnter();

			const expected = 'Panel6 Button 2';
			const actual = Page.focusedText;

			expect(await actual).toBe(expected);
		});

		// this test passed manually but fails in automation because the 'last-focused' element
		// isn't preserved.
		it('should focus the `last-focused` when moving backward', async () => {
			await Page.open('?defaultIndex=5');

			await Page.spotlightRight();
			await Page.spotlightRight();

			await waitForFocused(Page.panel6.nextButton);

			await Page.spotlightSelect();

			await Page.panel7.waitForEnter();

			await Page.focus(Page.panel7.prevButton);
			await Page.spotlightSelect();

			await Page.panel6.waitForEnter();

			const expected = true;
			const actual = Page.panel6.nextButton.isFocused();

			expect(await actual).toBe(expected);
		});
	});

	describe('animation', () => {
		it('should reverse animation', async () => {
			await Page.focus(Page.panel1.nextButton);
			await Page.spotlightSelect();

			await Page.panel2.self.waitForExist();

			// brief delay to allow the animation to start
			await Page.delay(50);
			await browser.execute(() => window.setPanelIndex(0));

			await Page.panel2.self.waitForExist({reverse: true});

			const expected = true;
			const actual = Page.panel1.self.isDisplayedInViewport();

			expect(await actual).toBe(expected);
		});
	});
});
