const Page = require('./ContextualMenuDecoratorPage');

describe('ContextualMenuDecorator', function () {

	beforeEach(function () {
		Page.open();
	});

	const {
		button1,
		menu1,
		menu2
	} = Page.components;

	describe('not using open', function () {

		beforeEach(function () {
			button1.focus();
		});

		it('should focus the first button on start', function () {
			expect(button1.self.isFocused()).to.be.true();
		});

		it('should not have the menu on start', function () {
			expect(menu1.isMenuExist).to.be.false();
		});

		describe('using 5-way', function () {
			// The menu is open and the first item has focus
			beforeEach(function () {
				Page.spotlightSelect();
			});

			// [GT-28276] - The menu expands (verify step 3 - part 1)
			it('should have the menu on select', function () {
				expect(menu1.isMenuExist).to.be.true();
			});

			// [GT-28276] - Spotlight is on the first item (verify step 3 - part 2)
			it('should move focus to first menu item on select', function () {
				expect(menu1.item(0).isFocused()).to.be.true();
			});

			// [GT-28284] - The *Contextual Button* menu closes. Spotlight is on *Contextual Button* button (verify step 4)
			it('should dismiss the menu on 5-way left from menu item', function () {
				Page.spotlightLeft();
				expect(menu1.isMenuExist).to.be.false();
				expect(button1.self.isFocused()).to.be.true();
			});

			// [GT-28284] - The *Contextual Button* menu closes. Spotlight is on *Contextual Button* button (verify step 5)
			it('should dismiss the menu on 5-way right from menu item', function () {
				Page.spotlightRight();
				expect(menu1.isMenuExist).to.be.false();
				expect(button1.self.isFocused()).to.be.true();
			});

			// [GT-28284] - The *Contextual Button* menu closes. Spotlight is on *Contextual Button* button (verify step 6)
			it('should dismiss the menu on 5-way up from first menu item', function () {
				Page.spotlightUp();
				expect(menu1.isMenuExist).to.be.false();
				expect(button1.self.isFocused()).to.be.true();
			});

			// [GT-28285] - Spotlight is on the second item. (verify step 4)
			it('should move focus to the next menu item on 5-way down', function () {
				Page.spotlightDown();
				expect(menu1.item(1).isFocused()).to.be.true();
			});

			// [GT-28285] - The *Contextual Button* menu closes. Spotlight is on *Contextual Button* button. (verify step 5)
			it('should dismiss the menu and move focus back to activator on close', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightDown();
				expect(menu1.isMenuExist).to.be.false();
				expect(button1.self.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {
			// [GT-28282]
			it('should keep Spotlight on button when menu opens with pointer', function () {
				button1.focus();
				button1.self.click(); // this will close menu2 and open menu1
				expect(button1.self.hasFocus()).to.be.true();  // (verify step 3)
				expect(menu1.isMenuExist).to.be.true();  // (verify step 3)
				expect(menu1.item(0).isFocused()).to.be.false();  // Spotlight is not on the first item. (verify step 3)
				button1.self.click(); // this will close menu1
				button1.focus();
				expect(menu1.isMenuExist).to.be.false(); 	// (verify step 4)
				expect(button1.self.isFocused()).to.be.true();	// (verify step 4)
			});
		});
	});

	// Menu with Button 2 is explicitly set as opened. It is using an open prop. It is there to test that if a user specifies that prop, they can programmatically control when it closes.
	describe('using open', function () {
		it('should have the menu on start', function () {
			expect(menu2.isMenuExist).to.be.true();
		});

		it('should set focus to first menu item on start', function () {
			expect(menu2.item(0).isFocused()).to.be.true();
		});
	});

});
