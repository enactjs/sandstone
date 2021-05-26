const Page = require('./ContextualPopupDecoratorPage');

describe('ContextualPopupDecorator', function () {

	beforeEach(function () {
		Page.open();
	});

	const {
		button1,
		button2
	} = Page.components;

	describe('not using open', function () {

		beforeEach(function () {
			button1.focus();
		});

		it('should focus the first button on start', function () {
			expect(button1.self.isFocused()).to.be.true();
		});

		describe('using 5-way', function () {
			it('should focus second button on 5-way right', function () {
				Page.spotlightRight();
				expect(button2.self.isFocused()).to.be.true();
			});
		});

		describe('using 5-way', function () {
			// The menu is open and the first item has focus
			beforeEach(function () {
				Page.spotlightSelect();
			});

			// [GT-28291] - 5-waySelectableActivator: Button Retains Spotlight when Popup Hides
			it('should have Spotlight on close button when ContextualPopup opens', function () {
				let popupButton = $('#popupButton1');

				expect(popupButton.isFocused()).to.be.true();
			});
		});
	});

	describe('using open', function () {
		describe('using 5-way', function () {
			it('should have Spotlight on button when ContextualPopup1 opens', function () {
				let popupButton = $('#popupButton1');

				Page.spotlightSelect();
				expect(popupButton.isFocused()).to.be.true();
			});

			it('should have Spotlight on button when ContextualPopup2 opens', function () {
				let popupButton = $('#popupButton2');

				button2.focus();
				Page.spotlightSelect();
				expect(popupButton.isFocused()).to.be.true();
			});
		});

		describe('using pointer', function () {
			it('should open when clicked', function () {
				button1.self.click();
				expect(button1.isOpen).to.be.true();
			});

			it('should close when clicking outside', function () {
				button1.self.click();

				// Click in the area outside the ContextualPopupDecorator (in the empty space created by the wrapper)
				const wrapper = $('.ThemeDecorator_ThemeDecorator_bg');
				wrapper.click({x: 0, y: 0});

				expect(button1.isOpen).to.be.false();
			});
		});
	});
});
