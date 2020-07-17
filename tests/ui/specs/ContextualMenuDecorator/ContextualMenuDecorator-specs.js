const Page = require('./ContextualMenuDecoratorPage');

describe('ContextualMenuDecorator', function () {

	beforeEach(function () {
		Page.open();
	});

	const {
		button1,
		button2,
		menu1,
		menu2
	} = Page.components;

	describe('not using open', function () {

		it('should have the menu on start', function () {
			expect(menu1.isMenuExist).to.be.false();
			expect(menu2.item(0).isFocused()).to.be.true();
		});

		describe('using 5-way', function () {
			it('should close on back key', function () {
				Page.backKey();
				expect(menu2.isMenuExist).to.be.false();
			});

			// [GT-28276] - Spotlight is on the first item (verify step 3)
			it('should move focus to first menu item on select', function () {
				Page.backKey();
				Page.spotlightLeft();
				Page.spotlightSelect();
				expect(menu1.isMenuExist).to.be.true();
				expect(menu1.item(0).isFocused()).to.be.true();
			});

			// [GT-28284] - The *Contextual Button* menu does not close. Spotlight is on same item (verify step 4)
			it('should not dismiss the menu on 5-way left from menu item', function () {
				Page.spotlightLeft();
				expect(menu2.isMenuExist).to.be.true();
				expect(menu2.item(0).isFocused()).to.be.true();
			});

			// [GT-28284] - The *Contextual Button* menu does not close. Spotlight is on same item (verify step 5)
			it('should not dismiss the menu on 5-way right from menu item', function () {
				Page.spotlightRight();
				expect(menu2.isMenuExist).to.be.true();
				expect(menu2.item(0).isFocused()).to.be.true();
			});

			// [GT-28284] - The *Contextual Button* menu does not close. Spotlight is on on same item (verify step 6)
			it('should not dismiss the menu on 5-way up from first menu item', function () {
				Page.spotlightUp();
				expect(menu2.isMenuExist).to.be.true();
				expect(menu2.item(0).isFocused()).to.be.true();
			});

			// [GT-28285] - Spotlight is on the second item. (verify step 4)
			it('should move focus to the next menu item on 5-way down', function () {
				Page.spotlightDown();
				expect(menu2.item(1).isFocused()).to.be.true();
			});

			// [GT-28285] - The *Contextual Button* menu does not close. Spotlight is on bottom button. (verify step 5)
			it('should not dismiss the menu and move focus back to activator on close', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightDown();
				expect(menu2.isMenuExist).to.be.true();
				expect(menu2.item(2).isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {
			// [GT-28282]
			it('should not keep Spotlight on button when menu opens with pointer', function () {
				button2.self.moveTo();
				$('.ContextualPopupDecorator_HolePunchScrim_holePunchScrim').click({x: -100, y: 100});	// Click on scrim to close popup (note -100 offset is important to get away from button)
				// this will close menu2
				expect(menu2.isMenuExist, 'menu2 closed').to.be.false();

				button1.self.click();	// this will open menu1
				expect(button1.self.isFocused()).to.be.false();  // (verify step 3)
				expect(menu1.isMenuExist, 'menu1 open').to.be.true();  // (verify step 3)
				expect(menu1.item(0).isFocused()).to.be.false();  // Spotlight is not on the first item. (verify step 3)

				$('.ContextualPopupDecorator_HolePunchScrim_holePunchScrim').click({x: -100, y: 100});	// Click on scrim to close popup

				expect(menu1.isMenuExist, 'menu1 closed').to.be.false(); 	// (verify step 4)
			});
		});
	});

	// Menu with Button 2 is explicitly set as opened. It is using an open prop. It is there to test that if a user specifies that prop, they can programmatically control when it closes.
	describe('using open', function () {
		it('should have the menu on start, with focus on first item', function () {
			expect(menu2.isMenuExist).to.be.true();
			expect(menu2.item(0).isFocused()).to.be.true();
		});
	});

});
