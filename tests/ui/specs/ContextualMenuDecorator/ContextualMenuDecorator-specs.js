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

			it('should move focus to first menu item on select - [QWT-2740]', function () {
				// Spotlight is on the first item (verify step 3)
				Page.backKey();
				Page.spotlightLeft();
				Page.spotlightSelect();
				expect(menu1.isMenuExist).to.be.true();
				expect(menu1.item(0).isFocused()).to.be.true();
			});

			it('should not dismiss the menu on 5-way left from menu item - [QWT-2735]', function () {
				// The *Contextual Button* menu does not close. Spotlight is on same item (verify step 4)
				Page.spotlightLeft();
				expect(menu2.isMenuExist).to.be.true();
				expect(menu2.item(0).isFocused()).to.be.true();
			});

			it('should not dismiss the menu on 5-way right from menu item - [QWT-2735]', function () {
				// The *Contextual Button* menu does not close. Spotlight is on same item (verify step 5)
				Page.spotlightRight();
				expect(menu2.isMenuExist).to.be.true();
				expect(menu2.item(0).isFocused()).to.be.true();
			});

			it('should not dismiss the menu on 5-way up from first menu item - [QWT-2735]', function () {
				// The *Contextual Button* menu does not close. Spotlight is on on same item (verify step 6)
				Page.spotlightUp();
				expect(menu2.isMenuExist).to.be.true();
				expect(menu2.item(0).isFocused()).to.be.true();
			});

			it('should move focus to the next menu item on 5-way down - [QWT-2734]', function () {
				// Spotlight is on the second item. (verify step 4)
				Page.spotlightDown();
				expect(menu2.item(1).isFocused()).to.be.true();
			});

			it('should not dismiss the menu and move focus back to activator on close - [QWT-2734]', function () {
				// The *Contextual Button* menu does not close. Spotlight is on bottom button. (verify step 5)
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightDown();
				expect(menu2.isMenuExist).to.be.true();
				expect(menu2.item(2).isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {

			it('should not keep Spotlight on button when menu opens with pointer - [QWT-2736]', function () {
				button2.self.moveTo();
				$('.ContextualPopupDecorator_HolePunchScrim_holePunchScrim').click({x: -100, y: 100});	// Click on scrim to close popup (note -100 offset is important to get away from button)
				// this will close menu2
				expect(menu2.isMenuExist, 'menu2 closed').to.be.false();

				button1.self.click();	// this will open menu1
				expect(button1.self.isFocused()).to.be.false();  // (verify step 4)
				expect(menu1.isMenuExist, 'menu1 open').to.be.true();  // (verify step 4)
				expect(menu1.item(0).isFocused()).to.be.false();  // Spotlight is not on the first item. (verify step 3)

				$('.ContextualPopupDecorator_HolePunchScrim_holePunchScrim').click({x: -100, y: 100});	// Click on scrim to close popup
				// this will close menu1
				expect(menu1.isMenuExist, 'menu1 closed').to.be.false(); 	// (verify step 5)
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
