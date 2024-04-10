const {getFocusedText} = require('../utils');

const Page = require('./FixedPopupPanelsPage');

describe('FixedPopupPanels', function () {
	const Interface = Page.fixedPopupPanels;

	describe('5-way', function () {
		it('should open FixedPopupPanels and navigate to Panel', async function () {
			await Page.open();

			expect(await Interface.openButton.isFocused()).toBe(true);

			await Page.spotlightSelect();

			await Page.waitForFocused(Interface.item1);

			await Interface.waitForEnter(2, async () => {
				await Page.spotlightSelect();
			});

			await Interface.waitForEnter(1, async () => {
				await Page.backKey();
			});

			await Page.backKey();
			await Interface.waitForClose();
		});

		it('should navigate to the previous panel with left key on an Item', async function () {
			await Page.open();

			expect(await Interface.openButton.isFocused()).toBe(true);

			await Page.spotlightSelect();

			await Page.waitForFocused(Interface.item1);

			await Interface.waitForEnter(2, async () => {
				await Page.spotlightSelect();
			});

			await Interface.waitForEnter(1, async () => {
				await Page.spotlightLeft();
			});

			await Page.backKey();
			await Interface.waitForClose();
		});

		it('should not go to the previous panel with left key on the back button', async function () {
			await Page.open();

			expect(await Interface.openButton.isFocused()).toBe(true);

			await Page.spotlightSelect();
			await Page.delay(500);

			await Page.waitForFocused(Interface.item1);

			await Interface.waitForEnter(2, async () => {
				await Page.spotlightSelect();
			});
			await Page.delay(1000);

			await Page.spotlightUp();
			await Page.delay(500);
			await Page.spotlightLeft();
			await Page.delay(500);

			await Page.spotlightDown();
			await Page.delay(500);

			const expected = 'Example Item 1 on Panel 2';
			const actual = browser.execute(getFocusedText);

			expect(await actual).toBe(expected);
		});

		it('should not duplicate 5-way actions', async function () {
			// using special configuration to allow spotlight to escape the popup if the test fails
			await Page.open('?scrimType="none"&spotlightRestrict="self-only"');

			expect(await Interface.openButton.isFocused()).toBe(true);

			await Page.spotlightSelect();

			await Page.waitForFocused(Interface.item1);

			// focus the right picker button
			await Page.spotlightDown();
			await Page.spotlightDown();
			await Page.spotlightDown();
			await Page.spotlightRight();

			// try to focus the left picker button
			await Page.spotlightLeft();

			const pickerContainsFocused = browser.execute(
				picker => picker.contains(document.activeElement),
				await $('[data-id="picker"]')
			);

			// Focus should remain in the picker
			expect(await pickerContainsFocused).toBe(true);
		});

		it('should not allow 5-way navigation out and remain open when spotlightRestrict="self-only" and scrim="none"', async function () {
			await Page.open('?scrimType="none"&spotlightRestrict="self-only"');

			expect(await Interface.openButton.isFocused()).toBe(true);

			await Page.spotlightSelect();

			await Page.waitForFocused(Interface.item1);

			await Page.spotlightLeft();

			expect(await Interface.item1.isFocused()).toBe(true);
		});

		it('should allow 5-way navigation out and remain open when spotlightRestrict="self-first" and scrim="none"', async function () {
			await Page.open('?scrimType="none"&spotlightRestrict="self-first"');

			expect(await Interface.openButton.isFocused()).toBe(true);

			await Page.spotlightSelect();

			await Page.waitForFocused(Interface.item1);

			await Page.spotlightLeft();

			expect(await Interface.openButton.isFocused()).toBe(true);

			// verify the popup remains open
			await Interface.waitForOpen();
		});
	});

	describe('Pointer', function () {

		beforeEach(async function () {
			await Page.open();
		});

		it('should open FixedPopupPanels and navigate to Panel', async function () {
			await Page.waitTransitionEnd(1000, 'wait for FixedPopupPanels to open', async () => {
				await Interface.openButton.click();
			});

			await Interface.waitForEnter(2, async () => {
				await Interface.item1.click();
			});
			// TODO: Hover and click back button
		});

		it('should close when clicking below the panel', async function () {
			await Page.waitTransitionEnd(1000, 'wait for FixedPopupPanels to open', async () => {
				await Interface.openButton.click();
			});

			// Target a clickable element, offset down below visible area of popup
			await Interface.clickBelowPopup();
			await Interface.waitForClose();
		});
	});
});
