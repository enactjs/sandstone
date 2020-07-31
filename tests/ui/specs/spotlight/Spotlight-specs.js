let Page = require('./SpotlightMultiplePage');

describe('Spotlight', function () {

	it('should focus first item on load', function () {
		Page.open();
		expect(Page.item1.isFocused()).to.be.true();
	});

	it('should focus item 2 on 5-way down', function () {
		Page.open();
		Page.spotlightDown();
		expect(Page.item2.isFocused()).to.be.true();
	});

	it('should not change focus on 5-way left', function () {
		Page.open();
		Page.spotlightLeft();
		expect(Page.item1.isFocused()).to.be.true();
	});

	it('should not change focus on 5-way up', function () {
		Page.open();
		Page.spotlightUp();
		expect(Page.item1.isFocused()).to.be.true();
	});

	it('should spot default item in next container', function () {
		Page.open();
		Page.spotlightDown();
		Page.spotlightRight();
		expect(Page.itemA.isFocused()).to.be.true();
	});

	it('should spot last spotted control in container when re-entering', function () {
		Page.open();
		Page.spotlightDown();
		Page.spotlightRight();
		expect(Page.itemA.isFocused(), 'moved containers').to.be.true();
		Page.spotlightLeft();
		expect(Page.item2.isFocused(), 'moved back').to.be.true();
	});

	it('should spot nearest control in container when leaving pointer mode with a target in direction', function () {
		Page.open();
		// Hovering non-focusable item with pointer
		Page.item2.moveTo();
		// move down (no more spotted controls)
		Page.spotlightDown();
		// Should re-spot item 1
		expect(Page.item3.isFocused()).to.be.true();
	});

	it('should spot next container when leaving pointer mode with focus on spottable item', function () {
		Page.open();
		// Hovering non-focusable item with pointer
		Page.item2.moveTo();
		// move down (no more spotted controls)
		Page.spotlightRight();
		// Should re-spot item 1
		expect(Page.itemA.isFocused()).to.be.true();
	});

	it('should spot closest control in container when leaving pointer in new container', function () {
		Page.open();
		// Hovering non-focusable item in different container with pointer
		Page.nonSpottableItemB.moveTo();
		// move down
		Page.spotlightDown();
		// Should spot item A
		expect(Page.itemA.isFocused()).to.be.true();
	});

	describe('Nested Containers', function () {
		it('should spot child item', function () {
			Page.open();
			Page.itemParent.moveTo();
			Page.spotlightDown();
			expect(Page.itemChild.isFocused()).to.be.true();
		});

		it('should spot parent item', function () {
			Page.open();
			Page.itemChild.moveTo();
			Page.spotlightUp();
			expect(Page.itemParent.isFocused()).to.be.true();
		});
	});

	describe('Disappear Test', function () {
		it('should spot restore button when focus button disappears - [GT-22523]', function () {
			Page.open();
			Page.restoreButton.moveTo();
			Page.spotlightUp();
			browser.pause(5000);
			expect(Page.restoreButton.isFocused()).to.be.true();
		});
	});
});
