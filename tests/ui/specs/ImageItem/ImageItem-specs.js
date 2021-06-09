const Page = require('./ImageItemPage');

describe('ImageItem', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should have focus on first ImageItem at start', function () {
		expect(Page.components.imageItemDefault.self.isFocused()).to.be.true();
	});

	describe('default', function () {
		const imageItem = Page.components.imageItemDefault;

		it('should have correct text', function () {
			expect(imageItem.textContent).to.equal('Caption');
		});

		it('should display an image', function () {
			expect(imageItem.image).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the image item', function () {
				Page.components.imageItemLongCaption.focus();
				Page.spotlightLeft();

				expect(imageItem.self.isFocused()).to.be.true();
			});
		});
	});

	describe('long caption', function () {
		const imageItem = Page.components.imageItemLongCaption;

		it('should wrap caption with Marquee with long caption', function () {
			expect(imageItem.valueText).to.equal('Image Item with longer caption has Marquee applied');
		});

		it('should display an image', function () {
			expect(imageItem.image).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the image item', function () {
				Page.components.imageItemDefault.focus();
				Page.spotlightRight();

				expect(imageItem.self.isFocused()).to.be.true();
			});
		});
	});

	describe('centered', function () {
		const imageItem = Page.components.imageItemCentered;

		it('should display correct text', function () {
			expect(imageItem.textContent).to.equal('Centered');
		});

		it('should display an image', function () {
			expect(imageItem.image).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the image item', function () {
				Page.components.imageItemLongCaption.focus();
				Page.spotlightRight();

				expect(imageItem.self.isFocused()).to.be.true();
			});
		});
	});

	describe('disabled', function () {
		const imageItem = Page.components.imageItemDisabled;

		it('should display correct text', function () {
			expect(imageItem.textContent).to.equal('Image Item disabled');
		});

		it('should display an image', function () {
			expect(imageItem.image).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the image item', function () {
				Page.components.imageItemDefault.focus();
				Page.spotlightDown();

				expect(imageItem.self.isFocused()).to.be.true();
			});
		});
	});

	describe('selected', function () {
		const imageItem = Page.components.imageItemSelected;

		it('should display correct text', function () {
			expect(imageItem.textContent).to.equal('Image Item selected');
		});

		it('should display an image', function () {
			expect(imageItem.image).to.be.true();
		});

		it('should have "selected" class', function () {
			expect(imageItem.isSelected).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the image item', function () {
				Page.components.imageItemDisabled.focus();
				Page.spotlightRight();

				expect(imageItem.self.isFocused()).to.be.true();
			});
		});
	});

	describe('with label', function () {
		const imageItem = Page.components.imageItemWithLabel;

		it('should display an image', function () {
			expect(imageItem.image).to.be.true();
		});

		it('should have a label', function () {
			expect(imageItem.hasLabel).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the image item', function () {
				Page.components.imageItemSelected.focus();
				Page.spotlightRight();

				expect(imageItem.self.isFocused()).to.be.true();
			});
		});
	});
});
