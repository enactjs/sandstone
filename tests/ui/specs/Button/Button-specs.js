const Page = require('./ButtonPage');

describe('Button', function () {

	beforeEach(function () {
		Page.open();
	});

	const {
		buttonDefault,
		buttonDisabled,
		buttonSizeSmall,
		iconButton
	} = Page.components;

	describe('5-way', function () {
		it('should focus disabled button on 5-way right', function () {
			buttonDefault.focus();
			Page.spotlightRight();
			expect(buttonDisabled.self.hasFocus()).to.be.true();
		});

		it('should focus buttonSizeSmall button on 5-way left', function () {
			iconButton.focus();
			Page.spotlightLeft();
			expect(buttonSizeSmall.self.hasFocus()).to.be.true();
		});
	});

	describe('pointer', function () {
		it('should focus the disabled when hovered', function () {
			buttonDisabled.hover();
			expect(buttonDisabled.self.hasFocus()).to.be.true();
		});

		it('should focus first when hovered', function () {
			buttonDefault.hover();
			expect(buttonDefault.self.hasFocus()).to.be.true()
		});
	});

});
