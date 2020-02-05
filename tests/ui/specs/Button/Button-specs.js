const Page = require('./ButtonPage');

describe('Button', function () {

	beforeEach(function () {
		Page.open();
	});

	const {
		buttonDefault,
		buttonDisabled,
		buttonTransparent,
		buttonWithCheckIcon,
		buttonWithIconAfter,
		buttonFalseMinWidth,
		buttonSizeSmall,
		iconButton
	} = Page.components;

	it('should have default backgroundOpacity opaque', function () {
		expect(buttonDefault.isOpaque).to.be.true();
	});

	it('should have default minWidth', function () {
		expect(buttonDefault.isMinWidth).to.be.true();
	});

	it('should have default size large', function () {
		expect(buttonDefault.isLarge).to.be.true();
	});

	describe('with no minWidth', function () {
		it('should not have minWidth class', function () {
			expect(buttonFalseMinWidth.isMinWidth).to.be.false();
		});
	});

	describe('with transparent backgroundOpacity', function () {
		it('should have transparent class', function () {
			expect(buttonTransparent.isTransparent).to.be.true();
		});

		it('should not have have opaque class', function () {
			expect(buttonTransparent.isOpaque).to.be.false();
		});
	});

	describe('with icon', function () {
		it('should have check icon when specified', function () {
			expect(buttonWithCheckIcon.iconSymbol).to.equal('✓');
		});

		it('should display icon before the text by default', function () {
			expect(buttonWithCheckIcon.isIconBefore).to.be.true();
		});

		it('should display icon after the text when iconPosition is after', function () {
			expect(buttonWithIconAfter.isIconAfter).to.be.true();
		});

		it('should not have minWidth class with only icon', function () {
			expect(iconButton.isMinWidth).to.be.false();
		});

		it('should have iconOnly class when there is no children', function () {
			expect(iconButton.isIconButton).to.be.true();
		});
	});

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
