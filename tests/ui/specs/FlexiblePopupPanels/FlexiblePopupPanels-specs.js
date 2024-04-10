const Page = require('./FlexiblePopupPanelsPage');

describe('FlexiblePopupPanels', function () {
	const Interface = Page.flexiblePopupPanels;

	beforeEach(async function () {
		await Page.open();
	});

	describe('5-way', function () {
		it('should open FlexiblePopupPanels and navigate to Panel - [QWTC-2506]', async function () {
			expect(await Interface.openButton.isFocused()).toBe(true);

			await Page.spotlightSelect();

			await Page.waitForFocused(Interface.singleItem);

			// verifies that focus enters the panel body by default
			await Page.spotlightRight();

			await Page.waitForFocused(Interface.nextButton, {targetName: 'next button'});

			await Page.spotlightSelect();
			await Interface.waitForPanelBody(2);

			// should retain focus on navigation buttons
			await Page.waitForFocused(Interface.nextButton, {targetName: 'next button 2'});

			await Page.spotlightLeft();
			await Page.spotlightLeft();
			await Page.waitForFocused(Interface.prevButton, {targetName: 'prev button'});

			await Page.spotlightSelect();
			await Interface.waitForPanelBody(1);

			// should retain focus on navigation buttons
			await Page.waitForFocused(Interface.prevButton, {targetName: 'prev button 2'});
		});

		it('should respect Panel autoFocus setting - [QWTC-2507]', async function () {
			expect(await Interface.openButton.isFocused()).toBe(true);

			await Page.spotlightSelect();

			await Page.waitForFocused(Interface.singleItem);

			await Page.spotlightLeft();
			await Page.spotlightSelect();
			await Interface.waitForPanelBody(7);

			await Page.waitForFocused($('#item2'), {targetName: 'item 2'});
		});
	});

	describe('Pointer', function () {
		it('should open FlexiblePopupPanels and navigate to Panel', async function () {
			await Page.waitTransitionEnd(1000, 'wait for FlexiblePopupPanels to open', async () => {
				await Interface.openButton.click();
			});

			await Interface.waitForPanelBody(1);
			await Page.delay(500);
			await Interface.nextButton.click();
			await Interface.waitForPanelBody(2);
			await Page.delay(500);
			await Interface.prevButton.click();
			await Interface.waitForEnter(1);
		});

		it('should close when clicking below the panel', async function () {
			await Page.waitTransitionEnd(1000, 'wait for FlexiblePopupPanels to open', async () => {
				await Interface.openButton.click();
			});

			await Interface.waitForPanelBody(1);
			await Page.delay(500);
			await Interface.clickBelowPopup();
			await Interface.waitForClose();
		});
	});
});
