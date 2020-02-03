const Page = require('./ItemPage');

describe('Item', function () {

	beforeEach(function () {
		Page.open();
	});

	it('should have focus on first item at start', function () {
		expect(Page.components.itemDefault.self.hasFocus()).to.be.true();
	});

	describe('5-way', function () {
		const itemDefault = Page.components.itemDefault;
		const itemDisabled = Page.components.itemDisabled;

		it('should focus disabled on 5-way down', function () {
			itemDefault.focus();
			Page.spotlightDown();
			expect(itemDisabled.self.hasFocus()).to.be.true();

		});

		it('should focus first item on SpotlightUp', function () {
			Page.components.itemDisabled.focus();
			Page.spotlightUp();
			expect(itemDefault.self.hasFocus()).to.be.true();
		});
	});

	describe('pointer', function () {

		const itemDefault = Page.components.itemDefault;
		const itemDisabled = Page.components.itemDisabled;

		it('should focus the disabled when hovered', function () {
			itemDisabled.focus();
			expect(itemDisabled.self.hasFocus()).to.be.true();
		});

		it('should focus first when hovered', function () {
			itemDefault.focus();
			expect(itemDefault.self.hasFocus()).to.be.true()
		});
	});
});
