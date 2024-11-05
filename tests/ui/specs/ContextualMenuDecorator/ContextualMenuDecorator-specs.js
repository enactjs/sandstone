const Page = require('./ContextualMenuDecoratorPage');

describe('ContextualMenuDecorator', function () {

	beforeEach(async function () {
		await Page.open();
	});

	const {
		button1,
		button2,
		menu1,
		menu2
	} = Page.components;

	describe('not using open', function () {

		it('should have the menu on start', async function () {
			expect(await menu1.isMenuExist).toBe(false);
			expect(await menu2.item(0).isFocused()).toBe(true);
		});

		describe('using 5-way', function () {
			it('should close on back key', async function () {
				await Page.backKey();
				expect(await menu2.isMenuExist).toBe(false);
			});

			it('should move focus to first menu item on select - [QWTC-1910]', async function () {
				// Spotlight is on the first item (verify step 3)
				await Page.backKey();
				await Page.spotlightLeft();
				await Page.spotlightSelect();
				expect(await menu1.isMenuExist).toBe(true);
				expect(await menu1.item(0).isFocused()).toBe(true);
			});

			it('should not dismiss the menu on 5-way left from menu item - [QWTC-1915]', async function () {
				// The *Contextual Button* menu does not close. Spotlight is on same item (verify step 4)
				await Page.spotlightLeft();
				expect(await menu2.isMenuExist).toBe(true);
				expect(await menu2.item(0).isFocused()).toBe(true);
			});

			it('should not dismiss the menu on 5-way right from menu item - [QWTC-1915]', async function () {
				// The *Contextual Button* menu does not close. Spotlight is on same item (verify step 5)
				await Page.spotlightRight();
				expect(await menu2.isMenuExist).toBe(true);
				expect(await menu2.item(0).isFocused()).toBe(true);
			});

			it('should not dismiss the menu on 5-way up from first menu item - [QWTC-1915]', async function () {
				// The *Contextual Button* menu does not close. Spotlight is on on same item (verify step 6)
				await Page.spotlightUp();
				expect(await menu2.isMenuExist).toBe(true);
				expect(await menu2.item(0).isFocused()).toBe(true);
			});

			it('should move focus to the next menu item on 5-way down - [QWTC-1916]', async function () {
				// Spotlight is on the second item. (verify step 4)
				await Page.spotlightDown();
				expect(await menu2.item(1).isFocused()).toBe(true);
			});

			it('should not dismiss the menu and move focus back to activator on close - [QWTC-1916]', async function () {
				// The *Contextual Button* menu does not close. Spotlight is on bottom button. (verify step 5)
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightDown();
				expect(await menu2.isMenuExist).toBe(true);
				expect(await menu2.item(2).isFocused()).toBe(true);
			});
		});

		describe('using pointer', function () {

			it('should not keep Spotlight on button when menu opens with pointer - [QWTC-1914]', async function () {
				await button2.self.moveTo();
				await $('.ContextualPopupDecorator_HolePunchScrim_holePunchScrim').click({x: -100, y: 100});	// Click on scrim to close popup (note -100 offset is important to get away from button)
				// this will close menu2
				expect(await menu2.isMenuExist).toBe(false);

				await button1.self.click();	// this will open menu1
				expect(await button1.self.isFocused()).toBe(false);  // (verify step 4)
				expect(await menu1.isMenuExist).toBe(true);  // (verify step 4)
				expect(await menu1.item(0).isFocused()).toBe(false);  // Spotlight is not on the first item. (verify step 3)

				await $('.ContextualPopupDecorator_HolePunchScrim_holePunchScrim').click({x: -100, y: 100});	// Click on scrim to close popup
				// this will close menu1
				expect(await menu1.isMenuExist).toBe(false); 	// (verify step 5)
			});
		});
	});

	// Menu with Button 2 is explicitly set as opened. It is using an open prop. It is there to test that if a user specifies that prop, they can programmatically control when it closes.
	describe('using open', function () {
		it('should have the menu on start, with focus on first item', async function () {
			expect(await menu2.isMenuExist).toBe(true);
			expect(await menu2.item(0).isFocused()).toBe(true);
		});
	});

});
