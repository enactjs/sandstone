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
			expect(button1.self.hasFocus()).to.be.true();
		});

		it('should not have the menu on start', function () {
			expect(menu1.isMenuExist).to.be.false();
		});

		describe('using 5-way', function () {
			beforeEach(function () {
				Page.spotlightSelect();
			});

			it('should have the menu on select', function () {
				expect(menu1.isMenuExist).to.be.true();
			});

			it('should move focus to first menu item on select', function () {
				expect(menu1.item(0).hasFocus()).to.be.true();
			});

			it('should dismiss the menu on 5-way left from menu item', function () {
				Page.spotlightLeft();
				expect(menu1.isMenuExist).to.be.false();
			});

			it('should dismiss the menu on 5-way right from menu item', function () {
				Page.spotlightRight();
				expect(menu1.isMenuExist).to.be.false();
			});

			it('should dismiss the menu on 5-way up from first menu item', function () {
				Page.spotlightUp();
				expect(menu1.isMenuExist).to.be.false();
			});

			it('should move focus to the next menu item on 5-way down', function () {
				Page.spotlightDown();
				expect(menu1.item(1).hasFocus()).to.be.true();
			});

			it('should dismiss the menu and move focus back to activator on close', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightDown();
				expect(menu1.isMenuExist).to.be.false();
				expect(button1.self.hasFocus()).to.be.true();
			});
		});
	});

	describe('using open', function () {
		it('should have the menu on start', function () {
			expect(menu2.isMenuExist).to.be.true();
		});

		it('should set focus to first menu item on start', function () {
			expect(menu2.item(0).hasFocus()).to.be.true();
		});
	});
});
